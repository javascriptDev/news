/**
 * Created by 宇乔 on 13-12-5.
 */
jex.define('history', {
    alias: 'history',
    extend: 'viewport',
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
            text: 'panel1',
            items: [
                {
                    alias: 'list',
                    model: 'listmodel',
                    store: 'liststore',

                    tpl: '<div>{name}</div>',
                    itemTap: function (e, data, itemDom) {
                        //itemDom.innerText = itemDom.innerText;
                    }
                }
            ]
        }
    ]

})