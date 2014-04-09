/**
 * Created by 宇乔 on 13-12-4.
 */
    //实例组件管理模块
jex.extend({
    instances: [],
    add: function (ins) {
        this.instances.push(ins);
    },
    getIns: function (uid) {
        var component;
        jex.each(this.getAll(), function (item) {
            if (item.uid == uid) {
                component = item;
                return;
            }
        })
        return component;
    },
    getCmp: function (id) {
        var component;
        jex.each(this.getAll(), function (item) {
            if (item.element.id === id) {
                component = item;
                return;
            }
        })
        return component;
    },
    deleteIns: function (uid) {
        jex.each(this.instances, function (item, index) {
            if (item.uid == uid) {

                this.instances.splice(index, 1);
            }
        })
    },
    getLen: function () {
        return this.instances.length;
    },
    getByIndex: function (i) {
        return this.instances[i];
    },
    getAll: function () {
        return this.instances;
    },
    update: function (model) {
        var index = 0;
        jex.each(this.instances, function (item, i) {
            if (item.uid == model.uid) {
                //todo: 获取想要的数据之后不能及时退出循环
                index = i;
            }
        })
        this.instances[index] = model;
    },
    getbyAlias: function (alias) {
        var result = [];
        jex.each(this.instances, function (item, i) {
            if (item.alias == alias) {
                //todo: 获取想要的数据之后不能及时退出循环
                result.push(item);
            }
        })
        return result;
    }

}, jex.instancesManager)