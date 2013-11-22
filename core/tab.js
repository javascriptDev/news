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


        var info = jex.html.getInfo(this.extend),
            dom = info.dom(),
            clsList = info.getClsList(),
            mainCls = clsList.main,
            bars = clsList.bars;

        var main = dom.querySelector('.' + mainCls);
        var bars = dom.querySelector('.' + bars);

        var isItem = true;
        this.setChildDom(items, main, bars, isItem);
    },
    setChildDom: function (items, main, bars, isItem) {
        var that = this;
        var itemContainer, barContainer;
        if (isItem) {
            itemContainer = document.createElement('div');
            itemContainer.className = jex.prefix + 'main-' + itemContainer.childNodes.length;
            barContainer = document.createElement('div');
            barContainer.className = jex.prefix + 'tab-' + barContainer.childNodes.length;
        }

        jex.each(items, function (item, index) {
//            if (item.items) {
//                that.setChildDom(item, main, bars, false);
//            }
//            if (itemContainer) {
//                var fun = jex.generateFc(jex.merge(jex.classManager.getModel(item.alias), item));
//                itemContainer.appendChild(fun.element);
//                main.appendChild(itemContainer);
//            }
//            if (barContainer) {
//                var bar = document.createElement('div');
//                bar.innerText = item.barText;
//                bars.appendChild(bar);
//            }

        });
    },
    rendered: function () {


    }






})