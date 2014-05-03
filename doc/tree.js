/**
 * Created by ad on 14-5-3.
 */
(function () {
    var tree = function (data) {
        this.data = data || [];
    }

    tree.prototype.data = function (data) {
        var typeNode = [];
        var leaf = [];
        if (Object.prototype.toString.call(data) == '[object Array]') {
            data.forEach(function (item, index) {
                //添加到根节点
                typeNode.push(item['type']);


            })

        }

    }

    var a = [
        {
            type: 'control',
            items: [
                {
                    name: 'viewport'
                },
                {
                    name: 'panel'
                },
                {
                    name: 'list'
                }
            ]
        },
        {
            type: 'event',
            items: [
            ]
        },
        {
            type: 'store',
            items: [
                {name: 'storeMgr'},
                {name: 'store'}
            ]
        }

    ]


    window['Tree'] = tree;
}())