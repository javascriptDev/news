/**
 * Created by 宇乔 on 13-11-25.
 */

jex.define('button', {
    alias: 'button',
    extend: 'panel',
    config: {
        fire: true
    },
    type: 'view',
    ready: function () {
        console.log('button-->' + this.element.outerHTML);
    },
    beforeRender: function () {


        var align = this.align || left;
        if (this.id) {
            this.element.id = this.id;
        }
        this.element.className += ' button-align-' + align;

        var btnInner = document.createElement('div');
        btnInner.className = jex.prefix + 'button-inner';
        btnInner.id = jex.prefix + 'button-inner' + Math.floor(Math.random() * 10000);
        btnInner.innerText = this.text || 'undefined';
        btnInner.setAttribute('fire', this.config.fire || this.fire);

        this.element.appendChild(btnInner);
        jex.instancesManager.update(this);
    }

})