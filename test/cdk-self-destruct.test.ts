/* eslint-disable jest/expect-expect */
import type { SelfDestructProps } from '../src'
import { SelfDestruct } from '../src'
import {
  App,
  aws_cognito,
  aws_dynamodb,
  aws_lambda,
  aws_s3,
  aws_stepfunctions,
  Duration,
  Stack,
} from 'aws-cdk-lib'
import { Template } from 'aws-cdk-lib/assertions'

const blankApp = new App()
const blankStack = new Stack(blankApp)

const demoApp = new App()
const demoStack = new Stack(demoApp)

jest.setTimeout(20_000)

new aws_lambda.Function(demoStack, 'TestFunction', {
  code: aws_lambda.Code.fromInline(
    `exports.handler = function(event, context) { context.done(null, 'Hello'); }`
  ),
  handler: 'index.handler',
  runtime: aws_lambda.Runtime.NODEJS_16_X,
})

new aws_stepfunctions.StateMachine(demoStack, 'TestStateMachine', {
  definition: new aws_stepfunctions.Pass(demoStack, 'TestPass'),
})

new aws_cognito.UserPool(demoStack, 'TestUserPool', {})
new aws_dynamodb.Table(demoStack, 'TestTable', {
  partitionKey: { name: 'id', type: aws_dynamodb.AttributeType.STRING },
})

new aws_s3.Bucket(blankStack, 'TestBucket', {})
new aws_s3.Bucket(demoStack, 'TestBucket', {})

const selfDestructProps: SelfDestructProps = {
  byResource: {
    resourcesToDestroy: ['AWS::Cognito::UserPool'],
    resourcesToRetain: ['AWS::DynamoDB::Table'],
  },
  defaultBehavior: {
    destoryAllResources: false,
    performAllAdditionalCleanup: true,
    purgeResourceDependencies: true,
  },
  s3Buckets: {
    enabled: true,
    purgeNonEmptyBuckets: true,
  },
  trigger: {
    addFunctionUrl: {
      cloudformationOutput: {
        exportName: 'SelfDestructUrl',
      },
      enabled: true,
    },
    scheduled: {
      afterDuration: Duration.minutes(15),
      enabled: true,
    },
  },
}
new SelfDestruct(blankStack, 'SelfDestruct', selfDestructProps)
new SelfDestruct(demoStack, 'SelfDestruct', selfDestructProps)

const blankTemplate = Template.fromStack(blankStack)
const demoTemplate = Template.fromStack(demoStack)

const checkSettings = (stack: Stack, destroy: boolean, purge: boolean) => {
  const template = Template.fromStack(stack)
  const handler = Object.values(
    template.findResources('AWS::Lambda::Function', {
      Properties: {
        Description: 'Destroy cloudformation stack: Default',
        Handler: 'index.handler',
        MemorySize: 512,
        Runtime: 'nodejs16.x',
        Timeout: 900,
      },
    })
  )[0]
  template.hasResource('AWS::S3::Bucket', {
    DeletionPolicy: destroy ? 'Delete' : 'Retain',
  })
  const S3_BUCKETS = handler.Properties.Environment.Variables.S3_BUCKETS
  expect(S3_BUCKETS?.Ref?.includes('TestBucket') === true).toBe(purge)
}

const getSetup = () => {
  const testApp = new App()
  const testStack = new Stack(testApp)
  const bucket = new aws_s3.Bucket(testStack, 'TestBucket')
  return {
    app: testApp,
    bucket,
    stack: testStack,
  }
}

