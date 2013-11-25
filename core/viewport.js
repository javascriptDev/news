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
        console.log('viewport');
    },
    render: function () {
    },
    childs: [],
    unload: function () {
    },
    add: function (instance) {
        this.childs.push(instance);
        jex.instancesManager.update(this);
        jex.render(this);

    }
})