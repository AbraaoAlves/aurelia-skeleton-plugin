import * as gulp from 'gulp';
import {server as karma} from 'karma';

/**
* Run test once and exit
*/
const test = () => 
    new Promise( (res, rej) => {
        karma.start({
            configFile: __dirname + '/../../karma.conf.js',
            singleRun: true
        }, function(e) {
            console.log('[karma result]', e);
            e ? rej(e):res(); 
        });
    })

export default gulp.series(test);

