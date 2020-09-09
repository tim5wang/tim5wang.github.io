<?php
/**
 * 统一访问入口
 */

require_once dirname(__FILE__) . '/init.php';

/**
 * 添加允许跨域访问
 */
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');


$pai = new \PhalApi\PhalApi();
$pai->response()->output();

