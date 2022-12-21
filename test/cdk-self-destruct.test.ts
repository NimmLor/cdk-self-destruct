import { App, Stack } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { SelfDestruct } from '../src/index';

const mockApp = new App();
const blankStack = new Stack(mockApp);
// const demoStack = new Stack(mockApp);


// new aws_stepfunctions.StateMachine(demoStack, 'TestStateMachine', {
//   definition: new aws_stepfunctions.Pass(demoStack, 'TestPass'),
// });

// new aws_cognito.UserPool(demoStack, 'TestUserPool', {});
// new aws_dynamodb.Table(demoStack, 'TestTable', {
//   partitionKey: { name: 'id', type: aws_dynamodb.AttributeType.STRING },
// });

// new aws_s3.Bucket(demoStack, 'TestBucket', {});
// new aws_s3.Bucket(demoStack, 'HelloBucket', {});

new SelfDestruct(blankStack, 'SelfDestruct', {
  defaultDestoryAllResources: true,
  defaultPurgeResourceDependencies: true,
  trigger: {
    addFunctionUrl: {
      enabled: true,
    },
  },
} );

const template = Template.fromStack(blankStack);

test('Stack destruction lambda function is be configured with properties and execution roles', () => {
  template.hasResourceProperties('AWS::Lambda::Function', {
    Runtime: 'nodejs16.x',
  });

  template.hasResourceProperties('AWS::IAM::Role', {
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
  });
});
