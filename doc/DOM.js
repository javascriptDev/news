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
        '<div class="property">{property}</div>' +
        '<div class="method">{method}</div>' +
        '<div class="event">{event}</div>',

    replace: function (data) {
        return   this.tpl.replace(/\{(.|\n|\r)*?\}/g, function (a) {
            return data[a.replace('{', '').replace('}', '')];
        })
    },
    control: {
        viewport: function () {

            var data = {
                name: 'viewport',
                layer: '<div>控件的基类</div>',
                demo: '<div>var a=jex.create("viewport");</div>',
                property: '属性',
                method: '方法',
                event: '事件'
            };
            return Component.replace(data);
        },
        panel: function () {
            var data = {};
            return Component.replace(data);
        },
        list: function () {
            var data = {};
            return Component.replace(data);
        }
    },
    event: {
        eventBase: function () {
            var data = {};
            return Component.replace(data);
        }
    },
    store: {
        storeMgr: function () {
            var data = {};
            return Component.replace(data);
        },
        store: function () {
            var data = {};
            return Component.replace(data);
        }

    }
}