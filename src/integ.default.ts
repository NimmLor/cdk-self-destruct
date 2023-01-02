import { aws_lambda, App, Stack, Duration } from "aws-cdk-lib";
import { SelfDestruct } from "./";

const app = new App();
const stack = new Stack(app, "SelfDestructIntegTestStack");

new SelfDestruct(stack, "SelfDestruct", {
  defaultBehavior: {
    destoryAllResources: true,
    purgeResourceDependencies: true,
    performAllAdditionalCleanup: true,
  },
  trigger: {
    addFunctionUrl: {
      enabled: true,
      cloudformationOutput: {
        description: "URL to invoke the self-destruct function",
      },
      options: {
        authType: aws_lambda.FunctionUrlAuthType.NONE,
      },
    },
    scheduled: {
      enabled: true,
      afterDuration: Duration.minutes(15),
    },
  },
});
