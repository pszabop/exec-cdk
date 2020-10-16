import { ExecCdk } from '../src';

test('cdk list', async () => {
  const cdkApp = new ExecCdk({ appCommand: '"npx ts-node test/testapp.ts"' });

  const stackList = await cdkApp.list();
  expect(stackList.length).toBe(2);
  expect(stackList[0]).toBe('dbStack'); // XXX unsure about order
  expect(stackList[1]).toBe('dbStack2');


}, 60000);

test('cdk synth yaml', async () => {
  const cdkApp = new ExecCdk({ appCommand: '"npx ts-node test/testapp.ts"' });

  const synthResult = await cdkApp.synth('dbStack');
  expect(synthResult.output.split(':')[0]).toBe('Resources'); // XXX test with a YAML parser


}, 60000);

test('cdk synth json', async () => {
  const cdkApp = new ExecCdk({ appCommand: '"npx ts-node test/testapp.ts"' });

  const synthResult = await cdkApp.synth('dbStack', { asJson: true });

  const synthObj = JSON.parse(synthResult.output);
  expect(synthObj).toHaveProperty('Resources');


}, 60000);


test('cdk deploy and destroy a single stack', async () => {
  const cdkApp = new ExecCdk({ appCommand: '"npx ts-node test/testapp.ts"' });

  const deployResult = await cdkApp.deploy('dbStack');
  console.log(deployResult);
  expect(deployResult.stackArn.search('arn:aws:cloudformation')).toBeGreaterThanOrEqual(0); // XXX put a valid ARN check in

  //
  // make sure deploy is idempotent
  //
  const deployResultSecond = await cdkApp.deploy('dbStack');
  console.log(deployResultSecond);
  expect(deployResultSecond.stackArn.search('arn:aws:cloudformation')).toBeGreaterThanOrEqual(0); // XXX put a valid ARN check in


  const destroyResult = await cdkApp.destroy('dbStack');
  console.log(destroyResult);
  expect(destroyResult.destroyed).toBe(true);

  //
  // make sure destroy is idempotent
  //
  const destroyResultSecondTime = await cdkApp.destroy('dbStack');
  console.log(destroyResultSecondTime);
  expect(destroyResultSecondTime.destroyed).toBe(true);


}, 3000000 /* deploy and destroy can take a very very long time */ );

