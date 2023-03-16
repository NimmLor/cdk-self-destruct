import {
  EslintConfig,
  GitConfig,
  PrettierConfig,
  VscodeConfig,
} from '@atws/projen-config'
import { awscdk } from 'projen'

const cdkVersion = '2.51.0'

const project = new awscdk.AwsCdkConstructLibrary({
  author: 'Lorenz Nimmervoll',
  authorAddress: 'admin@nimmervoll.work',
  cdkVersion,
  defaultReleaseBranch: 'main',
  deps: [],
  description:
    'A construct that allows you to self-destruct your AWS resources in a given stack',
  devDeps: [
    'aws-sdk@2.1083.0',
    'esbuild',
    '@atws/projen-config',
    '@atws/tsconfig',
  ],
  gitignore: ['cdk.out', 'tsconfig.json'],
  jest: true,
  jestOptions: {
    extraCliOptions: [
      '--testMatch "**/(test|src)/**/*(*.)@(spec|test).ts?(x)"',
    ],
  },
  keywords: ['cdk', 'awscdk', 'aws-cdk'],

  majorVersion: 1,
  name: 'cdk-self-destruct',
  packageName: 'cdk-self-destruct',
  projenrcTs: true,
  repositoryUrl: 'https://github.com/NimmLor/cdk-self-destruct.git',
  stability: 'experimental',
  workflowNodeVersion: '16.x',
})
new PrettierConfig(project)

new EslintConfig(project, {
  projenFileRegex: '{src,test}/*.ts',
})

new VscodeConfig(project, {
  vscodeExtensions: {
    addCdkExtensions: true,
    addCoreExtensions: true,
    addNodeExtensions: true,
  },
})

new GitConfig(project)

project.synth()
