/**
 * Created by 宇乔 on 13-11-29.
 */
jex.define('liststore', {
    alias: 'liststore',
    type: 'store',
    extend: 'store',

    config: {
        url: 'data/china.json',
        method: 'get',
        dataType: 'json'
    },
    model: 'listmodel'
});