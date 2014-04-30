/**
 * Created by 宇乔 on 13-12-4.
 */
jex.define('alert', {
    alias: 'alert',
    extend: 'panel',

    config: {},
    childs: [],
    show: function () {
        this.element.style.display = 'block';
    },
    beforeRender: function () {

        var title = this.title,
            content = this.content,
            buttons = this.buttons;

        var container = jex.html.getDom('alert');

        var body = jex.create('panel');

        Array.prototype.forEach.call(buttons, function (item) {
            var btn = jex.create('button', {
                text: item.text
            });
            body.add(btn);
        });
        this.add(body);

    },
    destroy: function () {
    },
    hide: function () {
        this.element.style.display = 'none';
    }
})