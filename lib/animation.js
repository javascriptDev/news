/**
 * Created by 宇乔 on 13-11-27.
 */
jex.extend({

    animate: function (el, distance, afterAnimation, seconds) {

        var s = el.style;
        if (!jex.isNumber(seconds) || seconds == undefined) {
            seconds = 0.5;
        }
        s.webkitTransition = '-webkit-transform ' + seconds + 's cubic-bezier(0,1,0,1)';
        s.webkitTransform = 'translate3d(' + distance + 'px,0,0)';
        s.webkitBackfaceVisibility = 'hidden';
        s.webkitPerspective = 1000;


        var after = function (e) {
            if (jex.isFunction(afterAnimation)) {
                afterAnimation();
            }
            el.removeEventListener("webkitTransitionEnd", after);
        }
        el.addEventListener("webkitTransitionEnd", after, false);
    },
    addEvent: function PrefixedEvent(element, type, callback) {
        var pfx = ["webkit", "moz", "MS", "o", ""];
        for (var p = 0; p < pfx.length; p++) {
            if (!pfx[p]) type = type.toLowerCase();
            element.addEventListener(pfx[p] + type, callback, false);
        }
    },
    animateY: function (el, distance, afterAnimation, seconds) {

        var s = el.style;
        if (!jex.isNumber(seconds) || seconds == undefined) {
            seconds = 1;
        }
        s.webkitTransition = '-webkit-transform ' + seconds + 's cubic-bezier(0,1,0,1)';
        s.webkitTransform = 'translate3d(0,' + distance + 'px,0)';

        var after = function () {
            if (jex.isFunction(afterAnimation)) {
                afterAnimation();
            }
            el.removeEventListener("webkitTransitionEnd", after);
        }

        el.addEventListener("webkitTransitionEnd", after, false);
    }
})