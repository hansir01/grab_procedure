<?php
/*
 *author:hanshaobo
 *date:2014.5.13
 *description:获取网页页面数据
*/
//加载phpQuery
require_once dirname(__FILE__).'./phpQuery/phpQuery.php';
//起始路径
//$url = 'http://newhouse.hs.soufun.com/house/%BA%E2%CB%AE_________________1___.htm';
$url = 'http://newhouse.hs.soufun.com/house/web/Search_Result.php';
//用curl获取获取html数据
function get_con($url)
{
	$ch = curl_init();
	curl_setopt($ch, CURLOPT_URL, $url);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
	curl_setopt($ch, CURLOPT_HEADER, 0);
	curl_setopt($ch, CURLOPT_USERAGENT, "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.22 (KHTML, like Gecko) Chrome/25.0.1364.172 Safari/537.22");
	curl_setopt($ch, CURLOPT_ENCODING ,'gzip');
	$html = curl_exec($ch);
	//转换编码
	mb_convert_encoding($html,'utf-8','gb2312');
	
	//调用newDocumentHTML函数
	phpquery::newDocumentHTML($html,'utf-8');
	curl_close($ch);
	return $html;
}

//调用函数
$html = get_con($url);
if(!$html){
	echo '该网址暂时不能访问！！！';
	exit;
}

//获取数据
//获取title
$title = pq('head title')->html();
echo '衡水搜索首页:'.$title.'<br>	';
$num = pq('.snorange:eq(0')->html();
echo '楼盘总数：'.$num.'<br>';

//总页数
$pageNum = ceil($num/10);

//每页信息
for($i = 1;$i <= 2;$i++){
	$page_url = 'http://newhouse.hs.soufun.com/house/%BA%E2%CB%AE_________________'.$i.'___.htm';
	echo $page_url.'<br>';
	//调用函数
	get_con($page_url);
	$data = pq('.sslist')->find('.sslainfor');
	echo '~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~<br>';
	foreach($data as $loupan_url)
	{
		$loupan = pq($loupan_url)->find('a:eq(0)')->html();
		$url_lou = pq($loupan_url)->find('a:eq(0)')->attr('href');
		get_con($url_lou);
		$xingqing_url = pq('.nnleft')->find('a:eq(2)')->attr('href');
		$xingce_url = pq('.nnleft')->find('a:eq(3)')->attr('href');
		echo '楼盘名称:'.$loupan.'--------'.$url_lou.'--楼盘详情url:'.$xingqing_url.'<br>';
		echo '楼盘相册url:'.$xingce_url.'<br>';
		get_con($xingqing_url);
		echo '-------------------------------------------<br>';
	}
	echo '~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~<br>';
	unset($page_url);
	unset($data);
}

?>