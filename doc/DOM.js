/**
 * Created by John on 2014/2/24.
 */
var Component = {
    tpl: '<div class="m-tool"><input type="text" id="search">' +
        '<button id="getClass">搜索</button>' +
        '</div>' +
        '<div class="m-info">' +
        '<div class="name">组件名:{name}</div>' +
        '<div class="layer">继承关系:{layer}</div>' +
        '</div>' +
        '<div class="demo">用法:{demo}</div>' +
        '<div class="property"><div class="split">属性</div>{property}</div>' +
        '<div class="method"><div class="split">方法</div>{method}</div>' +
        '<div class="event"><div class="split">事件</div>{event}</div>',
    propertyTpl: '<div class="list-item">' +
        '<div class="attr-name"><label>属性名:</label> {name}</div>' +
        '<div class="data-type"><label>值类型:</label> {dataType}</div>' +
        '<div class="params-info"><label>默认值: </label>{defaultVal}</div>' +
        '</div>',
    methodTpl: '<div class="list-item">' +
        '<div class="attr-name"><label>方法名:</label> {name}</div>' +
        '<div class="attr-profile">' +
        '<div class="params-info"><label> 函数作用:</label> {use}</div>' +
        '<div class="params-info"><label> 参数:</label>{param}</div>' +
        '<div class="return-type"><label>返回值: </label>{trn}</div>' +
        '</div>' +
        '</div>',
    eventTpl: '<div class="list-item">' +
        '<div class="attr-name"><label>事件名:</label> {name}</div>' +
        '<div class="attr-profile">' +
        '<div class="params-info"> <label>出发时机:</label> {trigger}</div>' +
        '<div class="params-info"><label> 回调参数: </label>{param}</div>' +

        '</div>' +
        '</div>',
    replace: function (tpl, data) {//替换模版
        return   tpl.replace(/\{(.|\n|\r)*?\}/g, function (a) {
            return data[a.replace('{', '').replace('}', '')];
        })
    },
    List: function (tpl, data) {//简单list组件
        var html = [];
        data.forEach(function (item) {
            html.push(Component.replace(tpl, item));
        })
        this.el = html.join('');
    },
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