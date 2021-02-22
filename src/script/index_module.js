import {} from "https://cdn.bootcdn.net/ajax/libs/jquery/1.12.4/jquery.js";

// banner轮播图
let mySwiper = new Swiper('.swiper-container', {
    speed: 1000, //轮播图的速度
    effect: "fade",
    loop: true,

    autoplay: true, //可选选项，自动滑动,自动轮播
    // 如果需要前进后退按钮
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    // 如果需要分页器
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
})
mySwiper.el.onmouseover = function() { //鼠标放上暂停轮播
    mySwiper.autoplay.stop();
}
mySwiper.el.onmouseleave = function() {
    mySwiper.autoplay.start();
}

//小米秒杀轮播图
let mySwiper1 = new Swiper('.swiper-container1', {
    speed: 1000, //轮播图的速度
    autoplay: true, //可选选项，自动滑动,自动轮播
})
mySwiper1.el.onmouseover = function() { //鼠标放上暂停轮播
    mySwiper1.autoplay.stop();
}
mySwiper1.el.onmouseleave = function() {
    mySwiper1.autoplay.start();
}

// 用户登录展示
let loginname = window.localStorage.getItem('loginname')
    //如果用户名存在，则说明是登录的，则展示用户名
loginname && loginGetStatus();


//倒计时
window.onload = clock;

function clock() {
    let $today = new Date()
    let $h = $today.getHours()
    let $m = $today.getMinutes()
    let $s = $today.getSeconds();
    let $stopTime = new Date("Feb 22 2022 00:00:00"),
        $stopH = $stopTime.getHours(),
        $stopM = $stopTime.getMinutes(),
        $stopS = $stopTime.getSeconds();

    let $shenyu = $stopTime.getTime() - $today.getTime(),
        $shengyuD = parseInt($shenyu / (60 * 60 * 24 * 1000)),
        $D = parseInt($shenyu) - parseInt($shengyuD * 60 * 60 * 24 * 1000),
        $shengyuH = parseInt($D / (60 * 60 * 1000)),
        $H = $D - $shengyuH * 60 * 60 * 1000,
        $shengyuM = parseInt($H / (60 * 1000)),
        $M = $H - $shengyuM * 60 * 1000;

    let $S = parseInt(($shenyu - $shengyuD * 60 * 60 * 24 * 1000 - $shengyuH * 60 * 60 * 1000 - $shengyuM * 60 * 1000) / 1000);
    document.getElementById("time1").innerHTML = $shengyuH < 10 ? '0' + $shengyuH : $shengyuH;
    document.getElementById("time2").innerHTML = $shengyuM < 10 ? '0' + $shengyuM : $shengyuM;
    document.getElementById("time3").innerHTML = $S < 10 ? '0' + $S : $S;
    setTimeout(clock, 500);
}


//渲染
const $list = $('.seckill_ctn_right_one');
const $list1 = $('.seckill_ctn_right_two');
const $list2 = $('.phone_ctn_right_render');
const $list4 = $('.phone_ctn_right_render1');
const $list3 = $('.goods_lists');

