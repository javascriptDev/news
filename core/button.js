/**
 * Created by 宇乔 on 13-11-25.
 */

jex.define('button', {
    alias: 'button',
    extend: 'panel',
    config: {},
    type: 'view',
    ready: function () {
        console.log('button-->' + this.element.outerHTML);
    },
    beforeRender: function () {
        this.element.innerText = this.text || 'undefined';

        var align = this.align || left;
        if (this.id) {
            this.element.id = this.id;
        }
        this.element.className += ' button-align-' + align;


        jex.instancesManager.update(this);
    }

})