/**
 * Created by 宇乔 on 13-11-29.
 */
jex.extend({
    Promise: function (fn) {
        this.fn = fn;
        if (jex.isFunction(fn)) {
            fn();
        }
        this.success = true;
        return this;
    },
    initPromise: function () {
        jex.Promise.prototype.ok = function (fn) {
            if (jex.isFunction(fn)) {
                if (this.success) {
                    fn();//asdasda
                }
            }
        }
    }


})