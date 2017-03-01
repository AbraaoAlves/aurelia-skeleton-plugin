import * as gulp from 'gulp';
import * as changedInPlace from 'gulp-changed-in-place';
import * as project from '../aurelia.json';
import {build} from 'aurelia-cli';

export const processCSS = (p: typeof project) => () => 
  gulp.src(project.cssProcessor.source)
    .pipe(changedInPlace({firstPass:true}))
    .pipe(build.bundle());

export default processCSS(project);
