/**
 * Created by 宇乔 on 13-11-20.
 */
jex.define('viewport', {
    alias: 'viewport',
    type: 'view',
    isComponet: 'true',
    config: {
    },
    getType: function () {
        return 'view';
    },
    parent: document.body,
    ready: function () {

    },
    render: function () {
    },
    childs: [],
    unload: function () {
    },
    add: function (instance) {
        instance.beforeRender();
        this.childs.push(instance);
        this.element.appendChild(instance.element);
        jex.instancesManager.update(this);


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