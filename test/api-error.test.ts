import { AwsCdkExec } from '../src';

test('cdk list with missing test app', async () => {
  const cdkApp = new AwsCdkExec({ appCommand: '""' });

  let stackList;
  try {
    stackList = await cdkApp.list();
  } catch (err) {
    console.log(err);
    expect(err.stdout).toBe('');
    expect(err.stderr.length).toBeGreaterThan(0);
  }
  expect(stackList).toBeUndefined();


}, 60000);

test('cdk synth yaml with synthesis error', async () => {
  const cdkApp = new AwsCdkExec({ appCommand: '"npx ts-node test/badtestapp.ts"' });

  let synthResult;
  try {
    synthResult = await cdkApp.synth('dbStack');
  } catch (err) {
    console.log(err);
    expect(err.stdout).toBe('');
    expect(err.stderr.length).toBeGreaterThan(0);
  }
  expect(synthResult).toBeUndefined();


}, 60000);


