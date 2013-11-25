/**
 * Created by 宇乔 on 13-11-25.
 */
jex.define('controller', {
    type: 'ctl',
    view: '',
    controls: [],

    init: function () {
        var that = this;
        var contorls = this.controls;
        jex.each(contorls, function (item, index) {
            var
                type = item.type,
                fn = item.handler,
                pageId = jex.instancesManager.getbyAlias(that.view)[0].element.id,
                selector = '#' + pageId + ' ' + item.selector;

            var handler;
            if (jex.isString(fn)) {
                if (that[fn]) {
                    fn = that[fn];
                }
            }

            if (jex.isFunction(fn)) {
                jex.EventManager.subscribe(type, fn, selector);
            } else {
                jex.error.show('Event Hansler must be funcion !but this is a ' + typeof fn);
            }


        });


    }




})