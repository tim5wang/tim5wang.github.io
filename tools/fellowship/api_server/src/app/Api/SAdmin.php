<?php
namespace App\Api;

use PhalApi\Api;
use PhalApi\Exception\BadRequestException;

/**
 * 用户模块接口服务
 */
class SAdmin extends Api {
    public function getRules() {
        return array(
            '*' => array(
                'code' => array('name' => 'code', 'require' => true, 'min' => 4,'desc'=>'超级管理员验证码'),
            ),
            'user_list'=>array(
                'type'=>array('name'=>'type','require'=>true,'default'=>'注册用户')
            ),
            'add_user'=>array(
                'username'=>array('name'=>'username','require'=>true),
                'password'=>array('name'=>'password','require'=>true,),
                'type'=>array('name'=>'type','require'=>true,'default'=>'注册用户'),
                'status'=>array('name'=>'status','require'=>true,'default'=>1),
                'id_group'=>array('name'=>'id_group','default'=>0)

            ),
            'remove_user'=>array(
                'id'=>array('name'=>'id','require'=>true)
            ),
            'update_user'=>array(
                'id'=>array('name'=>'id','require'=>true),
                'username'=>array('name'=>'username','require'=>false),
                'password'=>array('name'=>'password','require'=>false,),
                'type'=>array('name'=>'type','require'=>false,),
                'status'=>array('name'=>'status','require'=>false,),
                'id_group'=>array('name'=>'id_group','require'=>false)
            )
        );
    }


    /**
     * @ignore
     * @throws BadRequestException
     */
    public function _userCheck(){
        if($this->code!="12345678timpp5inixide"){
            throw new BadRequestException("非法访问");
        }
    }

    public function user_list(){
        $m_user = new \App\Model\User\User();
        return $m_user->get_all($this->type);
    }

    public function add_user(){
        $m_user = new \App\Model\User\User();
        return $m_user->insert(
            array(
                'username'=>$this->username,
                'password'=>$this->password,
                'type'=>$this->type,
                'status'=>$this->status,
                'id_group'=>$this->id_group,
            )
        );
    }

    public function remove_user(){
        $m_user = new \App\Model\User\User();
        return $m_user->delete($this->id);
    }

    public function update_user(){
        $m_user = new \App\Model\User\User();
        $data_o = array(
            'username'=>$this->username,
            'password'=>$this->password,
            'type'=>$this->type,
            'status'=>$this->status,
            'id_group'=>$this->id_group,
        );
        $data_n=array();
        foreach ($data_o as $k => $v){
            if(!is_null($v)){
                $data_n[$k] = $v;
            }
        }
        return $m_user->updata($this->id,$data_n);
    }


}
