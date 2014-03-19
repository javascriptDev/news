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
            console.log(y);
            if (direction == 'y') {
                jex.animateY(me.el, y);
            }
        }
    },
    run: function () {
        jex.queue.animate();
        jex.queue.id = window.requestAFrame(jex.queue.run);
    },
    add: function (x, y) {
        jex.queue.queue.push({
            x: x,
            y: y
        });
    },
    remove: function () {
    },
    stop: function () {

        window.cancelAFrame(this.id);
    }


}, jex.queue);