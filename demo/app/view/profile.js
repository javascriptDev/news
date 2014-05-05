/**
 * Created by ���� on 13-12-5.
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
                    text: 'submit',
                    align: 'left',
                    id: 'login',
                    style: 'maxWidth:80px'
                }
            ]
        },
        {
            alias: 'panel',
            items: [
                {
                    alias: 'form',
                    style: 'marginTop:40px;',
                    items: [
                        {

                            alias: 'text',
                            placeHolder: 'username',
                            label: '�˻�'
                        },
                        {
                            alias: 'password',
                            label: '����'

                        },
                        {
                            alias: 'button',
                            text: '�ύ',
                            style: 'height:60px',
                            id:'submit'


                        }
                    ]
                }
            ]


        }
    ]
})