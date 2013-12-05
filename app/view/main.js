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
            title: 'News',
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
            title: 'History',
            items: [
                {
                    alias: 'history'
                }
            ]

        },
        {
            title: 'Profile',
            items: [
                {
                    alias: 'profile'
                }
            ]

        }
    ],
    ready: function () {
    }
});