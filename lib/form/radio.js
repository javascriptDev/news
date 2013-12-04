/**
 * Created by 宇乔 on 13-12-3.
 */

jex.define('radio', {
    alias: 'radio',
    config: {

    },
    isCheck: false,
    setCheck: function (ischeck) {
        this.isCheck = ischeck;
    },
    getIsCheck: function () {
        return this.isCheck;
    },
    setText: function (text) {
        this.element.querySelector('.' + jex.prefix + this.alias + '-text').innerText = text;
    },
    ready: function () {
    },
    beforeRender: function () {
        var text = this.text || 'holder';
        this.setText(text);
        jex.instancesManager.update(this);
    }
})