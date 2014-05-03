/**
 * Created by 宇乔 on 13-12-4.
 */
jex.extend({
    initCache: function (fn) {

        var appCache = window.applicationCache;
        if (appCache.status == appCache.UPDATEREADY) {//have update

            fn(appCache);
        }
        else if (appCache.status == appCache.CHECKING || appCache.status == appCache.DOWNLOADING) {
            appCache.onupdateready = fn;
            appCache.onnoupdate = appCache.onobsolete = function () {
                debugger;
            };
        }

    }
})