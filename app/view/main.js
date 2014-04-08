/**
 * Created by 宇乔 on 13-11-21.
 */
jex.define('main', {
    alias: 'main',
    extend: 'tab',
    type: 'view',
    id: 'main',
    config: {

    },
    items: [
        {
            title: '精选',
            items: [
                {
                    alias: 'index'
                }
            ]

        },
        {
            title: 'RSS',
            items: [
                {
                    alias: 'rss'
                }
            ]
        },
        {
            title: '出版',
            items: [
                {
                    alias: 'history'
                }
            ]

        },
        {
            title: '男生',
            items: [
                {
                    alias: 'profile'
                }
            ]

        },
        {
            title: '女生',
            items: [
                {
                    alias: 'profile'
                }
            ]

        }
    ],
    rendered: function () {

    }
});