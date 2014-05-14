function urlencode(str) {
       str = (str + '').toString();
       return encodeURIComponent(str).replace(/!/g, '%21').replace(/'/g, '%27').replace(/\(/g, '%28').
       replace(/\)/g, '%29').replace(/\*/g, '%2A').replace(/%20/g, '+');
}

var hintNum = 60;
var clockCodeHint;
// 获取验证短信
var tg_getValCodeFlag = false; // 确保不重复点击
$("#tg_getValCode").click(function(){
    if(tg_getValCodeFlag == false) {
        var cellphone = $("#navi_tg_cell").val();
        if(!cellphone || cellphone == '手机') {
            alert("请填写手机号");
            return false;
        }
        var cellnum = /^(13[0-9]|15[0-9]|18[0-9]|14[0-9])[0-9]{8}$/; 
        if(cellphone.match(cellnum) == null||cellphone.length!=11) {
            alert("请填写正确的手机号");
            return false;
        }
        //$(this).html("正在发送");
        var ajaxUrl = "/house/web/mobilecode_send_ajax.php";
        var paramData = 'mobile='+urlencode(cellphone);
        tg_getValCodeFlag = true;
        $.ajax({
            type:'get',
            dataType:'json',
            url:ajaxUrl,
            data:paramData,
            complete:function(){tg_getValCodeFlag = false;},
            error:function(){$("#tg_getValCode").html("验证码发送失败，请重试");tg_getValCodeFlag = false;},
            success:function(msg){
                if(msg.result == 1) {
                    alert("发送成功，如果一分钟内没有收到校验短信，请重试");
                    // 按钮进入倒计时状态
                    valCodeHint();
                } else {
                    alert("验证码发送失败，"+msg.msg);
                    $("#tg_getValCode").html("验证码发送失败，请重试");tg_getValCodeFlag = false;
                }
            }
        });
    }
});

// 团购提交
var tg_submitFlag = false; // 确保不重复点击
$("#tg_submit").click(function(){
    tg_baoming("nobind");
});
$("#tg_submit1").click(function(){
    tg_baoming("bind");
});

function tg_baoming(bmtype)
{
    if(tg_submitFlag == false) {
        var cellphone = $("#navi_tg_cell").val();
        if(!cellphone || cellphone == '手机') {
            alert("请填写手机号");
            return false;
        }
        var cellnum = /^(13[0-9]|15[0-9]|18[0-9]|14[0-9])[0-9]{8}$/; 
        if(cellphone.match(cellnum) == null||cellphone.length!=11) {
            alert("请填写正确的手机号");
            return false;
        }
        if(bmtype == 'nobind')
        {
              var uname = $("#navi_tg_name").val();
              if(!uname || uname == '姓名') {
                  alert("请填写姓名");
                  return false;
              }
              var phonecode = $("#navi_tg_phonecode").val();
              if(!phonecode || phonecode == '验证码') {
                  alert("请填写验证码");
                  return false;
              }
        }
        else
        {
              var uname = "";
              var phonecode = "";
        }
        var ajaxUrl = "/house/ajaxrequest/tuangou_baoming.php";
        var paramData = 'name='+urlencode(uname)+"&cell="+urlencode(cellphone)+"&phonecode="+urlencode(phonecode)+"&newcode="+newcode+"&bmtype="+bmtype;
        tg_submitFlag = true;
        $.ajax({
            type:'get',
            dataType:'json',
            url:ajaxUrl,
            data:paramData,
            complete:function(){tg_submitFlag = false;},
            error:function(){tg_submitFlag = false;},
            success:function(msg){
                if(msg.result == "0") {
                    // 成功则隐藏当前，显示成功
                    $("#navTgBmForm").hide();
                    $("#navTgBmHasTel").hide();
                    $("#navTgBmSuccess").show();
                } else if(msg.result == "102") {
                    alert(msg.message);
                    $("#navi_tg_phonecode").val("");
                } else {
                    alert(msg.message);
                }
            }
        });
    }
}

// 一键登录
$("#tgLoginBtn").click(function(){
    var tmpArr = location.href.split("#");
    $("#shHeadBackurl").val(urlencode(tmpArr[0]+"#showNavTgOpen"));
    showid('showlogindiv');
});

// 页面结束后请求tuangou_login_static.php，获取各种状态并动态更新导航中团购代码
$(function() {
    if(!document.cookie || isLogin) {
       var ajaxUrl = "/house/ajaxrequest/tuangou_login_static.php";
       $.ajax({
           type:'get',
           dataType:'json',
           url:ajaxUrl,
           data:'',
           complete:function(){},
           error:function(){},
           success:function(msg){
               // 已登录
               if(msg.uid) {
                     if(window.location.hash == "#showNavTgOpen") {
                        showTgBox();
                     }
                   $("#navTgLogout").hide();
                   $("#navTgLogin").show();
                   $("#navTgLoginVH_num").html(msg.viewhouse);
                   $("#navTgLoginBM_num").html(msg.bmNum);
                   $("#navTgLoginSC_num").html(msg.scNum);
                   if(msg.cell == "") {
                     $("#navTgLoginBM_num").html("");
                     $("#navTgLoginBM").removeClass("drbaoming").addClass("drbaomingo");
                     $("#navTgLoginSCNone").show();
                   } else {
                     $("#navTgTel").html(msg.cell);
                     $("#navi_tg_cell").val(msg.cell);
                     $("#navTgBmForm").hide();
                     $("#navTgBmHasTel").show();
                   }
                   
               } else {
                   
               }
           }
       });
    }
});

// 更换报名号码
$("#navTgChangeTel").click(function(){
    $("#navTgBmHasTel").hide();
    $("#navTgBmForm").show();
});

// 请求浏览楼盘计数
function viewhouse_counter(){
    $.ajax({
        type:'get',
        dataType:'json',
        url:'/house/ajaxrequest/viewhouse_counter.php',
        data:'',
        complete:function(){},
        error:function(){},
        success:function(msg){}
    });
}

// 发送验证码提示倒计时
function valCodeHint() {
    $("#dmoa3hintval").html(hintNum+"秒后重新获取");
    $("#dmoa3get").hide();
    $("#dmoa3hint").show();
    clockCodeHint = setInterval(clockCodeHintFun, 1000);
}
function clockCodeHintFun() {
    if(hintNum > 0) {
        hintNum--;
        $("#dmoa3hintval").html(hintNum+"秒后重新获取");
    } else {
        clearInterval(clockCodeHint);
        $("#tg_getValCode").html("重新获取验证码");
        hintNum = 60;
        $("#dmoa3get").show();
        $("#dmoa3hint").hide();
    }
}
