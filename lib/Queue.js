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
        var averageSpeed = (function () {
            var base = jex.queue.queueBak,
                lastFive = jex.queue.queueBak.splice(base.length - 5, 5);
            var count = 5;
            var speed = 0;
            var averageSpeed = 0;
            if (base.length >= count) {
                for (var i = 0, len = count - 1; i < len; i++) {
                    console.log(i);
                    speed += Math.abs(( Math.abs(lastFive[i + 1].y) - Math.abs(lastFive[i].y))) / (lastFive[i + 1].timeStamp - lastFive[i].timeStamp);
                }
                averageSpeed = speed / count;
            } else {
                var length = base.length;
                for (var i = 0; i < length - 1; i++) {
                    console.log(i);
                    try {
                        speed += Math.abs(( Math.abs(base[i + 1].y) - Math.abs(base[i].y))) / (base[i + 1].timeStamp - base[i].timeStamp);
                    } catch (ee) {
                        jex.queue.queueBak = [];
                    }
                }
                averageSpeed = speed / count;
            }
            document.querySelector('#add .jex-component-button-inner').innerText = averageSpeed;
            jex.queue.queueBak = [];
        }())


        //  window.cancelAFrame(this.id);
    }


}, jex.queue);