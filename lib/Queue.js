/**
 * Created by 宇乔 on 13-12-3.
 */
jex.extend({
    queue: [],
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
        //  this.id = window.requestAFrame.call(this, this.run);
    },

    run: function () {

        var x = this.queue[0].x,
            y = this.queue[0].y,
            direction = this.queue[0].direction;

        this.queue.splice(0, 1);
        console.log(y);

        if (direction == 'y') {
            jex.animateY(this.el, y);
        }
        jex.queue.id = window.requestAFrame.call(this, this.run)

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