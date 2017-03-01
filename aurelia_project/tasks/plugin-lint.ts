import * as gulp from 'gulp';
import {transpiler} from '../aurelia.plugin.json';
import tslint from 'gulp-tslint';
 
const lint = () =>
  gulp.src(transpiler.source)
      .pipe(tslint({tslint: require('tslint'), formatter:'prose'}))
      .pipe(tslint.report());

export default gulp.series(lint);

