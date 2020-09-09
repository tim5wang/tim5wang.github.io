<?php
/**
 * Created by PhpStorm.
 * User: tim
 * Date: 2019/2/18
 * Time: 12:39
 */
namespace App\Domain\Msq;
class Answer
{
    static function getAnswer($data){
        $answers = array();
        foreach ($data['questions'] as $quiz){
            if($quiz['type']=='fill'){
                $sub_answer=array();
                foreach ($quiz['spans'] as $fill){
                    if(is_array($fill)){
                        $sub_answer[] = $fill['value'];
                    }
                }
                $answers[]=$sub_answer;
            }elseif($quiz['type']=='answer'){
                $answers[] = array($quiz['answer']);
            }else{
                $answers[] = $quiz['answer'];
            }
        }
        return $answers;
    }
    static function setAnswer(&$data,$answers){
        foreach ($data['questions'] as $qid=> $quiz){
            if($quiz['type']=='fill'){
                $fillid=0;
                foreach ($quiz['spans'] as $fid=>$fill){
                    if(is_array($fill)){
                        $data['questions'][$qid]['spans'][$fid]['value'] = $answers[$qid][$fillid++];
                        $sub_answer[] = $fill['value'];
                    }
                }
            }elseif($quiz['type']=='answer'){
                $data['questions'][$qid]['answer'] = $answers[$qid][0];
            }else{
                $data['questions'][$qid]['answer'] = $answers[$qid];
            }
        }
        return $data;
    }
}