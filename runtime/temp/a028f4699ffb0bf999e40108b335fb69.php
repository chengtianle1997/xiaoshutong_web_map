<?php if (!defined('THINK_PATH')) exit(); /*a:3:{s:99:"/Users/chenkun/Work/git/tour-guide/src/map/public/../application/admin/view/index/spotarealist.html";i:1609263805;s:82:"/Users/chenkun/Work/git/tour-guide/src/map/application/admin/view/common/meta.html";i:1608223426;s:84:"/Users/chenkun/Work/git/tour-guide/src/map/application/admin/view/common/script.html";i:1608223426;}*/ ?>
<!DOCTYPE html>
<html lang="<?php echo $config['language']; ?>">

<head>
    <title><?php echo htmlentities($site['name']); ?>-后台管理系统</title>
    <!-- 加载样式及META信息 -->
    <meta charset="utf-8">
<title><?php echo (isset($title) && ($title !== '')?$title:''); ?></title>
<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
<meta name="renderer" content="webkit">
<meta name="referrer" content="never">

<link rel="shortcut icon" href="/assets/img/favicon.ico" />
<!-- Loading Bootstrap -->
<link href="/assets/css/backend<?php echo \think\Config::get('app_debug')?'':'.min'; ?>.css?v=<?php echo \think\Config::get('site.version'); ?>" rel="stylesheet">

<?php if(\think\Config::get('fastadmin.adminskin')): ?>
<link href="/assets/css/skins/<?php echo \think\Config::get('fastadmin.adminskin'); ?>.css?v=<?php echo \think\Config::get('site.version'); ?>" rel="stylesheet">
<?php endif; ?>

<!-- HTML5 shim, for IE6-8 support of HTML5 elements. All other JS at the end of file. -->
<!--[if lt IE 9]>
  <script src="/assets/js/html5shiv.js"></script>
  <script src="/assets/js/respond.min.js"></script>
<![endif]-->
<script type="text/javascript">
    var require = {
        config:  <?php echo json_encode($config); ?>
    };
</script>

    <script crossorigin="anonymous" integrity="sha512-bLT0Qm9VnAYZDflyKcBaQ2gg0hSYNQrJ8RilYldYQ1FxQYoCLtUjuuRuZo+fjqhx/qtq/1itJ0C2ejDxltZVFg==" src="https://lib.baomitu.com/jquery/3.5.1/jquery.min.js"></script>
    <style>
        .header {
            position: fixed;
            width: 100%;
            background: #393D49;
            top: 0;
            left: 0;
            z-index: 1000;
        }
        
        .header-titile {
            height: 45px;
            line-height: 45px;
            color: #ffffff;
        }
        
        .header-titile .title {
            font-size: 20px;
            margin-left: 50px;
            float: left;
        }
        
        .navbar-custom-menu {
            float: right;
            margin-right: 20px;
        }
        
        .navbar-custom-menu a {
            color: #ffffff;
        }
        
        .nav>li>a:hover,
        .nav>li>a:focus,
        .nav>li>a:active {
            background-color: #393D49;
            color: #ffffff;
        }
        
        .nav .open>a,
        .nav .open>a:hover,
        .nav .open>a:focus {
            background-color: #393D49;
            color: #ffffff;
            border-color: #393D49;
        }
        
        .navbar-nav>.user-menu>.dropdown-menu {
            width: 100px;
            min-width: 100px;
        }
        
        .pull-right {
            text-align: center;
            float: none !important;
        }
        
        .area-content {
            width: 1170px;
            background: #fff;
            position: relative;
            margin: 0 auto;
            padding: 0 15px;
            box-sizing: border-box;
        }
        
        .area-content .home-search {
            height: 75px;
            border-bottom: 1px dashed #e0e0e0;
            display: flex;
            flex-direction: row-reverse;
            align-items: center;
            margin-top: 60px;
        }
        
        .area-content .home-search .home-search-input {
            float: right;
            margin-right: 30px;
        }
        
        .area-content .home-search .home-search-input .selectpage {
            width: 100%;
        }
        
        #home-ul {
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            list-style: none;
            justify-content: flex-start;
            padding: 30px;
        }
        
        .layui-ul {
            margin: -.5px;
        }
        
        .layui-ul:after,
        .layui-ul:before {
            content: '';
            display: block;
            clear: both;
        }
        
        #home-ul li {
            margin: 0 0 30px;
            padding: 10px;
            box-sizing: border-box;
            list-style: none;
        }
        
        .area-item {
            width: 25%;
            float: left;
            position: relative;
            display: block;
        }
        
        #home-ul li .shopImg img {
            width: 100%;
            height: 157px;
            min-height: 157px;
            background-size: 100% 100%;
            border: none;
            vertical-align: middle;
            display: inline-block;
        }
        
        .shopListName {
            padding: 20px 0;
            color: black;
        }
        
        li:hover {
            box-shadow: 0px 3px 15px 0px rgba(0, 0, 0, 0.1);
            transition: all 0.1s;
            cursor: pointer;
            border-radius: 3px;
        }
    </style>
    <script src="/assets/js/web/common.js"></script>
    <script src="/assets/js/web/knockout-3.5.1.js"></script>
    <script src="/assets/lib/SelectPage-master/selectpage.js"></script>
    <link rel="stylesheet" href="/assets/lib/SelectPage-master/selectpage.css" />
