/**
 * Created by John on 2014/4/9.
 */
var fs = require('fs');
var compiler = require('gcc');
var uglifycss = require('uglifycss');

var root = 'lib/';
var css = root + 'css/';
var core = root + 'core/';
var ctl = root + 'controller/';
var form = root + 'form/';
var model = root + 'model/';
var store = root + 'store/';
var app = 'app/';
var appModel = app + 'model/';
var appCtl = app + 'controller/';
var appView = app + 'view/';
var appStore = app + 'store/';

var arr = [
    //core
        core + '/jex.js', core + 'core.js', core + 'instanceManager.js', core + 'classManager.js', core + 'util.js', core + 'cache.js',
    //help
        root + 'event.js', root + 'DOM.js', root + 'animation.js', root + 'Promise.js', root + 'Queue.js',
    //view
        root + 'viewport.js', root + 'panel.js', root + 'titlebar.js', root + 'tab.js', root + 'button.js', root + 'list.js', root + 'alert.js',
        form + 'form.js', form + 'text.js', form + 'password.js', form + 'radio.js',
    //model
        model + 'model.js',
    //controller
        ctl + 'controller.js',
    //store
        store + 'store.js', store + 'Ajax.js', store + 'storeMgr.js',
    //app file
        appModel + 'model.js',
        appCtl + 'main.js',
        appStore + 'listStore.js', appStore + 'historyStore.js',
        appView + 'main.js', appView + 'index.js', appView + 'profile.js', appView + 'history.js', appView + 'rss.js',
    'app.js'
]
var compileCss = [
        css + 'base.css', css + 'alert.css', css + 'button.css', css + 'list.css', css + 'radio.css', css + 'password.css', css + 'text.css', css + 'title.css', css + 'tab.css'
]


//压缩js
var destination = 'production/production.min.js';
var options = { compilation_level: 'SIMPLE_OPTIMIZATIONS' };
var callback = function (error, stdout, stderr) {
    if (error) {
        console.error(error);
    } else {
        console.log('Compiled size: ' + stdout.length / 1024 + 'kb');
    }
};
compiler.compile(arr, destination, options, callback);

//压缩css


var cssDestination = 'production/min.css';

var uglified = uglifycss.processFiles(
    compileCss,
    { maxLineLen: 500, expandVars: true }
);

fs.writeFile(cssDestination, uglified, function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log("css file write success.all");
    }
});
