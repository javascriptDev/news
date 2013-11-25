/**
 * Created by 宇乔 on 13-11-20.
 */
jex.define('titlebar', {
    alias: 'titlebar',
    extend: 'panel',
    type: 'view',
    isComponet: 'true',
    config: {
        name: 'titlebar'
    },
    ready: function () {
        console.log('titlebar' + this.element.outerHTML);
    },
    beforeRender: function () {

        this.element.innerText = this.text;

        jex.instancesManager.update(this);
    }
})