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
        instancesManager: {},
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
        },
        deepCopy: function (o) {
            var obj = {};
            for (var i in o) {
                obj[i] = o[i];
            }
            return obj;
        }
    });


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
                if (item.name == alias) {
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

    //实例组件管理模块
    jex.extend({
        instances: [],
        add: function (ins) {
            jex.instancesManager.instances.push(ins);
        },
        getIns: function (id) {
            var component;
            jex.each(jex.instancesManager.instances, function (item) {
                if (item.uid == id) {
                    //todo: 获取想要的数据之后不能及时退出循环
                    component = item;
                }
            })
            return component;
        },
        deleteIns: function (id) {
            jex.each(jex.instancesManager.instances, function (item, index) {
                if (item.uid == id) {
                    //todo: 获取想要的数据之后不能及时退出循环
                    jex.instancesManager.instances.splice(index, 1);
                }
            })
        },
        getLen: function () {
            return jex.instancesManager.instances.length;
        },
        getByIndex: function (i) {
            return jex.instancesManager.instances[i];
        },
        getAll: function () {
            return jex.instancesManager.instances;
        },
        update: function (model) {
            var index = 0;
            jex.each(jex.instancesManager.instances, function (item, i) {
                if (item.uid == model.uid) {
                    //todo: 获取想要的数据之后不能及时退出循环
                    index = i;
                }
            })
            jex.instancesManager.instances[index] = model;
        },
        getbyAlias: function (alias) {
            var result = [];
            jex.each(jex.instancesManager.instances, function (item, i) {
                if (item.alias == alias) {
                    //todo: 获取想要的数据之后不能及时退出循环
                    result.push(item);
                }
            })
            return result;
        }

    }, jex.instancesManager)

    //define, create,start
    jex.extend({

        /*
         * 功能: 实现继承
         */
        inherit: function (subclass, superclass) {
            var F = function () {
                },
                subclassProto = subclass.prototype,
                superclassProto = superclass.prototype;

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

        /*
         * 递归函数
         */
        digui: function (items, instance, i) {
            jex.each(items, function (item, index) {
                if (item.alias) {
                    instance.childs.push(jex.create(item.alias, item));
                } else { //tab
                    if (item.items) {
                        instance.childs[index] = [];
                        var barText = item.title;
                        jex.each(item.items, function (item1, index1) {
                            var ins = jex.create(item1.alias, item1);
                            ins.barText = barText;
                            instance.childs[index].push(ins);
                        });
                    }
                }
            });
        },


        /*
         * 功能：生成View构造函数
         *
         * 解析 配置项的 键值对
         *
         * 1.解析 函数
         * 2.解析 字符串
         * 3.解析 对象
         * 4.解析 数组
         *
         * */
        generateViewConstructor: function (o) {

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


        /*
         * 功能: 生成 Controller 构造函数
         *
         * 解析 配置项的 键值对
         *
         * 1.解析 包含对象的数组
         * 2.解析 函数
         * 3.解析 字符串
         * */
        generateCtlContructor: function (o) {

        },

        generateConstructor: function (o, type) {

            switch (type) {
                case 'view':
                    jex.generateViewConstructor(o);
                    break;
                case 'ctl':
                    jex.generateCtlContructor(o);
                    break;
                case 'store':
                    ;
                    break;
                case 'model':
                    ;
                    break;
                default:
                    break;


            }

        },

        /*
         * 功能: 生成Model 并保存
         *
         * 1.根据配置项 生成构造函数
         * 2.设置Model的唯一ID
         * 3.保存Model
         */
        define: function (name, opt) {
            //生成构造函数
            var fn = jex.generateViewConstructor(opt);
            if (!opt.type) {
                opt.type = 'view';
            }

            //添加类
            jex.classManager.addClass(fn, opt.type);

            //设置对象的唯一ID
            opt.uid = Math.floor(Math.random() * Math.random() * 10000000) + '';

            //添加到 Model
            jex.classManager.addModel(opt, opt.type);
        },


        /*
         * 功能: 创建组件对象并保存
         *
         * 1.获取组件MODEL
         * 2.获取父类 构造函数
         * 3.实现继承,
         * 4.设置组件的DOM元素(如果子类没有默认的DOM,那么就去获取父类的DOM)
         * 5.递归遍历组件的 子元素
         * 6.保存对象实例
         * 7.调用 view的  ready方法
         * 8.附加给 组建对象一个 唯一ID.
         *
         * */
        create: function (alias, options) {

            //获取model
            if (!options) {
                options = {type: 'view'};
            }
            var baseModel = jex.classManager.getModel(alias, options.type);
            var model = jex.merge(baseModel, options);

            //获取 父类
            var parentClass = (model.extend == 'undefined' ? null : jex.classManager.getClass(model.extend, options.type));

            //实现继承
            var subclass = jex.generateViewConstructor(model);
            if (parentClass) {
                subclass = jex.inherit(subclass, parentClass);
            }

            var instance = new subclass();

            //设置DOM 元素
            instance.element = jex.html.getDom(model.alias) || jex.html.getDom(model.extend);

            //遍历 Item 元素
            if (model.items && model.items.length > 0) {
                instance.childs = [];
                jex.digui(model.items, instance);
            }

            //保存 对象
            jex.instancesManager.add(instance);

            //调用 view 的 ready 方法
            if (instance.type == 'view') {
                instance.ready();
            }
            if (instance.type == 'ctl') {
                instance.init();
            }

            //设置 对象的唯一身份 ID
            instance.uid = Math.floor(Math.random() * Math.random() * 10000000) + '';

            return instance;
        },


        /*
         *功能: 把子节点的DOM 添加到 父节点
         */
        render: function (viewport) {
            var childs = viewport.childs;
            jex.each(childs, function (item, index) {
                if (item.childs) {
                    jex.render(item);
                }
                if (!viewport.element) {
                    jex.error.show('Render faild!' + viewport + 'has no attribute element!');
                }

                //todo:判断是不是 tab 组件 有问题
                if (!viewport.getTab) {
                    //如果不是tab，直接把 item的元素加进 组件
                    viewport.element.appendChild(item.element);
                }
            });
        },


        /*
         * 功能: 程序的入口函数
         *
         * 1.调用 view beforeRender 事件
         * 2.添加Meta
         * 3.添加桌面图标
         * 4.添加DOM
         * 5.调用 view rendered 事件
         */
        start: function () {
            jex.each(jex.instancesManager.getAll(), function (item) {
                if (jex.isFunction(item.beforeRender)) {
                    item.beforeRender();
                }
            });
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

                document.body.appendChild(jex.instancesManager.getByIndex(0).element);

                //调用 rendered
                jex.each(jex.instancesManager.getAll(), function (item) {// 递归所有dom
                    if (jex.isFunction(item.rendered)) {
                        item.rendered();
                    }
                });

                jex.EventManager.init();

            }, false);
        }

    });
    window['jex'] = jex;
}());