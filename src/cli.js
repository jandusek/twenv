import inquirer from 'inquirer';
import { exec } from 'child_process';
require('dotenv');

// Individual environments and variables
// that should be defined in each are read
// from config.json
let envs = require('./config.json');
const default_env = "Env1";

async function promptForEnv(options) {
  const questions = [];
  if (!options.template) {
    questions.push({
      type: 'list',
      name: 'environment',
      message: 'Choose an environment',
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

function run_cmd(cmd, resolve) {
  const exec_options = { shell: '/usr/local/bin/fish' };
  exec(cmd, exec_options, (error, stdout, stderr) => {
    if (stderr) {
      console.log('stderr: ' + stderr);
      resolve();
    }
    if (error !== null) {
      console.log('exec error: ' + error);
      resolve();
    }
    resolve();
  })
}

export async function cli(args) {
  let options = { environment: '' };
  options = await promptForEnv(options);
  // unset the previous env variables
  const old_env = process.env.TWENV;

  let unsets = Object.keys(envs[old_env]).map((env_var) => {
    return new Promise((resolve, reject) => {
      //console.log(`Unsetting: ${env_var}`)
      run_cmd(`set -eU ${env_var}`, resolve);
    });
  })

  Promise.all(unsets).then(() => {
    // set the new env variables
    run_cmd(`set -xU TWENV ${options.environment}`, () => { });
    let sets = Object.keys(envs[options.environment]).map((env_var) => {
      return new Promise((resolve, reject) => {
        //console.log(`Setting: ${env_var}`)
        run_cmd(`set -xU ${env_var} ${envs[options.environment][env_var]}`, resolve);
      });
    });
    Promise.all(sets).then(() => {
      console.log(`Environment '${options.environment}' set.`);
    });
  });

}