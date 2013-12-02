/**
 * Created by 宇乔 on 13-11-29.
 */

jex.define('store', {
    alias: 'store',
    type: 'store',

    load: function (fn) {
        var opt = this.config,
            url = opt.url,
            dataType = opt.dataType,
            params = opt.params;

        var that = this;

        jex.ajax.request(opt, function (data) {
            var result = that.mix(that.model, jex.isFunction(JSON.parse(data.responseText)) == true ? JSON.parse(data.responseText) : [JSON.parse(data.responseText)]);
            jex.storeMgr.add(result);
            fn(result);
        });
    },
    mix: function (model, data) {
        var result = [];

        jex.each(data[0], function (val, key) {
            jex.each(model, function (item) {
                var k = item.field;
                if (val[k]) {
                    var o = {};
                    o[k] = val[k];
                    result.push(o);
                    o = null;
                }
            })

        });
        return result;
    }

})