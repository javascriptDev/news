/**
 * Created by 宇乔 on 13-11-21.
 */
jex.define('tab', {
    alias: 'tab',
    type: 'view',

    getTab: function () {
    },
    ready: function () {


    },


    beforeRender: function () {
        var items = this.childs;


        var info = jex.html.getInfo(this.alias),
            dom = info.dom(),
            clsList = info.getClsList(),
            mainCls = clsList.main,
            bars = clsList.bars;

        var main = dom.querySelector('.' + mainCls);
        var bars = dom.querySelector('.' + bars);

        this.setChildDom(items, main, bars);
    },
    setChildDom: function (items) {
        var that = this;
        jex.each(items, function (item, index) {
            if (item.items) {
                that.setChildDom(item);
            }


        });


    },
    rendered: function () {


    }






})