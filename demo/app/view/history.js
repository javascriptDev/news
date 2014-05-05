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
        }

    ]

})