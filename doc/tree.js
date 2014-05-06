/**
 * Created by ad on 14-5-3.
 */
(function () {

    var data = [
        {
            node: 'control',
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
            node: 'event',
            items: [
                {
                    name: 'eventBase'
                }
            ]
        },
        {
            node: 'store',
            items: [
                {name: 'storeMgr'},
                {name: 'store'}
            ]
        }
    ]

    //点击类别的时候
    var nodeFuc = function (dom) {
        var el = dom.querySelector('i'),
            cls = el.className;
        if (cls.indexOf('collapse') != -1) {
            el.className = cls.replace('collapse', 'expand');
            dom.parentNode.querySelector('.leaf-container').style.display = 'block';

        } else {
            el.className = cls.replace('expand', 'collapse');
            dom.parentNode.querySelector('.leaf-container').style.display = 'none';
        }

    };

    //点击具体组建的时候
    var leafFunc = function (dom) {
        if (this.leafClick) {
            this.leafClick({
                type: dom.dataset['type'],
                name: dom.dataset['name']
            });
        }

    }

    var addEvent = function () {
        var me = this;
        this.el.onclick = function (e) {
            var cls = e.target.className;
            if (cls) {
                if (cls == 'node-dom') {
                    nodeFuc(e.target);
                } else if (cls == 'leaf-dom') {
                    leafFunc.call(me, e.target);
                } else if (cls == 'middle-dom') {
                    nodeFuc(e.target);
                }
            }
        }
    }
    var nodeDom = function (text) {
        var a = document.createElement('div');
        a.className = 'node-dom';
        a.innerHTML = '<i class="icon expand"></i>' + text;
        return a;
    };
    var leafDom = function (name, type) {
        var a = document.createElement('div');
        a.className = 'leaf-dom';
        a.innerText = name;
        a.setAttribute('data-type', type);
        a.setAttribute('data-name', name);
        return a;
    };
    var middleDom = function (name, type) {
        var a = document.createElement('div');
        a.className = 'middle-dom';
        a.innerHTML = '<i class="icon expand"></i>' + name;
        a.setAttribute('data-type', type);
        a.setAttribute('data-name', name);
        return a;
    };
    var c = document.createElement('div');
    c.className = 'j-tree';
    var tree = function (cfg) {
        this.data = data;
        this.el = c;
        this.leafClick = cfg.leafClick || null;
    }

    function digui(parent, items, type) {
        Array.prototype.forEach.call(items, function (leaf) {
            if (!leaf.items) {
                parent.appendChild(leafDom(leaf.name, type));
            } else {
                var c = document.createElement('div');
                c.className = 'leaf-container';
                var node = middleDom(leaf.name, type);
                parent.appendChild(node);
                parent.appendChild(c);

                digui(c, leaf.items, leaf.name);
            }
        });
    }

    tree.prototype.render = function (data) {
        var me = this, el = [];
        Array.prototype.forEach.call(data || this.data, function (item, index) {

            //添加大类别 like control,event..
            var area = document.createElement('div');
            area.className = 'area-type';
            area.appendChild(nodeDom(item.node));

            //创建该类别下所有节点的容器
            var leafColl = document.createElement('div');
            leafColl.className = 'leaf-container';

            //遍历所有节点,并添加到 leafColl 上
            digui(leafColl, item.items, item.node);

            area.appendChild(leafColl);
            me.el.appendChild(area);
        });
        addEvent.call(this);
        return this.el;
    }
    window['Tree'] = tree;
}()
    )

