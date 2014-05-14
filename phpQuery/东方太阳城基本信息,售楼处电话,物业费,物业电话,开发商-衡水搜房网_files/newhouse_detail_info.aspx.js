/*视频滑动门*/
function show_menu(num){
for(i=0;i<100;i++){
	if(document.getElementById('li0'+i)){
	document.getElementById('h0'+i).style.display='none';
	document.getElementById('li0'+i).style.display='none';
	document.getElementById('f0'+i).className='shipin03';
	 }
}
	  document.getElementById('h0'+num).style.display='block';//触发以后标题块
	  document.getElementById('li0'+num).style.display='block';//触发以后信息块
	  document.getElementById('f0'+num).className='shipin030';//触发以后TAG样式
}

/* 热销榜 新盘榜 */
function show_menub(num1){
for(i=0;i<100;i++){	
		if(document.getElementById('bli0'+i)){
	document.getElementById('bli0'+i).style.display='none';
	document.getElementById('bf0'+i).style.color='';
	document.getElementById('bf0'+i).className='rexiao0201';
	 }
}
	  document.getElementById('bli0'+num1).style.display='block';
	  document.getElementById('bf0'+num1).className='rexiao0202';
}
/* 详细信息 滑动门 */
function show_menud(num2,anchor_point){
for(i=0;i<100;i++){	
		if(document.getElementById('dli0'+i)){
	document.getElementById('dli0'+i).style.display='none';
	document.getElementById('df0'+i).className='xiangxidowntop02';
	 }
	 }
	  document.getElementById('dli0'+num2).style.display='block';
	  document.getElementById('df0'+num2).className='xiangxidowntop01';
	if(anchor_point!=""){
		document.location.href=anchor_point;
}
}
/*户型图 */
function show_menue(num2,newcode)
{
	//getpic_for_apartment(num2,newcode);
	for(i=0;i<100;i++)
	{	
		if(document.getElementById('eli0'+i))
		{
			document.getElementById('eli0'+i).style.display='none';
		}
	}
	document.getElementById('eli0'+num2).style.display='block';
}
/* 楼盘相册 楼盘样板间 */
function show_menuc(num2,pictype,newcode){
//getpic_for_albums_and_modelrooms(pictype,newcode);
for(i=0;i<100;i++){	
		if(document.getElementById('cli0'+i)){
	document.getElementById('cli0'+i).style.display='none';
	document.getElementById('cf0'+i).className='loupanxiangce2';
	 }
}
	  document.getElementById('cli0'+num2).style.display='block';
	  document.getElementById('cf0'+num2).className='loupanxiangce1';
}
/* 周边楼盘 同价位楼盘 */
function show_menuf(num2){
for(i=0;i<100;i++){	
		if(document.getElementById('fli0'+i)){
	document.getElementById('fli0'+i).style.display='none';
	document.getElementById('ff0'+i).className='zhoubian0201';
	 }
}
	  document.getElementById('fli0'+num2).style.display='block';
	  document.getElementById('ff0'+num2).className='zhoubian0202';
}
/* 问答 */
function moreBoxto(nume){
	for (j=0; j<10; j++){
	 if(document.getElementById('moreBox' + j)){
	 document.getElementById('moreBox'+j).style.display='none';

	 }
	}
	document.getElementById('moreBox'+nume).style.display='block';
}
function hidden_moreBoxto(nume) {
	timeout = setTimeout(function() {document.getElementById("moreBox"+nume).style.display = "none";},100);
}
function show_moreBoxto(nume){
	window.clearTimeout(timeout);
	document.getElementById("moreBox"+nume).style.display = "";
}
/*****************************************/
/*1 begin 物业点评 property_comment.aspx */
/*1.1 begin 根据评论类型+newcode+stars进行楼盘评分 */
function avoteStar(stars,commenttype,newcode)
{
    Xml.Request("/house/datainterface/property_comment.aspx?stars="+stars+"&commenttype="+commenttype+"&newcode="+newcode,null,inform,stars);    
}
/* end 根据评论类型+newcode+stars进行楼盘评分 */
/*1.2 begin 根据返回的xml 重写div */
function inform(ss)
{
    var rsphtml=this.responseText;
    //根据UserVote.aspx返回的值，提示用户
    var value=rsphtml.substr(rsphtml.lastIndexOf("</div>")-1,1);
    var red=rsphtml.substr(rsphtml.lastIndexOf("<red>")+5,rsphtml.lastIndexOf("</red>")-rsphtml.lastIndexOf("<red>")-5);
    var redd=rsphtml.substr(rsphtml.lastIndexOf("<redd>")+6,rsphtml.lastIndexOf("</redd>")-rsphtml.lastIndexOf("<redd>")-6);
    var count=rsphtml.substr(rsphtml.lastIndexOf("<count>")+7,rsphtml.lastIndexOf("</count>")-rsphtml.lastIndexOf("<count>")-7);
    if(value==0)
    {
        alert(("感谢您的评分，您的评分是:")+ss+("分"));
        
        //改写页面投票信息
        
        document.getElementById('pinglun1top').innerHTML="<strong><a name=\'dpwy'>物业点评</a></strong>(共<span>"+count+"</span>人参与，均分<span>"+redd+"</span>分)";
        var html = '<table><tr><td>网友评分:</td><td><ul class=\'star-rating\'>';
	    var dark = 5-red;
	    for(i=0;i<red;i++)
	    {
		    html += "<li class='star_red' title='物业点评均分为"+redd+"分'></li>";
	    }
	    for(j=0;j<dark;j++)
	    {
		    html += "<li title='物业点评均分为"+redd+">分'></li>";
	    }
	    html +='</ul></td></tr></table>';
    	
	    document.getElementById('wypf').innerHTML = html;
    }
    else if(value==1)
    {
        alert("请不要重复评分");
    }
    else if(value==2)
    {
        alert("暂时不允许评分");
    }
}
/* end 根据返回的xml 重写div */
/*1 end 物业点评 property_comment.aspx  /
/****************************************/

