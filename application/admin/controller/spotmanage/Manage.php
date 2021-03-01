<?php

namespace app\admin\controller\spotmanage;

use app\common\controller\Backend;

/**
 * 景区管理
 *
 * @icon fa fa-circle-o
 */
class Manage extends Backend
{
    
    /**
     * Spotare模型对象
     * @var \app\admin\model\spotmanage\Spotare
     */
    protected $model = null;
    protected $dataLimit = 'personal'; 

    public function _initialize()
    {
        parent::_initialize();
        $this->model = new \app\admin\model\spotmanage\Spotare;

    }

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
            list($where, $sort, $order, $offset, $limit) = $this->buildparams();

            $list = $this->model
                    ->with(['admin'])
                    ->where($where)
                    ->order($sort, $order)
                    ->paginate($limit);

            foreach ($list as $row) {
                
                $row->getRelation('admin')->visible(['nickname']);
            }

            $result = array("total" => $list->total(), "rows" => $list->items());

            return json($result);
        }
        return $this->view->fetch();
    }
}
