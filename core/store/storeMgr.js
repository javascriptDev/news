/**
 * Created by 宇乔 on 13-12-2.
 */
jex.extend({
    add: function (o) {
        jex.storeMgr.stores.push(o);
    },
    stores: [],
    getStore: function (cts) {
        var store;
        jex.each(jex.storeMgr.stores, function (item) {
            debugger;
        })


    }


}, jex.storeMgr)