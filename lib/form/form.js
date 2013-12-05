/**
 * Created by 宇乔 on 13-12-3.
 */
jex.define('form', {
    alias: 'form',
    extend: 'viewport',
    getValues: function () {
    },
    setValues: function () {
    },
    beforeRender: function () {
        var childs = this.childs;
        var form = jex.html.getInfo(this.alias).dom().querySelector('form');
        jex.each(childs, function (item) {
            form.appendChild(item.element);
        });
        this.element.innerHTML = form.outerHTML;

        //todo:form 元素重复
        jex.instancesManager.update(this);

    },
    rendered: function () {

        //TODO:form 里面的元素会重复的问题，暂时没找到原因。只好在 render之后再删除重复的元素
        var form = this.element.querySelector('form');

        this.element.innerHTML = form.outerHTML;
        jex.instancesManager.update(this);
    }

})