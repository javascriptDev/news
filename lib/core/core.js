/**
 * Created by 宇乔 on 13-12-4.
 */
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
            } else if (jex.isString(item) || jex.isNumber(item)) {
                fn += 'this.' + key + '="' + item + '";';
            } else if (jex.isObject(item) || jex.isArray(item)) {
                if (key == 'defaultCfg') {
                    jex.each(item, function (name, key) {
                        fn += 'this.' + key + '="' + name + '";';
                    })
                } else {
                    fn += 'this.' + key + '=' + JSON.stringify(item) + ';';
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
        var fn = 'var tem=function ' + o.alias + '(){';
        var func = [];

        jex.each(o, function (item, key) {
            if (jex.isString(item)) {
                fn += 'this.' + key + '="' + item + '";';
            } else if (jex.isArray(item)) {//需要添加事件的控件
                fn += 'this.' + key + '=' + JSON.stringify(item) + ';';
            } else if (jex.isFunction(item)) {
                func.push({key: key, fn: item});
            }
        });

        fn += '}';
        //生成构造函数
        eval(fn);

        //给原型加函数
        jex.each(func, function (item, index) {
            tem.prototype[item.key] = item.fn;
        });

        return tem;
    },


    /*
     * 功能: 生成 Model 构造函数
     *
     * 解析 配置项的 键值对
     *
     * 1.解析 fileds
     * */

    generateModelConstructor: function (o) {
        var fn = 'var tem=function ' + o.alias + '(){';
        var func = [];

        jex.each(o, function (item, key) {
            if (jex.isString(item)) {
                fn += 'this.' + key + '="' + item + '";';
            } else if (jex.isArray(item)) {//需要添加事件的控件
                fn += 'this.' + key + '=' + JSON.stringify(item) + ';';
            } else if (jex.isFunction(item)) {
                func.push({key: key, fn: item});
            }
        });

        fn += '}';
        //生成构造函数
        eval(fn);

        //给原型加函数
        jex.each(func, function (item, index) {
            tem.prototype[item.key] = item.fn;
        });

        return tem;
    },


    /*
     *功能： 生成 Store 构造函数
     *
     * 解析 配置项的 键值对
     *
     * 1. 解析 ajax 的参数
     * 2. 解析model
     * 3. 解析常规配置
     * */
    generateStoreConstructor: function (o) {
        var fn = 'var tem=function ' + o.alias + '(){';
        var func = [];
        jex.each(o, function (val, key) {

            if (jex.isString(val)) {
                if (key == 'model') {
                    var modelFn = jex.classManager.getClass(val, 'model');
                    var model = new modelFn();
                    fn += 'this.' + key + '=' + JSON.stringify(model.fields) + ';';
                } else {
                    fn += 'this.' + key + '="' + val + '";';
                }

            } else if (jex.isObject(val)) {
                fn += 'this.' + key + '=' + JSON.stringify(val) + ';';
            } else if (jex.isFunction(val)) {
                func.push({key: key, fn: val});
            }

        });
        fn += '}';
        //生成构造函数
        eval(fn);

        jex.each(func, function (item, index) {
            tem.prototype[item.key] = item.fn;
        });

        return tem;

    },

    //工厂函数,生成不同的类型的构造函数
    generateConstructor: function (o) {
        var constructor;
        var type = o.type;
        switch (type) {
            case 'view':
                constructor = jex.generateViewConstructor(o);
                break;
            case 'ctl':
                constructor = jex.generateCtlContructor(o);
                break;
            case 'store':
                constructor = jex.generateStoreConstructor(o);
                break;
            case 'model':
                constructor = jex.generateModelConstructor(o);
                break;
            default:
                break;
        }
        return constructor;

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
        var fn = jex.generateConstructor(opt);
        if (!opt.type) {
            opt.type = 'view';
        }

        //添加类
        //获取 父类
        var parentClass = typeof opt.extend == 'undefined' ? null : jex.classManager.getClass(opt.extend, opt.type);

        //实现继承
        var subclass = jex.generateConstructor(opt);
        if (parentClass) {
            subclass = jex.inherit(subclass, parentClass);
        }

        jex.classManager.addClass(subclass, opt.type);

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
        } else {
            if (!options.type) {
                options.type = 'view';
            }
        }
        var baseModel = jex.classManager.getModel(alias, options.type);
        var model = jex.merge(baseModel, options);

        //获取 父类
        var parentClass = typeof model.extend == 'undefined' ? null : jex.classManager.getClass(model.extend, model.type);

        //实现继承
        var subclass = jex.generateConstructor(model);
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
        jex.each(jex.classManager.constructors.ctl, function (item, index) {
            if (item.prototype.__proto__.constructor.name != 'Object') {
                new item().init();
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
            addMeta('format-detection', 'telephone=no');
            addMeta('apple-mobile-web-app-status-bar-style', 'default');
            addMeta('browsermode', 'application');
            document.body.appendChild(jex.instancesManager.getByIndex(0).element);

            //调用 rendered
            jex.each(jex.instancesManager.getAll(), function (item) {// 递归所有dom
                if (jex.isFunction(item.rendered)) {
                    item.rendered();
                }
            });

            //初始化事件
            jex.EventManager.init();

            //初始化 Promise
            jex.initPromise();

        }, false);
    }

});