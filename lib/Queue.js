/**
 * Created by 宇乔 on 13-12-3.
 */
jex.extend({
        queue: [],
        queueBak: [],
        init: function () {
            window.requestAFrame = (function () {
                return window.requestAnimationFrame ||
                    window.webkitRequestAnimationFrame ||
                    window.mozRequestAnimationFrame ||
                    window.oRequestAnimationFrame ||
                    // if all else fails, use setTimeout
                    function (callback) {
                        return window.setTimeout(callback, 1000 / 60); // shoot for 60 fps
                    };
            })();

            // handle multiple browsers for cancelAnimationFrame()
            window.cancelAFrame = (function () {
                return window.cancelAnimationFrame ||
                    window.webkitCancelAnimationFrame ||
                    window.mozCancelAnimationFrame ||
                    window.oCancelAnimationFrame ||
                    function (id) {
                        window.clearTimeout(id);
                    };
            })();
            this.id = 0;
            this.startime = 0;
            this.index = 0;
        },

        start: function (el) {
            this.init();
            this.el = el;
            var that = this;
            this.startime = new Date().getTime();
            this.run();
        },
        animate: function () {
            var me = jex.queue;
            if (me.queue.length > 0) {
                var x = me.queue[0].x,
                    y = me.queue[0].y,
                    direction = me.queue[0].direction;
                me.queue.splice(0, 1);
                if (direction == 'y') {
                    jex.animateY(me.el, y);
                }
            }
        },
        run: function () {
            jex.queue.animate();
            jex.queue.id = window.requestAFrame(jex.queue.run);
        },
        add: function (o) {
            jex.queue.queue.push({
                x: o.x,
                y: o.y,
                direction: o.direction,
                timeStamp: o.timeStamp
            });

            jex.queue.queueBak.push({
                x: o.x,
                y: o.y,
                direction: o.direction,
                timeStamp: o.timeStamp
            });
        },
        slowDown: function () {
            var q = jex.queue;
            bak = q.queueBak;
            //  window.cancelAFrame(this.id);
            if (q.isStop()) {
                cancelAFrame(q.id);
            } else {
                var slowDownStamp = 1.5;
//                var base = jex.queue.queueBak,
//                    lastFive = jex.queue.queueBak.splice(base.length - 3, 3);
//                var wrapperSize = jex.queue.el.clientHeight;
//                var timeStamp = (base[base.length - 1].timeStamp - base[0].timeStamp),
//                    distance = Math.round(Math.abs(base[base.length - 1].y - base[0].y));
//                var speed = (distance / timeStamp);
//                var additionDistance = Math.round(wrapperSize / 2.5 * ( speed / 8));
//                var deceleration = 0.0006,
//                    duration = speed / deceleration / 1000;
//                var currentY = Math.round(parseInt(document.querySelector('.jex-component-list').style.webkitTransform.split(',')[1]));
//                document.querySelector('#add .jex-component-button-inner').innerText = additionDistance;

//                var base = parseInt(q.el.style.webkitTransform.split(',')[1]);
//                var distance;
//                var addition = 400;
//                if (bak[bak.length - 1].y - bak[0].y > 0) {
//                    distance = base + addition;
//                } else {
//                    distance = base - addition;
//                }
//                jex.linear(q.el, distance, function () {
//                    if (parseInt(q.el.style.webkitTransform.split(',')[1]) > 5) {
//                        alert(1);
//                        jex.linear(q.el, 0, null, 1);
//                    } else if ((parseInt(q.el.style.webkitTransform.split(',')[1]) + (q.el.offsetHeight - jex.instancesManager.getCmp('viewport').element.offsetHeight)) < -45) {
//                        alert(21);
//                        jex.linear(q.el, jex.instancesManager.getCmp('viewport').element.offsetHeight - q.el.offsetHeight-80, null, 1);
//
//                    }
//                }, slowDownStamp);

                jex.queue.queueBak = [];
            }


            //    jex.queue.queueBak = [];
        },
        isStop: function () {
            var base = jex.queue.queueBak;

            return Math.abs(base[base.length - 2].y - base[base.length - 1].y) < 3;
        }


    },
    jex.queue
)
;