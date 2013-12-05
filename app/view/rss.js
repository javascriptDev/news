/**
 * Created by 宇乔 on 13-12-5.
 */
jex.define('info', {
    alias: 'rss',
    extend: 'viewport',
    items: [
        {
            alias: 'titlebar',
            text: 'RSS',
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
            items: [
                {
                    alias: 'text',
                    label: 'name'
                },
                {
                    alias: 'password',
                    label: 'pwd'
                },
                {
                    alias: 'radio',
                    text: 'sex'
                }
            ]
        }
    ]
})