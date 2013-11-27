/**
 * Created by 宇乔 on 13-11-27.
 */
jex.extend({

    animate: function (el, distance, afterAnimation) {

        var s = el.style;
        s.webkitTransition = '-webkit-transform 1s';
        s.webkitTransform = 'translate3d(' + distance + 'px,0,0)';

        var after = function () {
            if (jex.isFunction(afterAnimation)) {
                afterAnimation();
                el.removeEventListener("webkitTransitionEnd", after);
            }
        }

        el.addEventListener("webkitTransitionEnd", after, false);
    }
})