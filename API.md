# API Reference <a name="API Reference" id="api-reference"></a>

## Constructs <a name="Constructs" id="Constructs"></a>

### SelfDestruct <a name="SelfDestruct" id="cdk-self-destruct.SelfDestruct"></a>

#### Initializers <a name="Initializers" id="cdk-self-destruct.SelfDestruct.Initializer"></a>

```typescript
import { SelfDestruct } from 'cdk-self-destruct'

new SelfDestruct(scope: Stack, id: string, props: SelfDestructProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-self-destruct.SelfDestruct.Initializer.parameter.scope">scope</a></code> | <code>aws-cdk-lib.Stack</code> | *No description.* |
| <code><a href="#cdk-self-destruct.SelfDestruct.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk-self-destruct.SelfDestruct.Initializer.parameter.props">props</a></code> | <code><a href="#cdk-self-destruct.SelfDestructProps">SelfDestructProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="cdk-self-destruct.SelfDestruct.Initializer.parameter.scope"></a>

- *Type:* aws-cdk-lib.Stack

---

##### `id`<sup>Required</sup> <a name="id" id="cdk-self-destruct.SelfDestruct.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="cdk-self-destruct.SelfDestruct.Initializer.parameter.props"></a>

- *Type:* <a href="#cdk-self-destruct.SelfDestructProps">SelfDestructProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-self-destruct.SelfDestruct.toString">toString</a></code> | Returns a string representation of this construct. |

---

##### `toString` <a name="toString" id="cdk-self-destruct.SelfDestruct.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-self-destruct.SelfDestruct.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="cdk-self-destruct.SelfDestruct.isConstruct"></a>

```typescript
import { SelfDestruct } from 'cdk-self-destruct'

SelfDestruct.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="cdk-self-destruct.SelfDestruct.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-self-destruct.SelfDestruct.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |

---

##### `node`<sup>Required</sup> <a name="node" id="cdk-self-destruct.SelfDestruct.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---


## Structs <a name="Structs" id="Structs"></a>

### AdditionalCleanupOptions <a name="AdditionalCleanupOptions" id="cdk-self-destruct.AdditionalCleanupOptions"></a>

#### Initializer <a name="Initializer" id="cdk-self-destruct.AdditionalCleanupOptions.Initializer"></a>

```typescript
import { AdditionalCleanupOptions } from 'cdk-self-destruct'

const additionalCleanupOptions: AdditionalCleanupOptions = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-self-destruct.AdditionalCleanupOptions.property.cleanupLambdaLogGroups">cleanupLambdaLogGroups</a></code> | <code>boolean</code> | Whether to destroy all cloudwatch log groups linked to aws lambda functions. |

---

##### `cleanupLambdaLogGroups`<sup>Required</sup> <a name="cleanupLambdaLogGroups" id="cdk-self-destruct.AdditionalCleanupOptions.property.cleanupLambdaLogGroups"></a>

```typescript
public readonly cleanupLambdaLogGroups: boolean;
```

- *Type:* boolean

Whether to destroy all cloudwatch log groups linked to aws lambda functions.

This does not affect log groups specified in the cloudformation template,
only the ones that are automatically created by the lambda service.

It deletes the log groups for all lambda functions in the stack with the format `/aws/lambda/<function-name>`.

---

### ByResourceOptions <a name="ByResourceOptions" id="cdk-self-destruct.ByResourceOptions"></a>

#### Initializer <a name="Initializer" id="cdk-self-destruct.ByResourceOptions.Initializer"></a>

```typescript
import { ByResourceOptions } from 'cdk-self-destruct'

const byResourceOptions: ByResourceOptions = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-self-destruct.ByResourceOptions.property.resourcesToDestroy">resourcesToDestroy</a></code> | <code>string[]</code> | A list of cloudformation resources that should be destroyed. |
| <code><a href="#cdk-self-destruct.ByResourceOptions.property.resourcesToRetain">resourcesToRetain</a></code> | <code>string[]</code> | A list of cloudformation resources that should be retained. |

