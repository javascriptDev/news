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
        this.addEvent();
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
    addEvent: function () {
        var el = this.element;
        var isMove = false;
        var that = this;
        var sx, sy;
        var beginY = 0;

        el.addEventListener('touchstart', function (e) {
            e.preventDefault();
            e.stopPropagation();
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
                jex.animateY(jex.queue.el, moveY);
            }
        }, false);

        el.addEventListener('touchend', function (e) {
            isMove = false;
            jex.queue.stop();

        }, false);


    }

})