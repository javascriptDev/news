/**
 * Created by 宇乔 on 13-11-21.
 */
jex.define('tab', {
    alias: 'tab',
    type: 'view',
    isComponet: 'true',

    getTab: function () {
    },
    ready: function () {


    },


    beforeRender: function () {
        var items = this.childs;

        var that = this;
        var info = jex.html.getInfo(this.extend),
            dom = info.dom(),
            clsList = info.getClsList(),
            mainCls = clsList.main,
            bars = clsList.bars;

        var main = dom.querySelector('.' + mainCls);
        var bars = dom.querySelector('.' + bars);

        var isItem = true;

        jex.each(items, function (item, index) {
            that.setChildDom(item, main, bars, isItem);
        });

        //清空 html , 使用便利好的元素去填充 tab
        this.element.innerHTML = '';
        this.element.appendChild(main);
        this.element.appendChild(bars);

        jex.classManager.updateModel(this);


    },
    setChildDom: function (items, main, bars, isItem) {
        var that = this;
        var itemContainer = null, barContainer = null;
        if (isItem) {
            itemContainer = document.createElement('div');
            itemContainer.className = jex.prefix + 'main-item';
            barContainer = document.createElement('div');
            barContainer.className = jex.prefix + 'tab-item';
        }

        jex.each(items, function (item, index) {
            if (item.items && item.items.length > 0) {
                that.setChildDom(item, main, bars, false);
            }
            if (itemContainer) {

                var el = jex.create(item.alias).element;
                itemContainer.appendChild(el);
                main.appendChild(itemContainer);
            }
            if (barContainer) {
                var bar = document.createElement('div');
                bar.className = jex.prefix + 'tab-item-inner';
                bar.innerText = item.barText;
                barContainer.appendChild(bar);
                bars.appendChild(barContainer);
                barContainer = null;
            }


        });


    },

    rendered: function () {


    }






})