const { awscdk } = require("projen");

const cdkVersion = "2.51.0";

const project = new awscdk.AwsCdkConstructLibrary({
  author: "Lorenz Nimmervoll",
  authorAddress: "admin@nimmervoll.work",
  cdkVersion,
  defaultReleaseBranch: "main",
  name: "cdk-self-destruct",
  repositoryUrl: "https://github.com/NimmLor/cdk-self-destruct.git",
  stability: "experimental",
  description:
    "A construct that allows you to self-destruct your AWS resources in a given stack",
  keywords: ["cdk", "awscdk", "aws-cdk"],
  majorVersion: 1,

  deps: [],
  devDeps: ["aws-sdk", "esbuild"],
  packageName: "cdk-self-destruct",
  jest: true,
  jestOptions: {
    extraCliOptions: [
      '--testMatch "**/(test|src)/**/*(*.)@(spec|test).ts?(x)"',
    ],
  },
  gitignore: ["cdk.out"],
  eslintOptions: {
    prettier: true,
  },
  prettier: true,
});
project.synth();
