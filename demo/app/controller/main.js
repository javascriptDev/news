/**
 * Created by 宇乔 on 13-11-25.
 */
jex.define('main', {
    extend: 'controller',
    view: 'index',
    type: 'ctl',
    alias: 'index',
    controls: [
//        {
//            selector: '#a',
//            type: 'tap',
//            handler: 'aTap'
//        },
//        {
//            selector: '#b',
//            type: 'tap',
//            handler: 'bTap'
//        },
        {
            selector: '#add',
            type: 'tap',
            handler: 'aTap'

        }//,
//        {
//            selector: '#login',
//            type: 'tap',
//            handler: 'bTap'
//        },
//        {
//            selector: '#submit',
//            type: 'tap',
//            handler: 'add'
//        }
    ],
    aTap: function () {
        this.getCld('alert')[0].show();
    },
    bTap: function () {
        alert(2);
    },
    add: function () {
        alert(3);
    }
})