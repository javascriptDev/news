/**
 * Created by 宇乔 on 13-12-4.
 */
    //实例组件管理模块
jex.extend({
    instances: [],
    add: function (ins) {
        jex.instancesManager.instances.push(ins);
    },
    getIns: function (uid) {
        var component;
        jex.each(jex.instancesManager.getAll(), function (item) {
            if (item.uid == uid) {
                //todo: 获取想要的数据之后不能及时退出循环
                component = item;
            }
        })
        return component;
    },
    getCmp: function (id) {
        var component;
        jex.each(jex.instancesManager.getAll(), function (item) {
            if (item.element.id == id) {
                //todo: 获取想要的数据之后不能及时退出循环
                component = item;
            }
        })
        return component;
    },
    deleteIns: function (uid) {
        jex.each(jex.instancesManager.instances, function (item, index) {
            if (item.uid == uid) {
                //todo: 获取想要的数据之后不能及时退出循环
                jex.instancesManager.instances.splice(index, 1);
            }
        })
    },
    getLen: function () {
        return jex.instancesManager.instances.length;
    },
    getByIndex: function (i) {
        return jex.instancesManager.instances[i];
    },
    getAll: function () {
        return jex.instancesManager.instances;
    },
    update: function (model) {
        var index = 0;
        jex.each(jex.instancesManager.instances, function (item, i) {
            if (item.uid == model.uid) {
                //todo: 获取想要的数据之后不能及时退出循环
                index = i;
            }
        })
        jex.instancesManager.instances[index] = model;
    },
    getbyAlias: function (alias) {
        var result = [];
        jex.each(jex.instancesManager.instances, function (item, i) {
            if (item.alias == alias) {
                //todo: 获取想要的数据之后不能及时退出循环
                result.push(item);
            }
        })
        return result;
    }

}, jex.instancesManager)