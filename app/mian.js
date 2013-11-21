/**
 * Created by 宇乔 on 13-11-21.
 */
jex.define('main', {
    alias: 'main',
    extend: 'panel',
    config: {

    },
    items: [
        {
            alias: 'panel',
            id: 'wai',
            items: [
                {
                    alias: 'titlebar'
                }
            ]

        },
        {
            alias: 'titlebar',
            id: 'wai'
        }
    ]

});