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

    /*
     * 功能: 递归 给父元素加DOM
     *
     * 参数：
     * items:  所有子元素
     *  main:  tab main的 容器
     *  bars:  tab bars 容器
     *  isItem: 是不是一个tab的 页面
     * */
    setChildDom: function (items, main, bars, isItem, itemContainer, itemBarContainer) {
        var that = this;

        if (isItem) {
            itemContainer = document.createElement('div');
            itemContainer.className = jex.prefix + 'main-item';
            itemBarContainer = document.createElement('div');
            itemBarContainer.className = jex.prefix + 'tab-item';
        }

        jex.each(items, function (item, index) {
            if (item.childs && item.childs.length > 0) {
                that.setChildDom(item.childs, main, bars, false, item.element, itemBarContainer);
            }


            var el = jex.instancesManager.getIns(item.uid).element;
            itemContainer.appendChild(el);
            main.appendChild(itemContainer);

            if (isItem) {
                var bar = document.createElement('div');
                bar.className = jex.prefix + 'tab-item-inner';
                bar.innerText = item.barText;
                itemBarContainer.appendChild(bar);
                bars.appendChild(itemBarContainer);
                //确保同一个页面的所有元素对应一个tab
                isItem = false;
            }


        });


    },

    rendered: function () {


    }






})