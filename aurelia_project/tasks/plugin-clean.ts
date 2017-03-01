import * as gulp from 'gulp';
import * as project from '../aurelia.plugin.json';
import * as del from 'del';
import * as vinylPaths from 'vinyl-paths';

const clean = () =>
  gulp.src([project.platform.output]).pipe(vinylPaths(del));

export default gulp.series(clean);
