import {
  aws_iam,
  aws_lambda_nodejs,
  Stack,
  CfnResource,
  IAspect,
  RemovalPolicy,
  Aspects,
  CfnOutput,
  aws_lambda,
  Duration,
  aws_scheduler,
  CfnCondition,
} from "aws-cdk-lib";
import { FunctionUrlOptions, CfnFunction } from "aws-cdk-lib/aws-lambda";
import { CfnBucket } from "aws-cdk-lib/aws-s3";
import { CfnStateMachine } from "aws-cdk-lib/aws-stepfunctions";
import { Construct, IConstruct } from "constructs";

export interface CommonOptions {
  /**
   * Whether the resource's removal policy should be set to DESTROY.q
   */
  readonly enabled: boolean;
}

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

export interface FunctionUrlOutputProps {
  /**
   * A String type that describes the output value.
   * The description can be a maximum of 4 K in length.
   *
   * @default - No description.
   */
  readonly description?: string;
  /**
   * The name used to export the value of this output across stacks.
   *
   * To import the value from another stack, use `Fn.importValue(exportName)`.
   *
   * @default - the output is not exported
   */
  readonly exportName?: string;
  /**
   * A condition to associate with this output value. If the condition evaluates
   * to `false`, this output value will not be included in the stack.
   *
   * @default - No condition is associated with the output.
   */
  readonly condition?: CfnCondition;
}

export interface FunctionUrlConfig {
  /**
   * Whether to enable the function url for the stack deletion lambda.
   */
  readonly enabled: boolean;
  /**
   * Options to configure the function url. Can be used to add authentication.
   */
  readonly options?: FunctionUrlOptions;
  /**
   * Options to add a cloudformation output to the stack.
   */
  readonly cloudformationOutput?: FunctionUrlOutputProps;
}

export interface ScheduledTriggerOptions {
  readonly enabled: boolean;
  /**
   * The duration after starting the deployment after which the stack should be deleted.
   *
   * Cannot be used together with `atTimestamp`.
   *
   * @example Duration.days(1)
   */
  readonly afterDuration?: Duration;
  /**
   * The timestamp at which the stack should be deleted. Must be a unix timestamp in milliseconds. **Timezone must be UTC**
   *
   * Cannot be used together with `afterDuration`.
   *
   * @example new Date("2023-01-01T00:00:00Z").getTime()
   */
  readonly atTimestamp?: number;
}

export interface TriggerOptions {
  /**
   * Use the lambda's function url to trigger the stack deletion.
   * This will add an output called `SelfDestructFunctionUrl` to the stack.
   */
  readonly addFunctionUrl?: FunctionUrlConfig;
  /**
   * Create an eventbridge schedule to trigger the stack deletion.
   */
  readonly scheduled?: ScheduledTriggerOptions;
}

export interface DefaultBehavior {
  /**
   * Whether to set the removal policy of all resources that are not additionally specified to DESTROY
   */
  readonly destoryAllResources: boolean;
  /**
   * Whether to destroy all data that a resource depends on.
   *
   * For example, if a bucket has objects in it, it cannot be deleted.
   * Running step functions will also prevent the stack from being deleted.
   */
  readonly purgeResourceDependencies: boolean;

  /**
   * Whether to destroy additional resources by default that are not automattically removed by cloudformation specified.
   *
   * At this time this only includes cloudwatch log groups linked to aws lambda functions.
   */
  readonly performAllAdditionalCleanup?: boolean;
}

export interface AdditionalCleanupOptions {
  /**
   * Whether to destroy all cloudwatch log groups linked to aws lambda functions.
   *
   * This does not affect log groups specified in the cloudformation template,
   * only the ones that are automatically created by the lambda service.
   *
   * It deletes the log groups for all lambda functions in the stack with the format `/aws/lambda/<function-name>`.
   */
  readonly cleanupLambdaLogGroups: boolean;
}

export interface ByResourceOptions {
  /**
   * A list of cloudformation resources that should be destroyed.
   *
   * @see https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-template-resource-type-ref.html
   *
   * @example "AWS::DynamoDB::Table"
   * @example "AWS::Cognito::UserPool"
   */
  readonly resourcesToDestroy?: string[];
  /**
   * A list of cloudformation resources that should be retained.
   *
   * @see https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-template-resource-type-ref.html
   *
   * @example "AWS::DynamoDB::Table"
   * @example "AWS::Cognito::UserPool"
   */
  readonly resourcesToRetain?: string[];
}

