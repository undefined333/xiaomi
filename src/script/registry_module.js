// 1.用户点击submit按钮直接提交(form+submit+name+action) - 直接完成

// 2.用户名重名检测：如果用户名存在不允许注册。
// 失去焦点事件进行检测
// 检测过程：
// 先通过ajax将用户名传给后端，后端拿到前端的值和数据库里面的值进行匹配，如果数据库里面存在，说明此用户名不能使用。否则可以使用。
// 后端将匹配的结果返回前端，前端提示错误。


// 操作过程：
// 引入或者加载jquey模块
import {} from "https://cdn.bootcdn.net/ajax/libs/jquery/1.12.4/jquery.js";

const $username = $('.username');
const $password = $('.password');
const $tel = $('.tel');
const $span1 = $('.span1');
const $span2 = $('.span2');
const $span3 = $('.span3');
const $form = $('form');
// let $flag = true;

let $userflag = false;
let $passflag = false;
let $telflag = false;

//1.onsubmit事件：由form默认发起发起的,在不满足条件情况下，限制跳转。
//注意：每一个表单添加一个标记，证明当前的表单是否通过。(不能共用一个标记)

//2.得到焦点，显示提示信息
$tel.on('focus', function() {
    if ($tel.val() == '') {
        $span3.html(
            '请输入手机号'
        )
        $span3.css('color', 'red');
    }
});
$tel.on('blur', function() {
    let reg = /^[1](([3][0-9])|([4][0,1,4-9])|([5][0-3,5-9])|([6][2,5,6,7])|([7][0-8])|([8][0-9])|([9][0-3,5-9]))[0-9]{8}$/
    if (!(reg.test($tel.val()))) {
        $span3.html('手机号码有误，请重填')
        $span3.css('color', 'red');
        $telflag = false
    } else {
        $span3.html('手机号合法')
        $span3.css('color', 'green');
        $telflag = true
    }
});

//失去焦点将前端的用户名传给后端
$username.on('blur', function() {
    console.log(111)
    if ($username.val() != '') {
        $span1.html('')
        $userflag = true;
        $.ajax({
            type: 'post',
            url: 'http://10.31.165.20/xiaomi/php/reg.php',
            data: {
                checkname: $username.val()
            }
        }).done(function(data) { //根据后端的返回值确定是否重名
            if (data === 'true') { //存在
                $span1.html('该用户名已存在');
                $span1.css('color', 'red');
                $userflag = false;
            } else if (data === 'false') {
                $span1.html('√');
                $span1.css('color', 'green');
                $userflag = true;
            }
        });
    }
});
$password.on('blur', function() {
    if ($password.val() != '') {
        $span2.html('')
        $passflag = true
    } else {
        $span2.html(
            '密码不能为空'
        )
        $span2.css('color', 'red');
        $passflag = false
    }
});

//阻止浏览器的submit跳转，如果用户名不能通过，不允许提交注册。
$form.on('submit', function() {
    console.log(111)
    if ($username.val() === '') {
        $span1.html('用户名不能为空');
        $span1.css('color', 'red');
        $userflag = false;
    }
    if ($password.val() === '') {
        $span2.html('密码不能为空');
        $span2.css('color', 'red');
        $passflag = false;
    }

    if ($tel.val() === '') {
        $span3.html('用户名不能为空');
        $span3.css('color', 'red');
        $telflag = false;
    }
    console.log($userflag, $passflag, $telflag)
        // window.location.href = 'login.html';

    if ($userflag && $passflag && $telflag) {
        $.ajax({
            type: 'post',
            url: 'http://10.31.165.20/xiaomi/php/reg.php',
            data: {
                username: $username.val(),
                password: $password.val(),
                tel: $tel.val()
            }
        }).done(function(data) {
            if (data === 'true') { //注册成功 跳转。
                // window.localStorage.setItem('loginname', $username.val());
                window.location.href = 'login.html';
                window.event.returnValue = false;
            } else { //注册失败
                alert('注册失败');
            }
        });
    } else {
        return false;
    }
});


//如果注册成功跳转到登录页面 - 后端做的