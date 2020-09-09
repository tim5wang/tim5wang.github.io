<?php
/**
 * Created by PhpStorm.
 * User: tim
 * Date: 2019/2/16
 * Time: 15:51
 */

namespace App\Model\Msq;
use PhalApi\Model\NotORMModel as NotORM;


class Model extends NotORM {

    protected function getTableName($id) {
        return 'model';
    }

    public function get_model($data){
        $orm = $this->getORM();
        if(empty($data)) return false;
        foreach ($data as $k=>$v){
            $orm->and($k,$v);
        }
        return $orm->fetch();
    }

    public function get_all_model($data){
        $orm = $this->getORM();
        if(empty($data)) return false;
        foreach ($data as $k=>$v){
            $orm->and($k,$v);
        }
        return $orm->fetchAll();
    }

}