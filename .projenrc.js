const { TypeScriptAppProject } = require('projen');

const project = new TypeScriptAppProject({
  name: "exec-cdk",
  authorName: "Paul Szabo",
  authorAddress: "paulszabopnw@gmail.com",
  repository: "https://github.com/pszabop/exec-cdk",
  keywords: [
    "cdk",
    "vpc",
  ],
  dependencies: {
    "command-exists": "^1.2.9",
    "@types/command-exists": "^1.2.0",
  },
  devDependencies: {
    "aws-cdk": "^1.63.0",
    "@aws-cdk/core": "^1.63.0",
    "@aws-cdk/aws-dynamodb": "^1.63.0",
  },
  gitignore: [
    'cdk.out/',
  ],
});

project.synth();
