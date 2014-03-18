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
                console.log(this.getName());
                handlers.forEach(function (h) {


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
                //获取是否需要触发事件
                console.log(e);

                var container = e.target.offsetParent;
                var allEventElement = container.querySelectorAll('[fire]');
                var eventElement;
                jex.each(allEventElement, function (item) {
                   // if()

                })

                //如果长按那么不触发tap .
                timeStamp = new Date().getTime() - holdTime;


                if (e.fire && timeStamp < 120 && !isMove) {
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