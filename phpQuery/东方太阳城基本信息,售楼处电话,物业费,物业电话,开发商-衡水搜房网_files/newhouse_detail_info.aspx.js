/*��Ƶ������*/
function show_menu(num){
for(i=0;i<100;i++){
	if(document.getElementById('li0'+i)){
	document.getElementById('h0'+i).style.display='none';
	document.getElementById('li0'+i).style.display='none';
	document.getElementById('f0'+i).className='shipin03';
	 }
}
	  document.getElementById('h0'+num).style.display='block';//�����Ժ�����
	  document.getElementById('li0'+num).style.display='block';//�����Ժ���Ϣ��
	  document.getElementById('f0'+num).className='shipin030';//�����Ժ�TAG��ʽ
}

/* ������ ���̰� */
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
/* ��ϸ��Ϣ ������ */
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
/*����ͼ */
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
/* ¥����� ¥������� */
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
/* �ܱ�¥�� ͬ��λ¥�� */
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
/* �ʴ� */
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
/*1 begin ��ҵ���� property_comment.aspx */
/*1.1 begin ������������+newcode+stars����¥������ */
function avoteStar(stars,commenttype,newcode)
{
    Xml.Request("/house/datainterface/property_comment.aspx?stars="+stars+"&commenttype="+commenttype+"&newcode="+newcode,null,inform,stars);    
}
/* end ������������+newcode+stars����¥������ */
/*1.2 begin ���ݷ��ص�xml ��дdiv */
function inform(ss)
{
    var rsphtml=this.responseText;
    //����UserVote.aspx���ص�ֵ����ʾ�û�
    var value=rsphtml.substr(rsphtml.lastIndexOf("</div>")-1,1);
    var red=rsphtml.substr(rsphtml.lastIndexOf("<red>")+5,rsphtml.lastIndexOf("</red>")-rsphtml.lastIndexOf("<red>")-5);
    var redd=rsphtml.substr(rsphtml.lastIndexOf("<redd>")+6,rsphtml.lastIndexOf("</redd>")-rsphtml.lastIndexOf("<redd>")-6);
    var count=rsphtml.substr(rsphtml.lastIndexOf("<count>")+7,rsphtml.lastIndexOf("</count>")-rsphtml.lastIndexOf("<count>")-7);
    if(value==0)
    {
        alert(("��л�������֣�����������:")+ss+("��"));
        
        //��дҳ��ͶƱ��Ϣ
        
        document.getElementById('pinglun1top').innerHTML="<strong><a name=\'dpwy'>��ҵ����</a></strong>(��<span>"+count+"</span>�˲��룬����<span>"+redd+"</span>��)";
        var html = '<table><tr><td>��������:</td><td><ul class=\'star-rating\'>';
	    var dark = 5-red;
	    for(i=0;i<red;i++)
	    {
		    html += "<li class='star_red' title='��ҵ��������Ϊ"+redd+"��'></li>";
	    }
	    for(j=0;j<dark;j++)
	    {
		    html += "<li title='��ҵ��������Ϊ"+redd+">��'></li>";
	    }
	    html +='</ul></td></tr></table>';
    	
	    document.getElementById('wypf').innerHTML = html;
    }
    else if(value==1)
    {
        alert("�벻Ҫ�ظ�����");
    }
    else if(value==2)
    {
        alert("��ʱ����������");
    }
}
/* end ���ݷ��ص�xml ��дdiv */
/*1 end ��ҵ���� property_comment.aspx  /
/****************************************/

