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
        },
        isDom: function (o) {
            return o && o instanceof HTMLElement;
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
        getClass: function (alias) {
            var fn;
            jex.each(jex.classManager.constructors, function (item, i) {
                if (item.name == alias) {
                    fn = item;
                }
            });
            return fn;
        },
        getModel: function (alias) {
            var fn;
            jex.each(jex.classManager.models, function (item, i) {
                if (item.alias == alias) {
                    fn = item;
                }
            });
            return fn;
        },
        updateModel: function (instance) {
            var index = 0;
            jex.each(jex.classManager.models, function (item, i) {
                if (item.uid == instance.uid) {
                    index = i;
                    return;
                    //todo:
                }
            });
            jex.classManager.models[index] = instance;
        }
    }, jex.classManager);


    //define, create
    jex.extend({
        inherit: function (subclass, superclass) {
            var F = function () {
                },
                subclassProto = subclass.prototype, superclassProto = superclass.prototype;

            F.prototype = superclassProto;
            subclass.prototype = new F();
            subclass.prototype.constructor = subclass;
            subclass.superclass = superclassProto;

            if (superclassProto.constructor === Object.constructor) {
                superclassProto.constructor = superclass;
            }
            var subProtoMethod = Object.keys(subclassProto);

            jex.each(subProtoMethod, function (item) {
                if (subclassProto.hasOwnProperty(item)) {
                    if (jex.isFunction(subclassProto[item])) {
                        subclass.prototype[item] = subclassProto[item];
                    }
                }
            });
            return subclass;
        },
        digui: function (items, instance, i) {
            jex.each(items, function (item, index) {
                if (item.alias) {
                    instance.childs.push(jex.create(item.alias, item));
                } else { //tab


                }
            });
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
                else if (jex.isArray(item)) {
                    if (item.length == 0) {
                        fn += 'this.' + key + '=[] ;';
                    }

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
            //生成构造函数
            var fn = jex.generateFc(opt);

            //添加到 类管理模块
            jex.classManager.addClass(fn);
            opt.uid = Math.floor(Math.random() * Math.random() * 10000000) + '';
            jex.classManager.addModel(opt);
        },
        create: function (alias, options) {
            //获取model
            var model = jex.merge(jex.classManager.getModel(alias), options);
            var parentClass = (model.extend == 'undefined' ? null : jex.classManager.getClass(model.extend));

            //实现继承
            var subclass = jex.generateFc(model);
            if (parentClass) {
                subclass = jex.inherit(subclass, parentClass);
            }

            var instance = new subclass();
            instance.element = jex.html.getDom(model.alias) || jex.html.getDom(model.extend);


            if (model.items) {
                instance.childs = [];
                jex.digui(model.items, instance);
            }


            jex.instances.push(instance);
            if (instance.type == 'view') {
                instance.ready();
            }

            return instance;
        },
        render: function (viewport) {
            var childs = viewport.childs;
            jex.each(childs, function (item, index) {
                if (item.childs) {
                    jex.render(item);
                }
                if (!viewport.element) {
                    jex.error.show('Render faild!' + viewport + 'has no attribute element!');
                }
                viewport.element.appendChild(item.element);
            });
        },
        start: function () {

            function addMeta(name, content) {
                var meta = document.createElement('meta');

                meta.setAttribute('name', name);
                meta.setAttribute('content', content);
                document.head.appendChild(meta);
            }

            function addStartupImage(href, media) {
                var link = document.createElement('link');
                link.setAttribute('rel', 'apple-touch-startup-image');
                link.setAttribute('href', href);
                if (media) {
                    link.setAttribute('media', media);
                }
                head.append(link);
            }

            document.addEventListener('DOMContentLoaded', function () {


                if (navigator.standalone) {//是否全屏模式
                    addMeta('viewport', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0');
                }
                else {
                    addMeta('viewport', 'initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0');
                }
                addMeta('apple-mobile-web-app-capable', 'yes');
                addMeta('apple-touch-fullscreen', 'yes');

                document.body.appendChild(jex.instances[0].element);

            }, false);
        }

    });
    window['jex'] = jex;
}());