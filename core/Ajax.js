/**
 * Created by 宇乔 on 13-11-29.
 */
jex.extend({
    request: function (opt, fn) {
        var xhr;
        if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
            xhr = new XMLHttpRequest();
        }
        else {// code for IE6, IE5
            xhr = new ActiveXObject("Microsoft.XMLHTTP");
        }
        var url = opt.url,
            type = opt.dataType,
            params = opt.params,
            method = opt.method || 'get';

        xhr.open(method, jex.ajax.generateUrl(url, params), true);

        xhr.send();

        xhr.onreadystatechange = function () {
            if (xhr.readyState < 4) {
                return;
            }

            if (xhr.status !== 200) {
                return;
            }

            // all is well
            if (xhr.readyState === 4) {
                fn(xhr);
            }
        }
    },
    generateUrl: function (base, para) {

        base += '?';
        jex.each(para, function (val, key) {
            base += key + '=' + val + '&';
        })

        if (para) {
            base = base.substr(0, base.length - 2);
        }

        return base;


    }


}, jex.ajax);