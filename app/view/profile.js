/**
 * Created by 宇乔 on 13-12-5.
 */
jex.define('profile', {
    alias: 'profile',
    extend: 'viewport',
    items: [
        {
            alias: 'titlebar',
            text: 'Profile',
            items: [
                {
                    alias: 'button',
                    text: 'add',
                    align: 'left',
                    id: 'login'
                }
            ]
        },
        {
            alias: 'panel',
            text: 'panel1'


        }
    ]
})