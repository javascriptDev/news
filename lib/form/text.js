/**
 * Created by 宇乔 on 13-12-3.
 */
jex.define('text', {
    alias: 'text',
    label: '',
    placeHolder: '',
    type: 'view',
    defaultCfg: {
        label: 'label'
    },
    getText: function () {
        return this.element.querySelector('#' + this.element.id + ' .' + jex.prefix + this.alias + '-innertext').value;
    },
    setText: function (text) {
        this.element.querySelector('#' + this.element.id + ' .' + jex.prefix + this.alias + '-innertext').value = text;
    },
    setLabel: function (label) {
        this.element.querySelector('#' + this.element.id + ' .' + jex.prefix + this.alias + '-label').innerText = label;
    },
    setPlaceHolder: function (text) {
        this.element.querySelector('#' + this.element.id + ' .' + jex.prefix + this.alias + '-innertext').setAttribute('placeholder', text);
    },
    ready: function () {

    },
    beforeRender: function () {

        this.setLabel(this.label);

        if (this.placeHolder) {
            this.setPlaceHolder(this.placeHolder);
            jex.addClass(this, 'placeholder');
        }

        jex.instancesManager.update(this);
    }



})