/**********************************************/
/*2 begin 获取楼盘图片 getpicture_for_detail_info.aspx*/
/*2.1 begin 根据户型类型+newcode 获取户型图图片 */
function getpic_for_apartment(apartmenttype,newcode)
{
    Xml.Request("/house/datainterface/getpicture_for_detail_info.aspx?apartmenttype="+apartmenttype+"&newcode="+newcode,null,setpic_for_apartment,apartmenttype);    
}
/* end 根据户型类型 获取户型图图片 */
/*2.2 begin 根据返回的图片xml信息 填充户型图片div */
function setpic_for_apartment(apartmenttype)
{
	var html="";
	var pic_url=this.responseXML.getElementsByTagName("pic_url");
	var pic_desc=this.responseXML.getElementsByTagName("pic_desc");
	
	if (window.navigator.userAgent.indexOf("Firefox")>=1)
	{
		//如果浏览器为Firefox
		var oSerializer = new XMLSerializer();
		for(var i=0;i<pic_url.length;i++)
		{
			html+="<div class='xiangcetu'>"
			html+=("<div class='xiangcetu1'><span class='edge'></span><span class='container'>"+oSerializer.serializeToString(pic_url[i].firstChild)+"</span></div>");
			html+=("<div class='xiangcetu2'>"+oSerializer.serializeToString(pic_desc[i].firstChild)+"</div>");
			html+="</div>";
		}
	}
	else
	{
		for(var i=0;i<pic_url.length;i++)
		{
			html+="<div class='xiangcetu'>"
			html+=("<div class='xiangcetu1'><span class='edge'></span><span class='container'>"+pic_url[i].firstChild.xml+"</span></div>");
			html+=("<div class='xiangcetu2'>"+pic_desc[i].firstChild.xml+"</div>");
			html+="</div>";
		}
    }
    document.getElementById('eli0'+apartmenttype).innerHTML=html;
}
/* end 根据返回的图片xml信息 填充div */
/*2.3 begin 根据pictype+newcode 获取相册 样板间图片 */
function getpic_for_albums_and_modelrooms(pictype,newcode)
{
    Xml.Request("/house/datainterface/getpicture_for_detail_info.aspx?newcode="+newcode+"&pictype="+pictype,null,setpic_for_albums_and_modelrooms,pictype);    
}
/* end 根据pictype+newcode 获取相册 样板间图片 */
/*2.4 begin 根据返回的图片xml信息 填充相册 样板间div */
function setpic_for_albums_and_modelrooms(pictype)
{
	var html="";
	var xml=this.responseXML;
	
	var pic_url=xml.getElementsByTagName("pic_url");
	var pic_desc=xml.getElementsByTagName("pic_desc");
	if (window.navigator.userAgent.indexOf("Firefox")>=1)
	{
		//如果浏览器为Firefox
		var oSerializer = new XMLSerializer();
		for(var i=0;i<pic_url.length;i++)
		{
			html+="<div class='xiangcetu'>";
			html+=("<div class='xiangcetu1'><span class='edge'></span><span class='container'>"+oSerializer.serializeToString(pic_url[i].firstChild)+"</span></div>");
			html+=("<div class='xiangcetu2'>"+oSerializer.serializeToString(pic_desc[i].firstChild)+"</div>");
			html+="</div>";
		}
	}
	else
	{
		for(var i=0;i<pic_url.length;i++)
		{
			html+="<div class='xiangcetu'>"
			html+=("<div class='xiangcetu1'><span class='edge'></span><span class='container'>"+pic_url[i].firstChild.xml+"</span></div>");
			html+=("<div class='xiangcetu2'>"+pic_desc[i].firstChild.xml+"</div>");
			html+="</div>";
		}
	}
    if(pictype==('albums'))
    {
		document.getElementById('cli011').innerHTML=html;
    }
    if(pictype==('modelroom'))
    {
		document.getElementById('cli012').innerHTML=html;
    }
}
/* end 根据返回的图片xml信息 填充div */
/*2 end 获取楼盘图片 getpicture_for_detail_info.aspx*/
/*****************************************************/