---

##### `resourcesToDestroy`<sup>Optional</sup> <a name="resourcesToDestroy" id="cdk-self-destruct.ByResourceOptions.property.resourcesToDestroy"></a>

```typescript
public readonly resourcesToDestroy: string[];
```

- *Type:* string[]

A list of cloudformation resources that should be destroyed.

> [https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-template-resource-type-ref.html](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-template-resource-type-ref.html)

---

*Example*

```typescript
"AWS::Cognito::UserPool"
```


##### `resourcesToRetain`<sup>Optional</sup> <a name="resourcesToRetain" id="cdk-self-destruct.ByResourceOptions.property.resourcesToRetain"></a>

```typescript
public readonly resourcesToRetain: string[];
```

- *Type:* string[]

A list of cloudformation resources that should be retained.

> [https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-template-resource-type-ref.html](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-template-resource-type-ref.html)

---

*Example*

```typescript
"AWS::Cognito::UserPool"
```


### CommonOptions <a name="CommonOptions" id="cdk-self-destruct.CommonOptions"></a>

#### Initializer <a name="Initializer" id="cdk-self-destruct.CommonOptions.Initializer"></a>

```typescript
import { CommonOptions } from 'cdk-self-destruct'

const commonOptions: CommonOptions = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-self-destruct.CommonOptions.property.enabled">enabled</a></code> | <code>boolean</code> | Whether the resource's removal policy should be set to DESTROY. |

---

##### `enabled`<sup>Required</sup> <a name="enabled" id="cdk-self-destruct.CommonOptions.property.enabled"></a>

```typescript
public readonly enabled: boolean;
```

- *Type:* boolean

Whether the resource's removal policy should be set to DESTROY.

---

### DefaultBehavior <a name="DefaultBehavior" id="cdk-self-destruct.DefaultBehavior"></a>

#### Initializer <a name="Initializer" id="cdk-self-destruct.DefaultBehavior.Initializer"></a>

```typescript
import { DefaultBehavior } from 'cdk-self-destruct'

const defaultBehavior: DefaultBehavior = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-self-destruct.DefaultBehavior.property.destoryAllResources">destoryAllResources</a></code> | <code>boolean</code> | Whether to set the removal policy of all resources that are not additionally specified to DESTROY. |
| <code><a href="#cdk-self-destruct.DefaultBehavior.property.purgeResourceDependencies">purgeResourceDependencies</a></code> | <code>boolean</code> | Whether to destroy all data that a resource depends on. |
| <code><a href="#cdk-self-destruct.DefaultBehavior.property.performAllAdditionalCleanup">performAllAdditionalCleanup</a></code> | <code>boolean</code> | Whether to destroy additional resources by default that are not automattically removed by cloudformation specified. |

---

##### `destoryAllResources`<sup>Required</sup> <a name="destoryAllResources" id="cdk-self-destruct.DefaultBehavior.property.destoryAllResources"></a>

```typescript
public readonly destoryAllResources: boolean;
```

- *Type:* boolean

Whether to set the removal policy of all resources that are not additionally specified to DESTROY.

---

##### `purgeResourceDependencies`<sup>Required</sup> <a name="purgeResourceDependencies" id="cdk-self-destruct.DefaultBehavior.property.purgeResourceDependencies"></a>

```typescript
public readonly purgeResourceDependencies: boolean;
```

- *Type:* boolean

Whether to destroy all data that a resource depends on.

For example, if a bucket has objects in it, it cannot be deleted.
Running step functions will also prevent the stack from being deleted.

---

##### `performAllAdditionalCleanup`<sup>Optional</sup> <a name="performAllAdditionalCleanup" id="cdk-self-destruct.DefaultBehavior.property.performAllAdditionalCleanup"></a>

```typescript
public readonly performAllAdditionalCleanup: boolean;
```

- *Type:* boolean

Whether to destroy additional resources by default that are not automattically removed by cloudformation specified.

At this time this only includes cloudwatch log groups linked to aws lambda functions.

---

