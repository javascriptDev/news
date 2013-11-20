/**
 * Created by 宇乔 on 13-11-19.
 */

(function () {

    var jex = {
        prefix: 'jex-component-',
        classManager: {

        },
        html: {

        },
        instances: [],
        extend: function (config, target) {
            for (var i in config) {
                if (target) {
                    target[i] = config[i];
                } else {
                    jex[i] = config[i];
                }
            }
        },
        error: {
            show: function (text) {
                throw  new Error(text);
            }
        }
    };

    //application 入口
    jex.extend({
        application: function (config) {
            var views = config.views,
                controllers = config.controllers,
                models = config.models,
                stores = config.stores;

            config.start();


        }
    });


    //check type  string,function,array,object
    jex.extend({
        isFunction: function (o) {
            return o && Object.prototype.toString.call(o) == '[object Function]';
        },
        isString: function (o) {
            return o && Object.prototype.toString.call(o) == '[object String]';
        },
        isArray: function (o) {
            return o && Object.prototype.toString.call(o) == '[object Array]';
        },
        isObject: function (o) {
            return o && Object.prototype.toString.call(o) == '[object Object]';
        }
    })

    //工具函数 (each, merge),
    jex.extend({
        each: function (o, fn) {
            if (jex.isArray(o)) {
                for (var i = 0, len = o.length; i < len; i++) {
                    fn(o[i], i);
                }
            } else if (jex.isObject(o)) {
                for (var i in o) {
                    fn(o[i], i);
                }
            }
        },
        merge: function (o1, o2) {
            jex.each(o2, function (item, key) {
                o1[key] = item;
            })
            return o1;
        }
    });


    //类管理模块 (包括： 继承, 储存类的模板, 搜索类, 添加类)
    jex.extend({
        constructors: [],
        models: [],
        addClass: function (fn) {
            jex.classManager.constructors.push(fn);
        },
        addModel: function (tpl) {
            jex.classManager.models.push(tpl);
        },
        getClass: function (alias, isModel) {
            var fn;
            var o;
            if (isModel) {
                o = jex.classManager.models;
            } else {
                o = jex.classManager.constructors;
            }
            jex.each(o, function (item, i) {
                if (item.name || item.alias == alias) {
                    fn = item;
                    return;
                }
            });
            return fn;
        }

    }, jex.classManager);

    //定义 所有组件的 dom元素，并管理
    jex.extend({
        dom: [
            {
                alias: 'viewport',
                dom: "<div class='" + jex.prefix + "viewport' id='" + this.alias + "'></div>"
            },
            {
                alias: 'panel',
                dom: "<div class='" + jex.prefix + "panel' id='panel-" + jex.instances.length + "'></div>"
            }
        ],
        getDom: function (alias) {
            var dom;
            jex.each(jex.html.dom, function (item, index) {
                if (item.alias == alias) {
                    dom = item.dom;
                }
            });
            return dom;
        }}, jex.html);


    //define, create
    jex.extend({
        inherit: function (subclass, superclass) {
            var F = function () {
                },
                subclassProto, superclassProto = superclass.prototype;

            F.prototype = superclassProto;
            subclassProto = subclass.prototype = new F();
            subclassProto.constructor = subclass;
            subclass.superclass = superclassProto;

            if (superclassProto.constructor === Object.constructor) {
                superclassProto.constructor = superclass;
            }
            return subclass;
        },
        generateFc: function (o) {

            var fn = 'var temp = function ' + o.alias + '(){';
            var funcArray = [];

            jex.each(o, function (item, key) {
                if (jex.isFunction(item)) {
                    funcArray.push({key: key, fn: item});
                } else if (jex.isString(item)) {
                    fn += 'this.' + key + '="' + item + '";';
                } else if (jex.isObject(item)) {
                    var newPro = 'this.' + key + '= {};';
                    fn += newPro;
                    jex.each(item, function (i, k) {
                        fn += 'this.' + key + '.' + k + '="' + i + '";';
                    });

                } else if (jex.isArray(item)) {
                    fn += 'this.' + key + '=' + item + ';';
                }
            });
            fn += '}';
            eval(fn);

            jex.each(funcArray, function (item, index) {
                temp.prototype[item.key] = item.fn;
            });
            return temp;
        },
        define: function (name, opt) {

            //添加dom元素
            opt.element = jex.html.getDom(opt.alias);

            //生成构造函数
            var fn = jex.generateFc(opt);

            //获取父类构造函数
            var parentClass = (opt.extend == 'undefined' ? null : jex.classManager.getClass(opt.extend));

            //实现继承
            var subClass = fn;
            if (parentClass) {
                subClass = jex.inherit(fn, parentClass);
            }

            //添加到 类管理模块
            jex.classManager.addClass(subClass);
            jex.classManager.addModel(opt);
        },
        create: function (alias, options) {
            //获取model
            var model = jex.classManager.getClass(alias, true);

            var constructor = jex.generateFc(jex.merge(model, options));
            var instance = new constructor();
            jex.instances.push(instance);

            if (jex.type == 'view') {
                view.ready();
            }

            return instance;
        }
    });
    window['jex'] = jex;
}());