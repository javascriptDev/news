/**
 * Created by addisonJoe on 14-3-18.
 */
jex.define('historyStore', {
    alias: 'historyStore',
    type: 'store',
    extend: 'store',

    config: {
        url: 'data/sports.json',
        method: 'get',
        dataType: 'json'
    },
    model: 'listmodel'
})