/**********************************************/
/*2 begin ��ȡ¥��ͼƬ getpicture_for_detail_info.aspx*/
/*2.1 begin ���ݻ�������+newcode ��ȡ����ͼͼƬ */
function getpic_for_apartment(apartmenttype,newcode)
{
    Xml.Request("/house/datainterface/getpicture_for_detail_info.aspx?apartmenttype="+apartmenttype+"&newcode="+newcode,null,setpic_for_apartment,apartmenttype);    
}
/* end ���ݻ������� ��ȡ����ͼͼƬ */
/*2.2 begin ���ݷ��ص�ͼƬxml��Ϣ ��仧��ͼƬdiv */
function setpic_for_apartment(apartmenttype)
{
	var html="";
	var pic_url=this.responseXML.getElementsByTagName("pic_url");
	var pic_desc=this.responseXML.getElementsByTagName("pic_desc");
	
	if (window.navigator.userAgent.indexOf("Firefox")>=1)
	{
		//��������ΪFirefox
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
/* end ���ݷ��ص�ͼƬxml��Ϣ ���div */
/*2.3 begin ����pictype+newcode ��ȡ��� �����ͼƬ */
function getpic_for_albums_and_modelrooms(pictype,newcode)
{
    Xml.Request("/house/datainterface/getpicture_for_detail_info.aspx?newcode="+newcode+"&pictype="+pictype,null,setpic_for_albums_and_modelrooms,pictype);    
}
/* end ����pictype+newcode ��ȡ��� �����ͼƬ */
/*2.4 begin ���ݷ��ص�ͼƬxml��Ϣ ������ �����div */
function setpic_for_albums_and_modelrooms(pictype)
{
	var html="";
	var xml=this.responseXML;
	
	var pic_url=xml.getElementsByTagName("pic_url");
	var pic_desc=xml.getElementsByTagName("pic_desc");
	if (window.navigator.userAgent.indexOf("Firefox")>=1)
	{
		//��������ΪFirefox
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
/* end ���ݷ��ص�ͼƬxml��Ϣ ���div */
/*2 end ��ȡ¥��ͼƬ getpicture_for_detail_info.aspx*/
/*****************************************************/

/*�ڱ��� begin*/
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

	//��дҳ��ͶƱ��Ϣ
	document.getElementById('all_count').innerHTML = "�������֣�" + allCount + "�˲μӣ���";
	document.getElementById('all_bar').innerHTML = "�������֣�" + allBar;
	document.getElementById('purple_count').innerHTML = "&nbsp;��<em>" + purpleCount + "</em>��";
	document.getElementById('purple_bar').style.width = purpleBar + "%";
	document.getElementById('purple_bar').alt = purpleBar + "%";
	document.getElementById('red_count').innerHTML = "&nbsp;��<em>" + redCount + "</em>��";
	document.getElementById('red_bar').style.width = redBar + "%";
	document.getElementById('red_bar').alt = redBar + "%";
	document.getElementById('yellow_count').innerHTML = "&nbsp;��<em>" + yellowCount + "</em>��";
	document.getElementById('yellow_bar').style.width = yellowBar + "%";
	document.getElementById('yellow_bar').alt = yellowBar + "%";
	document.getElementById('green_count').innerHTML = "&nbsp;��<em>" + greenCount + "</em>��";
	document.getElementById('green_bar').style.width = greenBar + "%";
	document.getElementById('green_bar').alt = greenBar + "%";
	document.getElementById('blue_count').innerHTML = "&nbsp;��<em>" + blueCount + "</em>��";
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
			obj.innerHTML = "�ܲ�";
		}else if(score == 2){
			obj.innerHTML = "һ��";
		}else if(score == 3){
			obj.innerHTML = "����";
		}else if(score == 4){
			obj.innerHTML = "����";
		}else if(score == 5){
			obj.innerHTML = "�ܺ�";
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
		obj.innerHTML = "���";
	}
}
/*�ڱ��� end*/

// image: img Ԫ��
// zoom: (true|false) �Ƿ��ͼƬ�������ţ�ȱʡΪtrue
// width/height:
//   ���ָֻ��width�����ͼƬ����ʾ�������width ��Χ֮�ڣ�
//   ���ͬʱָ����������:
//      ���zoom Ϊfalse����ǿ��ͼƬ����ʾ��СΪ width(px) x height(px)��
//      ���zoom Ϊtrue�����ͼƬ��С��ָ���� width * height ��Χ֮��
function _missthumbnail(image, width, height, zoom) {
  // ����ԭͼ��url ��ַ
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
  // ��ʾͼƬ��ԭʼ��С������������
  if(zoom != null && zoom == false) {
    if(width != null) image.width=width;
    if(height != null) image.height=height;
    return;
  }
  // ��ͼƬ�Ŀ������ width ��Χ֮��
  if(width != null && height == null) {
    if(image.width > width) {
      image.height=width*image.height/image.width;
      image.width = width;
    }
  } else if(width != null && height != null && (image.width > width || image.height > height)) {
    // ��ͼƬ��С��ָ���� width * height ��Χ֮��
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
				alert('��������ȷ���ֻ�����')
				return false;
			}
		}
	}else if(type2 == true){
		type = "email";
		exp = /^[_a-z0-9]+@([_a-z0-9]+\.)+[a-z0-9]{2,3}$/;
		if(value.match(exp) == null){
			alert('��������ȷ������')
			return false;
		}
	}
	if(type != "" && value != ""){
		Xml.Request("/house/newhouse/post_400.aspx?newcode=" + newcode + "&type=" + type + "&content=" + value, null, alert('�ύ�ɹ���'), null);
	}
}