<?php

namespace app\api\controller;

use app\common\controller\Api;
use app\admin\model\spotmanage\Spotare as SpotareaDb;
use app\admin\model\spotmanage\Spot as SpotDb;
use app\admin\model\spotmanage\Spottype as SpottypeDb;
use app\admin\model\spotmanage\Visitroute as VisitrouteDb;
/**
 * 景区管理
 */
class Spot extends Api
{

    //如果$noNeedLogin为空表示所有接口都需要登录才能请求
    //如果$noNeedRight为空表示所有接口都需要验证权限才能请求
    //如果接口已经设置无需登录,那也就无需鉴权了
    //
    // 无需登录的接口,*表示全部
    protected $noNeedLogin = ['getSpotInfo',"getSpotArea"];
    // 无需鉴权的接口,*表示全部
    protected $noNeedRight = ['test2'];

    // /**
    //  * 测试方法
    //  *
    //  * @ApiTitle    (测试名称)
    //  * @ApiSummary  (测试描述信息)
    //  * @ApiMethod   (POST)
    //  * @ApiRoute    (/api/demo/test/id/{id}/name/{name})
    //  * @ApiHeaders  (name=token, type=string, required=true, description="请求的Token")
    //  * @ApiParams   (name="id", type="integer", required=true, description="会员ID")
    //  * @ApiParams   (name="name", type="string", required=true, description="用户名")
    //  * @ApiParams   (name="data", type="object", sample="{'user_id':'int','user_name':'string','profile':{'email':'string','age':'integer'}}", description="扩展数据")
    //  * @ApiReturnParams   (name="code", type="integer", required=true, sample="0")
    //  * @ApiReturnParams   (name="msg", type="string", required=true, sample="返回成功")
    //  * @ApiReturnParams   (name="data", type="object", sample="{'user_id':'int','user_name':'string','profile':{'email':'string','age':'integer'}}", description="扩展数据返回")
    //  * @ApiReturn   ({
    //      'code':'1',
    //      'msg':'返回成功'
    //     })
    //  */
    // public function test()
    // {
    //     $this->success('返回成功', $this->request->param());
    // }

    // /**
    //  * 无需登录的接口
    //  *
    //  */
    // public function test1()
    // {
    //     $this->success('返回成功', ['action' => 'test1']);
    // }

    // /**
    //  * 需要登录的接口
    //  *
    //  */
    // public function test2()
    // {
    //     $this->success('返回成功', ['action' => 'test2']);
    // }

    /**
     * 需要登录且需要验证有相应组的权限
     *
     */
    // public function test3()
    // {
    //     $this->success('返回成功', ['action' => 'test3']);
    // }


    protected $spotarea;
    protected $spot;
    protected $spottype;

       /**
     * 获取景区信息
     *
     * @param int $id 景区ID
     */
    public function getSpotInfo()
    {
        $id = $this->request->request("id");
        $this->spotarea = new SpotareaDb;
        $spotareadata=$this->spotarea->get($id);
        $result['spotarea'] = $spotareadata;

        $this->spot = new SpotDb;
        $spotdata=$this->spot->all(array("spotare_id" =>$id));

        $typeArray = array();
        if(!empty($spotdata)){
            foreach($spotdata as $spotItem){ 
                $type = $spotItem['spottype_id'];
                $isContains = in_array($type,$typeArray);
                if(!$isContains){
                    array_push($typeArray,$type);
                }
            } 
        }
        $this->spottype = new SpottypeDb;
        $where['id'] = array('in',$typeArray);
        $spottypedata=$this->spottype->all($where);

        $this->line = new VisitrouteDb;
        $linedata=$this->line->all(array("spotare_id" =>$id));

        $result['type'] = $spottypedata;
        $result['spot'] = $spotdata;
        $result['line'] = $linedata;
        $this->success('返回成功',$result);
    }

    /**
     * 获取景区列表
     *  @param int $id 景区
     */
    public function getSpotArea(){
        $id = $this->request->request("id");
        if(empty($id)){
            $this->spotarea = new SpotareaDb;
            $spotareadata=$this->spotarea->all();
            $result = $spotareadata;
            $this->success('返回成功',$result);
        }else{
            $this->spotarea = new SpotareaDb;
            $spotareadata=$this->spotarea->get($id);
            $result = $spotareadata;
            $this->success('返回成功',$result);
        }
    }
}
