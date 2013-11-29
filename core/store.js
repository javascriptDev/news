/**
 * Created by 宇乔 on 13-11-29.
 */

jex.define('store', {
    alias: 'store',
    type: 'store',

    init: function () {
        var opt = this.config,
            url = opt.url,
            dataType = opt.dataType,
            params = opt.params;

        var that = this;
        jex.ajax(opt, function (data) {
            that.data = data;
        });


    }
})