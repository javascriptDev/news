/**
 * Created by 宇乔 on 13-11-27.
 */
jex.extend({

    animate: function (el, distance, afterAnimation, seconds, type) {

        var s = el.style;
        if (!jex.isNumber(seconds) || seconds == undefined) {
            seconds = 1;
        }
        type = type || 'cubic-bezier(0,1,0,1)';
        var after = function (e) {
            console.log('animate over');
            if (jex.isFunction(afterAnimation)) {
                afterAnimation();
            }
            el.removeEventListener("webkitTransitionEnd", after);
        }
        el.addEventListener("webkitTransitionEnd", after, false);

        s.webkitTransition = '-webkit-transform ' + seconds + 's ' + type;
        s.webkitTransform = 'translate3d(' + distance + 'px,0,0)';
        s.webkitBackfaceVisibility = 'hidden';
        s.webkitPerspective = 1000;
    },
    addEvent: function PrefixedEvent(element, type, callback) {
        var pfx = ["webkit", "moz", "MS", "o", ""];
        for (var p = 0; p < pfx.length; p++) {
            if (!pfx[p]) type = type.toLowerCase();
            element.addEventListener(pfx[p] + type, callback, false);
        }
    },
    animateY: function (el, distance, afterAnimation, seconds, type) {

        var s = el.style;
        if (!jex.isNumber(seconds) || seconds == undefined) {
            seconds = 1;
        }
        type = type || 'cubic-bezier(0,1,0,1)';
        s.webkitTransition = '-webkit-transform ' + seconds + 's cubic-bezier(0,1,0,1)';
        s.webkitTransform = 'translate3d(0,' + distance + 'px,0)';

        var after = function () {
            if (jex.isFunction(afterAnimation)) {
                afterAnimation();
            }
            el.removeEventListener("webkitTransitionEnd", after);
        }

        el.addEventListener("webkitTransitionEnd", after, false);
    },
    linear: function (el, distance, afterAnimation, seconds) {
        this.animateY(el, distance, afterAnimation, seconds, 'cubic-bezier(0,0,0,0)')
    }
})