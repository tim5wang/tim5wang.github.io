<?php
/**
 * Created by PhpStorm.
 * User: tim
 * Date: 2019/2/16
 * Time: 15:52
 */

namespace App\Model\Msq;
use PhalApi\Model\NotORMModel as NotORM;


class Answer extends NotORM {

    protected function getTableName($id) {
        return 'answer';
    }

}