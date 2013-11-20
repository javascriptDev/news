/**
 * Created by 宇乔 on 13-11-20.
 */
jex.define('viewport', {
    alias: 'viewport',
    type: 'view',
    config: {

    },
    ready: function () {
        var dom = this.element;
        console.log('viewport' + dom);
    },
    render: function () {
    },
    items: [],
    unload: function () {
    },
    add: function (instance) {
        this.items.push(instance);
        jex.classManager.updateModel(this);

    }

})