### FunctionUrlConfig <a name="FunctionUrlConfig" id="cdk-self-destruct.FunctionUrlConfig"></a>

#### Initializer <a name="Initializer" id="cdk-self-destruct.FunctionUrlConfig.Initializer"></a>

```typescript
import { FunctionUrlConfig } from 'cdk-self-destruct'

const functionUrlConfig: FunctionUrlConfig = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-self-destruct.FunctionUrlConfig.property.enabled">enabled</a></code> | <code>boolean</code> | Whether to enable the function url for the stack deletion lambda. |
| <code><a href="#cdk-self-destruct.FunctionUrlConfig.property.cloudformationOutput">cloudformationOutput</a></code> | <code><a href="#cdk-self-destruct.FunctionUrlOutputProps">FunctionUrlOutputProps</a></code> | Options to add a cloudformation output to the stack. |
| <code><a href="#cdk-self-destruct.FunctionUrlConfig.property.options">options</a></code> | <code>aws-cdk-lib.aws_lambda.FunctionUrlOptions</code> | Options to configure the function url. |

---

##### `enabled`<sup>Required</sup> <a name="enabled" id="cdk-self-destruct.FunctionUrlConfig.property.enabled"></a>

```typescript
public readonly enabled: boolean;
```

- *Type:* boolean

Whether to enable the function url for the stack deletion lambda.

---

##### `cloudformationOutput`<sup>Optional</sup> <a name="cloudformationOutput" id="cdk-self-destruct.FunctionUrlConfig.property.cloudformationOutput"></a>

```typescript
public readonly cloudformationOutput: FunctionUrlOutputProps;
```

- *Type:* <a href="#cdk-self-destruct.FunctionUrlOutputProps">FunctionUrlOutputProps</a>

Options to add a cloudformation output to the stack.

---

##### `options`<sup>Optional</sup> <a name="options" id="cdk-self-destruct.FunctionUrlConfig.property.options"></a>

```typescript
public readonly options: FunctionUrlOptions;
```

- *Type:* aws-cdk-lib.aws_lambda.FunctionUrlOptions

Options to configure the function url.

Can be used to add authentication.

---

### FunctionUrlOutputProps <a name="FunctionUrlOutputProps" id="cdk-self-destruct.FunctionUrlOutputProps"></a>

#### Initializer <a name="Initializer" id="cdk-self-destruct.FunctionUrlOutputProps.Initializer"></a>

```typescript
import { FunctionUrlOutputProps } from 'cdk-self-destruct'

const functionUrlOutputProps: FunctionUrlOutputProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-self-destruct.FunctionUrlOutputProps.property.condition">condition</a></code> | <code>aws-cdk-lib.CfnCondition</code> | A condition to associate with this output value. |
| <code><a href="#cdk-self-destruct.FunctionUrlOutputProps.property.description">description</a></code> | <code>string</code> | A String type that describes the output value. |
| <code><a href="#cdk-self-destruct.FunctionUrlOutputProps.property.exportName">exportName</a></code> | <code>string</code> | The name used to export the value of this output across stacks. |

---

##### `condition`<sup>Optional</sup> <a name="condition" id="cdk-self-destruct.FunctionUrlOutputProps.property.condition"></a>

```typescript
public readonly condition: CfnCondition;
```

- *Type:* aws-cdk-lib.CfnCondition
- *Default:* No condition is associated with the output.

A condition to associate with this output value.

If the condition evaluates
to `false`, this output value will not be included in the stack.

---

##### `description`<sup>Optional</sup> <a name="description" id="cdk-self-destruct.FunctionUrlOutputProps.property.description"></a>

```typescript
public readonly description: string;
```

- *Type:* string
- *Default:* No description.

A String type that describes the output value.

The description can be a maximum of 4 K in length.

---

##### `exportName`<sup>Optional</sup> <a name="exportName" id="cdk-self-destruct.FunctionUrlOutputProps.property.exportName"></a>

```typescript
public readonly exportName: string;
```

- *Type:* string
- *Default:* the output is not exported

