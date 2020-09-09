-- phpMyAdmin SQL Dump
-- version 4.7.9
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: 2020-09-09 19:54:06
-- 服务器版本： 5.5.62-log
-- PHP Version: 7.2.16

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `phalapi`
--

-- --------------------------------------------------------

--
-- 表的结构 `tbl_answer`
--

CREATE TABLE `tbl_answer` (
  `id` int(11) UNSIGNED NOT NULL,
  `identify` varchar(1024) NOT NULL,
  `job` char(32) NOT NULL,
  `ip` char(64) NOT NULL,
  `answer` text NOT NULL,
  `begin_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `createtime` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updatetime` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `model_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `tbl_answer`
--

INSERT INTO `tbl_answer` (`id`, `identify`, `job`, `ip`, `answer`, `begin_time`, `createtime`, `updatetime`, `model_id`) VALUES
(1, '[\"长得丑\"]', 'job3', '210.22.22.133', '[[\"长得丑\"]]', '2019-09-30 07:32:42', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 3),
(2, '[\"\",\"\",\"\"]', 'job2', '210.22.22.133', '[false,[],false,[\"\",\"\",\"\"],[\"\"],[\"\"]]', '2019-09-30 08:46:55', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 2),
(3, '[\"\"]', '题型模板', '223.73.111.31', '[false,[],[\"\",\"\",\"\"],[\"\"]]', '2019-09-30 16:59:01', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 1);

-- --------------------------------------------------------

--
-- 表的结构 `tbl_group`
--

CREATE TABLE `tbl_group` (
  `id` int(11) NOT NULL,
  `title` char(64) NOT NULL,
  `rules` varchar(1024) NOT NULL,
  `createtime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `status` tinyint(4) NOT NULL DEFAULT '1',
  `updatetime` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `mrules` varchar(1024) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- 表的结构 `tbl_model`
--

CREATE TABLE `tbl_model` (
  `id` int(11) UNSIGNED NOT NULL,
  `user_id` int(11) NOT NULL,
  `job` char(32) NOT NULL,
  `desc` varchar(1024) NOT NULL,
  `identify` char(11) NOT NULL DEFAULT 'false',
  `title` varchar(1024) NOT NULL,
  `time_limit` char(11) NOT NULL DEFAULT 'false',
  `status` char(32) NOT NULL,
  `questions` text NOT NULL,
  `createtime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatetime` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `tbl_model`
--

INSERT INTO `tbl_model` (`id`, `user_id`, `job`, `desc`, `identify`, `title`, `time_limit`, `status`, `questions`, `createtime`, `updatetime`) VALUES
(1, 1, '题型模板', '这个是一个问卷模板，包含四种问题类型，位于questions中，您可以在此基础上实现你的问卷,\n            其中job是这个问卷的文艺标志，title是问卷的标题，desc为问卷的说明，\n            time_limit如果答题限时设置为正整数秒，设置为false时不限制时间，identify题目数组的下标，\n            标志出能唯一区分用户的问题，如名字/电话;weight代表分数;standard_answer代表标准答案;', '3', '联谊活动报名及基本信息采集，为了这次联谊起到更好的效果，请认真填写本问卷，谢谢配合！', '3600', '已发布', '[{\"type\":\"single_chose\",\"question\":\"性别\",\"require\":true,\"options\":{\"男\":\"绅士\",\"女\":\"女士\"},\"weight\":1,\"standard_answer\":\"\"},{\"type\":\"multi_chose\",\"max_chosen\":3,\"min_chosen\":1,\"require\":true,\"question\":\"想去哪个景点晚？\",\"options\":{\"世界之窗\":\"世界之窗，门票约200元，耗时约半天。\",\"东部华侨城\":\"华侨城，门票约200元，耗时约1天\",\"欢乐谷\":\"欢乐谷，门票约200元，耗时约1天\",\"锦绣中华\":\"锦绣中华，位于世界之窗隔壁，门票约200元，耗时约半天\",\"大梅沙\":\"大梅沙海滩，免费，请带好泳具，耗时约半天\"},\"weight\":1,\"standard_answer\":[]},{\"type\":\"fill\",\"require\":false,\"condition\":[{\"question\":0,\"answer\":\"女\",\"join\":\"or\"}],\"question\":\"我可以接受$relation$（好朋友\\/伴侣\\/性伴侣\\/炮友）关系，我愿意在$location$（地方）放纵，我愿意一周放纵$times$（数字）次。\",\"map\":{\"relation\":{\"type\":\"text\"},\"location\":{\"type\":\"select\",\"options\":[\"没人看到的公共场所\",\"双方家里\",\"宾馆\",\"小树林\"]},\"times\":{\"type\":\"number\"}},\"weight\":1,\"standard_answer\":[]},{\"type\":\"answer\",\"require\":true,\"question\":\"你最自卑的一件事情是什么？(将为您保护隐私)\",\"weight\":1,\"standard_answer\":\"\"}]', '2019-02-17 07:18:31', '2019-02-17 21:05:02'),
(2, 1, 'job2', '这个是一个问卷模板，包含四种问题类型，位于questions中，您可以在此基础上实现你的问卷,\n            其中job是这个问卷的文艺标志，title是问卷的标题，desc为问卷的说明，\n            time_limit如果答题限时设置为正整数秒，设置为false时不限制时间，identify题目数组的下标，\n            标志出能唯一区分用户的问题，如名字/电话;weight代表分数;standard_answer代表标准答案;', '3', '联谊活动报名及基本信息采集，为了这次联谊起到更好的效果，请认真填写本问卷，谢谢配合！', '3600', '已发布', '[{\"type\":\"single_chose\",\"question\":\"性别\",\"require\":true,\"options\":{\"男\":\"绅士\",\"女\":\"女士\"},\"weight\":1,\"standard_answer\":\"\"},{\"type\":\"multi_chose\",\"max_chosen\":3,\"min_chosen\":1,\"require\":true,\"question\":\"想去哪个景点玩？\",\"options\":{\"世界之窗\":\"世界之窗，门票约200元，耗时约半天。\",\"东部华侨城\":\"华侨城，门票约200元，耗时约1天\",\"欢乐谷\":\"欢乐谷，门票约200元，耗时约1天\",\"锦绣中华\":\"锦绣中华，位于世界之窗隔壁，门票约200元，耗时约半天\",\"大梅沙\":\"大梅沙海滩，免费，请带好泳具，耗时约半天，距离远夜不归宿\",\"看电影\":\"夜场10点之后场次\",\"海景酒店\":\"约会好去处，地处大梅沙海滩，住宿约1000一晚上\"},\"weight\":1,\"standard_answer\":[]},{\"type\":\"single_chose\",\"question\":\"是否可以接受也不归宿?\",\"require\":true,\"options\":{\"Y\":\"可以\",\"N\":\"不可以\"},\"weight\":1,\"standard_answer\":\"\"},{\"type\":\"fill\",\"require\":false,\"condition\":[{\"question\":0,\"answer\":\"女\",\"join\":\"or\"}],\"question\":\"我可以接受$relation$（好朋友\\/伴侣\\/性伴侣\\/炮友）关系，我愿意在$location$（地方）放纵，我愿意一周放纵$times$（数字）次。\",\"map\":{\"relation\":{\"type\":\"text\"},\"location\":{\"type\":\"select\",\"options\":[\"没人看到的公共场所\",\"双方家里\",\"宾馆\",\"小树林\"]},\"times\":{\"type\":\"number\"}},\"weight\":1,\"standard_answer\":[]},{\"type\":\"answer\",\"require\":true,\"question\":\"你最自卑的一件事情是什么？(将为您保护隐私)\",\"weight\":1,\"standard_answer\":\"\"},{\"type\":\"answer\",\"require\":true,\"question\":\"如果在外面过夜，你希望是哪里？\",\"weight\":1,\"standard_answer\":\"\"}]', '2019-02-17 06:36:58', '2019-02-17 07:52:37'),
(3, 1, 'job3', '这个是一个问卷模板，包含四种问题类型，位于questions中，您可以在此基础上实现你的问卷,\n            其中job是这个问卷的文艺标志，title是问卷的标题，desc为问卷的说明，\n            time_limit如果答题限时设置为正整数秒，设置为false时不限制时间，identify题目数组的下标，\n            标志出能唯一区分用户的问题，如名字/电话;weight代表分数;standard_answer代表标准答案;', '3', '联谊活动报名及基本信息采集，为了这次联谊起到更好的效果，请认真填写本问卷，谢谢配合！', '3600', '未发布', '[{\"type\":\"single_chose\",\"question\":\"性别\",\"require\":true,\"options\":{\"男\":\"绅士\",\"女\":\"女士\"},\"weight\":1,\"standard_answer\":\"\"},{\"type\":\"multi_chose\",\"max_chosen\":3,\"min_chosen\":1,\"require\":true,\"question\":\"想去哪个景点晚？\",\"options\":{\"世界之窗\":\"世界之窗，门票约200元，耗时约半天。\",\"东部华侨城\":\"华侨城，门票约200元，耗时约1天\",\"欢乐谷\":\"欢乐谷，门票约200元，耗时约1天\",\"锦绣中华\":\"锦绣中华，位于世界之窗隔壁，门票约200元，耗时约半天\",\"大梅沙\":\"大梅沙海滩，免费，请带好泳具，耗时约半天\"},\"weight\":1,\"standard_answer\":[]},{\"type\":\"fill\",\"require\":false,\"condition\":[{\"question\":0,\"answer\":\"女\",\"join\":\"or\"}],\"question\":\"我可以接受$relation$（好朋友\\/伴侣\\/性伴侣\\/炮友）关系，我愿意在$location$（地方）放纵，我愿意一周放纵$times$（数字）次。\",\"map\":{\"relation\":{\"type\":\"text\"},\"location\":{\"type\":\"select\",\"options\":[\"没人看到的公共场所\",\"双方家里\",\"宾馆\",\"小树林\"]},\"times\":{\"type\":\"number\"}},\"weight\":1,\"standard_answer\":[]},{\"type\":\"answer\",\"require\":true,\"question\":\"你最自卑的一件事情是什么？(将为您保护隐私)\",\"weight\":1,\"standard_answer\":\"\"}]', '2019-02-17 07:18:31', '2019-02-17 21:05:02'),
(4, 1, 'job4', '这个是一个问卷模板，包含四种问题类型，位于questions中，您可以在此基础上实现你的问卷,\n            其中job是这个问卷的文艺标志，title是问卷的标题，desc为问卷的说明，\n            time_limit如果答题限时设置为正整数秒，设置为false时不限制时间，identify题目数组的下标，\n            标志出能唯一区分用户的问题，如名字/电话;weight代表分数;standard_answer代表标准答案;', '3', '联谊活动报名及基本信息采集，为了这次联谊起到更好的效果，请认真填写本问卷，谢谢配合！', '3600', '未发布', '[{\"type\":\"single_chose\",\"question\":\"性别\",\"require\":true,\"options\":{\"男\":\"绅士\",\"女\":\"女士\"},\"weight\":1,\"standard_answer\":\"\"},{\"type\":\"multi_chose\",\"max_chosen\":3,\"min_chosen\":1,\"require\":true,\"question\":\"想去哪个景点晚？\",\"options\":{\"世界之窗\":\"世界之窗，门票约200元，耗时约半天。\",\"东部华侨城\":\"华侨城，门票约200元，耗时约1天\",\"欢乐谷\":\"欢乐谷，门票约200元，耗时约1天\",\"锦绣中华\":\"锦绣中华，位于世界之窗隔壁，门票约200元，耗时约半天\",\"大梅沙\":\"大梅沙海滩，免费，请带好泳具，耗时约半天\"},\"weight\":1,\"standard_answer\":[]},{\"type\":\"fill\",\"require\":false,\"condition\":[{\"question\":0,\"answer\":\"女\",\"join\":\"or\"}],\"question\":\"我可以接受$relation$（好朋友\\/伴侣\\/性伴侣\\/炮友）关系，我愿意在$location$（地方）放纵，我愿意一周放纵$times$（数字）次。\",\"map\":{\"relation\":{\"type\":\"text\"},\"location\":{\"type\":\"select\",\"options\":[\"没人看到的公共场所\",\"双方家里\",\"宾馆\",\"小树林\"]},\"times\":{\"type\":\"number\"}},\"weight\":1,\"standard_answer\":[]},{\"type\":\"answer\",\"require\":true,\"question\":\"你最自卑的一件事情是什么？(将为您保护隐私)\",\"weight\":1,\"standard_answer\":\"\"}]', '2019-09-30 07:45:32', '0000-00-00 00:00:00'),
(6, 1, 'job1', '这个是一个问卷模板，包含四种问题类型，位于questions中，您可以在此基础上实现你的问卷,\n            其中job是这个问卷的文艺标志，title是问卷的标题，desc为问卷的说明，\n            time_limit如果答题限时设置为正整数秒，设置为false时不限制时间，identify题目数组的下标，\n            标志出能唯一区分用户的问题，如名字/电话;weight代表分数;standard_answer代表标准答案;', '3', '联谊活动报名及基本信息采集，为了这次联谊起到更好的效果，请认真填写本问卷，谢谢配合！', '3600', '未发布', '[{\"type\":\"single_chose\",\"question\":\"性别\",\"require\":true,\"options\":{\"男\":\"绅士\",\"女\":\"女士\"},\"weight\":1,\"standard_answer\":\"\"},{\"type\":\"multi_chose\",\"max_chosen\":3,\"min_chosen\":1,\"require\":true,\"question\":\"想去哪个景点晚？\",\"options\":{\"世界之窗\":\"世界之窗，门票约200元，耗时约半天。\",\"东部华侨城\":\"华侨城，门票约200元，耗时约1天\",\"欢乐谷\":\"欢乐谷，门票约200元，耗时约1天\",\"锦绣中华\":\"锦绣中华，位于世界之窗隔壁，门票约200元，耗时约半天\",\"大梅沙\":\"大梅沙海滩，免费，请带好泳具，耗时约半天\"},\"weight\":1,\"standard_answer\":[]},{\"type\":\"fill\",\"require\":false,\"condition\":[{\"question\":0,\"answer\":\"女\",\"join\":\"or\"}],\"question\":\"我可以接受$relation$（好朋友\\/伴侣\\/性伴侣\\/炮友）关系，我愿意在$location$（地方）放纵，我愿意一周放纵$times$（数字）次。\",\"map\":{\"relation\":{\"type\":\"text\"},\"location\":{\"type\":\"select\",\"options\":[\"没人看到的公共场所\",\"双方家里\",\"宾馆\",\"小树林\"]},\"times\":{\"type\":\"number\"}},\"weight\":7,\"standard_answer\":[]},{\"type\":\"answer\",\"require\":true,\"question\":\"你最自卑的一件事情是什么？(将为您保护隐私)\",\"weight\":1,\"standard_answer\":\"\"}]', '2019-09-30 08:58:04', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- 表的结构 `tbl_rule`
--

CREATE TABLE `tbl_rule` (
  `id` int(11) NOT NULL,
  `path` char(64) NOT NULL,
  `title` char(64) NOT NULL,
  `type` tinyint(1) NOT NULL,
  `status` tinyint(1) NOT NULL,
  `authopen` tinyint(1) NOT NULL,
  `pid` int(11) NOT NULL,
  `createtime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatetime` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- 表的结构 `tbl_user`
--

CREATE TABLE `tbl_user` (
  `id` int(11) UNSIGNED NOT NULL,
  `username` char(64) NOT NULL,
  `password` char(64) NOT NULL,
  `id_group` int(11) NOT NULL,
  `status` tinyint(4) NOT NULL,
  `createtime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatetime` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `type` char(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `tbl_user`
--

INSERT INTO `tbl_user` (`id`, `username`, `password`, `id_group`, `status`, `createtime`, `updatetime`, `type`) VALUES
(1, 'fellowship', '123456', 0, 1, '2019-02-16 01:56:43', '2019-02-16 01:56:43', '超级管理员'),
(2, 'admin', '123456', 0, 1, '2019-02-16 01:56:43', '2019-02-16 01:56:43', '超级管理员');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tbl_answer`
--
ALTER TABLE `tbl_answer`
  ADD PRIMARY KEY (`id`),
  ADD KEY `model_id` (`model_id`);

--
-- Indexes for table `tbl_model`
--
ALTER TABLE `tbl_model`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `job` (`job`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `user_id_2` (`user_id`),
  ADD KEY `user_id_3` (`user_id`);

--
-- Indexes for table `tbl_user`
--
ALTER TABLE `tbl_user`
  ADD PRIMARY KEY (`id`);

--
-- 在导出的表使用AUTO_INCREMENT
--

--
-- 使用表AUTO_INCREMENT `tbl_answer`
--
ALTER TABLE `tbl_answer`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- 使用表AUTO_INCREMENT `tbl_model`
--
ALTER TABLE `tbl_model`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- 使用表AUTO_INCREMENT `tbl_user`
--
ALTER TABLE `tbl_user`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
