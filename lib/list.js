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
        jex.scroller(el);
    }
})