/**
 * Created by 宇乔 on 13-11-27.
 */
jex.define('list', {
    alias: 'list',
    model: '',
    store: '',
    tpl: '',

    ready: function () {


    },
    load: function () {
    },
    clearList: function () {
    },
    init: function () {
        var data = this.getData();
        var tpl = this.tpl;
        var field = tpl.match(/\{(.|\n|\r)*?\}/g);
        var html = '';
        jex.each(data, function (item) {
            jex.each(field, function (field) {
                html += tpl.replace(field, item[field.replace('{', '').replace('}', '')]);
            })
        })
        this.html = html;
        this.element.innerHTML = html;

        jex.instancesManager.update(this);
    },
    beforeRender: function () {
        var store = this.store;
        var that = this;


        var fn = jex.classManager.getClass(store, 'store');
        new fn().load(function (dataArray) {
            that.getData = function () {
                return dataArray;
            }
            that.init();
        })


    },
    render: function () {


    }

})