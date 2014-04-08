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
            text: 'main page',
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
                    store: 'liststore',
                    id: 'index-list',
                    tpl: '<div class=name><img src={img} />{text}</div>',
                    itemTap: function (e, data, itemDom) {
                        //itemDom.innerText = itemDom.innerText
                        console.log(data);
                    }
                }
            ]
        }
    ]
})