export interface SelfDestructProps {
  /**
   * Options to configure if resources should be destroyed by default.
   */
  readonly defaultBehavior: DefaultBehavior;
  /**
   * Options to configure the s3 bucket destruction.
   */
  readonly s3Buckets?: S3Options;
  /**
   * Options to configure the trigger of the stack destruction.
   */
  readonly trigger: TriggerOptions;
  /**
   * Options to configure the step functions destruction.
   */
  readonly stepFunctions?: StepFunctionsOptions;
  /**
   * Destroy/Retain resources by resource type.
   */
  readonly byResource?: ByResourceOptions;

  /**
   * Additional cleanup for resources not specified in the cloudformation template.
   */
  readonly additionalCleanup?: AdditionalCleanupOptions;
}

const shouldDestroy = (
  value: boolean | undefined,
  defaultValue = false,
  fineGrainedSetting?: { resourceName: string; byResource?: ByResourceOptions }
) => {
  if (fineGrainedSetting) {
    const includedInRetain =
      fineGrainedSetting.byResource?.resourcesToRetain?.includes(
        fineGrainedSetting.resourceName
      );
    const includedInDestroy =
      fineGrainedSetting.byResource?.resourcesToDestroy?.includes(
        fineGrainedSetting.resourceName
      );

    if (includedInRetain && includedInDestroy) {
      throw new Error(
        "resource is included in both resourcesToRetain and resourcesToDestroy: " +
          fineGrainedSetting.resourceName
      );
    }

    const shouldDestroyByResource =
      (includedInRetain === true ? false : undefined) ??
      (includedInDestroy === true ? true : undefined);

    if (
      value !== undefined &&
      shouldDestroyByResource !== undefined &&
      shouldDestroyByResource !== value
    ) {
      throw new Error(
        "fine grained settings and byResource options are conflicting for resource: " +
          fineGrainedSetting.resourceName
      );
    }

    if (value !== undefined) return value;

    if (shouldDestroyByResource !== undefined) return shouldDestroyByResource;
  }

  if (value === undefined) {
    return defaultValue;
  }

  return value;
};

export class SelfDestructAspect implements IAspect {
  public readonly scope: Stack;

  public readonly buckets: CfnBucket[] = [];

  public readonly stateMachines: CfnStateMachine[] = [];

  public readonly lambdaFunctions: CfnFunction[] = [];

  public readonly settings: SelfDestructProps;

  public destructionHandler: aws_lambda_nodejs.NodejsFunction;
  public constructor(scope: Stack, props: SelfDestructProps) {
    this.scope = scope;
    this.settings = props;

    this.destructionHandler = this.createDestructionLambda();
  }

