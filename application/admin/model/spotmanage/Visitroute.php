<?php

namespace app\admin\model\spotmanage;

use think\Model;


class Visitroute extends Model
{

    // 表名
    protected $name = 'visitroute';
    
    // 自动写入时间戳字段
    protected $autoWriteTimestamp = false;

    // 定义时间戳字段名
    protected $createTime = false;
    protected $updateTime = false;
    protected $deleteTime = false;

    // 追加属性
    protected $append = [

    ];

    public function admin()
    {
        return $this->belongsTo('app\admin\model\Admin', 'admin_id', 'id', [], 'LEFT')->setEagerlyType(0);
    }

    public function spotare()
    {
        return $this->belongsTo('app\admin\model\spotmanage\Spotare', 'spotare_id', 'id', [], 'LEFT')->setEagerlyType(0);
    }
}
