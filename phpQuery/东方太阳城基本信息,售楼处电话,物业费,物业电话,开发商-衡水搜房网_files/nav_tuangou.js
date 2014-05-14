function urlencode(str) {
       str = (str + '').toString();
       return encodeURIComponent(str).replace(/!/g, '%21').replace(/'/g, '%27').replace(/\(/g, '%28').
       replace(/\)/g, '%29').replace(/\*/g, '%2A').replace(/%20/g, '+');
}

var hintNum = 60;
var clockCodeHint;
// ��ȡ��֤����
var tg_getValCodeFlag = false; // ȷ�����ظ����
$("#tg_getValCode").click(function(){
    if(tg_getValCodeFlag == false) {
        var cellphone = $("#navi_tg_cell").val();
        if(!cellphone || cellphone == '�ֻ�') {
            alert("����д�ֻ���");
            return false;
        }
        var cellnum = /^(13[0-9]|15[0-9]|18[0-9]|14[0-9])[0-9]{8}$/; 
        if(cellphone.match(cellnum) == null||cellphone.length!=11) {
            alert("����д��ȷ���ֻ���");
            return false;
        }
        //$(this).html("���ڷ���");
        var ajaxUrl = "/house/web/mobilecode_send_ajax.php";
        var paramData = 'mobile='+urlencode(cellphone);
        tg_getValCodeFlag = true;
        $.ajax({
            type:'get',
            dataType:'json',
            url:ajaxUrl,
            data:paramData,
            complete:function(){tg_getValCodeFlag = false;},
            error:function(){$("#tg_getValCode").html("��֤�뷢��ʧ�ܣ�������");tg_getValCodeFlag = false;},
            success:function(msg){
                if(msg.result == 1) {
                    alert("���ͳɹ������һ������û���յ�У����ţ�������");
                    // ��ť���뵹��ʱ״̬
                    valCodeHint();
                } else {
                    alert("��֤�뷢��ʧ�ܣ�"+msg.msg);
                    $("#tg_getValCode").html("��֤�뷢��ʧ�ܣ�������");tg_getValCodeFlag = false;
                }
            }
        });
    }
});

// �Ź��ύ
var tg_submitFlag = false; // ȷ�����ظ����
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
        if(!cellphone || cellphone == '�ֻ�') {
            alert("����д�ֻ���");
            return false;
        }
        var cellnum = /^(13[0-9]|15[0-9]|18[0-9]|14[0-9])[0-9]{8}$/; 
        if(cellphone.match(cellnum) == null||cellphone.length!=11) {
            alert("����д��ȷ���ֻ���");
            return false;
        }
        if(bmtype == 'nobind')
        {
              var uname = $("#navi_tg_name").val();
              if(!uname || uname == '����') {
                  alert("����д����");
                  return false;
              }
              var phonecode = $("#navi_tg_phonecode").val();
              if(!phonecode || phonecode == '��֤��') {
                  alert("����д��֤��");
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
                    // �ɹ������ص�ǰ����ʾ�ɹ�
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

// һ����¼
$("#tgLoginBtn").click(function(){
    var tmpArr = location.href.split("#");
    $("#shHeadBackurl").val(urlencode(tmpArr[0]+"#showNavTgOpen"));
    showid('showlogindiv');
});

// ҳ�����������tuangou_login_static.php����ȡ����״̬����̬���µ������Ź�����
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
               // �ѵ�¼
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

// ������������
$("#navTgChangeTel").click(function(){
    $("#navTgBmHasTel").hide();
    $("#navTgBmForm").show();
});

// �������¥�̼���
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

// ������֤����ʾ����ʱ
function valCodeHint() {
    $("#dmoa3hintval").html(hintNum+"������»�ȡ");
    $("#dmoa3get").hide();
    $("#dmoa3hint").show();
    clockCodeHint = setInterval(clockCodeHintFun, 1000);
}
function clockCodeHintFun() {
    if(hintNum > 0) {
        hintNum--;
        $("#dmoa3hintval").html(hintNum+"������»�ȡ");
    } else {
        clearInterval(clockCodeHint);
        $("#tg_getValCode").html("���»�ȡ��֤��");
        hintNum = 60;
        $("#dmoa3get").show();
        $("#dmoa3hint").hide();
    }
}
