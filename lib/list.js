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
        var that = this;
        jex.each(data, function (item) {
            var listitem = document.createElement('div');
            listitem.className = jex.prefix + 'list-item';
            listitem.id = jex.prefix + 'list-item' + jex.random();
            listitem.setAttribute('fire', true);

            var html = tpl;
            jex.each(field, function (text) {
                html = html.replace(text, item[text.replace('{', '').replace('}', '')]);
            });


            var itemInner = document.createElement('div');
            itemInner.id = jex.prefix + 'list-item-inner' + jex.random();
            itemInner.className = 'jex-component-list-item-inner normal';
            itemInner.innerHTML = html;
            listitem.appendChild(itemInner);

            that.element.appendChild(listitem);
            html = tpl;
        })

        jex.instancesManager.update(this);
        this.addScrollEvent();
        this.itemTapEvent();
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


    },
    itemTapEvent: function () {
        var that = this;
        if (this.itemTap) {//指定了点击事件
            var els = this.element.childNodes;
            for (var i = 0, len = els.length; i < len; i++) {
                (function (index) {
                    jex.EventManager.subscribe('itemtap', function (e) {
                        var inner = els[index].querySelector('.jex-component-list-item-inner');
                        if (inner.className.indexOf('itemSelected') == -1) {
                            var selected = document.querySelector('.itemSelected');
                            if (selected) {
                                jex.replaceClass(selected, 'itemSelected', 'normal');
                            }
                            jex.replaceClass(inner, 'normal', 'itemSelected');
                        }
                        that.itemTap(e, that.getData()[index], els[index]);
                    }, '#' + els[index].id);
                }(i))
            }
        }
    },
    addScrollEvent: function () {
        var el = this.element;
        var isMove = false;
        var that = this;
        var sx, sy;
        var beginY = 0;

        el.addEventListener('touchstart', function (e) {

            isMove = true;
            sx = e.touches[0].pageX;
            sy = e.touches[0].pageY;
            var y = parseInt(document.querySelector('.jex-component-list').style.webkitTransform.split(',')[1]);

            if (!isNaN(y)) {
                beginY = y;
            }
            jex.queue.add(0, beginY);
            jex.queue.start(that.element);

        }, false);

        el.addEventListener('touchmove', function (e) {
            e.preventDefault();
            e.stopPropagation();
            var moveY = 0;
            if (isMove) {
                var x = e.touches[0].pageX,
                    y = e.touches[0].pageY;

                //判断上边界超出
                if ((beginY - (e.touches[0].pageY - sy)) < 40) {
                    moveY = (beginY - (e.touches[0].pageY - sy));
                }

                //判断下边界超出
                if ((beginY - (e.touches[0].pageY - sy)) < -(jex.queue.el.offsetHeight - window.screen.availHeight + 40)) {
                    moveY = -(jex.queue.el.offsetHeight - window.screen.availHeight);
                }
                console.log(moveY);
                jex.queue.queue.push({x: x, y: moveY, direction: 'y'});
            }
        }, false);

        el.addEventListener('touchend', function (e) {
            isMove = false;
            jex.queue.stop();

        }, false);


    }


})