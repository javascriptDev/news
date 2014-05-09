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
            title: 'main',
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
            title: 'list',
            items: [
                {
                    alias: 'history'
                }
            ]

        },
        {
            title: 'form',
            items: [
                {
                    alias: 'profile'
                }
            ]

        },
        {
            title: 'form2',
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