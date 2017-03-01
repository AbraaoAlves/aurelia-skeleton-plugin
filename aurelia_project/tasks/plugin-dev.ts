import * as tools from 'aurelia-tools';

export function update() { 
  tools.updateOwnDependenciesFromLocalRepositories(); 
}

export function build() { 
  tools.buildDevEnv() 
}
