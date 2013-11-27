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
            title: 'news',
            items: [
                {
                    alias: 'titlebar',
                    text: 'news',
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
                    text: 'panel1'
//                    items: [
//                        {
//                            alias: 'list',
//                            model: '',
//                            store: '',
//                            tpl: ''
//                        }
//                    ]
                }
            ]

        },
        {
            title: 'info',
            items: [
                {
                    alias: 'titlebar',
                    text: 'info',
                    items: [
                        {
                            alias: 'button',
                            text: 'select',
                            id: 'a',
                            align: 'left'
                        },
                        {
                            alias: 'button',
                            text: 'cancel',
                            id: 'b',
                            align: 'right'
                        }
                    ]
                },
                {
                    alias: 'panel',
                    text: 'asdasd'
                }
            ]
        },
        {
            title: 'MyInfo',
            items: [
                {
                    alias: 'titlebar',
                    text: 'MyInfo',
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
                    text: 'panel1'
//                    items: [
//                        {
//                            alias: 'list',
//                            model: '',
//                            store: '',
//                            tpl: ''
//                        }
//                    ]
                }
            ]

        },
        {
            title: 'Login In',
            items: [
                {
                    alias: 'titlebar',
                    text: 'Login In',
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
                    text: 'panel1'
//                    items: [
//                        {
//                            alias: 'list',
//                            model: '',
//                            store: '',
//                            tpl: ''
//                        }
//                    ]
                }
            ]

        }
    ],
    ready: function () {
    }
});