/**
 * Created by 宇乔 on 13-11-25.
 */
jex.extend({
    EventManager: {
        events: [],
        Event: function (name) {
            var handlers = [];
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
                    if ((h.selector.indexOf('#' + eventArgs.srcElement.id) != -1 && eventArgs.srcElement.id != '') || (document.querySelector(h.selector).querySelector('#' + eventArgs.srcElement.id))) {
                        //todo:触发事件的条件：1.点击元素就是 注册事件的元素 。2 点击元素是 注册事件元素的子元素( 目前只做了1)；
                        h.fn(eventArgs);
                    }
                })
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

        addEvent: function (event) {
            jex.EventManager.events.push(event);
        },
        subscribe: function (eventName, handler, selector) {
            var event = jex.EventManager.getEvent(eventName);

            if (!event) {
                event = new jex.EventManager.Event(eventName);
                jex.EventManager.addEvent(event);
            }
            event.addHandler({selector: selector, fn: handler});

        },
        publish: function (eventName, eventArgs) {

            var event = jex.EventManager.getEvent(eventName);
            if (!event) {
                event = new jex.EventManager.Event(eventName);
                jex.EventManager.events.push(event);
            }

            event.fire(eventArgs);
        },

        init: function () {

            document.body.onclick = function (e) {
                e.fire = e.srcElement.getAttribute('fire') || e.srcElement.parentNode.getAttribute('fire') || e.srcElement.parentNode.parentNode.getAttribute('fire');
                if (e.fire) {
                    jex.EventManager.publish('tap', e);
                    jex.EventManager.publish('tab', e);
                    jex.EventManager.publish('itemtap', e);
                }
            }
            document.body.addEventListener('touchstart', function (e) {
                e.fire = e.target.getAttribute('fire') || e.target.parentNode.getAttribute('fire') || e.target.parentNode.parentNode.getAttribute('fire');
                if (e.fire) {
                    jex.EventManager.publish('tap', e);
                    jex.EventManager.publish('tab', e);
                    jex.EventManager.publish('itemtap', e);
                }
            })

//            document.body.addEventListener('touchmove', function (e) {
//                e.fire = e.target.getAttribute('fire') || e.target.parentNode.getAttribute('fire') || e.target.parentNode.parentNode.getAttribute('fire');
//                if (e.fire) {
//                    jex.EventManager.publish('tap', e);
//                    jex.EventManager.publish('tab', e);
//                    jex.EventManager.publish('itemtap', e);
//                }
//            })
//
//            document.body.addEventListener('touchend', function (e) {
//                e.fire = e.target.getAttribute('fire') || e.target.parentNode.getAttribute('fire') || e.target.parentNode.parentNode.getAttribute('fire');
//                if (e.fire) {
//                    jex.EventManager.publish('tap', e);
//                    jex.EventManager.publish('tab', e);
//                    jex.EventManager.publish('itemtap', e);
//                }
//            })


        }

    }
})