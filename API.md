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

### CommonOptions <a name="CommonOptions" id="cdk-self-destruct.CommonOptions"></a>

#### Initializer <a name="Initializer" id="cdk-self-destruct.CommonOptions.Initializer"></a>

```typescript
import { CommonOptions } from 'cdk-self-destruct'

const commonOptions: CommonOptions = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-self-destruct.CommonOptions.property.enabled">enabled</a></code> | <code>boolean</code> | Whether the resource's removal policy should be set to DESTROY.q. |

---

##### `enabled`<sup>Required</sup> <a name="enabled" id="cdk-self-destruct.CommonOptions.property.enabled"></a>

```typescript
public readonly enabled: boolean;
```

- *Type:* boolean

Whether the resource's removal policy should be set to DESTROY.q.

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
| <code><a href="#cdk-self-destruct.S3Options.property.enabled">enabled</a></code> | <code>boolean</code> | Whether the resource's removal policy should be set to DESTROY.q. |
| <code><a href="#cdk-self-destruct.S3Options.property.purgeNonEmptyBuckets">purgeNonEmptyBuckets</a></code> | <code>boolean</code> | Purge all objects from the bucket before deleting it. |

---

##### `enabled`<sup>Required</sup> <a name="enabled" id="cdk-self-destruct.S3Options.property.enabled"></a>

```typescript
public readonly enabled: boolean;
```

- *Type:* boolean

Whether the resource's removal policy should be set to DESTROY.q.

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
| <code><a href="#cdk-self-destruct.ScheduledTriggerOptions.property.atTimestamp">atTimestamp</a></code> | <code>number</code> | The timestamp at which the stack should be deleted. Must be a unix timestamp in milliseconds. |

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

##### `atTimestamp`<sup>Optional</sup> <a name="atTimestamp" id="cdk-self-destruct.ScheduledTriggerOptions.property.atTimestamp"></a>

```typescript
public readonly atTimestamp: number;
```

- *Type:* number

The timestamp at which the stack should be deleted. Must be a unix timestamp in milliseconds.

Cannot be used together with `afterDuration`.

---

### SelfDestructProps <a name="SelfDestructProps" id="cdk-self-destruct.SelfDestructProps"></a>

#### Initializer <a name="Initializer" id="cdk-self-destruct.SelfDestructProps.Initializer"></a>

```typescript
import { SelfDestructProps } from 'cdk-self-destruct'

const selfDestructProps: SelfDestructProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-self-destruct.SelfDestructProps.property.defaultBehavior">defaultBehavior</a></code> | <code><a href="#cdk-self-destruct.DefaultBehavior">DefaultBehavior</a></code> | *No description.* |
| <code><a href="#cdk-self-destruct.SelfDestructProps.property.trigger">trigger</a></code> | <code><a href="#cdk-self-destruct.TriggerOptions">TriggerOptions</a></code> | *No description.* |
| <code><a href="#cdk-self-destruct.SelfDestructProps.property.cognitoUserpools">cognitoUserpools</a></code> | <code><a href="#cdk-self-destruct.CommonOptions">CommonOptions</a></code> | *No description.* |
| <code><a href="#cdk-self-destruct.SelfDestructProps.property.customResourceProviders">customResourceProviders</a></code> | <code><a href="#cdk-self-destruct.CommonOptions">CommonOptions</a></code> | *No description.* |
| <code><a href="#cdk-self-destruct.SelfDestructProps.property.dynamodb">dynamodb</a></code> | <code><a href="#cdk-self-destruct.CommonOptions">CommonOptions</a></code> | *No description.* |
| <code><a href="#cdk-self-destruct.SelfDestructProps.property.s3Buckets">s3Buckets</a></code> | <code><a href="#cdk-self-destruct.S3Options">S3Options</a></code> | *No description.* |
| <code><a href="#cdk-self-destruct.SelfDestructProps.property.stepFunctions">stepFunctions</a></code> | <code><a href="#cdk-self-destruct.StepFunctionsOptions">StepFunctionsOptions</a></code> | *No description.* |

---

##### `defaultBehavior`<sup>Required</sup> <a name="defaultBehavior" id="cdk-self-destruct.SelfDestructProps.property.defaultBehavior"></a>

```typescript
public readonly defaultBehavior: DefaultBehavior;
```

- *Type:* <a href="#cdk-self-destruct.DefaultBehavior">DefaultBehavior</a>

---

##### `trigger`<sup>Required</sup> <a name="trigger" id="cdk-self-destruct.SelfDestructProps.property.trigger"></a>

```typescript
public readonly trigger: TriggerOptions;
```

- *Type:* <a href="#cdk-self-destruct.TriggerOptions">TriggerOptions</a>

---

##### `cognitoUserpools`<sup>Optional</sup> <a name="cognitoUserpools" id="cdk-self-destruct.SelfDestructProps.property.cognitoUserpools"></a>

```typescript
public readonly cognitoUserpools: CommonOptions;
```

- *Type:* <a href="#cdk-self-destruct.CommonOptions">CommonOptions</a>

---

##### `customResourceProviders`<sup>Optional</sup> <a name="customResourceProviders" id="cdk-self-destruct.SelfDestructProps.property.customResourceProviders"></a>

