/**
 * Created by 宇乔 on 13-12-4.
 */
    //工具函数 (each, merge),
jex.extend({
    each: function (o, fn) {
        if (jex.isArray(o) || jex.isNodeList(o) || jex.isHtmlCollection(o)) {
            for (var i = 0, len = o.length; i < len; i++) {
                fn(o[i], i);
            }
        } else if (jex.isObject(o)) {
            for (var i in o) {
                fn(o[i], i);
            }
        }
    },
    merge: function (o1, o2) {
        jex.each(o2, function (item, key) {
            o1[key] = item;
        })
        return o1;
    },
    deepCopy: function (o) {
        var obj = {};
        for (var i in o) {
            obj[i] = o[i];
        }
        return obj;
    },
    addClass: function (el, cls) {
        el.className = (el.className += ' ' + cls);
    },
    replaceClass: function (el, oldcls, newcls) {
        el.className = el.className.replace(oldcls, newcls);
    }
});