  public visit(node: IConstruct): void {
    const {
      s3Buckets,
      defaultBehavior: { destoryAllResources: all },
    } = this.settings;
    if (
      node instanceof CfnBucket &&
      shouldDestroy(s3Buckets?.enabled, all, {
        resourceName: "AWS::S3::Bucket",
        byResource: this.settings.byResource,
      })
    ) {
      this.buckets.push(node);
      node.applyRemovalPolicy(RemovalPolicy.DESTROY);
    } else if (node instanceof CfnStateMachine) {
      this.stateMachines.push(node);
    } else if (
      node instanceof CfnFunction &&
      node.functionName !==
        `${Stack.of(this.scope).stackName}-SelfDestructHandler`
    ) {
      this.lambdaFunctions.push(node);
    } else if (
      node instanceof CfnResource &&
      "applyRemovalPolicy" in node &&
      typeof node.applyRemovalPolicy === "function"
    ) {
      const att = node.getAtt("DeletionPolicy");
      if (att.displayName === "DeletionPolicy") {
        if (
          !this.settings.byResource?.resourcesToRetain?.includes(
            node.cfnResourceType
          ) &&
          shouldDestroy(
            this.settings.byResource?.resourcesToDestroy?.includes(
              node.cfnResourceType
            ) === true
              ? true
              : undefined,
            this.settings.defaultBehavior.destoryAllResources
          ) &&
          node.cfnResourceType !== "AWS::S3::Bucket"
        ) {
          node.applyRemovalPolicy(RemovalPolicy.DESTROY);
        }
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
    const S3_BUCKETS = this.buckets.map(({ ref }) => ref).join(";");
    const STATE_MACHINES = this.stateMachines.map(({ ref }) => ref).join(";");

    const {
      defaultBehavior: { purgeResourceDependencies: all },
    } = this.settings;

    const environment = {
      S3_BUCKETS: shouldDestroy(
        this.settings.s3Buckets?.purgeNonEmptyBuckets &&
          this.settings.s3Buckets?.enabled,
        all
      )
        ? S3_BUCKETS
        : "",
      STACK_NAME: Stack.of(this.scope).stackName,
      STATE_MACHINES: shouldDestroy(
        this.settings.stepFunctions?.cancelRunningExecutions,
        all
      )
        ? STATE_MACHINES
        : "",
      LOG_GROUPS: shouldDestroy(
        this.settings.additionalCleanup?.cleanupLambdaLogGroups,
        this.settings.defaultBehavior.performAllAdditionalCleanup
      )
        ? this.lambdaFunctions.map(({ ref }) => `/aws/lambda/${ref}`).join(";")
        : "",
    };
    return environment;
  };

  private readonly createDestructionLambda = () => {
    const handler = new aws_lambda_nodejs.NodejsFunction(
      this.scope,
      "handler",
      {
        environment: this.getEnvironmentVariables(),
        memorySize: 512,
        timeout: Duration.minutes(15),
        runtime: aws_lambda.Runtime.NODEJS_16_X,
        functionName: `${Stack.of(this.scope).stackName}-SelfDestructHandler`,
        description:
          "Destroy cloudformation stack: " + Stack.of(this.scope).stackName,
      }
    );

    const { addFunctionUrl } = this.settings.trigger;

    if (this.settings.trigger.addFunctionUrl?.enabled) {
      const functionUrl = handler.addFunctionUrl(
        this.settings.trigger.addFunctionUrl.options
      );

      if (addFunctionUrl?.cloudformationOutput) {
        new CfnOutput(this.scope, "SelfDestructFunctionUrl", {
          value: functionUrl.url,
          ...addFunctionUrl.cloudformationOutput,
        });
      }
    }

    if (this.settings.trigger.scheduled?.enabled) {
      const { scheduled } = this.settings.trigger;

      let targetDate = new Date();

      if (scheduled.atTimestamp && scheduled.afterDuration) {
        throw new Error("Cannot set both atTimestamp and afterDuration");
      }

      if (!scheduled.afterDuration && !scheduled.atTimestamp) {
        throw new Error("Must set either atTimestamp or afterDuration");
      }

      if (scheduled.afterDuration) {
        const x = scheduled.afterDuration.toMilliseconds();
        targetDate = new Date(targetDate.setTime(targetDate.getTime() + x));
      } else if (scheduled.atTimestamp) {
        if (scheduled.atTimestamp < Date.now()) {
          throw new Error("atTimestamp must be in the future");
        }
        targetDate = new Date(scheduled.atTimestamp);
      }

      const scheduleExpression = `at(${targetDate
        .toISOString()
        .substring(0, 19)})`;

      const role = new aws_iam.Role(this.scope, "ScheduleExecutionRole", {
        assumedBy: new aws_iam.ServicePrincipal("scheduler.amazonaws.com", {
          conditions: {
            StringEquals: {
              "aws:SourceAccount": Stack.of(this.scope).account,
            },
          },
        }),
        inlinePolicies: {
          AllowLambdaInvoke: new aws_iam.PolicyDocument({
            statements: [
              new aws_iam.PolicyStatement({
                actions: ["lambda:InvokeFunction"],
                resources: [handler.functionArn, `${handler.functionArn}:*`],
              }),
            ],
          }),
        },
      });

      new aws_scheduler.CfnSchedule(this.scope, "Schedule", {
        flexibleTimeWindow: { mode: "OFF" },
        description:
          'Self Destruct Stack "' +
          Stack.of(this.scope).stackName +
          '" at ' +
          targetDate.toLocaleString().substring(0, 17),
        scheduleExpression,
        target: { arn: handler.functionArn, roleArn: role.roleArn },
        name: ("Destroy Stack " + Stack.of(this.scope).stackName)
          .replace(/\s/g, "_")
          .substring(0, 64),
      });
    }

    handler.addToRolePolicy(
      new aws_iam.PolicyStatement({
        actions: ["cloudformation:DeleteStack"],
        resources: [Stack.of(this.scope).stackId],
      })
    );

    handler.addToRolePolicy(
      new aws_iam.PolicyStatement({
        actions: ["s3:DeleteObject", "s3:ListBucket"],
        resources: ["*"],
      })
    );

    handler.addToRolePolicy(
      new aws_iam.PolicyStatement({
        actions: ["states:ListExecutions", "states:StopExecution"],
        resources: ["*"],
      })
    );

    handler.addToRolePolicy(
      new aws_iam.PolicyStatement({
        actions: ["logs:DeleteLogGroup"],
        resources: [
          `arn:aws:logs:${Stack.of(this.scope).region}:${
            Stack.of(this.scope).account
          }:log-group:*`,
        ],
      })
    );

    return handler;
  };
}

export class SelfDestruct extends Construct {
  public constructor(scope: Stack, id: string, props: SelfDestructProps) {
    super(scope, id);

    Aspects.of(scope).add(new SelfDestructAspect(scope, props));
  }
}
