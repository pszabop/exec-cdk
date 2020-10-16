const { Eslint, TypeScriptAppProject } = require('projen');

const project = new TypeScriptAppProject({
  name: "aws-cdk-exec",
  authorName: "Paul Szabo",
  authorAddress: "paulszabopnw@gmail.com",
  repository: "https://github.com/pszabop/exec-cdk",
  entrypoint: "lib/index.js",     // XXX this shoulld be the default but it is not
  keywords: [
    "cdk",
    "exec",
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
  npmignore: [
    'cdk.out/',
  ],
});

// had to reverse engineer this from a diff.
new Eslint(project, { dirs: ['src', 'test'], tsconfigPath: './tsconfig.jest.json'}).addIgnorePattern('test/badtestapp.ts');


project.synth();
