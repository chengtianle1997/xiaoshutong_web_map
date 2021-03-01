<?php if (!defined('THINK_PATH')) exit(); /*a:4:{s:98:"/home/wwwroot/map.weihangnetwork.com/public/../application/admin/view/spotmanage/spotare/edit.html";i:1609244549;s:79:"/home/wwwroot/map.weihangnetwork.com/application/admin/view/layout/default.html";i:1608223426;s:76:"/home/wwwroot/map.weihangnetwork.com/application/admin/view/common/meta.html";i:1608223426;s:78:"/home/wwwroot/map.weihangnetwork.com/application/admin/view/common/script.html";i:1608223426;}*/ ?>
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
                                <form id="edit-form" class="form-horizontal" role="form" data-toggle="validator" method="POST" action="">

    <div class="form-group">
        <label class="control-label col-xs-12 col-sm-2"><?php echo __('Areaname'); ?>:</label>
        <div class="col-xs-12 col-sm-8">
            <input id="c-areaname" data-rule="required" class="form-control" autocomplete="off" name="row[areaname]" type="text" value="<?php echo htmlentities($row['areaname']); ?>">
        </div>
    </div>
    <div class="form-group">
        <label class="control-label col-xs-12 col-sm-2"><?php echo __('Areaintroduce'); ?>:</label>
        <div class="col-xs-12 col-sm-8">
            <textarea id="c-areaintroduce" data-rule="required" class="form-control " rows="5" name="row[areaintroduce]" cols="50"><?php echo htmlentities($row['areaintroduce']); ?></textarea>
        </div>
    </div>

    <div class="form-group">
        <label class="control-label col-xs-12 col-sm-2"><?php echo __('Coverimage'); ?>:</label>
        <div class="col-xs-12 col-sm-8">
            <div class="input-group">
                <input id="c-coverimage" class="form-control" size="50" name="row[coverimage]" type="text" value="<?php echo htmlentities($row['coverimage']); ?>">
                <div class="input-group-addon no-border no-padding">
                    <span><button type="button" id="faupload-coverimage" class="btn btn-danger faupload" data-input-id="c-coverimage" data-mimetype="image/gif,image/jpeg,image/png,image/jpg,image/bmp" data-multiple="false" data-preview-id="p-coverimage"><i class="fa fa-upload"></i> <?php echo __('Upload'); ?></button></span>
                    <span><button type="button" id="fachoose-coverimage" class="btn btn-primary fachoose" data-input-id="c-coverimage" data-mimetype="image/*" data-multiple="false"><i class="fa fa-list"></i> <?php echo __('Choose'); ?></button></span>
                </div>
                <span class="msg-box n-right" for="c-coverimage"></span>
            </div>
            <ul class="row list-inline faupload-preview" id="p-coverimage"></ul>
        </div>
    </div>

    <!-- <div class="form-group">
        <label class="control-label col-xs-12 col-sm-2"><?php echo __('Handimage'); ?>:</label>
        <div class="col-xs-12 col-sm-8">
            <div class="input-group">
                <input id="c-handimage" class="form-control" size="50" name="row[handimage]" type="text" value="<?php echo htmlentities($row['handimage']); ?>">
                <div class="input-group-addon no-border no-padding">
                    <span><button type="button" id="faupload-handimage" class="btn btn-danger faupload" data-input-id="c-handimage" data-mimetype="image/gif,image/jpeg,image/png,image/jpg,image/bmp" data-multiple="false" data-preview-id="p-handimage"><i class="fa fa-upload"></i> <?php echo __('Upload'); ?></button></span>
                    <span><button type="button" id="fachoose-handimage" class="btn btn-primary fachoose" data-input-id="c-handimage" data-mimetype="image/*" data-multiple="false"><i class="fa fa-list"></i> <?php echo __('Choose'); ?></button></span>
                </div>
                <span class="msg-box n-right" for="c-handimage"></span>
            </div>
            <ul class="row list-inline faupload-preview" id="p-handimage"></ul>
        </div>
    </div> -->

    <div class="form-group">
        <label class="control-label col-xs-12 col-sm-2"><?php echo __('Svgfile'); ?>:</label>
        <div class="col-xs-12 col-sm-8">
            <div class="input-group">
                <input id="c-svgfile" class="form-control" size="50" autocomplete="off" name="row[svgfile]" type="text" value="<?php echo htmlentities($row['svgfile']); ?>">
                <div class="input-group-addon no-border no-padding">
                    <span><button type="button" id="faupload-svgfile" class="btn btn-danger faupload" data-input-id="c-svgfile" data-multiple="false" data-preview-id="p-svgfile"><i class="fa fa-upload"></i> <?php echo __('Upload'); ?></button></span>
                    <span><button type="button" id="fachoose-svgfile" class="btn btn-primary fachoose" data-input-id="c-svgfile" data-multiple="false"><i class="fa fa-list"></i> <?php echo __('Choose'); ?></button></span>
                </div>
                <span class="msg-box n-right" for="c-svgfile"></span>
            </div>
            <ul class="row list-inline faupload-preview" id="p-svgfile"></ul>
        </div>
    </div>

    <div class="form-group">
        <label class="control-label col-xs-12 col-sm-2"><?php echo __('City'); ?>:</label>
        <div class="col-xs-12 col-sm-8">
            <div class='control-relative'><input id="c-city" data-rule="required" class="form-control" data-toggle="city-picker" data-level="city" name="row[city]" type="text" value="<?php echo htmlentities($row['city']); ?>"></div>
        </div>
    </div>
    <!-- <div class="form-group">
        <label class="control-label col-xs-12 col-sm-2"><?php echo __('Centerlng'); ?>:</label>
        <div class="col-xs-12 col-sm-8">
            <input id="c-centerlng" data-rule="required" class="form-control" step="0.000000000000001" name="row[centerlng]" type="number" value="<?php echo htmlentities($row['centerlng']); ?>">
        </div>
    </div>
    <div class="form-group">
        <label class="control-label col-xs-12 col-sm-2"><?php echo __('Centerlat'); ?>:</label>
        <div class="col-xs-12 col-sm-8">
            <input id="c-centerlat" data-rule="required" class="form-control" step="0.000000000000001" name="row[centerlat]" type="number" value="<?php echo htmlentities($row['centerlat']); ?>">
        </div>
    </div>
    <div class="form-group">
        <label class="control-label col-xs-12 col-sm-2"><?php echo __('Southwestlng'); ?>:</label>
        <div class="col-xs-12 col-sm-8">
            <input id="c-southwestlng" data-rule="required" class="form-control" step="0.000000000000001" name="row[southwestlng]" type="number" value="<?php echo htmlentities($row['southwestlng']); ?>">
        </div>
    </div>
    <div class="form-group">
        <label class="control-label col-xs-12 col-sm-2"><?php echo __('Southwestlat'); ?>:</label>
        <div class="col-xs-12 col-sm-8">
            <input id="c-southwestlat" data-rule="required" class="form-control" step="0.000000000000001" name="row[southwestlat]" type="number" value="<?php echo htmlentities($row['southwestlat']); ?>">
        </div>
    </div>
    <div class="form-group">
        <label class="control-label col-xs-12 col-sm-2"><?php echo __('Northeastlng'); ?>:</label>
        <div class="col-xs-12 col-sm-8">
            <input id="c-northeastlng" data-rule="required" class="form-control" step="0.000000000000001" name="row[northeastlng]" type="number" value="<?php echo htmlentities($row['northeastlng']); ?>">
        </div>
    </div>
    <div class="form-group">
        <label class="control-label col-xs-12 col-sm-2"><?php echo __('Northeastlat'); ?>:</label>
        <div class="col-xs-12 col-sm-8">
            <input id="c-northeastlat" data-rule="required" class="form-control" step="0.000000000000001" name="row[northeastlat]" type="number" value="<?php echo htmlentities($row['northeastlat']); ?>">
        </div>
    </div> -->
    <div class="form-group">
        <label class="control-label col-xs-12 col-sm-2"><?php echo __('Centerlnglat'); ?>:</label>
        <div class="col-xs-12 col-sm-8">
            <input id="c-centerlnglat" class="form-control" autocomplete="off" name="row[centerlnglat]" type="text" value="<?php echo htmlentities($row['centerlnglat']); ?>">
        </div>
    </div>
    <div class="form-group">
        <label class="control-label col-xs-12 col-sm-2"><?php echo __('Southwestlnglat'); ?>:</label>
        <div class="col-xs-12 col-sm-8">
            <input id="c-southwestlnglat" class="form-control" autocomplete="off" name="row[southwestlnglat]" type="text" value="<?php echo htmlentities($row['southwestlnglat']); ?>">
        </div>
    </div>
    <div class="form-group">
        <label class="control-label col-xs-12 col-sm-2"><?php echo __('Northeastlnglat'); ?>:</label>
        <div class="col-xs-12 col-sm-8">
            <input id="c-northeastlnglat" class="form-control" autocomplete="off" name="row[northeastlnglat]" type="text" value="<?php echo htmlentities($row['northeastlnglat']); ?>">
        </div>
    </div>
    <div class="form-group">
        <label class="control-label col-xs-12 col-sm-2"><?php echo __('Linkman'); ?>:</label>
        <div class="col-xs-12 col-sm-8">
            <input id="c-linkman" class="form-control" autocomplete="off" name="row[linkman]" type="text" value="<?php echo htmlentities($row['linkman']); ?>">
        </div>
    </div>
    <div class="form-group">
        <label class="control-label col-xs-12 col-sm-2"><?php echo __('Linkphone'); ?>:</label>
        <div class="col-xs-12 col-sm-8">
            <input id="c-linkphone" class="form-control" autocomplete="off" name="row[linkphone]" type="text" value="<?php echo htmlentities($row['linkphone']); ?>">
        </div>
    </div>
    <div class="form-group">
        <label class="control-label col-xs-12 col-sm-2"><?php echo __('Openinghours'); ?>:</label>
        <div class="col-xs-12 col-sm-8">
            <input id="c-openinghours" class="form-control" autocomplete="off" name="row[openinghours]" type="text" value="<?php echo htmlentities($row['openinghours']); ?>">
        </div>
    </div>
    <div class="form-group">
        <label class="control-label col-xs-12 col-sm-2"><?php echo __('Address'); ?>:</label>
        <div class="col-xs-12 col-sm-8">
            <input id="c-address" class="form-control" autocomplete="off" name="row[address]" type="text" value="<?php echo htmlentities($row['address']); ?>">
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
