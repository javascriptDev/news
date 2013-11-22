/**
 * Created by 宇乔 on 13-11-20.
 */
jex.define('viewport', {
    alias: 'viewport',
    type: 'view',
    isComponet: 'true',
    config: {
    },
    parent: document.body,
    ready: function () {
        var dom = this.element;
        // this.parent.appendChild(dom);
    },
    render: function () {
    },
    childs: [],
    unload: function () {
    },
    add: function (instance) {
        this.childs.push(instance);
        jex.classManager.updateModel(this);
        jex.render(this);

    }
})