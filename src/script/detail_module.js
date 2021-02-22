//引入jquery模块
import {} from "https://cdn.bootcdn.net/ajax/libs/jquery/1.12.4/jquery.js";


//1.在详情页面获取商品的sid - 列表传入一个sid到详情页。
let $sid = location.search.substring(1).split('=')[1];

// 如果sid不存在，默认sid为1
if (!$sid) {
    $sid = '1';
}


const $goodsinfo = $('.goodsinfo');
const $loadtitle = $('.loadtitle'); //标题loadpcpbig
const $loadtitlep = $('.loadtitlep'); //loadtitlep
const $loadpcp = $('.loadpcp'); //价格
const $loadoldpcp = $('.loadoldpcp'); //划线价格
const $list = $('.list ul'); //存放图



//2.将当前的sid传给后端，后端返回sid对应的数据给前端。
$.ajax({
    url: 'http://10.31.165.20/xiaomi/php/getsid.php',
    data: {
        datasid: $sid
    },
    async: false,
    dataType: 'json',
}).done(function(data) {
    $loadtitle.html(data.titlebig);
    $loadpcp.html(data.price);
    $loadoldpcp.html(data.oldprice);
    $loadtitlep.html(data.title);
    // $smallpic.attr('src', data.piclist); //渲染图
    let $picarr = data.piclist.split(','); //数组


    let $strHtml = '';
    $.each($picarr, function(index, value) {
        $strHtml += ` 
                <li>
                    <img src="${value}"/>    
                </li>
            `;
        $list.html($strHtml);
    })
    console.log($strHtml, $list);

});


//左侧轮播
//2.获取元素 - 存变量 - jquery的变量默认写法，变量前面添加一个$符号。
const $mainLeft = $('.main-left');
const $piclist = $('.main-left ul li'); //5张图
const $btnlist = $('.main-left ol li'); //5个按钮
const $leftarrow = $('#leftarrow'); //左右箭头
const $rightarrow = $('#rightarrow');
const $smallpic = $('.main-left ul li img'); //小图里面的图片

let $index = 0; //存放索引的变量
let $timer = null;

//3.鼠标点击横杠，进行图片切换 - onclick
$btnlist.on('click', function() {
    $index = $(this).index(); //当前的索引
    tabswitch();
})

//3.点击左右箭头
$rightarrow.on('click', function() {
    $index++;
    if ($index > $btnlist.length - 1) {
        $index = 0;
    }
    tabswitch();
})

$leftarrow.on('click', function() {
    $index--;
    if ($index < 0) {
        $index = $btnlist.length - 1;
    }
    tabswitch();
    $('title').html($index);
});

function tabswitch() {
    $btnlist.eq($index).addClass('active').siblings('ol li').removeClass('active'); //当前的按钮添加类，其他的按钮删除类。
    $piclist.eq($index).stop(true).animate({ //当前的图片显示，其他的图片隐藏  eq支持负数，负数从-1开始从后往前数。
        opacity: 1
    }).siblings('ul li').stop(true).animate({
        opacity: 0
    });
}

//4.自动轮播
//约定的时间自动点击右键头事件。
$timer = setInterval(function() {
    $rightarrow.click();
}, 2000);

//5.鼠标移入bannner停止自动轮播，移出开启自动轮播
$mainLeft.hover(function() {
    clearInterval($timer);
}, function() {
    $timer = setInterval(function() {
        $rightarrow.click();
    }, 2000)
})


//4.购物车
//利用本地存储或者cookie技术 - 跨页面操作。
//由详情页进行存储，购物车列表页进行渲染。
//详情页存储的过程
//第一步：存储多个商品的数据(sid编号,数量)
//利用数组或者对象都可以存储多个商品的信息。
//let arrsid = [3,5,7,11];//存储的商品编号
//let arrnum = [12,36,1,56];//存储商品的数量
//第二步：商品是第一次购买直接渲染列表，如果是多次购买，累加数量。
//提前获取本地存储里面的商品编号和商品数量，如果编号存储，说明此商品不是第一次购买，否则就是第一次购买。


//商品编号和数量的数组。
let $arrsid = []; //存储的商品编号,以及获取本地存储的商品编号
let $arrnum = []; //存储商品的数量,以及获取本地存储的商品数量


//提前获取本地存储里面的商品编号,提前考虑本地存储的key值(localsid:本地存储的商品编号，localnum:本地存储商品的数量)
//这里的重点是本地存储key值的提前约定。
//封装函数获取本地存储，进行商品是第一次还是多次判断。
function getLocalStorage() {
    if (localStorage.getItem('localsid') && localStorage.getItem('localnum')) {
        $arrsid = localStorage.getItem('localsid').split(',');
        $arrnum = localStorage.getItem('localnum').split(',');
    } else {
        $arrsid = [];
        $arrnum = [];
    }
}

//开始存储商品的编号和数量
const $btn = $('.rig-cart h3 a');

$btn.on('click', function() {
    //判断是第一次存储，还是多次存储。
    getLocalStorage()
    if ($arrsid.includes($sid)) { //存在,不是第一次添加，改变数量
        let $index = $arrsid.indexOf($sid); //sid在数组中的位置，sid的位置和数量是匹配的。通过sid的位置找数量的位置
        console.log($index)
        $arrnum[$index] = parseInt($arrnum[$index]) + 1; //重新赋值
        localStorage.setItem('localnum', $arrnum); //重新添加到本地存储，覆盖前面的值
        window.location.href = 'cartlist.html'
    } else { //不存在,第一次添加
        $arrsid.push($sid);
        console.log($arrsid)
        localStorage.setItem('localsid', $arrsid);
        $arrnum.push(1);
        localStorage.setItem('localnum', $arrnum);
        window.location.href = 'cartlist.html'
    }
})