```typescript
public readonly customResourceProviders: CommonOptions;
```

- *Type:* <a href="#cdk-self-destruct.CommonOptions">CommonOptions</a>

---

##### `dynamodb`<sup>Optional</sup> <a name="dynamodb" id="cdk-self-destruct.SelfDestructProps.property.dynamodb"></a>

```typescript
public readonly dynamodb: CommonOptions;
```

- *Type:* <a href="#cdk-self-destruct.CommonOptions">CommonOptions</a>

---

##### `s3Buckets`<sup>Optional</sup> <a name="s3Buckets" id="cdk-self-destruct.SelfDestructProps.property.s3Buckets"></a>

```typescript
public readonly s3Buckets: S3Options;
```

- *Type:* <a href="#cdk-self-destruct.S3Options">S3Options</a>

---

##### `stepFunctions`<sup>Optional</sup> <a name="stepFunctions" id="cdk-self-destruct.SelfDestructProps.property.stepFunctions"></a>

```typescript
public readonly stepFunctions: StepFunctionsOptions;
```

- *Type:* <a href="#cdk-self-destruct.StepFunctionsOptions">StepFunctionsOptions</a>

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
| <code><a href="#cdk-self-destruct.StepFunctionsOptions.property.enabled">enabled</a></code> | <code>boolean</code> | Whether the resource's removal policy should be set to DESTROY.q. |
| <code><a href="#cdk-self-destruct.StepFunctionsOptions.property.cancelRunningExecutions">cancelRunningExecutions</a></code> | <code>boolean</code> | Cancel all running executions before deleting the state machine. |

---

##### `enabled`<sup>Required</sup> <a name="enabled" id="cdk-self-destruct.StepFunctionsOptions.property.enabled"></a>

```typescript
public readonly enabled: boolean;
```

- *Type:* boolean

Whether the resource's removal policy should be set to DESTROY.q.

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
| <code><a href="#cdk-self-destruct.SelfDestructAspect.property.customResources">customResources</a></code> | <code>aws-cdk-lib.CfnCustomResource[]</code> | *No description.* |
| <code><a href="#cdk-self-destruct.SelfDestructAspect.property.dynamodbTables">dynamodbTables</a></code> | <code>aws-cdk-lib.aws_dynamodb.CfnTable[]</code> | *No description.* |
| <code><a href="#cdk-self-destruct.SelfDestructAspect.property.scope">scope</a></code> | <code>aws-cdk-lib.Stack</code> | *No description.* |
| <code><a href="#cdk-self-destruct.SelfDestructAspect.property.settings">settings</a></code> | <code><a href="#cdk-self-destruct.SelfDestructProps">SelfDestructProps</a></code> | *No description.* |
| <code><a href="#cdk-self-destruct.SelfDestructAspect.property.stateMachines">stateMachines</a></code> | <code>aws-cdk-lib.aws_stepfunctions.CfnStateMachine[]</code> | *No description.* |
| <code><a href="#cdk-self-destruct.SelfDestructAspect.property.userpools">userpools</a></code> | <code>aws-cdk-lib.aws_cognito.CfnUserPool[]</code> | *No description.* |
| <code><a href="#cdk-self-destruct.SelfDestructAspect.property.destructionHandler">destructionHandler</a></code> | <code>aws-cdk-lib.aws_lambda_nodejs.NodejsFunction</code> | *No description.* |
| <code><a href="#cdk-self-destruct.SelfDestructAspect.property.index">index</a></code> | <code>number</code> | *No description.* |

---

##### `buckets`<sup>Required</sup> <a name="buckets" id="cdk-self-destruct.SelfDestructAspect.property.buckets"></a>

```typescript
public readonly buckets: CfnBucket[];
```

- *Type:* aws-cdk-lib.aws_s3.CfnBucket[]

---

##### `customResources`<sup>Required</sup> <a name="customResources" id="cdk-self-destruct.SelfDestructAspect.property.customResources"></a>

```typescript
public readonly customResources: CfnCustomResource[];
```

- *Type:* aws-cdk-lib.CfnCustomResource[]

---

##### `dynamodbTables`<sup>Required</sup> <a name="dynamodbTables" id="cdk-self-destruct.SelfDestructAspect.property.dynamodbTables"></a>

```typescript
public readonly dynamodbTables: CfnTable[];
```

- *Type:* aws-cdk-lib.aws_dynamodb.CfnTable[]

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

##### `userpools`<sup>Required</sup> <a name="userpools" id="cdk-self-destruct.SelfDestructAspect.property.userpools"></a>

```typescript
public readonly userpools: CfnUserPool[];
```

- *Type:* aws-cdk-lib.aws_cognito.CfnUserPool[]

---

##### `destructionHandler`<sup>Required</sup> <a name="destructionHandler" id="cdk-self-destruct.SelfDestructAspect.property.destructionHandler"></a>

```typescript
public readonly destructionHandler: NodejsFunction;
```

- *Type:* aws-cdk-lib.aws_lambda_nodejs.NodejsFunction

---

##### `index`<sup>Required</sup> <a name="index" id="cdk-self-destruct.SelfDestructAspect.property.index"></a>

```typescript
public readonly index: number;
```

- *Type:* number

---



