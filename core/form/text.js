/**
 * Created by 宇乔 on 13-12-3.
 */
jex.define('text', {
    alias: 'text',
    label: '',
    placeHolder: '',
    type: 'view',
    getText: function () {
        return this.element.querySelector('#' + this.element.id + ' .' + jex.prefix + 'text-innertext').value;
    },
    setText: function (text) {
        this.element.querySelector('#' + this.element.id + ' .' + jex.prefix + 'text-innertext').value = text;
    },
    setLabel: function (label) {
        this.element.querySelector('#' + this.element.id + ' .' + jex.prefix + 'text-label').innerText = label;
    },
    ready: function () {

    },
    beforeRender: function () {

        this.setLabel(this.label);

        if (this.placeHolder) {
            this.setText(this.placeHolder);
            jex.addClass(this, 'placeholder');
        }

        jex.instancesManager.update(this);
    }



})