The name used to export the value of this output across stacks.

To import the value from another stack, use `Fn.importValue(exportName)`.

---

### S3Options <a name="S3Options" id="cdk-self-destruct.S3Options"></a>

#### Initializer <a name="Initializer" id="cdk-self-destruct.S3Options.Initializer"></a>

```typescript
import { S3Options } from 'cdk-self-destruct'

const s3Options: S3Options = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-self-destruct.S3Options.property.enabled">enabled</a></code> | <code>boolean</code> | Whether the resource's removal policy should be set to DESTROY. |
| <code><a href="#cdk-self-destruct.S3Options.property.purgeNonEmptyBuckets">purgeNonEmptyBuckets</a></code> | <code>boolean</code> | Purge all objects from the bucket before deleting it. |

---

##### `enabled`<sup>Required</sup> <a name="enabled" id="cdk-self-destruct.S3Options.property.enabled"></a>

```typescript
public readonly enabled: boolean;
```

- *Type:* boolean

Whether the resource's removal policy should be set to DESTROY.

---

##### `purgeNonEmptyBuckets`<sup>Required</sup> <a name="purgeNonEmptyBuckets" id="cdk-self-destruct.S3Options.property.purgeNonEmptyBuckets"></a>

```typescript
public readonly purgeNonEmptyBuckets: boolean;
```

- *Type:* boolean

Purge all objects from the bucket before deleting it.

This is mandatory if the bucket is not empty.

---

### ScheduledTriggerOptions <a name="ScheduledTriggerOptions" id="cdk-self-destruct.ScheduledTriggerOptions"></a>

#### Initializer <a name="Initializer" id="cdk-self-destruct.ScheduledTriggerOptions.Initializer"></a>

```typescript
import { ScheduledTriggerOptions } from 'cdk-self-destruct'

const scheduledTriggerOptions: ScheduledTriggerOptions = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-self-destruct.ScheduledTriggerOptions.property.enabled">enabled</a></code> | <code>boolean</code> | *No description.* |
| <code><a href="#cdk-self-destruct.ScheduledTriggerOptions.property.afterDuration">afterDuration</a></code> | <code>aws-cdk-lib.Duration</code> | The duration after starting the deployment after which the stack should be deleted. |
| <code><a href="#cdk-self-destruct.ScheduledTriggerOptions.property.atTimestamp">atTimestamp</a></code> | <code>number</code> | The timestamp at which the stack should be deleted. |

---

##### `enabled`<sup>Required</sup> <a name="enabled" id="cdk-self-destruct.ScheduledTriggerOptions.property.enabled"></a>

```typescript
public readonly enabled: boolean;
```

- *Type:* boolean

---

##### `afterDuration`<sup>Optional</sup> <a name="afterDuration" id="cdk-self-destruct.ScheduledTriggerOptions.property.afterDuration"></a>

```typescript
public readonly afterDuration: Duration;
```

- *Type:* aws-cdk-lib.Duration

The duration after starting the deployment after which the stack should be deleted.

Cannot be used together with `atTimestamp`.

---

*Example*

```typescript
Duration.days(1)
```


##### `atTimestamp`<sup>Optional</sup> <a name="atTimestamp" id="cdk-self-destruct.ScheduledTriggerOptions.property.atTimestamp"></a>

```typescript
public readonly atTimestamp: number;
```

- *Type:* number

The timestamp at which the stack should be deleted.

Must be a unix timestamp in milliseconds. **Timezone must be UTC**

Cannot be used together with `afterDuration`.

---

*Example*

```typescript
new Date("2023-01-01T00:00:00Z").getTime()
```


### SelfDestructProps <a name="SelfDestructProps" id="cdk-self-destruct.SelfDestructProps"></a>

#### Initializer <a name="Initializer" id="cdk-self-destruct.SelfDestructProps.Initializer"></a>

