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
            listitem.setAttribute('event-type', 'itemtap');

            var html = tpl;
            jex.each(field, function (text) {
                html = html.replace(text, item[text.replace('{', '').replace('}', '')]);
            });


            var itemInner = document.createElement('div');
            itemInner.id = jex.prefix + 'list-item-inner' + jex.random();
            itemInner.className = 'jex-component-list-item-inner normal';
            itemInner.innerHTML = html;
            listitem.appendChild(itemInner);

            that.addId(itemInner);
            that.element.appendChild(listitem);
            html = tpl;
        })

        jex.instancesManager.update(this);
        this.addScrollEvent();
        this.itemTapEvent();
    },
    checkId: function (el) {
        if (el.id == '') {
            el.id = (el.className == '' ? 'element' + jex.random() : el.className + jex.random());
        }
    },
    addId: function (el) {
        var that = this;
        var childs = el.children;
        //node type==1 说明元素是个element

        if (childs.length > 0) {

            jex.each(childs, function (item) {
                that.checkId(item);
                that.addId(item);
            })
        } else {
            if (el.id == '') {
                el.id = (el.className == '' ? 'element' + jex.random() : el.className + jex.random());
            }
        }

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
        var state = '';

        el.addEventListener('touchstart', function (e) {

            sx = e.touches[0].pageX;
            sy = e.touches[0].pageY;
            var y = parseInt(el.style.webkitTransform.split(',')[1]);

            if (!isNaN(y)) {
                beginY = y;
            } else {
                beginY = 0;
            }
            jex.queue.add({x: 0, y: beginY, direction: 'y', timeStamp: new Date().getTime()});
            jex.queue.start(that.element);

        }, false);

        el.addEventListener('touchmove', function (e) {
            isMove = true;
            e.preventDefault();
            e.stopPropagation();
            var moveY = 0;
            if (isMove) {
                var x = e.touches[0].pageX,
                    y = e.touches[0].pageY;
                moveY = beginY + (y - sy);
                //判断上边界超出
                if (parseInt(el.style.webkitTransform.split(',')[1]) > 0) {
                    // moveY = (beginY + (y - sy));
                    state = 'up';
                }

                //判断下边界超出
                if ((Math.abs(beginY) - (e.touches[0].pageY - sy)) - (jex.queue.el.offsetHeight - jex.instancesManager.getCmp('viewport').element.offsetHeight + 80) > 5) {
                    //moveY = -(jex.queue.el.offsetHeight - jex.instancesManager.getCmp('viewport').element.offsetHeight + 80);
                    state = 'down'
                }
                jex.queue.add({x: 0, y: moveY, direction: 'y', timeStamp: new Date().getTime()});
            }
        }, false);

        el.addEventListener('touchend', function (e) {
            //  console.log(state);
            isMove = false;
            var moveY;
            if (state != '') {
                if (state == 'up') {
                    moveY = 0;
                } else {
                    moveY = -(jex.queue.el.offsetHeight - jex.instancesManager.getCmp('viewport').element.offsetHeight + 80);
                }
                jex.queue.add({x: 0, y: moveY, direction: 'y', timeStamp: new Date().getTime()});
                state = '';
            }
            //console.dir(jex.queue.queueBak);
            jex.queue.slowDown();

        }, false);
    }
})