const { awscdk } = require('projen');

const cdkVersion = '2.25.0';

const project = new awscdk.AwsCdkConstructLibrary({
  author: 'Lorenz Nimmervoll',
  authorAddress: 'admin@nimmervoll.work',
  cdkVersion,
  defaultReleaseBranch: 'main',
  name: 'cdk-self-destruct',
  repositoryUrl: 'https://github.com/NimmLor/cdk-self-destruct.git',
  stability: 'experimental',
  description: 'A construct that allows you to self-destruct your AWS resources in a given stack',

  // deps: [],                /* Runtime dependencies of this module. */
  // description: undefined,  /* The description is just a string that helps people understand the purpose of the package. */
  // devDeps: [],             /* Build dependencies for this module. */
  // packageName: undefined,  /* The "name" in package.json. */
});
project.synth();