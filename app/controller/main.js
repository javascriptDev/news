/**
 * Created by 宇乔 on 13-11-25.
 */
jex.define('main', {
    extend: 'controller',
    view: 'main',
    type: 'ctl',
    contorls: [
        {
            selector: '#a',
            type: 'tap',
            handler: function () {
                alert(1);
            }
        },
        {
            selector: '#b',
            type: 'tap',
            handler: function () {
                alert(2);
            }
        }
    ]


})