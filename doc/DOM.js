/**
 * Created by John on 2014/2/24.
 */
var Component = {
    tpl: '<div class="m-tool"><input type="text" id="search">' +
        '<button id="getClass">搜索</button>' +
        '</div>' +
        '<div class="m-info">' +
        '<div class="name">{name}</div>' +
        '<div class="layer">{layer}</div>' +
        '</div>' +
        '<div class="demo">{demo}</div>' +
        '<div class="property"><div class="split">方法:</div></br>{property}</div>' +
        '<div class="method">{method}</div>' +
        '<div class="event">{event}</div>',
    propertyTpl: '<div class="list-item">' +
                    '<div class="attr-name">属性名: {name}</div>' +
                    '<div class="data-type">值类型: {dataType}</div>' +
                    '<div class="params-info">默认值: {defaultVal}</div>' +
                 '</div>',
    methodTpl: '<div class="list-item">' +
        '<div class="attr-name">方法名: {name}</div>' +
        '<div class="attr-profile">' +
        '<div class="params-info"> 参数: {value}/div>' +
        '<div class="return-type">返回值: {trn}</div>' +
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

            var data = {
                name: 'viewport',
                layer: '<div>控件的基类</div>',
                demo: '<div>var a=jex.create("viewport");</div>',
                property: new Component.List(Component.propertyTpl, properties).el,
                method: 'sdd',
                event: '事件'
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