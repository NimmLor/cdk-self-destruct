const {
  PrettierConfig,
  EslintConfig,
  VscodeConfig,
  GitConfig,
} = require('@atws/projen-config')
const { awscdk, JsonFile } = require('projen')

const cdkVersion = '2.51.0'

const project = new awscdk.AwsCdkConstructLibrary({
  author: 'Lorenz Nimmervoll',
  authorAddress: 'admin@nimmervoll.work',
  cdkVersion,
  defaultReleaseBranch: 'main',
  name: 'cdk-self-destruct',
  repositoryUrl: 'https://github.com/NimmLor/cdk-self-destruct.git',
  stability: 'experimental',
  description:
    'A construct that allows you to self-destruct your AWS resources in a given stack',
  keywords: ['cdk', 'awscdk', 'aws-cdk'],
  majorVersion: 1,

  deps: [],
  devDeps: ['aws-sdk', 'esbuild', '@atws/projen-config', '@atws/tsconfig'],
  packageName: 'cdk-self-destruct',
  jest: true,
  jestOptions: {
    extraCliOptions: [
      '--testMatch "**/(test|src)/**/*(*.)@(spec|test).ts?(x)"',
    ],
  },
  gitignore: ['cdk.out'],
  eslintOptions: {
    prettier: true,
  },
  prettier: true,
  workflowNodeVersion: '16.x',
})

new PrettierConfig(project)

new EslintConfig(project, {
  cdkFileRegex: 'src/**/*.ts',
})

new VscodeConfig(project, {
  vscodeExtensions: {
    addCdkExtensions: true,
    addCoreExtensions: true,
    addNodeExtensions: true,
    additionalExtensions: ['MarkMcCulloh.vscode-projen'],
  },
})

new GitConfig(project)

project.synth()
