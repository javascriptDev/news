/**
 * Created by 宇乔 on 13-11-25.
 */
jex.define('main', {
    extend: 'controller',
    view: 'main',
    type: 'ctl',
    alias: 'main',
    controls: [
        {
            selector: '#a',
            type: 'tap',
            handler: 'aTap'
        },
        {
            selector: '#b',
            type: 'tap',
            handler: 'bTap'
        },
        {
            selector: '#add',
            type: 'tap',
            handler: 'add'
        }
    ],
    aTap: function () {
        alert(1);
    },
    bTap: function () {
        alert(2);
    },
    add: function () {
        alert(3);
    }
})