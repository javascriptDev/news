/**
 * Created by John on 2014/4/9.
 */
jex.application({
    views: [],
    controllers: [],
    models: [],
    stores: [],
    start: function () {

        window.viewport = jex.create('viewport');
        var panel = jex.create('main');
        viewport.add(panel);
        jex.start();
    },
    onUpdate: function (appcahce) {
        var alert = jex.create('alert', {
            title: '',
            content: '',
            buttons: [
                {
                    text: 'ok',
                    tap: function () {

                    }
                },
                {
                    text: 'cancel',
                    tap: function () {
                        debugger;
                    }
                }
            ]
        });
      //  document.body.appendChild(alert.element);
        alert.show();


    }




});