import * as path from 'path';
import {
  aws_iam,
  aws_lambda_nodejs, Stack,
  CfnResource,
  CfnCustomResource,
  IAspect,
  RemovalPolicy,
  Aspects,
  CfnOutput,
  aws_lambda,
  Duration,
  aws_scheduler,
} from 'aws-cdk-lib';
import { CfnUserPool } from 'aws-cdk-lib/aws-cognito';
import { CfnTable as CfnDynamoTable } from 'aws-cdk-lib/aws-dynamodb';
// import { FunctionUrlOptions } from 'aws-cdk-lib/aws-lambda';
import { FunctionUrlOptions } from 'aws-cdk-lib/aws-lambda';
import { CfnBucket } from 'aws-cdk-lib/aws-s3';
import { CfnStateMachine } from 'aws-cdk-lib/aws-stepfunctions';
import { Construct, IConstruct } from 'constructs';

export interface CommonOptions {
  /**
   * Whether the resource's removal policy should be set to DESTROY.q
   */
  readonly enabled: boolean;
};

export interface S3Options extends CommonOptions {
  /**
     * Purge all objects from the bucket before deleting it.
     * This is mandatory if the bucket is not empty.
     */
  readonly purgeNonEmptyBuckets: boolean;
}

export interface StepFunctionsOptions extends CommonOptions {
  /**
     * Cancel all running executions before deleting the state machine.
     * Otherwise, the cloudformation stack will fail be waiting until all executions are finished.
     */
  readonly cancelRunningExecutions: boolean;
}

export interface FunctionUrlConfig {
  readonly enabled: boolean;
  readonly options?: FunctionUrlOptions;
}

export interface TriggerOptions {
  /**
     * Use the lambda's function url to trigger the stack deletion.
     * This will add a cloudformation output to the stack.
     */
  readonly addFunctionUrl?: FunctionUrlConfig;
};

export interface SelfDestructProps {
  /**
   * Whether to set the removal policy of all resources that are not additionally specified to DESTROY
   */
  readonly defaultDestoryAllResources: boolean;
  /**
   * Whether to destroy all data that a resource depends on.
   *
   * For example, if a bucket has objects in it, it cannot be deleted.
   * Running step functions will also prevent the stack from being deleted.
   */
  readonly defaultPurgeResourceDependencies: boolean;
  readonly cognitoUserpools?: CommonOptions;
  readonly customResourceProviders?: CommonOptions;
  readonly dynamodb?: CommonOptions;
  readonly s3Buckets?: S3Options;
  readonly trigger: TriggerOptions;
  readonly stepFunctions?: StepFunctionsOptions;
}

const shouldDestroy = (value: boolean | undefined, defaultValue = false) => {
  if (value === undefined) {
    return defaultValue;
  }

  return value;
};

export class SelfDestructAspect implements IAspect {
  public readonly scope: Stack;

  public readonly buckets: CfnBucket[] = [];

  public readonly userpools: CfnUserPool[] = [];

  public readonly dynamodbTables: CfnDynamoTable[] = [];

  public readonly customResources: CfnCustomResource[] = [];

  public readonly stateMachines: CfnStateMachine[] = [];

  public readonly settings: SelfDestructProps;

  public destructionHandler: aws_lambda_nodejs.NodejsFunction;

  public index = 0;

  public constructor(scope: Stack, props: SelfDestructProps) {
    this.scope = scope;
    this.settings = props;

    this.destructionHandler = this.createDestructionLambda();
  }

  public visit(node: IConstruct): void {
    this.index += 1;
    const {
      s3Buckets,
      cognitoUserpools,
      defaultDestoryAllResources: all,
    } = this.settings;
    if (node instanceof CfnBucket && shouldDestroy(s3Buckets?.enabled, all)) {
      this.buckets.push(node);
      node.applyRemovalPolicy(RemovalPolicy.DESTROY);
    } else if (
      node instanceof CfnUserPool &&
      shouldDestroy(cognitoUserpools?.enabled, all)
    ) {
      this.userpools.push(node);
      node.applyRemovalPolicy(RemovalPolicy.DESTROY);
    } else if (
      node instanceof CfnDynamoTable &&
      shouldDestroy(this.settings.dynamodb?.enabled, all)
    ) {
      this.dynamodbTables.push(node);
      node.applyRemovalPolicy(RemovalPolicy.DESTROY);
    } else if (
      node instanceof CfnCustomResource &&
      shouldDestroy(this.settings.customResourceProviders?.enabled, all)
    ) {
      this.customResources.push(node);
      node.applyRemovalPolicy(RemovalPolicy.DESTROY);
    } else if (node instanceof CfnStateMachine) {
      this.stateMachines.push(node);
    } else if (
      node instanceof CfnResource &&
      'applyRemovalPolicy' in node &&
      typeof node.applyRemovalPolicy === 'function'
    ) {
      const att = node.getAtt('DeletionPolicy');
      if (att.displayName === 'DeletionPolicy') {
        node.applyRemovalPolicy(RemovalPolicy.DESTROY);
      }
    }

    const environment = this.getEnvironmentVariables();
    for (const [key, value] of Object.entries(environment)) {
      this.destructionHandler.addEnvironment(key, value);
    }
  }

