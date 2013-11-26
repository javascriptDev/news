/**
 * Created by 宇乔 on 13-11-25.
 */
jex.extend({
    EventManager: {
        events: [],
        Event: function (name) {
            var handlers = [];
            var selectors = [];
            this.getName = function () {
                return name;
            }
            this.addHandler = function (handler) {
                handlers.push(handler);
            }
            this.removeHandler = function (handler) {
                handlers.forEach(function (item, i) {
                    if (item == handler) {
                        handler.splice(i, 1);
                    }
                })
            }
            this.fire = function (eventArgs) {
                handlers.forEach(function (h) {
                    h(eventArgs);
                })
            }
            this.addEl = function (selector) {
                selectors.push(selector);
            }
            this.getSelectors = function () {
                return selectors;
            }
        },
        getEvent: function (name) {
            var fn;
            jex.EventManager.events.forEach(function (item) {
                if (item.getName() == name) {
                    fn = item;
                    return;
                }
            });
            return fn;
        },

        subscribe: function (eventName, handler, selector) {
            var event = jex.EventManager.getEvent(eventName);

            if (!event) {
                event = new jex.EventManager.Event(eventName);
                jex.EventManager.events.push(event);
            }
            event.addHandler(handler);
            event.addEl(selector);
        },

        check: function (event, eventArgs) {

            var result = false;

            /*触发事件的必备条件(满足一个即可触发)
             1.事件元素正好就是注册时候的 元素
             2.事件元素是 事件元素的子元素
             */

            var selectors = event.getSelectors();

            //当前点击的 元素
            var target = eventArgs.srcElement;

            //遍历所有 订阅的 元素
            jex.each(selectors, function (item) {
                if (jex.instancesManager.getbyAlias('viewport')[0].element.querySelector(item) == target) {
                    //todo: 触发事件的必备条件：1.点击元素 就是 订阅事件的元素。 2.点击元素是订阅元素的子元素( 目前判断的只是第一种)
                    result = true;
                }

            });
            return result;

        },
        publish: function (eventName, eventArgs) {

            var event = jex.EventManager.getEvent(eventName);
            if (!event) {
                event = new jex.EventManager.Event(eventName);
                jex.EventManager.events.push(event);
            }

            if (this.check(event, eventArgs)) {
                event.fire();
            }
        },

        init: function () {

            document.body.onclick = function (e) {
                jex.EventManager.publish('tap', e);
            }


        }

    }
})