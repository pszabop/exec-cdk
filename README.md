# exec-cdk
Provides a TypeScript API to the CDK CLI, allowing you to programmatically synthesize, deploy, and destory CDK apps without
having to worry about the idiosyncrasies of the CDK CLI.

## Usage
### Basic usage
This for illustration purposes, typically you should not hard code a stack name

        import { ExecCdk } from 'aws-cdk-exec';

        // illustration purposes only
        const stackName = 'myStack');
        const cdkApp = new AwsCdkExec({ appCommand: '"npx ts-node test/testapp.ts"'});
        await cdkApp.deploy(stackName);
        
        // 
        // ...  do something to your stack, such as test it.  You do integration test, right?
        // ...
        await cdkApp.destroy();


### Data Driven Usage
This is what you should really do, everything data driven.  Perhaps deploy and destroying all in the correct
order should be its own API call in the future?  `cdkApp.deployAll()` and `cdkApp.destroyAll`.

Note that order is preserved as the CDK itself preserves it with `list`.  Most apps should be destroyed
in the reverse order of deployment, so that dependencies don't block destruction.

        // deploy all stacks in an app
        const cdkApp = new AwsCdkExec(/* your environment should have set up cdk.json.  see `projen` project for example */);
        const stackList = await cdkApp.list();
        const stackTemplatesDeployIds = Promise.all(stacKList.map(async el => {
          return await cdkApp.deploy(el, { asJson: true });
        }));

        // 
        // ...  do something to your stack, such as test it.  You do integration test, right?
        // ...
        
        const stackTemplatesDeployIds = Promise.all(stacKList.reverse.map(async el => {
          return await cdkApp.destroy(el, { asJson: true });
        }));



# Testing and Development
## Development
### Docker
A convenient `docker-compose.yml` has been provided, for interactive testing/development:

    `docker-compose run code /bin/bash`

### Project Environment
[projen]() is used to manage this packages files.  Instead of modifying e.g. `package.jason`, you instead edit 
`.projen.js` and then run:

        `yarn run projen`


## Testing
All tests are Jest unit tests, and run in the standard `projen` manner:

        `yarn run test`
        
# Release
See `projen` project for details... oh wait they don't have that documented yet.

For now

        `yarn run build`
        npm publish
