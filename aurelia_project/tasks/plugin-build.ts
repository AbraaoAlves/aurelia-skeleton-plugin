import * as gulp from 'gulp';
import * as changedInPlace from 'gulp-changed-in-place';
import * as runSequence from 'run-sequence';
import * as to5 from 'gulp-babel';
import * as changed from 'gulp-changed';
import * as plumber from 'gulp-plumber';
import * as sourcemaps from 'gulp-sourcemaps';
import * as typescript from 'gulp-typescript';
import * as tsc from 'typescript';
import * as merge from 'merge2';

import {builder} from './build';
import clean from './plugin-clean';

import * as project from '../aurelia.plugin.json';

const createProject = (options?: typescript.Settings ) => 
  typescript.createProject(project.transpiler.config,
    <any>{'typescript':tsc, ...options});
 
const tsProjectES6 = createProject();
const tsProjectAMD = createProject({ target: 'es5', module: 'amd' });
const tsProjectCJS = createProject({ target: 'es5', module: 'commonjs' });
const tsProjectSystem = createProject({ target: 'es5', module: 'system' });

const buildFromTs = (tsProject, outputPath) => {
  let src = project.transpiler.dtsSource.concat(project.transpiler.source);
    
  let tsResult = gulp.src(src)
    .pipe(plumber())
    .pipe(sourcemaps.init({loadMaps: true}))    
    .pipe(changed(outputPath, {extension: '.js'}))
    .pipe(typescript(tsProject))  
    
  return merge([
    tsResult.js
      .pipe(sourcemaps.write({includeContent: true}))
      .pipe(gulp.dest(outputPath)), 
    tsResult.dts
      .pipe(gulp.dest(outputPath))       
  ]);
}

const buildHtml = (out) => () =>
  gulp.src(project.markupProcessor.source)
    .pipe(gulp.dest(project.platform.output + '/' + out));

const buildStyle = (out) => () =>
  gulp.src(project.cssProcessor.source)
    .pipe(gulp.dest(project.platform.output + '/' + out));

const buildResource = (out) =>
  gulp.parallel(buildHtml(out), buildStyle(out))

const buildTs = gulp.series(buildResource('ts'), () => 
  gulp.src(project.transpiler.source)
    .pipe(gulp.dest(project.platform.output + '/ts'))
);

const buildEs6 = gulp.series(buildResource('es6'), () => 
  buildFromTs(tsProjectES6, project.platform.output + '/es6')
);

const buildCommonjs = gulp.series(buildResource('commonjs'), () =>
  buildFromTs(tsProjectCJS, project.platform.output + '/commonjs')
);

const buildAmd = gulp.series(buildResource('amd'), () =>
  buildFromTs(tsProjectAMD, project.platform.output + '/amd')
);

const buildSystem = gulp.series(buildResource('system'), () =>
  buildFromTs(tsProjectSystem, project.platform.output + '/system')
);

const buildBundle = builder(project);

export default gulp.series(
  clean,
  gulp.parallel(
    buildTs, buildEs6, buildCommonjs, buildAmd, buildSystem, buildBundle
  )
);
