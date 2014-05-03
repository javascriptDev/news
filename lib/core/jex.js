/**
 * Created by 宇乔 on 13-11-19.
 */

(function () {

    var jex = {
        prefix: 'jex-component-',
        classManager: {

        },
        random: function () {
            return Math.floor(Math.random() * 100000);
        },
        //所有组件dom的管理器
        html: {},

        //存放全局 controller
        ctl: {},

        queue: {},

        // 所有页面元素的实例
        instancesManager: {},

        //model 管理器
        modelMgr: {},

        //存储器 管理器
        storeMgr: {},
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
        },
        ajax: {}

    };

    //application 入口
    jex.extend({
        application: function (config) {
            var views = config.views,
                controllers = config.controllers,
                models = config.models,
                stores = config.stores;

            jex.initCache(config.onUpdate);
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
        },
        isNumber: function (o) {
            return o != undefined && Object.prototype.toString.call(o) == '[object Number]';
        },
        isNodeList: function (o) {
            return o != undefined && Object.prototype.toString.call(o) == '[object NodeList]';
        },
        isHtmlCollection: function (o) {
            return o != undefined && Object.prototype.toString.call(o) == '[object HTMLCollection]'
        }
    })


    window['jex'] = jex;
}());