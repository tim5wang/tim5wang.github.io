<?php
/**
 * Created by PhpStorm.
 * User: tim
 * Date: 2019/2/16
 * Time: 17:19
 */

namespace App\Model\User;

use PhalApi\Model\NotORMModel as NotORM;
class User extends NotORM
{
    protected function getTableName($id) {
        return 'user';
    }

    public function get_all($type = null){
        $orm = $this->getORM();
        if($type!=null) $orm->where('type',$type);
        return $orm->fetchAll();
    }

    public function login($username,$password){
        return $this->getORM()->where('username',$username)->and('password',$password)->fetchOne();
    }
}