<?php
namespace App\Api;

use PhalApi\Api;

/**
 * 默认接口服务类
 *
 * @author: dogstar <chanzonghuang@gmail.com> 2014-10-04
 */

class Site extends Api {

	public function getRules() {

        return array(
            "*"=>array(
                'token'=>array('name'=>'token')
            ),
            'index' => array(
                'username' 	=> array('name' => 'username', 'default' => 'PhalApi', 'desc' => '用户名'),
            ),
            'get_table'=>array(
                'job'=>array('name'=>'job'),
                'guest'=>array('name'=>'guest')
            ),
            'submit_table'=>array(
                'data'=>array('name'=>'data','require'=>true),
                'guest'=>array('name'=>'guest'),
                'job'=>array('name'=>'job')
            ),
            'model_model'=>array(
                'job'=>array('name'=>'job','default'=>null)
            ),
            'update_insert_model'=>array(
                'model'=>array('name'=>'model')
            ),
            'get_all_model'=>array(

            ),
            "delete_model"=>array(
                'id'=>array('name'=>'id')
            )
        );
	}
	
	/**
	 * 默认接口服务
     * @desc 默认接口服务，当未指定接口服务时执行此接口服务
	 * @return string title 标题
	 * @return string content 内容
	 * @return string version 版本，格式：X.X.X
	 * @return int time 当前时间戳
     * @exception 400 非法请求，参数传递错误
	 */
	public function index() {
        return array(
            'title' => 'Hello ' . $this->username,
            'version' => PHALAPI_VERSION,
            'time' => $_SERVER['REQUEST_TIME'],
        );
	}

	public function get_table(){
        $guest = \PhalApi\DI()->jwt->decodeJwtByParam($this->guest);
	    $ip = \App\Common\Tool::getIp();
	    if(isset($guest)){
            $guest = \PhalApi\DI()->jwt->encodeJwt(array(
                    'ip'=>$ip,
                    'time'=>date('Y-m-d H:i:s',time()),
                )
            );
        }

        $m_model = new \App\Model\Msq\Model();
        $model = $m_model->get_model(array('job'=>$this->job));
        $model['questions'] = json_decode($model['questions'],true);
	    return array('data'=>$model,'guest'=>$guest);

    }

    public function submit_table(){
        $data = json_decode($this->data,256);
        $guest = \PhalApi\DI()->jwt->decodeJwtByParam($this->guest);
        $m_answer = new \App\Model\Msq\Answer();
        $answers = \App\Domain\Msq\Answer::getAnswer($data);

        $ans  = array(
            'identify'=> json_encode($answers[$data['identify']],256),
            'job'=>$this->job,
            'answer'=>json_encode($answers,256),
            'model_id'=>$data['id']
        );
        $ans['ip'] = $guest['ip'];
        $ans['begin_time'] = $guest['time'];
        return $m_answer->insert($ans);
    }

