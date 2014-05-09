/**
 * Created by 宇乔 on 13-11-20.
 */
jex.define('titlebar', {
    alias: 'titlebar',
    extend: 'panel',
    type: 'view',
    isComponent: 'true',

    defaultCfg: {
        name: 'titlebar',
        text: 'title'
    },
    ready: function () {

    },
    beforeRender: function () {
        this.element.innerText = this.text;
        jex.instancesManager.update(this);
    }
})