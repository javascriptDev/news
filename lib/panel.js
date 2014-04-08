/**
 * Created by 宇乔 on 13-11-20.
 */
jex.define('panel', {
    alias: 'panel',
    extend: 'viewport',
    type: 'view',
    config: {
        name: 'panel'
    },
    childs: [],
    items: [],
    ready: function () {

    },
    show: function () {

    },
    beforeRender: function () {
        var that = this;
        if (this.style) {
            jex.each(this.style.split(';'), function (item) {
                var data = item.split(':');
                that.element.style[data[0]] = data[1];
            });
        }
        jex.instancesManager.update(this);

    }
})