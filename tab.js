/**
 * Created by 宇乔 on 13-11-19.
 */

(function () {

    var core = {
        components: {
            prefix: 'dnf-component-'
        }
    };
    var extend = function (obj, cfg) {
        for (var i in cfg) {
            obj[i] = cfg[i];
        }
    }

    extend(core.components, {

        back: '<div class=' + core.components.prefix + 'button-back>{back-text}</div>',
        titleBar: '<div class=' + core.components.prefix + 'titlebar><div class=' + core.components.prefix + 'titlebar-text>{title-text}</div><div class=' + core.components.prefix + 'titlebar-items>{titlebar-items}</div></div>',
        tab: '<div class=' + core.components.prefix + 'tab><div class=' + core.components.prefix + 'tab-contents>{tab-contents}</div><div class=' + core.components.prefix + 'tab-bars>{tab-bars}</div></div>'

    });

    extend(core, {
        isArray: function (obj) {
            return obj && Object.prototype.toString.call(obj) == '[object Array]';
        }
    })

    var back = {
        name: 'back',
        create: function (cfg) {

            var text = cfg.text,
                clickFn = cfg.click;

            if (clickFn) {

            }
            return core.components[this.name].replace('{back-text}', text);
        }
    }

    var titleBar = {
        name: 'titleBar',
        create: function (cfg) {
            var text = cfg.text,
                items = cfg.items

            var html = core.components[this.name].replace('{title-text}', text);
            var obj = {};


            d(items || cfg, obj);

            console.log(obj);


            html.replace('{titlebar-items}', obj['item0']);
            return html;
        }
    }

    function d(items, obj, parent) {
        if (Object.prototype.toString.call(items) == '[object Array]') {
            items.forEach(function (item) {
                var component = core[item.alias];
                if (component) {
                    var html = component.create(item);
                    obj['item' + Object.keys(obj).length] = html;
                }
                if (item.items) {
                    d(item.items, obj);
                }

            })
        } else {
            var component = core[items.alias];
            if (component) {
                var html = component.create(items);
                obj['item' + Object.keys(obj).length] = html;
            }
        }
    }

    var tab = {
        name: 'tab',
        create: function (obj) {
            obj.forEach(function (item, i) {
                var tabText = obj.tabText,
                    title = obj.title,
                    contentHtml = obj.content;


            })

        }

    };


    extend(core, {
        back: back,
        titleBar: titleBar,
        tab: tab

    })
    window['core'] = core;


}());