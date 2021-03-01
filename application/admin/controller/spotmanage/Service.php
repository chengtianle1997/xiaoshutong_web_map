<?php

namespace app\admin\controller\spotmanage;

use app\common\controller\Backend;
use think\Session;


/**
 * 服务管理
 *
 * @icon fa fa-circle-o
 */
class Service extends Backend
{
    
    /**
     * Spot模型对象
     * @var \app\admin\model\spotmanage\Spot
     */
    protected $model = null;
    protected $dataLimit = 'personal'; 

    public function _initialize()
    {
        parent::_initialize();
        $this->model = new \app\admin\model\spotmanage\Spot;
        $this->view->assign("statusdataList", $this->model->getStatusdataList());
    }

    public function import()
    {
        parent::import();
    }

    /**
     * 默认生成的控制器所继承的父类中有index/add/edit/del/multi五个基础方法、destroy/restore/recyclebin三个回收站方法
     * 因此在当前控制器中可不用编写增删改查的代码,除非需要自己控制这部分逻辑
     * 需要将application/admin/library/traits/Backend.php中对应的方法复制到当前控制器,然后进行修改
     */
    

    /**
     * 查看
     */
    public function index()
    {
        //当前是否为关联查询
        $this->relationSearch = true;
        //设置过滤方法
        $this->request->filter(['strip_tags', 'trim']);
        if ($this->request->isAjax()) {
            //如果发送的来源是Selectpage，则转发到Selectpage
            if ($this->request->request('keyField')) {
                return $this->selectpage();
            }

            $mywhere = [];
            $mywhere['spotare_id'] = Session('spotarea_id');
            $mywhere['spottype_id'] =  ['not in',[1,7,8]];
            list($where, $sort, $order, $offset, $limit) = $this->buildparams();

            $list = $this->model
                    ->with(['admin','spotare','spottype'])
                    ->where($where)
                    ->where($mywhere)
                    ->order($sort, $order)
                    ->paginate($limit);

            foreach ($list as $row) {
                
                $row->getRelation('admin')->visible(['nickname']);
				$row->getRelation('spotare')->visible(['areaname']);
				$row->getRelation('spottype')->visible(['typename']);
            }

            $result = array("total" => $list->total(), "rows" => $list->items());

            return json($result);
        }
        return $this->view->fetch();
    }
}