```typescript
import { SelfDestructProps } from 'cdk-self-destruct'

const selfDestructProps: SelfDestructProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-self-destruct.SelfDestructProps.property.defaultBehavior">defaultBehavior</a></code> | <code><a href="#cdk-self-destruct.DefaultBehavior">DefaultBehavior</a></code> | Options to configure if resources should be destroyed by default. |
| <code><a href="#cdk-self-destruct.SelfDestructProps.property.trigger">trigger</a></code> | <code><a href="#cdk-self-destruct.TriggerOptions">TriggerOptions</a></code> | Options to configure the trigger of the stack destruction. |
| <code><a href="#cdk-self-destruct.SelfDestructProps.property.additionalCleanup">additionalCleanup</a></code> | <code><a href="#cdk-self-destruct.AdditionalCleanupOptions">AdditionalCleanupOptions</a></code> | Additional cleanup for resources not specified in the cloudformation template. |
| <code><a href="#cdk-self-destruct.SelfDestructProps.property.byResource">byResource</a></code> | <code><a href="#cdk-self-destruct.ByResourceOptions">ByResourceOptions</a></code> | Destroy/Retain resources by resource type. |
| <code><a href="#cdk-self-destruct.SelfDestructProps.property.s3Buckets">s3Buckets</a></code> | <code><a href="#cdk-self-destruct.S3Options">S3Options</a></code> | Options to configure the s3 bucket destruction. |
| <code><a href="#cdk-self-destruct.SelfDestructProps.property.stepFunctions">stepFunctions</a></code> | <code><a href="#cdk-self-destruct.StepFunctionsOptions">StepFunctionsOptions</a></code> | Options to configure the step functions destruction. |

---

##### `defaultBehavior`<sup>Required</sup> <a name="defaultBehavior" id="cdk-self-destruct.SelfDestructProps.property.defaultBehavior"></a>

```typescript
public readonly defaultBehavior: DefaultBehavior;
```

- *Type:* <a href="#cdk-self-destruct.DefaultBehavior">DefaultBehavior</a>

Options to configure if resources should be destroyed by default.

---

##### `trigger`<sup>Required</sup> <a name="trigger" id="cdk-self-destruct.SelfDestructProps.property.trigger"></a>

```typescript
public readonly trigger: TriggerOptions;
```

- *Type:* <a href="#cdk-self-destruct.TriggerOptions">TriggerOptions</a>

Options to configure the trigger of the stack destruction.

---

##### `additionalCleanup`<sup>Optional</sup> <a name="additionalCleanup" id="cdk-self-destruct.SelfDestructProps.property.additionalCleanup"></a>

```typescript
public readonly additionalCleanup: AdditionalCleanupOptions;
```

- *Type:* <a href="#cdk-self-destruct.AdditionalCleanupOptions">AdditionalCleanupOptions</a>

Additional cleanup for resources not specified in the cloudformation template.

---

##### `byResource`<sup>Optional</sup> <a name="byResource" id="cdk-self-destruct.SelfDestructProps.property.byResource"></a>

```typescript
public readonly byResource: ByResourceOptions;
```

- *Type:* <a href="#cdk-self-destruct.ByResourceOptions">ByResourceOptions</a>

Destroy/Retain resources by resource type.

---

##### `s3Buckets`<sup>Optional</sup> <a name="s3Buckets" id="cdk-self-destruct.SelfDestructProps.property.s3Buckets"></a>

```typescript
public readonly s3Buckets: S3Options;
```

- *Type:* <a href="#cdk-self-destruct.S3Options">S3Options</a>

Options to configure the s3 bucket destruction.

---

##### `stepFunctions`<sup>Optional</sup> <a name="stepFunctions" id="cdk-self-destruct.SelfDestructProps.property.stepFunctions"></a>

```typescript
public readonly stepFunctions: StepFunctionsOptions;
```

- *Type:* <a href="#cdk-self-destruct.StepFunctionsOptions">StepFunctionsOptions</a>

Options to configure the step functions destruction.

---

### StepFunctionsOptions <a name="StepFunctionsOptions" id="cdk-self-destruct.StepFunctionsOptions"></a>

#### Initializer <a name="Initializer" id="cdk-self-destruct.StepFunctionsOptions.Initializer"></a>

```typescript
import { StepFunctionsOptions } from 'cdk-self-destruct'

