import * as Dynamodb from '@aws-cdk/aws-dynamodb';
import * as Cdk from '@aws-cdk/core';
// @ts-ignore
import * as util from 'util'; // eslint-disable-line

// shared constants amongst all the stacks.
const dbStackName = 			'dbStack';
const dbStackName2 = 			'dbStack2';
const tablePrimaryKey = 'itemId';
const tableExportName = 'dynamoTableArn';

export class DbStack extends Cdk.Stack {
  constructor(scope: Cdk.Construct, id: string, props: Cdk.StackProps = {}) {
    super(scope, id, props);

    // define database resources here...

    // @see https://github.com/aws-samples/aws-cdk-examples/blob/master/typescript/api-cors-lambda-crud-dynamodb/index.ts
    const dynamoTable = new Dynamodb.Table(this, 'dynamoTable', {
      partitionKey: {
        name: tablePrimaryKey,
        type: Dynamodb.AttributeType.STRING,
      },
      tableName: 'items',

      // The default removal policy is RETAIN, which means that cdk destroy will not attempt to delete
      // the new table, and it will remain in your account until manually deleted. By setting the policy to
      // DESTROY, cdk destroy will delete the table (even if it has data in it)
      removalPolicy: Cdk.RemovalPolicy.DESTROY, // NOT recommended for production code
    });

    new Cdk.CfnOutput(this, tableExportName, { value: dynamoTable.tableArn, exportName: tableExportName });
  }

}

export class DbStack2 extends Cdk.Stack {
  constructor(scope: Cdk.Construct, id: string, props: Cdk.StackProps = {}) {
    super(scope, id, props);

    // define database resources here...

    // @see https://github.com/aws-samples/aws-cdk-examples/blob/master/typescript/api-cors-lambda-crud-dynamodb/index.ts
    const dynamoTable = new Dynamodb.Table(this, 'dynamoTable', {
      partitionKey: {
        name: tablePrimaryKey,
        type: Dynamodb.AttributeType.STRING,
      },
      tableName: 'items',

      // The default removal policy is RETAIN, which means that cdk destroy will not attempt to delete
      // the new table, and it will remain in your account until manually deleted. By setting the policy to
      // DESTROY, cdk destroy will delete the table (even if it has data in it)
      removalPolicy: Cdk.RemovalPolicy.DESTROY, // NOT recommended for production code
    });

    new Cdk.CfnOutput(this, tableExportName, { value: dynamoTable.tableArn, exportName: tableExportName });
  }

}
// for development, use account/region from cdk cli
//
/*
const devEnv = {
  account: process.env.CDK_DEFAULT_ACCOUNT,
  region: process.env.CDK_DEFAULT_REGION,
};
*/

const app = new Cdk.App();

new DbStack(app, dbStackName);
new DbStack2(app, dbStackName2);
app.synth();
