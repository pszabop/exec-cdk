import * as child from 'child_process';
import * as util from 'util';
import * as CommandExists from 'command-exists';

const exec = util.promisify(child.exec);

export class ExecCdk {

  cdkLocation?: string;
  appCommand?: string; // if not using cdk.json

  constructor(options: {appCommand?: string}) {

    this.appCommand = options.appCommand;

    // find location of cdk
    const exists = CommandExists.sync('cdk');
    if (exists) {
      // either yarn/npm have taken care of it or cdk was installed globally
      this.cdkLocation = undefined;
    } else {
      // the only reasonable location left
      this.cdkLocation = 'node_modules/.bin/';
    }
  }

  public async pwd(): Promise<string> {
    const { stdout } = await exec('pwd');
    return stdout;
  }

  public async list(): Promise<string []> {
    let command = this.cdkLocation? this.cdkLocation + 'cdk' : 'cdk';
    if (this.appCommand) {
      command = command + ` --no-color list --app ${this.appCommand}`;
    } else {
      command = command + ' --no-color list' ;
    }
    const { stdout, stderr } = await exec(command);
    console.log(stderr);
    let stackList = stdout.split('\n');
    stackList.pop(); // last line is always empty
    return stackList;
  }

  public async synth(stackName: string, options?: {
    asJson?: boolean;
  }): Promise<{
      output: string;
      stdout: string;
      stderr: string;
    }> {

    let command = this.cdkLocation? this.cdkLocation + 'cdk' : 'cdk';
    let jsonOption = '';
    if (options && options.asJson) {
      jsonOption = '-j';
    }
    if (this.appCommand) {
      command = command + ` --no-color ${jsonOption} synth --app ${this.appCommand} ${stackName}`;
    } else {
      command = command + ` --no-color ${jsonOption} synth ${stackName}` ;
    }
    const { stdout, stderr } = await exec(command);
    return {
      output: stdout,
      stdout: stdout,
      stderr: stderr,
    };
  }

  public async deploy(stackName: string): Promise<{
    stackArn: string;
    stdout: string;
    stderr: string;
  }> {

    let command = this.cdkLocation? this.cdkLocation + 'cdk' : 'cdk';
    if (this.appCommand) {
      command = command + ` --no-color deploy --require-approval never --app ${this.appCommand} ${stackName}`;
    } else {
      command = command + ` --no-color deploy --require-approval never ${stackName}` ;
    }
    const { stdout, stderr } = await exec(command);
    return {
      stackArn: stdout,
      stdout: stdout,
      stderr: stderr,
    };
  }

  public async destroy(stackName: string): Promise<{
    destroyed: boolean;
    stdout: string;
    stderr: string;
  }> {

    let command = this.cdkLocation? this.cdkLocation + 'cdk' : 'cdk';
    if (this.appCommand) {
      command = command + ` --no-color destroy -f --app ${this.appCommand} ${stackName}`;
    } else {
      command = command + ` --no-color destroy -f ${stackName}` ;
    }
    const { stdout, stderr } = await exec(command);
    console.log('std error: ', stderr);
    const destroyed = stderr.search('destroyed') >= 0;
    return {
      destroyed: destroyed,
      stdout: stdout,
      stderr: stderr,
    };
  }

}
