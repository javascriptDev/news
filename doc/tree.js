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
                } else if (cls == 'icon') {

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
    var c = document.createElement('div');
    c.className = 'j-tree';
    var tree = function (cfg) {
        this.data = data;
        this.el = c;
        this.leafClick = cfg.leafClick || null;
    }
    tree.prototype.render = function (data) {
        var me = this, el = [];
        Array.prototype.forEach.call(data || this.data, function (item, index) {
            var area = document.createElement('div');
            area.className = 'area-type';
            area.appendChild(nodeDom(item.node));

            var leafColl = document.createElement('div');
            leafColl.className = 'leaf-container';

            Array.prototype.forEach.call(item.items, function (leaf) {
                leafColl.appendChild(leafDom(leaf.name,item.node));
            });
            area.appendChild(leafColl);
            me.el.appendChild(area);
        });
        addEvent.call(this);
        return this.el;
    }
    window['Tree'] = tree;
}()
    )

