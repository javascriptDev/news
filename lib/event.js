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
                    if (h.selector.indexOf(eventArgs.eventElement.id) != -1) {
                        h.fn.call(h.scope, eventArgs);
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
        subscribe: function (eventName, handler, selector, scope) {
            var event = jex.EventManager.getEvent(eventName);
            if (!event) {
                event = new jex.EventManager.Event(eventName);
                jex.EventManager.addEvent(event);
            }
            event.addHandler({selector: selector, fn: handler, scope: scope});
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

            var holdTime = 0;
            var isMove = true;
            document.body.addEventListener('touchstart', function (e) {
                isMove = false;
                holdTime = new Date().getTime();
            })

            // 给所有 list 添加move事件,方便检测是tap事件还是滑动事件
            var list = document.querySelectorAll('.jex-component-list');
            jex.each(list, function (item) {
                item.addEventListener('touchmove', function (e) {
                    isMove = true;
                }, false);
            })

            document.body.addEventListener('touchend', function (e) {

                //计算按住dom的时间差
                timeStamp = new Date().getTime() - holdTime;

                //获取触发事件的组件
                var eventElement;
                var container = e.target.offsetParent;
                var allEventElement = container.querySelectorAll('[fire]');
                var i = 0;
                jex.each(allEventElement, function (item) {
                    i++;
                    if (item && item.querySelector) {
                        if (item.querySelector('#' + e.target.id)) {
                            eventElement = item;
                            return;
                        }
                    }
                })

                var tapTimeStamp = 120;
                var isFire = eventElement.getAttribute('fire');
                if (isFire && timeStamp < tapTimeStamp && !isMove) {
                    e.eventElement = eventElement;
                    jex.EventManager.publish(eventElement.getAttribute('event-type'), e);

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