/**
 * Created by John on 2014/4/9.
 */
var compiler = require('gcc');

compiler.compile(['compress/test.client.js'], 'compress/result.js', { compilation_level: 'SIMPLE_OPTIMIZATIONS' }, function (error, stdout, stderr) {
    if (error) {
        console.error(error);
    } else {
        console.log('Compiled size: ' + stdout.length / 1024 + 'kb');
    }
});