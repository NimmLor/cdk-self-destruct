import * as cdk from 'aws-cdk-lib';
import { SelfDestruct } from './';

const app = new cdk.App();
const stack = new cdk.Stack(app, 'MyStack');

new SelfDestruct(stack, 'SelfDestruct', {
  defaultDestoryAllResources: true,
  defaultPurgeResourceDependencies: true,
  trigger: { addFunctionUrl: { enabled: true } },
});
