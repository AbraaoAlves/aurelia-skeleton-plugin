import * as gulp from 'gulp';
import * as changedInPlace from 'gulp-changed-in-place';
import * as project from '../aurelia.json';
import {build} from 'aurelia-cli';

export const processMarkup = (p: typeof project) => () => 
  gulp.src(p.markupProcessor.source)
    .pipe(changedInPlace({firstPass:true}))
    .pipe(build.bundle());

export default processMarkup(project);
