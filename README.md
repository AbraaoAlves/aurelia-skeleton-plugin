# aurelia-skeleton-plugin

An quick and easy way to start an Aurelia Plugin with Typescript with Aurelia-CLI support and configured sample.


## To build the code, follow these steps.

1. Ensure that [NodeJS](http://nodejs.org/) is installed. This provides the platform on which the build tooling runs.
2. (Optional) Install [Yarn](http://yarnpkg.org/). This provides a secure and fast way to get the same packages.
3. [Optional] Install [Aurelia-cli](https://github.com/aurelia/cli). You can run all tasks through it. 

```shell
$ yarn/npm install
```

3. To build the plugin, you can now run:
``` shell
$ yarn/npm run plugin:build
# or
$ au plugin-build
```

4. You will find the compiled code in the `dist` folder, available in three module formats: AMD, CommonJS and ES6.

6. See `aurelia_project/tasks` folders for other tasks related to generating the docs, linting, tests ...

## Run your sample

```shell
$ au run 
```

[note]: the sample already have config to use your plugin through aurelia.json
