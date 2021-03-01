<?php if (!defined('THINK_PATH')) exit(); /*a:1:{s:90:"/www/wwwroot/zhjq.g2world.cn/public/../application/admin/view/spotmanage/manage/index.html";i:1609266550;}*/ ?>


<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <title>地图服务--后台管理系统</title>
    <meta name="renderer" content="webkit">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    <meta name="apple-mobile-web-app-status-bar-style" content="black">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="format-detection" content="telephone=no">
    <link rel="stylesheet" href="https://topsroboteer.ac.cn/layui/css/layui.css" media="all" />
    <link rel="stylesheet" href="/assets/css/web.css" />
    <style>
        * {
            margin: 0;
            padding: 0
        }
        
        html,
        body {
            height: 97%;
            box-sizing: border-box;
        }
        
        .map-box {
            height: 97%;
            margin-top: 20px;
            margin-left: 20px;
            margin-right: 20px
        }
        
        #container {
            width: 100%;
            height: 99%;
            margin-top: 15px;
            box-sizing: border-box;
        }
        
        .amap-info-content {
            width: inherit
        }
    </style>

</head>
<input type="hidden" id="spotarea_id" value="<?php echo \think\Session::get('spotarea_id'); ?>">

<div class="map-box">
    <div class="layui-row layui-col-space10">
        <div class="layui-col-md8">
            <div class="grid-demo">
                <button class="layui-btn spot-display-btn">景点显示/隐藏</button>
                <button class="layui-btn map-display-btn">手绘图显示/隐藏</button>
            </div>
        </div>
    </div>

    <div id='container'>

    </div>

</div>


<script src="https://webapi.amap.com/maps?v=1.4.15&key=974d88b88a97af93a9114c609b1b88e4"></script>
<script crossorigin="anonymous" integrity="sha512-bLT0Qm9VnAYZDflyKcBaQ2gg0hSYNQrJ8RilYldYQ1FxQYoCLtUjuuRuZo+fjqhx/qtq/1itJ0C2ejDxltZVFg==" src="https://lib.baomitu.com/jquery/3.5.1/jquery.min.js"></script>
<script src="/assets/js/web/common.js"></script>
<script src="/assets/js/web/knockout-3.5.1.js"></script>

<script src="/assets/js/web/web-background.js"></script>

</html>