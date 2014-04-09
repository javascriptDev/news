/**
 * Created by John on 2014/4/9.
 */
var a = [1, 2, 3];

function aaa(bb) {
    var aa;
    a.forEach(function (a) {
        if (a == bb) {
            aa = a;
        }
    })
    return aa;
}