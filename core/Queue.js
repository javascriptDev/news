/**
 * Created by 宇乔 on 13-12-3.
 */
jex.extend({
    queue: [],
    queue1: [],
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

        if (window.performance) {// ipad mini 不支持 performance
            if (window.performance.now)
                this.startime = window.performance.now();
        } else {
            this.startime = Date.now();
        }

        this.id = window.requestAFrame(this.run);
    },

    run: function () {

        var x = jex.queue.queue[0].x,
            y = jex.queue.queue[0].y;

        jex.queue.queue = jex.queue.queue.splice(1);
        console.log(y);

        jex.animateY(jex.queue.el, y);
        jex.queue.id = window.requestAFrame(jex.queue.run)

    },
    add: function (x, y) {
        jex.queue.queue.push({
            x: x,
            y: y
        });

        jex.queue.queue1.push({
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