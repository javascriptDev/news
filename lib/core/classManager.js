/**
 * Created by 宇乔 on 13-12-4.
 */

    //类管理模块 (包括： 继承, 储存类的模板, 搜索类, 添加类)
jex.extend({
    constructors: {
        view: [],
        ctl: [],
        model: [],
        store: []
    },
    models: {
        view: [],
        ctl: [],
        model: [],
        store: []

    },
    addClass: function (fn, type) {

        this.constructors[type].push(fn);
    },
    addModel: function (tpl, type) {
        this.models[type].push(tpl);
    },
    getClass: function (alias, type) {
        var fn;
        if (!type) {
            type = 'view';
        }
        jex.each(this.constructors[type], function (item, i) {
            var key;
            if (item.name) {
                key = item.name;
            } else {//ie 不支持 function.name
                key = item.toString().match(/^function\s*([^\s(]+)/)[1];
            }
            if (key == alias) {
                fn = item;
            }
        });
        return fn;
    },
    getModel: function (alias, type) {
        var fn;
        if (!type) {
            type = 'view';
        }
        jex.each(this.models[type], function (item, i) {
            if (item.alias == alias) {
                fn = item;
            }

        });
        return jex.deepCopy(fn);
    }
}, jex.classManager);