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
                outer.id = jex.prefix + 'panel' + jex.instances.length;
                return outer;
            }
        },
        {
            alias: 'titlebar',
            dom: function () {
                var outer = document.createElement('div');
                outer.className = jex.prefix + 'titlebar';
                outer.id = jex.prefix + 'titlebar' + jex.instances.length;
                return outer;
            }
        },
        {
            alias: 'tab',
            dom: function () {
                var outer = document.createElement('div');
                outer.className = jex.prefix + 'tab';

                var bar = document.createElement('div');
                bar.className = jex.prefix + 'tab-bars';

                var main = document.createElement('div');
                main.className = jex.prefix + 'tab-main';

                outer.appendChild(bar);
                outer.appendChild(main);
                return outer;
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
    }}, jex.html);
