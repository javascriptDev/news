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
                    tpl: '<img  src={img}  class=book /><div style=-webkit-box-flex:1;margin-left:20px;><div class=title>{title}</div><div class=author>{author}</div><div class=profile>{profile}</div></div>',
                    itemTap: function (e, data, itemDom) {
                        //itemDom.innerText = itemDom.innerText
                        console.log(data);
                    }
                }
            ]
        }
    ],
    rendered: function () {
//        var alert = jex.create('alert', {
//            title: '',
//            content: '',
//            buttons: [
//                {
//                    text: 'ok',
//                    tap: function () {
//                        alert(1);
//                    }
//                },
//                {
//                    text: 'cancel',
//                    tap: function () {
//
//                    }
//                }
//            ]
//        });
//        this.add(alert);
    }
})