/**
 * Created by 宇乔 on 13-12-5.
 */
jex.define('index', {
    alias: 'index',
    extend: 'viewport',
    id: 'index',
    items: [
        {
            alias: 'titlebar',
            text: 'News',
            items: [
                {
                    alias: 'button',
                    text: 'add',
                    align: 'left',
                    id: 'add'
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