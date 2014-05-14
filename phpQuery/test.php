<?php
/*
 *author:hanshaobo
 *date:2014.5.13
 *description:获取网页页面数据
*/
//加载phpQuery
require_once dirname(__FILE__).'./phpQuery/phpQuery.php';
header("Content-type:text/html;charset=utf-8");
//起始路径
//$url = 'http://newhouse.hs.soufun.com/house/%BA%E2%CB%AE_________________1___.htm';
$url = 'http://www.zjs.com/xinfang/xiyinli/xiangxi/';
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
//	mb_convert_encoding($html,'utf-8','gb2312');
	
	//调用newDocumentHTML函数
	phpquery::newDocumentHTML($html);
	curl_close($ch);
	return $html;
}

get_con($url);
//获取title
$title = pq('head title')->html();
echo '详细页首页:'.$title.'<br>';

$data = pq('.bodyb')->find('div h4');
foreach($data as $val)
{
	$data_val = pq($val)->html();
	//print_r($data_val);
}
$xiangqing = pq('.bodyb')->find('div');
foreach($xiangqing as $xiangqing_data)
{
	$data_neirong = pq($xiangqing_data)->find('li');
	foreach($data_neirong as $val)
	{
		$data_neirong = pq($val)->text();
		$arr[] = explode("：",$data_neirong);
		
	}
}
$xiangxi = pq('.bodyb')->find('h4:eq(5)')->html().':'.pq('.bodyb')->find('div:eq(5)')->html();
print_r($xiangxi);

?>