import * as cdk from "aws-cdk-lib";
import { SelfDestruct } from "./";

const app = new cdk.App();
const stack = new cdk.Stack(app, "SelfDestructIntegTestStack");

new SelfDestruct(stack, "SelfDestruct", {
  defaultBehavior: {
    destoryAllResources: true,
    purgeResourceDependencies: true,
  },
  trigger: {
    addFunctionUrl: {
      enabled: true,
      cloudformationOutput: {
        description: "URL to invoke the self-destruct function",
      },
      options: {
        authType: cdk.aws_lambda.FunctionUrlAuthType.NONE,
      },
    },
    scheduled: {
      enabled: true,
      afterDuration: cdk.Duration.minutes(15),
    },
  },
});
