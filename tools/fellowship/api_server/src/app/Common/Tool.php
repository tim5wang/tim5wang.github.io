<?php
/**
 * Created by PhpStorm.
 * User: tim
 * Date: 2019/2/16
 * Time: 10:50
 */
namespace App\Common;
class Tool
{
    public static function getIp()
    {

        if(!empty($_SERVER["HTTP_CLIENT_IP"]))
        {
            $cip = $_SERVER["HTTP_CLIENT_IP"];
        }
        else if(!empty($_SERVER["HTTP_X_FORWARDED_FOR"]))
        {
            $cip = $_SERVER["HTTP_X_FORWARDED_FOR"];
        }
        else if(!empty($_SERVER["REMOTE_ADDR"]))
        {
            $cip = $_SERVER["REMOTE_ADDR"];
        }
        else
        {
            $cip = 'unknown';
        }

        return $cip;
    }
}