/*口碑榜 begin*/
function gradeStar(stars, commenttype, newcode){
    Xml.Request("/house/datainterface/property_comment.aspx", "stars=" + stars + "&commenttype=" + commenttype + "&newcode=" + newcode, gradeInform, stars);
}
function gradeInform(ss){
    var rsphtml = this.responseText;

    var allCount = rsphtml.substr(rsphtml.lastIndexOf("<allCount>") + 10, rsphtml.lastIndexOf("</allCount>") - rsphtml.lastIndexOf("<allCount>") - 10);
    var allBar = rsphtml.substr(rsphtml.lastIndexOf("<allBar>") + 8, rsphtml.lastIndexOf("</allBar>") - rsphtml.lastIndexOf("<allBar>") - 8);

	var purpleCount = rsphtml.substr(rsphtml.lastIndexOf("<purpleCount>") + 13, rsphtml.lastIndexOf("</purpleCount>") - rsphtml.lastIndexOf("<purpleCount>") - 13);
    var purpleBar = rsphtml.substr(rsphtml.lastIndexOf("<purpleBar>") + 11, rsphtml.lastIndexOf("</purpleBar>") - rsphtml.lastIndexOf("<purpleBar>") - 11);

    var redCount = rsphtml.substr(rsphtml.lastIndexOf("<redCount>") + 10, rsphtml.lastIndexOf("</redCount>") - rsphtml.lastIndexOf("<redCount>") - 10);
    var redBar = rsphtml.substr(rsphtml.lastIndexOf("<redBar>") + 8, rsphtml.lastIndexOf("</redBar>") - rsphtml.lastIndexOf("<redBar>") - 8);

    var yellowCount = rsphtml.substr(rsphtml.lastIndexOf("<yellowCount>") + 13, rsphtml.lastIndexOf("</yellowCount>") - rsphtml.lastIndexOf("<yellowCount>") - 13);
    var yellowBar = rsphtml.substr(rsphtml.lastIndexOf("<yellowBar>") + 11, rsphtml.lastIndexOf("</yellowBar>") - rsphtml.lastIndexOf("<yellowBar>") - 11);

    var greenCount = rsphtml.substr(rsphtml.lastIndexOf("<greenCount>") + 12, rsphtml.lastIndexOf("</greenCount>") - rsphtml.lastIndexOf("<greenCount>") - 12);
    var greenBar = rsphtml.substr(rsphtml.lastIndexOf("<greenBar>") + 10, rsphtml.lastIndexOf("</greenBar>") - rsphtml.lastIndexOf("<greenBar>") - 10);

    var blueCount = rsphtml.substr(rsphtml.lastIndexOf("<blueCount>") + 11, rsphtml.lastIndexOf("</blueCount>") - rsphtml.lastIndexOf("<blueCount>") - 11);
    var blueBar = rsphtml.substr(rsphtml.lastIndexOf("<blueBar>") + 9, rsphtml.lastIndexOf("</blueBar>") - rsphtml.lastIndexOf("<blueBar>") - 9);

	//改写页面投票信息
	document.getElementById('all_count').innerHTML = "网友评分（" + allCount + "人参加）：";
	document.getElementById('all_bar').innerHTML = "网友评分：" + allBar;
	document.getElementById('purple_count').innerHTML = "&nbsp;共<em>" + purpleCount + "</em>人";
	document.getElementById('purple_bar').style.width = purpleBar + "%";
	document.getElementById('purple_bar').alt = purpleBar + "%";
	document.getElementById('red_count').innerHTML = "&nbsp;共<em>" + redCount + "</em>人";
	document.getElementById('red_bar').style.width = redBar + "%";
	document.getElementById('red_bar').alt = redBar + "%";
	document.getElementById('yellow_count').innerHTML = "&nbsp;共<em>" + yellowCount + "</em>人";
	document.getElementById('yellow_bar').style.width = yellowBar + "%";
	document.getElementById('yellow_bar').alt = yellowBar + "%";
	document.getElementById('green_count').innerHTML = "&nbsp;共<em>" + greenCount + "</em>人";
	document.getElementById('green_bar').style.width = greenBar + "%";
	document.getElementById('green_bar').alt = greenBar + "%";
	document.getElementById('blue_count').innerHTML = "&nbsp;共<em>" + blueCount + "</em>人";
	document.getElementById('blue_bar').style.width = blueBar + "%";
	document.getElementById('blue_bar').alt = blueBar + "%";
}
function gradeHover(obj, score){
	for(i = 1; i <= score; i++){
		document.getElementById(obj + i).style.background = "url(http://img.soufun.com/house/detail_new/images/newstar.gif) 0 -14px no-repeat";
	}
	for(i = score + 1; i <= 5; i++){
		document.getElementById(obj + i).style.background = "url(http://img.soufun.com/house/detail_new/images/newstar.gif) 0 0 no-repeat";
	}
	var obj = document.getElementById("fen_" + obj);
	if(obj){
		if(score == 1){
			obj.innerHTML = "很差";
		}else if(score == 2){
			obj.innerHTML = "一般";
		}else if(score == 3){
			obj.innerHTML = "还行";
		}else if(score == 4){
			obj.innerHTML = "不错";
		}else if(score == 5){
			obj.innerHTML = "很好";
		}
	}
}
function gradeOut(obj){
	for(i = 1; i <= 5; i++){
		if(document.getElementById(obj + i)){
			document.getElementById(obj + i).style.background = "url(http://img.soufun.com/house/detail_new/images/newstar.gif) 0 0 no-repeat";
		}
	}
	var obj = document.getElementById("fen_" + obj);
	if(obj){
		obj.innerHTML = "打分";
	}
}
/*口碑榜 end*/