$.ajax({
    url: 'http://10.31.165.20/xiaomi/php/alldata.php',
    dataType: 'json'
}).done(function(data) {
    console.log(data);
    let $arrdata3 = [...data].splice(0, 18);
    let $arrdata = data.splice(0, 4); //获取初始数据
    let $arrdata1 = data.splice(0, 4); //获取初始数据
    let $arrdata2 = data.splice(0, 4); //获取初始数据
    let $arrdata4 = data.splice(0, 4); //获取初始数据
    console.log($arrdata3);

    let $strHtml = '';
    let $strHtml1 = '';
    let $strHtml2 = '';
    let $strHtml3 = '';
    let $strHtml4 = '';
    $.each($arrdata3, function(index, value) {
        $strHtml3 += `
        <li>
        <a href="detail.html?sid=${value.sid}" style="display:flex">
        <img  src="${value.picurl}" alt="">
        <p>${value.titles}</p>
        </a>
    </li>
    `
    });
    $.each($arrdata, function(index, value) {
        $strHtml += `
                <div class="goods_one">
                <img  src="${value.picurl}" alt="图片加载失败了" >
                <h3>${value.titles}</h3>
                <p class="desc">${value.miaoshu}</p>
                <p class="price">
                <span class="num">${value.price}</span>元<span>起</span>
                <del><span class="num">${value.oldprice}</span>元 </del>
                </p>
                </div>
        
    `
    });
    $.each($arrdata1, function(index, value) {
        $strHtml1 += `
                <div class="goods_one">
                <img  src="${value.picurl}" alt="图片加载失败了" >
                <h3>${value.titles}</h3>
                <p class="desc">${value.miaoshu}</p>
                <p class="price">
                    <span class="num">${value.price}</span>元<span>起</span>
                    <del><span class="num">${value.oldprice}</span>元 </del>
                </p>
               </div>
        
    `
    });
    $.each($arrdata2, function(index, value) {
        $strHtml2 += `
        <div class="goods_one">
        <img  src="${value.picurl}" alt="图片加载失败了" >
        <h3>${value.titles}</h3>
        <p class="desc">${value.miaoshu}</p>
        <p class="price">
            <span class="num">${value.price}</span>元<span>起</span>
            <del><span class="num">${value.oldprice}</span>元 </del>
        </p>
       </div>
    `
    });
    $.each($arrdata4, function(index, value) {
        $strHtml4 += `
        <div class="goods_one">
        <img  src="${value.picurl}" alt="图片加载失败了" >
        <h3>${value.titles}</h3>
        <p class="desc">${value.miaoshu}</p>
        <p class="price">
            <span class="num">${value.price}</span>元<span>起</span>
            <del><span class="num">${value.oldprice}</span>元 </del>
        </p>
       </div>
    `
    });
    //追加
    $list.html($strHtml);
    $list1.html($strHtml1);
    $list2.html($strHtml2);
    $list3.html($strHtml3);
    $list4.html($strHtml4);
});


// 展示的方法
function loginGetStatus() {
    const $disper = $('.disper');
    $disper.remove()
    $(".wrapper_right_left").prepend(`<a href='' class='leftlink'>${loginname},欢迎您</a><span>|</span><a href='' id='back' class='leftlink '>退出</a>`);
    const $back = $('#back');
    $back.on('click', function() {
        console.log(111)
        window.localStorage.removeItem('loginname')
        window.reload()
    })
}

$('.backtop').click(function() {
    scrollTo(0, 0);
})
$(".drop_down").css("opacity", "0");
$(".drop_down ul li").css("display", "none");
$('.backtop').css("opacity", "0");
$('.lists').hide();
window.addEventListener("scroll", function(event) {
    var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
    if (scrollTop > window.innerHeight) {
        $('.backtop').css("opacity", "1");
    } else {
        $('.backtop').css("opacity", "0");
    }
});

//banner上的列表显示隐藏
$(".phone_card").mouseover(function() {
    $('.lists').show();
}).mouseout(function() {
    $('.lists').hide();
});

$(".lists").mouseover(function() {
    $('.lists').show();
}).mouseout(function() {
    $('.lists').hide();
});

// 头部导航上的二级菜单
$(".redmiPhone").mouseover(function() {
    $(".drop_down").animate({ height: '250px' });
    $(".drop_down").css("opacity", "1");
    $(".drop_down ul li").css("display", "block");
    $(".drop_down").css('border-top', '1px solid #ddd');
}).mouseout(function() {
    $(".drop_down").animate({ height: '0' });
    $(".drop_down").css("opacity", "0");
    $(".drop_down ul li").css("display", "none");
});



$(".redmiPhone1").mouseover(function() {
    $('.redmiPhone1').show();
}).mouseout(function() {
    $('.redmiPhone1').hide();
});