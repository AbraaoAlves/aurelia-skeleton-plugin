import  * as gulp from 'gulp';
import  * as tools from 'aurelia-tools';
import  * as yuidoc from 'gulp-yuidoc';

const docGenerate = () => 
  gulp.src(paths.source)
    .pipe(yuidoc.parser(null, 'api.json'))
    .pipe(gulp.dest('./doc'))

export default gulp.series(docGenerate, () => {
  tools.transformAPIModel('./doc');
});
