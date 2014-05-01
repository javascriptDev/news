一个快速搭建web app 的简单框架
一个app 只需要一个基础html如下：
<!DOCTYPE html>
<html manifest="a.appcache">
<head>
    <title></title>
    <!--框架js-->
    <script src="production/production.min.js"></script>


    <!--框架 css-->
    <link href="production/min.css" rel="stylesheet" type="text/css">


    <!--框架js-->
    <script src="lib/core/jex.js"></script>



  <script src="app.js"></script>
    <style type="text/css">
        .age {
            float: right;
            background: red;
            border-radius: 4px;
            height: 50%;

            color: white;
        }
    </style>
</head>
<body>


</body>
</html>

app.js 就是整个app的入口,代码如下:

jex.application({
    views: [],
    controllers: [],
    models: [],
    stores: [],
    start: function () {//程序入口函数
        window.viewport = jex.create('viewport'); //创建app的容器
        var panel = jex.create('main'); //创建主页面
        viewport.add(panel);
        jex.start();  
    },
    onUpdate: function (appcahce) {//开启支持离线功能,当有新数据更新时，回调此函数
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
        alert.show();

    }
});
