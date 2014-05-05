/**
 * Created by John on 2014/5/5.
 * EN:
 * CN:所有的组件的信息介绍
 */
var data = {
    control: {
        viewport: function () {
            var properties = [
                {
                    name: 'isComponet',
                    defaultVal: 'true',
                    dataType: 'boolean'
                },
                {
                    name: 'config',
                    defaultVal: '{}',
                    dataType: 'Object'
                }
            ]
            var method = [
                {
                    name: 'add',
                    use: '添加一个组件到当前组件',
                    params: '组建的实例对象',
                    trn: 'undefined'

                },
                {
                    name: 'getCld',
                    use: '获取某个子对象组件',
                    params: '组建的alias别名',
                    trn: '组件对象'

                }
            ]
            var event = [
                {
                    name: 'beforeRender',
                    trigger: '渲染dom之前',
                    param: 'null'
                },
                {
                    name: 'render',
                    trigger: '渲染dom',
                    param: 'null'
                },
                {
                    name: 'render',
                    trigger: '渲染dom完',
                    param: 'null'
                }
            ]

            var data = {
                name: 'viewport',
                layer: '<div>控件的基类</div>',
                demo: '<div>var a=jex.create("viewport");</div>',
                property: new Component.List(Component.propertyTpl, properties).el,
                method: new Component.List(Component.methodTpl, method).el,
                event: new Component.List(Component.eventTpl, event).el
            };
            return Component.replace(Component.tpl, data);
        },
        panel: function () {
            var data = {};
            return Component.replace(Component.tpl, data);
        },
        list: function () {
            var data = {};
            return Component.replace(Component.tpl, data);
        }
    },
    event: {
        eventBase: function () {
            var data = {};
            return Component.replace(Component.tpl, data);
        }
    },
    store: {
        storeMgr: function () {
            var data = {};
            return Component.replace(Component.tpl, data);
        },
        store: function () {
            var data = {};
            return Component.replace(Component.tpl, data);
        }

    }

}