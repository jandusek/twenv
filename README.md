# twenv

Simple switcher for use cases where user needs to switch between multiple environments with different sets of environment variables.

## Installation

```
npm install
cd twenv
npm link
```

## Usage

Edit `src/cli.js` and define the sets of env variables that should be switched between.

Then simply invoke by `twenv` and choose from a CLI menu the desired environment.

```
twenv
? Choose an environment (Use arrow keys)
❯ Env1
  Env2
```