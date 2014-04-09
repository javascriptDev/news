/**
 * Created by 宇乔 on 13-11-21.
 */
    //定义 所有组件的 dom元素，并管理
jex.extend({
    dom: [
        {
            alias: 'viewport',
            dom: function () {
                var outer = document.createElement('div');
                outer.className = jex.prefix + 'viewport';
                outer.id = 'viewport';
                return outer;

            }
        },
        {
            alias: 'panel',
            dom: function () {
                var outer = document.createElement('div');
                outer.className = jex.prefix + 'panel';
                outer.id = jex.prefix + 'panel' + jex.instancesManager.getLen();
                return outer;
            }
        },
        {
            alias: 'titlebar',
            dom: function () {
                var outer = document.createElement('div');
                outer.className = jex.prefix + 'titlebar';
                outer.id = jex.prefix + 'titlebar' + jex.instancesManager.getLen();
                return outer;
            }
        },
        {
            alias: 'tab',
            dom: function () {
                var outer = document.createElement('div');
                outer.className = jex.prefix + 'tab';
                outer.id = jex.prefix + 'tab';

                var bar = document.createElement('div');
                bar.className = jex.prefix + 'tab-bars';

                var main = document.createElement('div');
                main.className = jex.prefix + 'tab-main';

                outer.appendChild(bar);
                outer.appendChild(main);
                return outer;
            },
            getClsList: function () {
                return {bars: jex.prefix + 'tab-bars', main: jex.prefix + 'tab-main'}
            }
        },
        {
            alias: 'button',
            dom: function () {
                var outer = document.createElement('div');
                outer.className = jex.prefix + 'button';
                outer.id = jex.prefix + 'button' + jex.instancesManager.getLen();
                return outer;

            }
        },
        {
            alias: 'list',
            dom: function () {
                var div = document.createElement('div');
                div.className = jex.prefix + 'list';
                div.id = jex.prefix + 'list' + jex.instancesManager.getLen();

                return div;

            }
        },
        {
            alias: 'text',
            dom: function () {
                var div = document.createElement('div');
                div.className = jex.prefix + 'text';
                div.id = jex.prefix + 'text' + jex.instancesManager.getLen();
                var html = '<div class=' + jex.prefix + 'text-label></div><div class=' + jex.prefix + 'text-inner><input type="text" class=' + jex.prefix + 'text-innertext \/></div>';
                div.innerHTML = html;
                return div;
            }
        },
        {
            alias: 'password',
            dom: function () {
                var div = document.createElement('div');
                div.className = jex.prefix + 'password';
                div.id = jex.prefix + 'password' + jex.random();
                var html = '<div class=' + jex.prefix + this.alias + '-label></div><div class=' + jex.prefix + 'password-inner><input type="password" class=' + jex.prefix + this.alias + '-innertext \/></div>';
                div.innerHTML = html;
                return div;
            }
        },
        {
            alias: 'radio',
            dom: function () {
                var div = document.createElement('div');
                div.className = jex.prefix + 'radio';
                div.id = jex.prefix + 'radio' + jex.random();
                var html = '<div class=' + jex.prefix + 'radio-inner><div class=' + jex.prefix + this.alias + '-text></div><input type="radio" class=' + jex.prefix + this.alias + '-input ></div>';
                div.innerHTML = html;
                return div;
            }
        },
        {
            alias: 'form',
            dom: function () {
                var div = document.createElement('div');
                var html = '<form  method="get"></form>';

                div.className = jex.prefix + 'form';
                div.id = jex.prefix + 'form' + jex.random();
                div.innerHTML = html;
                return div;
            }
        },
        {
            alias: 'alert',
            dom: function () {
                var div = document.createElement('div');
                div.className = jex.prefix + 'alert';
                div.id = jex.prefix + 'alert' + jex.random();
                return div;
            }
        }
    ],
    getDom: function (alias) {
        var dom;
        jex.each(jex.html.dom, function (item, index) {
            if (item.alias == alias) {
                dom = item.dom();
            }
        });
        return dom;
    },
    getInfo: function (alias) {
        var info;
        jex.each(jex.html.dom, function (item, index) {
            if (item.alias == alias) {
                info = item;
            }
        });
        return info;
    },
    getCmp: function (id) {
        return jex.instancesManager.getIns(id);
    }
}, jex.html);