</head>

<body>
    <div class="header">
        <div class="header-titile">
            <span class="title"><?php echo htmlentities($site['name']); ?>-后台管理系统</span>
            <!-- 顶部右侧菜单 -->
            <div class="navbar-custom-menu">
                <ul class="nav navbar-nav">
                    <li class="dropdown user user-menu">
                        <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                            <img src="<?php echo htmlentities(cdnurl($admin['avatar'])); ?>" class="user-image" alt="">
                            <span class="hidden-xs"><?php echo htmlentities($admin['nickname']); ?></span>
                        </a>
                        <ul class="dropdown-menu">
                            <li class="user-footer">
                                <div class="pull-right">
                                    <a href="<?php echo url('index/logout'); ?>" class="btn btn-danger"><i class="fa fa-sign-out"></i>
                                    <?php echo __('Logout'); ?></a>
                                </div>
                            </li>
                    </li>
                    </ul>
            </div>
            <div class="clearfix"></div>
        </div>
    </div>

    <div class="area-content">
        <div class="home-search">
            <div class="home-search-input">
                <!-- <input id="c-spotare_id" data-source="spotmanage/spotare/selectpage" data-field="areaname" class="form-control selectpage" type="text" value=""> -->
                <input type="text" id="selectPage">
            </div>
        </div>
        <ul class="layui-ul" id="home-ul" data-bind="foreach:{ data: spotareas, as:
            'item' }">
            <li class="shopBox area-item">
                <a data-bind="attr:{'href':'/cVgRbDMLwW.php/index/index?id=' + item.id}">
                    <div class="shopImg"><img data-bind="attr:{'src':item.coverimage}"></div>
                    <div class="shopListName" style="font-weight:bold;font-size: 16px" data-bind="text:item.areaname"></div>
                </a>
            </li>
        </ul>
    </div>
    <!-- 加载JS脚本 -->
    <script src="/assets/js/require<?php echo \think\Config::get('app_debug')?'':'.min'; ?>.js" data-main="/assets/js/require-backend<?php echo \think\Config::get('app_debug')?'':'.min'; ?>.js?v=<?php echo htmlentities($site['version']); ?>"></script>
</body>
<script>
    $(".navbar-nav").hover(
        function() {
            $(".user-menu").addClass("open");
        },
        function() {
            $(".user-menu").removeClass("open");
        }
    )

    var viewModel = {
        spotareas: ko.observableArray([])
    };

    $(function() {
        var url = "/api/spot/getSpotArea";
        $.get(url, function(result) {
            var data = result.data;
            loadData(data);
        });
    })

    function loadData(data) {

        //初始化插件
        $('#selectPage').selectPage({
            showField: 'areaname',
            keyField: 'id',
            data: data
        });

        viewModel.spotareas(data);
        ko.applyBindings(viewModel);
        $(document).on("change", ".sp_input", function() {
            var value = $(this).parents(".sp_container").find(".sp_hidden").val();
            var url = "/api/spot/getSpotArea";
            if (value != "") {
                var intValue = parseInt(value);
                url = "/api/spot/getSpotArea?id=" + intValue;
            }
            $.get(url, function(result) {
                var data = result.data;
                viewModel.spotareas(data);
            });
        });
    }
</script>

</html>