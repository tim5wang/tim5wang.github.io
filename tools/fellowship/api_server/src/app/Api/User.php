<?php
namespace App\Api;

use PhalApi\Api;

/**
 * 用户模块接口服务
 */
class User extends Api {
    public function getRules() {
        return array(
            'login' => array(
                'username' => array('name' => 'username', 'require' => true, 'min' => 1, 'max' => 50, 'desc' => '用户名'),
                'password' => array('name' => 'password', 'require' => true, 'min' => 6, 'max' => 20, 'desc' => '密码'),
            ),
            'heart'=>array(
                'token'=>array('name'=>'token','require'=>true)
            ),
            'logout'=>array(
                'token'=>array('name'=>'token','require'=>true)
            )
        );

    }
    /**
     * 登录接口
     * @desc 根据账号和密码进行登录操作
     * @return array is_login 是否登录成功
     * @return int user_id 用户ID
     */
    public function login() {
        $username = $this->username;   // 账号参数
        $password = $this->password;   // 密码参数
        $m_user = new \App\Model\User\User();
        $user = $m_user->login($username,$password);
        if($user==false) return \PhalApi\DI()->response->setRet(403);
        unset($user['password']);
        $token = \PhalApi\DI()->jwt->encodeJwt(array(
            'status'=>'login',
            'login_time'=>date('Y-m-d H:i:s',time()),
            'heart_time'=>date('Y-m-d H:i:s',time()),
            'user'=>$user,
        ));
        return array(
            'token'=>$token,
            'username'=>$user['username']
        );
    }

    public function logout(){
        try{
            $auth = \PhalApi\DI()->jwt->decodeJwtByParam($this->token);
            if(is_array($auth) && $auth['status']=='login' && (time() - strtotime($auth['heart_time']))< 2*3600){
                $auth['heart_time'] = date('Y-m-d H:i:s',time());
                $auth['status'] = 'logout';
                $token = \PhalApi\DI()->jwt->encodeJwt($auth);
                return array(
                    'token'=>$token,
                    'username'=>$auth['user']->username
                );
            }else{
                return \PhalApi\DI()->response->setRet(403);
            }
        }catch (\Exception $e){
            return \PhalApi\DI()->response->setRet(403);
        }
    }
    public function heart(){
        try{
            $auth = \PhalApi\DI()->jwt->decodeJwtByParam($this->token);
            if(is_array($auth) && $auth['status']=='login' && (time() - strtotime($auth['heart_time']))< 2*3600){
                $auth['heart_time'] = date('Y-m-d H:i:s',time());
                $token = \PhalApi\DI()->jwt->encodeJwt($auth);
                return array(
                  'token'=>$token,
                  'username'=>$auth['user']->username
                );
            }else{
                return \PhalApi\DI()->response->setRet(403);
            }
        }catch (\Exception $e){
            return \PhalApi\DI()->response->setRet(403);
        }
    }
} 
