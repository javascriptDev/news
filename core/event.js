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

                    h.fn(eventArgs);
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
                jex.EventManager.publish('tap', e);
            }


        }

    }
})