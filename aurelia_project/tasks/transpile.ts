import * as gulp from 'gulp';
import * as changedInPlace from 'gulp-changed-in-place';
import * as plumber from 'gulp-plumber';
import * as sourcemaps from 'gulp-sourcemaps';
import * as notify from 'gulp-notify';
import * as rename from 'gulp-rename';
import * as ts from 'gulp-typescript';
import * as project from '../aurelia.json';
import {CLIOptions, build} from 'aurelia-cli';
import * as eventStream from 'event-stream';

const configureEnvironment = (p: typeof project) => () =>  {
  let env = CLIOptions.getEnvironment();

  return gulp.src(`aurelia_project/environments/${env}.ts`)
    .pipe(changedInPlace({firstPass:true}))
    .pipe(rename('environment.ts'))
    .pipe(gulp.dest(project.paths.root));
}

var typescriptCompiler = typescriptCompiler || null;

const buildTypeScript = (p: typeof project) => () => {
  typescriptCompiler = ts.createProject(p.transpiler.config, {
    "typescript": require('typescript')
  });

  let dts = gulp.src(p.transpiler.dtsSource);

  let src = gulp.src(p.transpiler.source)
    .pipe(changedInPlace({firstPass: true}));

  return eventStream.merge(dts, src)
    .pipe(plumber({ errorHandler: notify.onError('Error: <%= error.message %>') }))
    .pipe(sourcemaps.init())
    .pipe(ts(typescriptCompiler))
    .pipe(build.bundle());
}

export const transpile = (p: typeof project) => 
  gulp.series(
    configureEnvironment(p),
    buildTypeScript(p)
  );

export default transpile(project);
