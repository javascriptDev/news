/**
 * Created by 宇乔 on 13-11-27.
 */
jex.extend({

    animate: function (el, direction, distance) {

        var s = el.style;

        var dis = distance;
        if (distance == 'left') {
            dis = (-dis);
        }


        s.webkitTransition = '-webkit-transform 1s';
        s.webkitTransform = 'translate3d(' + dis + 'px,0,0)';
    }
})