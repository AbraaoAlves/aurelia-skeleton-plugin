import * as gulp from 'gulp';
import {transpile} from './transpile';
import {processMarkup} from './process-markup';
import {processCSS} from './process-css';
import {build} from 'aurelia-cli';
import * as project from '../aurelia.json';

const readProjectConfiguration = (p: typeof project) => () => build.src(p)
const writeBundles = () =>  build.dest();

export const builder = (p: typeof project) => 
  gulp.series(
    readProjectConfiguration(p),
    gulp.parallel(
      transpile(p),
      processMarkup(p),
      processCSS(p)
    ),
    writeBundles
  )


export default builder(project);


