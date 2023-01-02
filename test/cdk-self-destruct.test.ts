import {
  App,
  Duration,
  Stack,
  aws_cognito,
  aws_dynamodb,
  aws_s3,
  aws_stepfunctions,
  aws_lambda,
} from "aws-cdk-lib";
import { Template } from "aws-cdk-lib/assertions";
import { SelfDestruct, SelfDestructProps } from "../src/index";

const blankApp = new App();
const blankStack = new Stack(blankApp);

const demoApp = new App();
const demoStack = new Stack(demoApp);

new aws_lambda.Function(demoStack, "TestFunction", {
  code: aws_lambda.Code.fromInline(
    "exports.handler = function(event, context) { context.done(null, 'Hello'); }"
  ),
  handler: "index.handler",
  runtime: aws_lambda.Runtime.NODEJS_16_X,
});

new aws_stepfunctions.StateMachine(demoStack, "TestStateMachine", {
  definition: new aws_stepfunctions.Pass(demoStack, "TestPass"),
});

new aws_cognito.UserPool(demoStack, "TestUserPool", {});
new aws_dynamodb.Table(demoStack, "TestTable", {
  partitionKey: { name: "id", type: aws_dynamodb.AttributeType.STRING },
});

new aws_s3.Bucket(blankStack, "TestBucket", {});
new aws_s3.Bucket(demoStack, "TestBucket", {});

const selfDestructProps: SelfDestructProps = {
  defaultBehavior: {
    destoryAllResources: false,
    purgeResourceDependencies: true,
    performAllAdditionalCleanup: true,
  },
  trigger: {
    addFunctionUrl: {
      enabled: true,
      cloudformationOutput: {
        exportName: "SelfDestructUrl",
      },
    },
    scheduled: {
      enabled: true,
      afterDuration: Duration.minutes(15),
    },
  },
  byResource: {
    resourcesToDestroy: ["AWS::S3::Bucket"],
    resourcesToRetain: ["AWS::DynamoDB::Table"],
  },
};
new SelfDestruct(blankStack, "SelfDestruct", selfDestructProps);
new SelfDestruct(demoStack, "SelfDestruct", selfDestructProps);

const blankTemplate = Template.fromStack(blankStack);
const demoTemplate = Template.fromStack(demoStack);

test("Stack destruction lambda function is be configured with properties and execution roles", () => {
  blankTemplate.hasResourceProperties("AWS::Lambda::Function", {
    Runtime: "nodejs16.x",
  });
  demoTemplate.hasResourceProperties("AWS::Lambda::Function", {
    Runtime: "nodejs16.x",
  });

  const properties = {
    AssumeRolePolicyDocument: {
      Statement: [
        {
          Action: "sts:AssumeRole",
          Effect: "Allow",
          Principal: {
            Service: "lambda.amazonaws.com",
          },
        },
      ],
      Version: "2012-10-17",
    },
  };

  blankTemplate.hasResourceProperties("AWS::IAM::Role", properties);
  demoTemplate.hasResourceProperties("AWS::IAM::Role", properties);
});

test("Stack includes output for functionUrl", () => {
  blankTemplate.hasOutput("SelfDestructFunctionUrl", {
    Export: { Name: "SelfDestructUrl" },
  });
});

test("Stack includes EventBridge Schedule to delete the stack automatically", () => {
  blankTemplate.hasResourceProperties("AWS::Scheduler::Schedule", {
    FlexibleTimeWindow: {
      Mode: "OFF",
    },
  });
});

test("Includes a s3 bucket with a deletionPolicy set to delete", () => {
  blankTemplate.hasResource("AWS::S3::Bucket", {
    DeletionPolicy: "Delete",
  });
  demoTemplate.hasResource("AWS::S3::Bucket", {
    DeletionPolicy: "Delete",
  });
});

test("Ignores a cognito userpool with a deletionPolicy set to retain", () => {
  demoTemplate.hasResource("AWS::Cognito::UserPool", {
    DeletionPolicy: "Retain",
  });
});

test("Includes a dynamodb table with a deletionPolicy set to delete", () => {
  demoTemplate.hasResource("AWS::DynamoDB::Table", {
    DeletionPolicy: "Retain",
  });
});

test("Includes the destruction lambda function", () => {
  const handler = Object.values(
    demoTemplate.findResources("AWS::Lambda::Function", {
      Properties: {
        Description: "Destroy cloudformation stack: Default",
        Handler: "index.handler",
        MemorySize: 512,
        Runtime: "nodejs16.x",
        Timeout: 900,
      },
    })
  )[0];

  expect(handler).toBeDefined();

  const environment = handler.Properties.Environment.Variables;

  const { LOG_GROUPS, S3_BUCKETS, STATE_MACHINES, STACK_NAME } = environment;

  expect(STACK_NAME).toBe("Default");

  expect(S3_BUCKETS.Ref.includes("TestBucket")).toBe(true);
  expect(STATE_MACHINES.Ref.includes("TestStateMachine")).toBe(true);
  expect(LOG_GROUPS["Fn::Join"][1][1].Ref.includes("TestFunction")).toBe(true);
});