describe('Cloudformation Template validation', () => {
  it('Stack destruction lambda function is be configured with properties and execution roles', () => {
    blankTemplate.hasResourceProperties('AWS::Lambda::Function', {
      Runtime: 'nodejs16.x',
    })
    demoTemplate.hasResourceProperties('AWS::Lambda::Function', {
      Runtime: 'nodejs16.x',
    })

    const properties = {
      AssumeRolePolicyDocument: {
        Statement: [
          {
            Action: 'sts:AssumeRole',
            Effect: 'Allow',
            Principal: {
              Service: 'lambda.amazonaws.com',
            },
          },
        ],
        Version: '2012-10-17',
      },
    }

    blankTemplate.hasResourceProperties('AWS::IAM::Role', properties)
    demoTemplate.hasResourceProperties('AWS::IAM::Role', properties)
  })

  it('Stack includes output for functionUrl', () => {
    blankTemplate.hasOutput('SelfDestructFunctionUrl', {
      Export: { Name: 'SelfDestructUrl' },
    })
  })

  it('Stack includes EventBridge Schedule to delete the stack automatically', () => {
    blankTemplate.hasResourceProperties('AWS::Scheduler::Schedule', {
      FlexibleTimeWindow: {
        Mode: 'OFF',
      },
    })
  })

  it('Includes a s3 bucket with a deletionPolicy set to delete', () => {
    blankTemplate.hasResource('AWS::S3::Bucket', {
      DeletionPolicy: 'Delete',
    })
    demoTemplate.hasResource('AWS::S3::Bucket', {
      DeletionPolicy: 'Delete',
    })
  })

  it('Includes a cognito userpool with a deletionPolicy set to delete', () => {
    demoTemplate.hasResource('AWS::Cognito::UserPool', {
      DeletionPolicy: 'Delete',
    })
  })

  it('Includes a dynamodb table with a deletionPolicy set to retain', () => {
    demoTemplate.hasResource('AWS::DynamoDB::Table', {
      DeletionPolicy: 'Retain',
    })
  })

  it('Includes the destruction lambda function', () => {
    const handler = Object.values(
      demoTemplate.findResources('AWS::Lambda::Function', {
        Properties: {
          Description: 'Destroy cloudformation stack: Default',
          Handler: 'index.handler',
          MemorySize: 512,
          Runtime: 'nodejs16.x',
          Timeout: 900,
        },
      })
    )[0]

    expect(handler).toBeDefined()

    const environment = handler.Properties.Environment.Variables

    const { LOG_GROUPS, S3_BUCKETS, STATE_MACHINES, STACK_NAME } = environment

    expect(STACK_NAME).toBe('Default')

    expect(S3_BUCKETS.Ref).toContain('TestBucket')
    expect(STATE_MACHINES.Ref).toContain('TestStateMachine')
    expect(LOG_GROUPS['Fn::Join'][1][1].Ref).toContain('TestFunction')
  })

  it('handles fine grained permission settings as well as byResource', () => {
    // test 0

    const { stack: test0 } = getSetup()

    new SelfDestruct(test0, 'SelfDestruct', {
      defaultBehavior: {
        destoryAllResources: true,
        purgeResourceDependencies: true,
      },
      trigger: {},
    })

    checkSettings(test0, true, true)

    // test 1

    const { stack: test1 } = getSetup()

    new SelfDestruct(test1, 'SelfDestruct', {
      byResource: {
        resourcesToDestroy: ['AWS::S3::Bucket'],
      },
      defaultBehavior: {
        destoryAllResources: false,
        purgeResourceDependencies: true,
      },
      trigger: {},
    })

    checkSettings(test1, true, true)

    // test 2

    const { stack: test2 } = getSetup()

    new SelfDestruct(test2, 'SelfDestruct', {
      byResource: {
        resourcesToDestroy: ['AWS::S3::Bucket'],
      },
      defaultBehavior: {
        destoryAllResources: false,
        purgeResourceDependencies: false,
      },
      trigger: {},
    })

    checkSettings(test2, true, false)

    // test 3

    const { stack: test3 } = getSetup()

    new SelfDestruct(test3, 'SelfDestruct', {
      byResource: {
        resourcesToRetain: ['AWS::S3::Bucket'],
      },
      defaultBehavior: {
        destoryAllResources: false,
        purgeResourceDependencies: true,
      },
      trigger: {},
    })

    checkSettings(test3, false, false)

    // test 4

    const { stack: test4 } = getSetup()

    new SelfDestruct(test4, 'SelfDestruct', {
      byResource: {
        resourcesToRetain: ['AWS::S3::Bucket'],
      },
      defaultBehavior: {
        destoryAllResources: true,
        purgeResourceDependencies: true,
      },
      trigger: {},
    })

    checkSettings(test4, false, false)

    // test 5

    const { stack: test5 } = getSetup()

    new SelfDestruct(test5, 'SelfDestruct', {
      defaultBehavior: {
        destoryAllResources: true,
        purgeResourceDependencies: true,
      },
      s3Buckets: {
        enabled: false,
        purgeNonEmptyBuckets: false,
      },
      trigger: {},
    })

    checkSettings(test5, false, false)

    // test 6

    const { stack: test6 } = getSetup()

    new SelfDestruct(test6, 'SelfDestruct', {
      defaultBehavior: {
        destoryAllResources: false,
        purgeResourceDependencies: false,
      },
      s3Buckets: {
        enabled: true,
        purgeNonEmptyBuckets: true,
      },
      trigger: {},
    })

    checkSettings(test6, true, true)

    // test 7

    const { stack: test7 } = getSetup()

    new SelfDestruct(test7, 'SelfDestruct', {
      byResource: {
        resourcesToDestroy: ['AWS::S3::Bucket'],
      },
      defaultBehavior: {
        destoryAllResources: false,
        purgeResourceDependencies: false,
      },
      s3Buckets: {
        enabled: true,
        purgeNonEmptyBuckets: false,
      },
      trigger: {},
    })

    checkSettings(test7, true, false)
  })
})
