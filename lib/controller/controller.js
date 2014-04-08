/**
 * Created by 宇乔 on 13-11-25.
 */
jex.define('controller', {
    type: 'ctl',
    view: '',
    alias: 'controller',

    controls: [],


    init: function () {
        var that = this;
        var controls = this.controls;
        jex.ctl[this.alias] = {
            getView: function () {
                return jex.instancesManager.getbyAlias(that.view)[0];
            }
        }
        jex.each(controls, function (item, index) {
            var type = item.type,
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
                jex.EventManager.subscribe(type, fn, selector,jex.ctl[that.alias].getView());
            } else {
                jex.error.show('Event Hansler must be funcion !but this is a ' + typeof fn);
            }
        });
    }
})