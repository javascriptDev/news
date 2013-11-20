/**
 * Created by 宇乔 on 13-11-20.
 */
jex.define('panel', {
    alias: 'panel',
    extend: 'viewport',
    config: {
        name: 'panel'
    },
    items: [],
    ready: function () {
        var dom = this.element;
        console.log('panel' + dom);
    },
    show: function () {
    }
})