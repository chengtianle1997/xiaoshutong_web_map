<?php if (!defined('THINK_PATH')) exit(); /*a:4:{s:98:"/home/wwwroot/map.weihangnetwork.com/public/../application/admin/view/spotmanage/parking/edit.html";i:1609263805;s:79:"/home/wwwroot/map.weihangnetwork.com/application/admin/view/layout/default.html";i:1608223426;s:76:"/home/wwwroot/map.weihangnetwork.com/application/admin/view/common/meta.html";i:1608223426;s:78:"/home/wwwroot/map.weihangnetwork.com/application/admin/view/common/script.html";i:1608223426;}*/ ?>
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
        <label class="control-label col-xs-12 col-sm-2"><?php echo __('Spotare_id'); ?>:</label>
        <div class="col-xs-12 col-sm-8">
            <input id="c-spotare_id" data-rule="required" disabled data-source="spotmanage/spotare/selectpage" data-field="areaname" class="form-control selectpage" name="row[spotare_id]" type="text" value="<?php echo htmlentities($row['spotare_id']); ?>">
        </div>
    </div>
    <div class="form-group">
        <label class="control-label col-xs-12 col-sm-2"><?php echo __('Spottype_id'); ?>:</label>
        <div class="col-xs-12 col-sm-8">
            <input id="c-spottype_id" data-rule="required" disabled data-source="spotmanage/spottype/selectpage" data-field="typename" class="form-control selectpage" name="row[spottype_id]" type="text" value="<?php echo htmlentities($row['spottype_id']); ?>">
        </div>
    </div>
    <div class="form-group">
        <label class="control-label col-xs-12 col-sm-2"><?php echo __('Spotname'); ?>:</label>
        <div class="col-xs-12 col-sm-8">
            <input id="c-spotname" data-rule="required" class="form-control" autocomplete="off" name="row[spotname]" type="text" value="<?php echo htmlentities($row['spotname']); ?>">
        </div>
    </div>
    <div class="form-group">
        <label class="control-label col-xs-12 col-sm-2"><?php echo __('Lnglat'); ?>:</label>
        <div class="col-xs-12 col-sm-8">
            <input id="c-lnglat" data-rule="required" class="form-control" autocomplete="off" name="row[lnglat]" type="text" value="<?php echo htmlentities($row['lnglat']); ?>">
        </div>
    </div>
    <!-- <div class="form-group">
        <label class="control-label col-xs-12 col-sm-2"><?php echo __('Voiceradius'); ?>:</label>
        <div class="col-xs-12 col-sm-8">
            <input id="c-lat" data-rule="required" class="form-control" step="1" name="row[voiceradius]" type="number" value="<?php echo htmlentities($row['voiceradius']); ?>">
        </div>
    </div> -->
    <!-- <div class="form-group">
        <label class="control-label col-xs-12 col-sm-2"><?php echo __('Lng'); ?>:</label>
        <div class="col-xs-12 col-sm-8">
            <input id="c-lng" data-rule="required" class="form-control" step="0.000000000000001" name="row[lng]" type="number" value="<?php echo htmlentities($row['lng']); ?>">
        </div>
    </div>
    <div class="form-group">
        <label class="control-label col-xs-12 col-sm-2"><?php echo __('Lat'); ?>:</label>
        <div class="col-xs-12 col-sm-8">
            <input id="c-lat" data-rule="required" class="form-control" step="0.000000000000001" name="row[lat]" type="number" value="<?php echo htmlentities($row['lat']); ?>">
        </div>
    </div> -->
    <!-- <div class="form-group">
        <label class="control-label col-xs-12 col-sm-2"><?php echo __('Backgroudimage'); ?>:</label>
        <div class="col-xs-12 col-sm-8">
            <div class="input-group">
                <input id="c-backgroudimage" class="form-control" size="50" name="row[backgroudimage]" type="text" value="<?php echo htmlentities($row['backgroudimage']); ?>">
                <div class="input-group-addon no-border no-padding">
                    <span><button type="button" id="faupload-backgroudimage" class="btn btn-danger faupload" data-input-id="c-backgroudimage" data-mimetype="image/gif,image/jpeg,image/png,image/jpg,image/bmp" data-multiple="false" data-preview-id="p-backgroudimage"><i class="fa fa-upload"></i> <?php echo __('Upload'); ?></button></span>
                    <span><button type="button" id="fachoose-backgroudimage" class="btn btn-primary fachoose" data-input-id="c-backgroudimage" data-mimetype="image/*" data-multiple="false"><i class="fa fa-list"></i> <?php echo __('Choose'); ?></button></span>
                </div>
                <span class="msg-box n-right" for="c-backgroudimage"></span>
            </div>
            <ul class="row list-inline faupload-preview" id="p-backgroudimage"></ul>
        </div>
    </div> -->
    <div class="form-group">
        <label class="control-label col-xs-12 col-sm-2"><?php echo __('Spotintroduce'); ?>:</label>
        <div class="col-xs-12 col-sm-8">
            <textarea id="c-spotintroduce" class="form-control " rows="5" name="row[spotintroduce]" cols="50"><?php echo htmlentities($row['spotintroduce']); ?></textarea>
        </div>
    </div>
    <!-- <div class="form-group">
        <label class="control-label col-xs-12 col-sm-2"><?php echo __('Navigation'); ?>:</label>
        <div class="col-xs-12 col-sm-8">
            <input id="c-navigation" class="form-control" name="row[navigation]" type="text" value="<?php echo htmlentities($row['navigation']); ?>">
        </div>
    </div> -->
    <!-- <div class="form-group">
        <label class="control-label col-xs-12 col-sm-2"><?php echo __('Navigationjson'); ?>:</label>
        <div class="col-xs-12 col-sm-8">

            <dl class="fieldlist" data-name="row[navigationjson]">
                <dd>
                    <ins><?php echo __('Navigationjson key'); ?></ins>
                    <ins><?php echo __('Navigationjson value'); ?></ins>
                </dd>
                <dd><a href="javascript:;" class="btn btn-sm btn-success btn-append"><i class="fa fa-plus"></i> <?php echo __('Append'); ?></a></dd>
                <textarea name="row[navigationjson]" class="form-control hide" cols="30" rows="5"><?php echo htmlentities($row['navigationjson']); ?></textarea>
            </dl>


        </div>
    </div> -->
    <!-- <div class="form-group">
        <label class="control-label col-xs-12 col-sm-2"><?php echo __('Voicefile'); ?>:</label>
        <div class="col-xs-12 col-sm-8">
            <div class="input-group">
                <input id="c-voicefile" class="form-control" size="50" name="row[voicefile]" type="text" value="<?php echo htmlentities($row['voicefile']); ?>">
                <div class="input-group-addon no-border no-padding">
                    <span><button type="button" id="faupload-voicefile" class="btn btn-danger faupload" data-input-id="c-voicefile" data-multiple="false" data-preview-id="p-voicefile"><i class="fa fa-upload"></i> <?php echo __('Upload'); ?></button></span>
                    <span><button type="button" id="fachoose-voicefile" class="btn btn-primary fachoose" data-input-id="c-voicefile" data-multiple="false"><i class="fa fa-list"></i> <?php echo __('Choose'); ?></button></span>
                </div>
                <span class="msg-box n-right" for="c-voicefile"></span>
            </div>
            <ul class="row list-inline faupload-preview" id="p-voicefile"></ul>
        </div>
    </div> -->
    <!-- <div class="form-group">
        <label class="control-label col-xs-12 col-sm-2"><?php echo __('Statusdata'); ?>:</label>
        <div class="col-xs-12 col-sm-8">

            <div class="radio">
                <?php if(is_array($statusdataList) || $statusdataList instanceof \think\Collection || $statusdataList instanceof \think\Paginator): if( count($statusdataList)==0 ) : echo "" ;else: foreach($statusdataList as $key=>$vo): ?>
                <label for="row[statusdata]-<?php echo $key; ?>"><input id="row[statusdata]-<?php echo $key; ?>" name="row[statusdata]" type="radio" value="<?php echo $key; ?>" <?php if(in_array(($key), is_array($row['statusdata'])?$row['statusdata']:explode(',',$row['statusdata']))): ?>checked<?php endif; ?> /> <?php echo $vo; ?></label> <?php endforeach; endif; else: echo "" ;endif; ?>
            </div>

        </div>
    </div> -->
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
