import * as gulp from 'gulp';
import * as changelog from 'conventional-changelog';
import * as fs from 'fs';
import * as bump from 'gulp-bump';
import * as yargs from 'yargs';
import build from './plugin-build';
import lint from './plugin-lint';
import doc from './plugin-doc';

let args = (() => {
  let validBumpTypes = "major|minor|patch|prerelease".split("|"),
    bump = (yargs.argv.bump || 'patch').toLowerCase();
  
  if(validBumpTypes.indexOf(bump) === -1) {
    throw new Error('Unrecognized bump "' + bump + '".');
  }

  return {bump};
})();

const bumpVersion = () => 
  gulp.src(['./package.json'])
    .pipe(bump({type:args.bump })) //major|minor|patch|prerelease
    .pipe(gulp.dest('./'));

const changeLog = () =>{
  let pkg = JSON.parse(fs.readFileSync('./package.json', 'utf-8'));

  return changelog({
    repository: pkg.repository.url,
    version: pkg.version,
    file: './doc/CHANGELOG.md'
  }, function(err, log) {
    fs.writeFileSync('./doc/CHANGELOG.md', log);
  });
}  

export default gulp.series(
  build, lint, bumpVersion, doc, changeLog
);