// image: img 元素
// zoom: (true|false) 是否对图片进行缩放，缺省为true
// width/height:
//   如果只指定width，则把图片的显示宽度缩到width 范围之内；
//   如果同时指定两个参数:
//      如果zoom 为false，则强制图片的显示大小为 width(px) x height(px)；
//      如果zoom 为true，则把图片缩小到指定的 width * height 范围之内
function _missthumbnail(image, width, height, zoom) {
  // 计算原图的url 地址
  var url=image.src;
  var p1=url.lastIndexOf('.');
  if(url == '' || p1 == -1) {
    return;
  }
  if(!url.substring(p1-2, p1).match(/[_-][smol]/)) {
    return;
  }
  url=url.substring(0, p1-2) + url.substring(p1);
  image.src=url;
  image.removeAttribute('width');
  image.removeAttribute('height');
  // 显示图片的原始大小，不进行缩放
  if(zoom != null && zoom == false) {
    if(width != null) image.width=width;
    if(height != null) image.height=height;
    return;
  }
  // 把图片的宽度缩到 width 范围之内
  if(width != null && height == null) {
    if(image.width > width) {
      image.height=width*image.height/image.width;
      image.width = width;
    }
  } else if(width != null && height != null && (image.width > width || image.height > height)) {
    // 把图片缩小到指定的 width * height 范围之内
    var rWmH=image.width * height; // rWmH=>real-width * max-height
    var rHmW=image.height * width; // rHmW=>read-height * max-width
    var calWidth=width, calHeight=height;
    if(rWmH < rHmW) {
      calHeight = height;
      calWidth = height * image.width / image.height;
    } else if(rWmH > rHmW) {
      calWidth = width;
      calHeight = width * image.height / image.width;
    } else if(rWmH == rHmW) {
      calWidth = width;
      calHeight = height;
    }
    image.width=calWidth;
    image.height=calHeight;
  }
}

function _post400action(newcode, type1, type2, value){
	var type;
	if(type1 == true){
		type = "telephone";
		exp = /^\s*[-\+]?\d+\s*$/;
		if(value != ''){
			if(value.match(exp) == null){
				alert('请输入正确的手机号码')
				return false;
			}
		}
	}else if(type2 == true){
		type = "email";
		exp = /^[_a-z0-9]+@([_a-z0-9]+\.)+[a-z0-9]{2,3}$/;
		if(value.match(exp) == null){
			alert('请输入正确的邮箱')
			return false;
		}
	}
	if(type != "" && value != ""){
		Xml.Request("/house/newhouse/post_400.aspx?newcode=" + newcode + "&type=" + type + "&content=" + value, null, alert('提交成功！'), null);
	}
}