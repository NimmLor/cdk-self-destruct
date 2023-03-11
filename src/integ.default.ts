import { SelfDestruct } from '.'
import { App, aws_lambda, Duration, Stack } from 'aws-cdk-lib'

const app = new App()
const stack = new Stack(app, 'SelfDestructIntegTestStack')

new SelfDestruct(stack, 'SelfDestruct', {
  defaultBehavior: {
    destoryAllResources: true,
    performAllAdditionalCleanup: true,
    purgeResourceDependencies: true,
  },
  trigger: {
    addFunctionUrl: {
      cloudformationOutput: {
        description: 'URL to invoke the self-destruct function',
      },
      enabled: true,
      options: {
        authType: aws_lambda.FunctionUrlAuthType.NONE,
      },
    },
    scheduled: {
      afterDuration: Duration.minutes(15),
      enabled: true,
    },
  },
})