  private readonly getEnvironmentVariables = () => {
    // We have to use ref here because tokens will not work in aspects
    // see https://blog.jannikwempe.com/mastering-aws-cdk-aspects
    const S3_BUCKETS = this.buckets.map(({ ref }) => ref).join(';');
    const STATE_MACHINES = this.stateMachines.map(({ ref }) => ref).join(';');


    const { defaultPurgeResourceDependencies: all } = this.settings;

    const environment = {
      S3_BUCKETS: shouldDestroy( this.settings.s3Buckets?.purgeNonEmptyBuckets, all)
        ? S3_BUCKETS
        : '',
      STACK_NAME: Stack.of(this.scope).stackName,
      STATE_MACHINES: shouldDestroy(this.settings.stepFunctions?.cancelRunningExecutions, all)
        ? STATE_MACHINES
        : '',
    };
    return environment;
  };

  private readonly createDestructionLambda = () => {
    const handler = new aws_lambda_nodejs.NodejsFunction(
      this.scope,
      'Default',
      {
        entry: path.join(__dirname, './functions/self-destruct-handler.ts'),
        environment: this.getEnvironmentVariables(),
        memorySize: 512,
        timeout: Duration.minutes(15),
        runtime: aws_lambda.Runtime.NODEJS_16_X,
      },
    );

    if (this.settings.trigger.addFunctionUrl?.enabled) {
      const functionUrl = handler.addFunctionUrl();
      new CfnOutput(this.scope, 'SelfDestructFunctionUrl', {
        value: functionUrl.url,
        exportName: 'SelfDestructFunctionUrl',
      });
    }

    if (this.settings.trigger) {
      const targetDate = new Date();
      const scheduleExpression = `at(${targetDate.toISOString().substring(0, 19)})`;

      const role = new aws_iam.Role(this.scope, 'ScheduleExecutionRole', {
        assumedBy: new aws_iam.ServicePrincipal('scheduler.amazonaws.com', {
          conditions: {
            StringEquals: {
              'aws:SourceAccount': Stack.of(this.scope).account,
            },
          },
        }),
        inlinePolicies: {
          AllowLambdaInvoke: new aws_iam.PolicyDocument({
            statements: [
              new aws_iam.PolicyStatement({
                actions: ['lambda:InvokeFunction'],
                resources: [handler.functionArn, `${handler.functionArn}:*`],
              }),
            ],
          }),
        },
      });

      new aws_scheduler.CfnSchedule(this.scope, 'Schedule', {
        flexibleTimeWindow: { mode: 'Off' },
        description: 'Self Destruct Stack "' + Stack.of(this.scope).stackName + '" at ' + targetDate.toISOString().substring(0, 19),
        scheduleExpression,
        target: { arn: handler.functionArn, roleArn: role.roleArn },
        name: 'Destroy Stack ' + Stack.of(this.scope).stackName,
      });
    }

    // new aws_events.Rule(this.scope, 'SelfDestructRule', {
    //   schedule: this.settings.schedule,
    // });

    handler.addToRolePolicy(new aws_iam.PolicyStatement({
      actions: ['cloudformation:DeleteStack'],
      resources: [Stack.of(this.scope).stackId],
    }));

    handler.addToRolePolicy(new aws_iam.PolicyStatement({
      actions: ['s3:DeleteObject', 's3:ListBucket'],
      resources: ['*'],
    }));

    handler.addToRolePolicy(new aws_iam.PolicyStatement({
      actions: ['states:ListExecutions', 'states:StopExecution'],
      resources: ['*'],
    }));


    return handler;
  };
}

export class SelfDestruct extends Construct {
  public constructor(scope: Stack, id: string, props: SelfDestructProps) {
    super(scope, id );

    Aspects.of(scope).add(new SelfDestructAspect(scope, props));
  }
}
