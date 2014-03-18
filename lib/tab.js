/**
 * Created by 宇乔 on 13-11-21.
 */
jex.define('tab', {
    alias: 'tab',
    type: 'view',

    isComponet: 'true',
    ready: function () {
    },
    getTab: function () {
    },
    beforeRender: function () {

        this.zIndex = 5;

        var items = this.childs;
        var tabCount = items.length;

        var that = this;
        var info = jex.html.getInfo(this.extend),
            dom = info.dom(),
            clsList = info.getClsList(),
            mainCls = clsList.main,
            bars = clsList.bars;

        //获取 内容和tab bars 的 容器dom
        var main = dom.querySelector('.' + mainCls);
        var bars = dom.querySelector('.' + bars);
        var isItem = true;

        if (this.id) {
            this.element.id = this.id;
        }
        this.currentIndex = 0;
        this.lastIndex = 0;
        this.statues = '';

        //设置默认显示第一个 tab
        jex.each(items, function (item, index) {
            that.setChildDom(item, main, bars, isItem);
        });

        //清空 html , 使用便利好的元素去填充 tab
        this.element.innerHTML = '';
        this.element.appendChild(main);
        this.element.appendChild(bars);
        jex.instancesManager.update(this);

        // 获取所有的bar和内容
        var bar = bars.childNodes;
        var contents = main.childNodes;

        var items = [];
        //设置item 对象，每个 item 包含 内容和 tab元素
        for (var i = 0, len = bar.length; i < len; i++) {
            items.push({
                content: contents[i],
                bar: bar[i],
                index: i
            });

            //tab 加点击事件
            (function (index) {
                jex.EventManager.subscribe('tab', function () {
                    var item = that.getItem(index);
                    if (that.currentIndex != item.index) {
                        that.beforeTurn(item, function () {
                            //移动当前要显示的item 的 位置
                            that.statues = 'turning';
                            var distance = that.getItem(0).content.offsetWidth;
                            var lastItem = that.getItem(that.lastIndex).content;

                            //移动上一页完之后，把上一页面 left 归0
                            jex.animate(lastItem, that.currentIndex < that.lastIndex ? -distance : distance, function () {
                                lastItem.style.zIndex = 0;
                                jex.animate(lastItem, 0);
                            });

                            //移动当前要显示的元素到视觉窗口
                            jex.animate(that.getItem(that.currentIndex).content, 0, function () {
                                that.statues = 'turned';
                            });
                        });
                    }
                }, '#' + bar[index].id);
            }(i));
        }

        //设置 公用方法 获取 tab  的 Item
        this.getItem = function (index) {
            if (!jex.isNumber(index)) {
                return items;
            } else {
                return items[index];
            }
        }

        //设置默认 第一个item 显示出来
        this.getItem(0).content.style.zIndex = this.zIndex;
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
            itemContainer.className = jex.prefix + 'tab-main-item';
            itemContainer.id = jex.prefix + 'tab-main-item' + Math.floor(Math.random() * 10000);
            itemBarContainer = document.createElement('div');
            itemBarContainer.className = jex.prefix + 'tabbar-item';
            itemBarContainer.id = jex.prefix + 'tabbar' + Math.floor(Math.random() * 10000);

            //设置fire属性 使其可以触发事件  。 /false 则屏蔽事件
            itemBarContainer.setAttribute('fire', true);
            itemBarContainer.setAttribute('event-type', 'tab');
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
                bar.className = jex.prefix + 'tab-bar-inner';
                bar.innerText = item.barText;


                itemBarContainer.appendChild(bar);
                bars.appendChild(itemBarContainer);
                bar.id = jex.prefix + 'tab-bar-inner' + Math.floor(Math.random() * 10000);
                //确保同一个页面的所有元素对应一个tab

                isItem = false;
            }
        });
    },

    beforeTurn: function (item, fn) {

        var that = this;
        //更改当前item的 index
        this.statues = 'before';
        this.lastIndex = this.currentIndex;
        this.currentIndex = item.index;

        //移动当前要显示的item 的 位置
        var distance = that.getItem(0).content.offsetWidth;
        var el = this.getItem(this.currentIndex).content;

        /*
         * 动画的逻辑
         *
         * 1.把点击 tab 相对应的 item 移动到当前显示的 item 左边或者右边
         * 2.移动当前显示的item 和 即将显示的item。
         * 3.显示即将显示的item,隐藏之前显示的item
         */
        jex.animate(el, that.currentIndex < that.lastIndex ? distance : -distance, function () {
            el.style.zIndex = that.zIndex;
            if (jex.isFunction(fn)) {
                fn();
            }
        }, 0.16);

    },
    turned: function (item) {
        this.currentIndex = item.index;
        console.log('end' + this.currentIndex);
    },
    rendered: function () {

        var that = this;


        //设置公用属性


    }
})