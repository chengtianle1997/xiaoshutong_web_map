<?php

namespace app\admin\controller\spotmanage;

use app\common\controller\Backend;
use think\Session;

use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Cell\Coordinate;
use PhpOffice\PhpSpreadsheet\Reader\Xlsx;
use PhpOffice\PhpSpreadsheet\Reader\Xls;
use PhpOffice\PhpSpreadsheet\Reader\Csv;


/**
 * 景点
 *
 * @icon fa fa-circle-o
 */
class Spot extends Backend
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


    public function importline()
    {
        $file = $this->request->request('file');
        if (!$file) {
            $this->error(__('Parameter %s can not be empty', 'file'));
        }
        $filePath = ROOT_PATH . DS . 'public' . DS . $file;
        if (!is_file($filePath)) {
            $this->error(__('No results were found'));
        }

        $reader = new Xlsx();
        $resultArray=[];

        try {
            if (!$PHPExcel = $reader->load($filePath)) {
                $this->error(__('Unknown data format'));
            }
            $insert = [];
            $currentSheet = $PHPExcel->getSheet(0);  //读取文件中的第一个工作表
            $allColumn = $currentSheet->getHighestDataColumn(); //取得最大的列号
            $allRow = $currentSheet->getHighestRow(); //取得一共有多少行
            $maxColumnNumber = Coordinate::columnIndexFromString($allColumn);

            for ($currentRow = 1; $currentRow <= $allRow; $currentRow++) {
                $values = [];
                for ($currentColumn = 1; $currentColumn <= $maxColumnNumber; $currentColumn++) {
                    $val = $currentSheet->getCellByColumnAndRow($currentColumn, $currentRow)->getValue();
                    if(!empty($val)){
                        $result = is_null($val) ? '' : $val;
                        if($currentColumn == 1){
                            $values["key"] = $result;
                        }else{
                            $values["value"] = $result;
                        }
                    }
                }
                array_push($resultArray,$values); 
            }
            foreach($resultArray as $k=>$v){  
                if(!$v)  
                    unset($resultArray[$k]);  
            }  
            if (file_exists($filePath)) {
                unlink($filePath);
            }
        } catch (Exception $exception) {
            $this->error($exception->getMessage());
        } 
        // return json($result);
        // $this->success(json($resultArray));]

        $this->success('','',$resultArray);
        // $this->success('成功提示',['action' => 'test1']);
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
            $mywhere['spottype_id'] = 1;
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
