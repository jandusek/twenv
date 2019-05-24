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

Users of [bobthefish](https://github.com/oh-my-fish/theme-bobthefish) can add the following to `~/.config/fish/functions/fish_prompt.fish` in order to show current environment as part of the shell prompt:

```
function __bobthefish_prompt_twenv -S -d 'Display current twenv environment'
    [ "$theme_display_desk" = 'no' -o -z "$TWENV" ]
    and return

    __bobthefish_start_segment $color_virtualfish
    echo -ns (basename  -a -s ".fish" "$TWENV") ' '
    set_color normal
end

# ...

    # Virtual environments
    __bobthefish_prompt_twenv   # <<< add
    __bobthefish_prompt_desk
    __bobthefish_prompt_rubies

```


### ToDo

* Current version expects usage of [fish shell](https://fishshell.com) (see `run_cmd()`)
* Before switching, the env variables from the previous environment should probably be undefined, this doesn't happen right now