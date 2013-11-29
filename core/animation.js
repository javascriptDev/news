/**
 * Created by 宇乔 on 13-11-27.
 */
jex.extend({

    animate: function (el, distance, afterAnimation, seconds) {

        var s = el.style;
        if (!jex.isNumber(seconds) || seconds == undefined) {
            seconds = 1;
        }
        s.webkitTransition = '-webkit-transform ' + seconds + 's cubic-bezier(0,.53,0,.99)';
        s.webkitTransform = 'translate3d(' + distance + 'px,0,0)';

        var after = function () {
            if (jex.isFunction(afterAnimation)) {
                afterAnimation();
            }
            el.removeEventListener("webkitTransitionEnd", after);
        }

        el.addEventListener("webkitTransitionEnd", after, false);
    }
})