    /**
     * 获取问卷系统模型
     * @return array
     */
    public function model_model(){
        if($this->job!=null){
            $this->guest=null;
            $res = $this->get_table();
            return $res['data'];
        }
        return array(
            'job'=>'job1',
            'title'=>'联谊活动报名及基本信息采集，为了这次联谊起到更好的效果，请认真填写本问卷，谢谢配合！',
            'desc'=>'这个是一个问卷模板，包含四种问题类型，位于questions中，您可以在此基础上实现你的问卷,
            其中job是这个问卷的文艺标志，title是问卷的标题，desc为问卷的说明，
            time_limit如果答题限时设置为正整数秒，设置为false时不限制时间，identify题目数组的下标，
            标志出能唯一区分用户的问题，如名字/电话;weight代表分数;standard_answer代表标准答案;',
            'time_limit'=>3600,
            'identify'=>'3',
            'questions'=>array(
                array(
                    'type'=>'single_chose',
                    'question'=>'性别',
                    'require'=>true,
                    'options'=>array(
                        '男'=>'绅士',
                        '女'=>'女士'
                    ),
                    'weight'=>1,
                    'standard_answer'=>''
                ),
                array(
                    'type'=>'multi_chose',
                    'max_chosen'=>3,
                    'min_chosen'=>1,
                    'require'=>true,
                    'question'=>'想去哪个景点晚？',
                    'options'=>array(
                        '世界之窗'=>'世界之窗，门票约200元，耗时约半天。',
                        '东部华侨城'=>'华侨城，门票约200元，耗时约1天',
                        '欢乐谷'=>'欢乐谷，门票约200元，耗时约1天',
                        '锦绣中华'=>'锦绣中华，位于世界之窗隔壁，门票约200元，耗时约半天',
                        '大梅沙'=>'大梅沙海滩，免费，请带好泳具，耗时约半天',
                    ),
                    'weight'=>1,
                    'standard_answer'=>[]
                ),
                array(
                    'type'=>'fill',
                    'require'=>false,
                    'condition'=>array(
                        array(
                            'question'=>0,
                            'answer'=>'女',
                            'join'=>'or'
                        )
                    ),
                    'question'=>'我可以接受$relation$（好朋友/伴侣/性伴侣/炮友）关系，我愿意在$location$（地方）放纵，我愿意一周放纵$times$（数字）次。',
                    'map'=>array(
                        'relation'=>array(
                            'type'=>'text'
                        ),
                        'location'=>array(
                            'type'=>'select',
                            'options'=>array(
                                '没人看到的公共场所',
                                '双方家里',
                                '宾馆',
                                '小树林'
                            )
                        ),
                        'times'=>array(
                            'type'=>'number'
                        )
                    ),
                    'weight'=>1,
                    'standard_answer'=>[]
                ),
                array(
                    'type'=>'answer',
                    'require'=>true,
                    'question'=>'你最自卑的一件事情是什么？(将为您保护隐私)',
                    'weight'=>1,
                    'standard_answer'=>''
                )
            ),
        );
    }

    /**
     * 获取模型
     *
     */
    public function get_model(){

    }

    /**
     * 获取全部问卷
     * @return bool|mixed
     */
    public function get_all_model(){
        $m_model = new \App\Model\Msq\Model();
        $auth = \PhalApi\DI()->jwt->decodeJwtByParam($this->token);
        $user_id = $auth['user']->id;
        $models = $m_model->get_all_model(array('user_id'=>$user_id));
        if($models!=false){
            foreach ($models as $k=>$model){
                $models[$k]['questions'] = json_decode($models[$k]['questions'],true);
            }
        }
        return $models;
    }

    /**
     * 插入模型
     */
    public function insert_model(){

    }

    /**
     * 更新模型
     */
    public function update_model(){

    }

    /**
     * 插入入或者更新模型
     */
    public function update_insert_model(){
        $data = json_decode($this->model,true);
        $m_model = new \App\Model\Msq\Model();
        $auth = \PhalApi\DI()->jwt->decodeJwtByParam($this->token);
        $user_id = $auth['user']->id;
        $model = $m_model->get_model(array('job'=>$data['job']));

        if(isset($data['questions'])) $data['questions'] = json_encode($data['questions'],256);
        if($model==false){
            $data['user_id'] = $user_id;
            $data['status'] = '未发布';
            $re = $m_model->insert($data);
            \PhalApi\DI()->response->setMsg("插入");
            return $re;
        }else{
            if($model['user_id']!=$user_id){
                return \PhalApi\DI()->response->setMsg("job在整个系统是唯一的，请换一个job试试")->setRet(403);
            }
            \PhalApi\DI()->response->setMsg("更新");
            return $m_model->update($model['id'],$data);
        }
    }

    /**
     * 插入或者更新回答
     */
    public function update_insert_answer(){

    }

    /**
     * 获取全部回答
     */
    public function get_all_answer(){

    }

    /**
     * 登陆
     */
    public function login(){

    }

    public function delete_model(){
        $m_model = new \App\Model\Msq\Model();
        return $m_model->delete($this->id);
    }


}
