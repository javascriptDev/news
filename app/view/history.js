/**
 * Created by 宇乔 on 13-12-5.
 */
jex.define('history', {
    alias: 'history',
    extend: 'viewport',
    id: 'history',
    items: [
        {
            alias: 'titlebar',
            text: 'History',
            items: [
                {
                    alias: 'button',
                    text: 'add',
                    align: 'left',
                    id: 'add',
                    style: 'maxWidth:50px'
                }
            ]
        },
        {
            alias: 'panel',
            style: 'marginTop:40px',
            items: [
                {
                    alias: 'list',
                    model: 'listmodel',
                    store: 'historyStore',

                    tpl: '<div class=name>{text}</div>',
                    itemTap: function (e, data, itemDom) {
                        //itemDom.innerText = itemDom.innerText;
                    }
                }
            ]
        }
    ]

})