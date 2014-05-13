/**
 * Created by indice on 2014/5/13.
 */
jex.extend({
    scroller:function(el){
        var isMove = false;
        var that = this;
        var sx, sy;
        var beginY = 0;
        var state = '';
        el.addEventListener('touchstart', function (e) {
            sx = e.touches[0].pageX;
            sy = e.touches[0].pageY;
            var y = parseInt(el.style.webkitTransform .split(',')[1]);

            if (!isNaN(y)) {
                beginY = y;
            } else {
                beginY = 0;
            }
            jex.queue.add({x: 0, y: beginY, direction: 'y', timeStamp: new Date().getTime()});
            jex.queue.start(el);

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
                if (parseInt(el.style.webkitTransform .split(',')[1]) > 0) {
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
},jex)