const stepFunctionsOptions: StepFunctionsOptions = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-self-destruct.StepFunctionsOptions.property.enabled">enabled</a></code> | <code>boolean</code> | Whether the resource's removal policy should be set to DESTROY. |
| <code><a href="#cdk-self-destruct.StepFunctionsOptions.property.cancelRunningExecutions">cancelRunningExecutions</a></code> | <code>boolean</code> | Cancel all running executions before deleting the state machine. |

---

##### `enabled`<sup>Required</sup> <a name="enabled" id="cdk-self-destruct.StepFunctionsOptions.property.enabled"></a>

```typescript
public readonly enabled: boolean;
```

- *Type:* boolean

Whether the resource's removal policy should be set to DESTROY.

---

##### `cancelRunningExecutions`<sup>Required</sup> <a name="cancelRunningExecutions" id="cdk-self-destruct.StepFunctionsOptions.property.cancelRunningExecutions"></a>

```typescript
public readonly cancelRunningExecutions: boolean;
```

- *Type:* boolean

Cancel all running executions before deleting the state machine.

Otherwise, the cloudformation stack will fail be waiting until all executions are finished.

---

### TriggerOptions <a name="TriggerOptions" id="cdk-self-destruct.TriggerOptions"></a>

#### Initializer <a name="Initializer" id="cdk-self-destruct.TriggerOptions.Initializer"></a>

```typescript
import { TriggerOptions } from 'cdk-self-destruct'

const triggerOptions: TriggerOptions = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-self-destruct.TriggerOptions.property.addFunctionUrl">addFunctionUrl</a></code> | <code><a href="#cdk-self-destruct.FunctionUrlConfig">FunctionUrlConfig</a></code> | Use the lambda's function url to trigger the stack deletion. |
| <code><a href="#cdk-self-destruct.TriggerOptions.property.scheduled">scheduled</a></code> | <code><a href="#cdk-self-destruct.ScheduledTriggerOptions">ScheduledTriggerOptions</a></code> | Create an eventbridge schedule to trigger the stack deletion. |

---

##### `addFunctionUrl`<sup>Optional</sup> <a name="addFunctionUrl" id="cdk-self-destruct.TriggerOptions.property.addFunctionUrl"></a>

```typescript
public readonly addFunctionUrl: FunctionUrlConfig;
```

- *Type:* <a href="#cdk-self-destruct.FunctionUrlConfig">FunctionUrlConfig</a>

Use the lambda's function url to trigger the stack deletion.

This will add an output called `SelfDestructFunctionUrl` to the stack.

---

##### `scheduled`<sup>Optional</sup> <a name="scheduled" id="cdk-self-destruct.TriggerOptions.property.scheduled"></a>

```typescript
public readonly scheduled: ScheduledTriggerOptions;
```

- *Type:* <a href="#cdk-self-destruct.ScheduledTriggerOptions">ScheduledTriggerOptions</a>

Create an eventbridge schedule to trigger the stack deletion.

---

## Classes <a name="Classes" id="Classes"></a>

### SelfDestructAspect <a name="SelfDestructAspect" id="cdk-self-destruct.SelfDestructAspect"></a>

- *Implements:* aws-cdk-lib.IAspect

#### Initializers <a name="Initializers" id="cdk-self-destruct.SelfDestructAspect.Initializer"></a>

```typescript
import { SelfDestructAspect } from 'cdk-self-destruct'

