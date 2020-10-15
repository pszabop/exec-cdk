import { ExecCdk } from '../src';

test('cdk list', async () => {
  const cdkApp = new ExecCdk({ appCommand: '"npx ts-node test/testapp.ts"' });

  const stackList = await cdkApp.list();
  expect(stackList.length).toBe(2);
  expect(stackList[0]).toBe('dbStack'); // XXX unsure about order
  expect(stackList[1]).toBe('dbStack2');


}, 20000);

test('cdk synth yaml', async () => {
  const cdkApp = new ExecCdk({ appCommand: '"npx ts-node test/testapp.ts"' });

  const synthResult = await cdkApp.synth('dbStack');
  expect(synthResult.split(':')[0]).toBe('Resources'); // XXX test with a YAML parser


}, 20000);

test('cdk synth json', async () => {
  const cdkApp = new ExecCdk({ appCommand: '"npx ts-node test/testapp.ts"' });

  const synthResult = await cdkApp.synth('dbStack', { asJson: true });

  const synthObj = JSON.parse(synthResult);
  expect(synthObj).toHaveProperty('Resources');


}, 20000);


test('cdk deploy and destroy a single stack', async () => {
  const cdkApp = new ExecCdk({ appCommand: '"npx ts-node test/testapp.ts"' });

  const deployResult = await cdkApp.deploy('dbStack');
  console.log(deployResult);

  const destroyResult = await cdkApp.destroy('dbStack');
  console.log(destroyResult);


}, 3000000 /* deploy and destroy can take a very very long time */ );

