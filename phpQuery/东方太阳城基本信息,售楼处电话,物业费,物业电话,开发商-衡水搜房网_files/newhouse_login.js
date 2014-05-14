function urlencode(str) 
{
	str = (str + '').toString();
	return encodeURIComponent(str).replace(/!/g, '%21').replace(/'/g, '%27').replace(/\(/g, '%28').
	replace(/\)/g, '%29').replace(/\*/g, '%2A').replace(/%20/g, '+');
}
function jsonToarray(dat){
	return eval('(' + dat + ')')
}
var backurl = urlencode(location.href);
var regurl = "http://passport.soufun.com/register.aspx?service="+regservice+"&host="+reghost+"&backurl="+backurl;
document.getElementById('sfHeadRegister').href = regurl;
document.getElementById('sfHeadRegister2').href = regurl;
function doHeadloginuser()
{
	var user_data = this.responseText;
	if(user_data){
		var obj = jsonToarray( user_data );
		if(obj.uname && obj.uid)
		{
			document.getElementById('sfHeadUsername').innerHTML=obj.uname;
			document.getElementById('sfHeadLogout').href = "http://passport.soufun.com/logout.aspx?backurl="+backurl;
			document.getElementById('topHeadNotLogin').style.display = "none";
			document.getElementById('topHeadLogin').style.display = "block";
			 var tdate = new Date();
			tdate.setHours(tdate.getHours() + 80);
		}
	}
}
function getCookie(name) {
  var start = document.cookie.indexOf(name+"=");
   var len = start+name.length+1;
   if ((!start) && (name != document.cookie.substring(0,name.length))) return null;
   if (start == -1) return null;
   var end = document.cookie.indexOf(";",len);
   if (end == -1) end = document.cookie.length;
   return document.cookie.substring(len,end);
}  
var cookie_passport = getCookie('passport');
var cookie_new_loginid = getCookie('new_loginid');
var cookie_new_loginname = getCookie('new_loginname');
var isLogin = false; var showLoginName = ""; var showLoginId = "";
var ppUsername = cookie_passport ? getParamValueByPassport(cookie_passport, "username") : "";
var ppUserid   = cookie_passport ? getParamValueByPassport(cookie_passport, "userid") : "";
if(cookie_new_loginid && cookie_new_loginname)
{
	showLoginName = cookie_new_loginname;  showLoginId = cookie_new_loginid;
	isLogin = true;
}
else if(ppUsername && ppUserid)
{
	showLoginName = ppUsername;  showLoginId = ppUserid;
	isLogin = true;
}
if(!document.cookie)
{
	Xml.Request("/house/esf/getusernewhouse.php", null, doHeadloginuser);
}
else if(isLogin)
{
	Xml.Request("/house/esf/getusernewhouse.php", null, doHeadloginuser);
}
else
{
	document.getElementById('topHeadNotLogin').style.display = "block";
	document.getElementById('topHeadLogin').style.display = "none";
	document.getElementById('shHeadBackurl').value = backurl;
}
function getParamValueByPassport(passport, paramKey)
{
	var passportArr = passport.split("&");
	for(var i=0; i<passportArr.length; i++)
	{
		if(passportArr[i].indexOf(paramKey+"=") != -1)
		{
			return passportArr[i].replace(paramKey+"=", "");
		}
	}
}
