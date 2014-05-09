/**
 * Created by 宇乔 on 13-11-25.
 */

jex.define('button', {
    alias: 'button',
    extend: 'panel',
    config: {
        fire: true
    },
    defaultCfg: {
        text: 'button'
    },
    type: 'view',
    ready: function () {

    },
    beforeRender: function () {
        var that = this;

        var align = this.align || 'left';
        if (this.id) {
            this.element.id = this.id;
        }
        this.element.className += ' button-align-' + align;
        this.element.setAttribute('fire', this.config.fire || this.fire);
        this.element.setAttribute('event-type', 'tap');

        var btnInner = document.createElement('div');
        btnInner.className = jex.prefix + 'button-inner';
        btnInner.id = jex.prefix + 'button-inner' + Math.floor(Math.random() * 10000);
        btnInner.innerText = this.text || 'undefined';


        this.element.appendChild(btnInner);

        if (this.style) {
            jex.each(this.style.split(';'), function (item) {
                var data = item.split(':');
                that.element.style[data[0]] = data[1];
            });
        }
        jex.instancesManager.update(this);
    }

})