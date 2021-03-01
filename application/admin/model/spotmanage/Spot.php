<?php

namespace app\admin\model\spotmanage;

use think\Model;


class Spot extends Model
{

    

    

    // 表名
    protected $name = 'spot';
    
    // 自动写入时间戳字段
    protected $autoWriteTimestamp = 'int';

    // 定义时间戳字段名
    protected $createTime = 'createtime';
    protected $updateTime = 'updatetime';
    protected $deleteTime = false;

    // 追加属性
    protected $append = [
        'statusdata_text'
    ];
    

    
    public function getStatusdataList()
    {
        return ['normal' => __('Statusdata normal'), 'service' => __('Statusdata service')];
    }


    public function getStatusdataTextAttr($value, $data)
    {
        $value = $value ? $value : (isset($data['statusdata']) ? $data['statusdata'] : '');
        $list = $this->getStatusdataList();
        return isset($list[$value]) ? $list[$value] : '';
    }




    public function admin()
    {
        return $this->belongsTo('app\admin\model\Admin', 'admin_id', 'id', [], 'LEFT')->setEagerlyType(0);
    }


    public function spotare()
    {
        return $this->belongsTo('app\admin\model\spotmanage\Spotare', 'spotare_id', 'id', [], 'LEFT')->setEagerlyType(0);
    }


    public function spottype()
    {
        return $this->belongsTo('app\admin\model\spotmanage\Spottype', 'spottype_id', 'id', [], 'LEFT')->setEagerlyType(0);
    }
}
