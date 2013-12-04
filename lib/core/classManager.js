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
        jex.classManager.constructors[type].push(fn);
    },
    addModel: function (tpl, type) {
        jex.classManager.models[type].push(tpl);
    },
    getClass: function (alias, type) {
        var fn;
        if (!type) {
            type = 'view';
        }
        jex.each(jex.classManager.constructors[type], function (item, i) {
            if (item.name || item.toString().match(/^function\s*([^\s(]+)/)[1] == alias) { //ie 不支持 function.name
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
        jex.each(jex.classManager.models[type], function (item, i) {
            if (item.alias == alias) {
                fn = item;
            }

        });
        return jex.deepCopy(fn);
    }
}, jex.classManager);