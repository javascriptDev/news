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

    //util each,merge,
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


    //classManager
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

    //html
    jex.extend({
        dom: [
            {alias: 'viewport', dom: '<div class=' + jex.prefix + 'viewport></div>'},
            {alias: 'panel', dom: '<div class=' + jex.prefix + 'panel></div>'}
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

            opt.element = jex.html.getDom(opt.alias);
            var fn = jex.generateFc(opt);

            var parentClass = (opt.extend == 'undefined' ? null : jex.classManager.getClass(opt.extend));

            var subClass = fn;
            if (parentClass) {
                subClass = jex.inherit(fn, parentClass);
            }

            jex.classManager.addClass(subClass);
            jex.classManager.addModel(opt);
        },
        create: function (alias, options) {
            var model = jex.classManager.getClass(alias, true);
            var constructor = jex.generateFc(jex.merge(model, options));
            var instance = new constructor();
            jex.instances.push(instance);

            return instance;
        }
    });
    window['jex'] = jex;
}());