<?php if (!defined('THINK_PATH')) exit(); /*a:4:{s:100:"/home/wwwroot/map.weihangnetwork.com/public/../application/admin/view/spotmanage/visitroute/add.html";i:1609904377;s:79:"/home/wwwroot/map.weihangnetwork.com/application/admin/view/layout/default.html";i:1608223426;s:76:"/home/wwwroot/map.weihangnetwork.com/application/admin/view/common/meta.html";i:1608223426;s:78:"/home/wwwroot/map.weihangnetwork.com/application/admin/view/common/script.html";i:1608223426;}*/ ?>
<!DOCTYPE html>
<html lang="<?php echo $config['language']; ?>">
    <head>
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

    </head>

    <body class="inside-header inside-aside <?php echo defined('IS_DIALOG') && IS_DIALOG ? 'is-dialog' : ''; ?>">
        <div id="main" role="main">
            <div class="tab-content tab-addtabs">
                <div id="content">
                    <div class="row">
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                            <section class="content-header hide">
                                <h1>
                                    <?php echo __('Dashboard'); ?>
                                    <small><?php echo __('Control panel'); ?></small>
                                </h1>
                            </section>
                            <?php if(!IS_DIALOG && !\think\Config::get('fastadmin.multiplenav') && \think\Config::get('fastadmin.breadcrumb')): ?>
                            <!-- RIBBON -->
                            <div id="ribbon">
                                <ol class="breadcrumb pull-left">
                                    <?php if($auth->check('dashboard')): ?>
                                    <li><a href="dashboard" class="addtabsit"><i class="fa fa-dashboard"></i> <?php echo __('Dashboard'); ?></a></li>
                                    <?php endif; ?>
                                </ol>
                                <ol class="breadcrumb pull-right">
                                    <?php foreach($breadcrumb as $vo): ?>
                                    <li><a href="javascript:;" data-url="<?php echo $vo['url']; ?>"><?php echo $vo['title']; ?></a></li>
                                    <?php endforeach; ?>
                                </ol>
                            </div>
                            <!-- END RIBBON -->
                            <?php endif; ?>
                            <div class="content">
                                <form id="add-form" class="form-horizontal" role="form" data-toggle="validator" method="POST" action="">

    <div class="form-group">
        <label class="control-label col-xs-12 col-sm-2"><?php echo __('Spotare_id'); ?>:</label>
        <div class="col-xs-12 col-sm-8">
            <input id="c-spotare_id" data-rule="required" disabled data-source="spotmanage/spotare/selectpage" data-field="areaname" class="form-control selectpage" name="row[spotare_id]" type="text" value="<?php echo \think\Session::get('spotarea_id'); ?>">
        </div>
    </div>
    <div class="form-group">
        <label class="control-label col-xs-12 col-sm-2"><?php echo __('Routeame'); ?>:</label>
        <div class="col-xs-12 col-sm-8">
            <input id="c-routeame" data-rule="required" class="form-control" name="row[routeame]" type="text">
        </div>
    </div>
    <div class="form-group">
        <label class="control-label col-xs-12 col-sm-2"><?php echo __('Linelength'); ?>:</label>
        <div class="col-xs-12 col-sm-8">
            <input id="c-linelength" data-rule="required" class="form-control" name="row[linelength]" type="text">
        </div>
    </div>
    <div class="form-group">
        <label class="control-label col-xs-12 col-sm-2"><?php echo __('Burncalories'); ?>:</label>
        <div class="col-xs-12 col-sm-8">
            <input id="c-burncalories" data-rule="required" class="form-control" name="row[burncalories]" type="text">
        </div>
    </div>
    <div class="form-group">
        <label class="control-label col-xs-12 col-sm-2"><?php echo __('Nearbyspot'); ?>:</label>
        <div class="col-xs-12 col-sm-8">
            <input id="c-nearbyspot" data-rule="required" class="form-control" name="row[nearbyspot]" type="text">
        </div>
    </div>
    <div class="form-group">
        <label class="control-label col-xs-12 col-sm-2"><?php echo __('Allspot'); ?>:</label>
        <div class="col-xs-12 col-sm-8">
            <input id="c-allspot" data-rule="required" class="form-control" name="row[allspot]" type="text">
        </div>
    </div>
    <div class="form-group">
        <label class="control-label col-xs-12 col-sm-2"><?php echo __('Expecthours'); ?>:</label>
        <div class="col-xs-12 col-sm-8">
            <input id="c-expecthours" data-rule="required" class="form-control" name="row[expecthours]" type="text">
        </div>
    </div>
    <div class="form-group">
        <label class="control-label col-xs-12 col-sm-2"><?php echo __('Navigationjson'); ?>:</label>
        <div class="col-xs-12 col-sm-8">

            <dl class="fieldlist" data-name="row[navigationjson]">
                <dd>
                    <ins><?php echo __('Navigationjson key'); ?></ins>
                    <ins><?php echo __('Navigationjson value'); ?></ins>
                </dd>
                <dd>
                    <a href="javascript:;" class="btn btn-sm btn-success btn-append"><i class="fa fa-plus"></i> <?php echo __('Append'); ?></a>
                    <a href="javascript:;" class="btn btn-danger btn-import faupload" title="导入" id="btn-import-file" data-url="ajax/upload" data-mimetype="xlsx" data-multiple="false"><i class="fa fa-upload"></i>导入</a>
                </dd>
                <textarea name="row[navigationjson]" class="form-control hide" cols="30" rows="5"></textarea>
            </dl>


        </div>
    </div>
    <div class="form-group layer-footer">
        <label class="control-label col-xs-12 col-sm-2"></label>
        <div class="col-xs-12 col-sm-8">
            <button type="submit" class="btn btn-success btn-embossed disabled"><?php echo __('OK'); ?></button>
            <button type="reset" class="btn btn-default btn-embossed"><?php echo __('Reset'); ?></button>
        </div>
    </div>
</form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <script src="/assets/js/require<?php echo \think\Config::get('app_debug')?'':'.min'; ?>.js" data-main="/assets/js/require-backend<?php echo \think\Config::get('app_debug')?'':'.min'; ?>.js?v=<?php echo htmlentities($site['version']); ?>"></script>
    </body>
</html>