new SelfDestructAspect(scope: Stack, props: SelfDestructProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-self-destruct.SelfDestructAspect.Initializer.parameter.scope">scope</a></code> | <code>aws-cdk-lib.Stack</code> | *No description.* |
| <code><a href="#cdk-self-destruct.SelfDestructAspect.Initializer.parameter.props">props</a></code> | <code><a href="#cdk-self-destruct.SelfDestructProps">SelfDestructProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="cdk-self-destruct.SelfDestructAspect.Initializer.parameter.scope"></a>

- *Type:* aws-cdk-lib.Stack

---

##### `props`<sup>Required</sup> <a name="props" id="cdk-self-destruct.SelfDestructAspect.Initializer.parameter.props"></a>

- *Type:* <a href="#cdk-self-destruct.SelfDestructProps">SelfDestructProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-self-destruct.SelfDestructAspect.visit">visit</a></code> | All aspects can visit an IConstruct. |

---

##### `visit` <a name="visit" id="cdk-self-destruct.SelfDestructAspect.visit"></a>

```typescript
public visit(node: IConstruct): void
```

All aspects can visit an IConstruct.

###### `node`<sup>Required</sup> <a name="node" id="cdk-self-destruct.SelfDestructAspect.visit.parameter.node"></a>

- *Type:* constructs.IConstruct

---


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-self-destruct.SelfDestructAspect.property.buckets">buckets</a></code> | <code>aws-cdk-lib.aws_s3.CfnBucket[]</code> | *No description.* |
| <code><a href="#cdk-self-destruct.SelfDestructAspect.property.lambdaFunctions">lambdaFunctions</a></code> | <code>aws-cdk-lib.aws_lambda.CfnFunction[]</code> | *No description.* |
| <code><a href="#cdk-self-destruct.SelfDestructAspect.property.scope">scope</a></code> | <code>aws-cdk-lib.Stack</code> | *No description.* |
| <code><a href="#cdk-self-destruct.SelfDestructAspect.property.settings">settings</a></code> | <code><a href="#cdk-self-destruct.SelfDestructProps">SelfDestructProps</a></code> | *No description.* |
| <code><a href="#cdk-self-destruct.SelfDestructAspect.property.stateMachines">stateMachines</a></code> | <code>aws-cdk-lib.aws_stepfunctions.CfnStateMachine[]</code> | *No description.* |
| <code><a href="#cdk-self-destruct.SelfDestructAspect.property.destructionHandler">destructionHandler</a></code> | <code>aws-cdk-lib.aws_lambda_nodejs.NodejsFunction</code> | *No description.* |

---

##### `buckets`<sup>Required</sup> <a name="buckets" id="cdk-self-destruct.SelfDestructAspect.property.buckets"></a>

```typescript
public readonly buckets: CfnBucket[];
```

- *Type:* aws-cdk-lib.aws_s3.CfnBucket[]

---

##### `lambdaFunctions`<sup>Required</sup> <a name="lambdaFunctions" id="cdk-self-destruct.SelfDestructAspect.property.lambdaFunctions"></a>

```typescript
public readonly lambdaFunctions: CfnFunction[];
```

- *Type:* aws-cdk-lib.aws_lambda.CfnFunction[]

---

##### `scope`<sup>Required</sup> <a name="scope" id="cdk-self-destruct.SelfDestructAspect.property.scope"></a>

```typescript
public readonly scope: Stack;
```

- *Type:* aws-cdk-lib.Stack

---

##### `settings`<sup>Required</sup> <a name="settings" id="cdk-self-destruct.SelfDestructAspect.property.settings"></a>

```typescript
public readonly settings: SelfDestructProps;
```

- *Type:* <a href="#cdk-self-destruct.SelfDestructProps">SelfDestructProps</a>

---

##### `stateMachines`<sup>Required</sup> <a name="stateMachines" id="cdk-self-destruct.SelfDestructAspect.property.stateMachines"></a>

```typescript
public readonly stateMachines: CfnStateMachine[];
```

- *Type:* aws-cdk-lib.aws_stepfunctions.CfnStateMachine[]

---

##### `destructionHandler`<sup>Required</sup> <a name="destructionHandler" id="cdk-self-destruct.SelfDestructAspect.property.destructionHandler"></a>

```typescript
public readonly destructionHandler: NodejsFunction;
```

- *Type:* aws-cdk-lib.aws_lambda_nodejs.NodejsFunction

---



