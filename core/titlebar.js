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

        var text = document.createElement('div');
        text.className = jex.prefix + 'titlebar-text';
        text.innerText = this.text;
        this.element.appendChild(text);


        jex.instancesManager.update(this);
    }
})