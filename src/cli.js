import inquirer from 'inquirer';
import { exec } from 'child_process';
require('dotenv');

// Individual environments and variables
// that should be defined in each
const envs = {
  "Env1": {
    "ACCOUNT_SID": "ACxxx",
    "AUTH_TOKEN": "xxx",
    "PHONE_NUMBER": "+1xxx"
  },
  "Env2": {
    "ACCOUNT_SID": "ACyyy",
    "AUTH_TOKEN": "yyy",
    "PHONE_NUMBER": "+1yyy"
  }
}
const default_env = "Env1";

async function promptForEnv(options) {
  const questions = [];
  if (!options.template) {
    questions.push({
      type: 'list',
      name: 'environment',
      message: 'Choose a Twilio environment',
      choices: Object.keys(envs).sort(),
      default: process.env.TWENV || default_env,
    });
  }

  const answers = await inquirer.prompt(questions);
  return {
    ...options,
    environment: answers.environment
  };
}

function run_cmd(cmd) {
  const exec_options = { shell: '/usr/local/bin/fish' };
  exec(cmd, exec_options, (error, stdout, stderr) => {
    if (stderr) {
      console.log('stderr: ' + stderr);
    }
    if (error !== null) {
      console.log('exec error: ' + error);
    }
  })
}

export async function cli(args) {
  let options = { environment: '' };
  options = await promptForEnv(options);
  run_cmd(`set -xU TWENV ${options.environment}`);
  Object.keys(envs[options.environment]).forEach((env_var) => {
    run_cmd(`set -xU ${env_var} ${envs[options.environment][env_var]}`);
  });
  console.log(`Environment '${options.environment}' set.`);
}