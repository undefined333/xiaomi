//1.引入jquery模块
import {} from 'https://cdn.bootcdn.net/ajax/libs/jquery/1.12.4/jquery.js';


//2.获取本地存储里面的数据进行渲染(渲染过程封装函数实现)
if (localStorage.getItem('localsid') && localStorage.getItem('localnum')) {
    let arrsid = localStorage.getItem('localsid').split(',');
    let arrnum = localStorage.getItem('localnum').split(',');
    console.log(arrsid, arrnum)
    for (let i = 0; i < arrsid.length; i++) {
        renderList(arrsid[i], arrnum[i]);
    }

}
//克隆方式渲染列表
function renderList(sid, num) {
    $.ajax({
        url: 'http://10.31.165.20/xiaomi/php/alldata.php',
        dataType: 'json'
    }).done(function(data) {
        console.log(data)
        $.each(data, function(index, value) {
            if (value.sid === sid) {
                console.log(value)
                let $clonebox = $('.goods_info:hidden').clone(true, true);
                $clonebox.find('.t-img img').attr('src', value.picurl);
                $clonebox.find('.t-img img').attr('sid', value.sid); //给图片对象添加一个自定义属性(数组的索引)
                $clonebox.find('.t-goods').html(value.titlebig);
                $clonebox.find('.t-prices span').html(value.price);
                $clonebox.find('.t-quantity input').val(num);
                $clonebox.find('.t-sum span').html((value.price * num).toFixed(2));
                $clonebox.css('display', 'block');
                $('.item-list').append($clonebox);
                allprice();
            }
        })
    });
}
//计算价格和数量
function allprice() {
    let $allnum = 0;
    let $havechecked = 0;
    let $allprice = 0;
    $('.goods_info:visible').each(function(index, element) {
        if ($(this).find('.cart-check input').prop('checked')) {
            $havechecked += parseInt($(this).find('.t-quantity input').val());
            $allprice += parseInt($(this).find('.t-sum span').html());
        }
        $allnum += parseInt($(this).find('.t-quantity input').val());
    });
    $('.card_total .has_checked').html($havechecked); //赋值已选择的数量
    $('.card_total .goods_num').html($allnum); //赋值总的数量
    $('.totalprice').html($allprice.toFixed(1)); //赋值总的价格
}

//全选
$('.allsel').on('click', function() {
    console.log('点击全选啦')
    $('.goods_info:visible').find('input:checkbox').prop('checked', $(this).prop('checked'));
    $('.allsel').prop('checked', $(this).prop('checked'));
    allprice();
});

//事件委托点击某一个的复选框
$('.item-list').on('click', 'input:checkbox', function() {
    console.log($('.goods_info:visible').find('input:checked').length, $(this).parents('.goods_info').find('.t-quantity input').val())

    if ($('.goods_info:visible').find('input:checkbox').length === $('.goods_info:visible').find('input:checked').length) {
        $('.allsel').prop('checked', true);
    } else {
        $('.allsel').prop('checked', false);
    }
    allprice();
});

// 6.数量的改变
$('.qua_add').on('click', function() {
    let $num = $(this).parents('.goods_info').find('.t-quantity input').val();
    $num++;
    $(this).parents('.goods_info').find('.t-quantity input').val($num);
    $(this).parents('.goods_info').find('.t-sum span').html(singleprice($(this))); //计算单价以及赋值
    allprice(); //计算总价
    localStorageData($(this)); //重新将数量添加到本地存储
});

$('.qua_del').on('click', function() {
    let $num = $(this).parents('.goods_info').find('.t-quantity input').val();
    $num--;
    if ($num <= 1) {
        $num = 1
    }
    $(this).parents('.goods_info').find('.t-quantity input').val($num);
    $(this).parents('.goods_info').find('.t-sum span').html(singleprice($(this))); //计算单价以及赋值
    allprice(); //计算总价
    localStorageData($(this)); //重新将数量添加到本地存储
});

//输入数量并且校验正则
$('.t-quantit input').on('input', function() {
    let $reg = /^\d+$/; //行首行尾匹配一个或者多个数字
    if (!$reg.test($(this).val())) { //如果不满足条件，值为1
        $(this).val(1);
    }
    $(this).parents('.goods_info').find('.t-sum span').html(singleprice($(this))); //计算单价以及赋值
    allprice(); //计算总价
    localStorageData($(this)); //重新将数量添加到本地存储
});


//封装函数实现小计的改变
function singleprice(obj) { //obj:当前操作的元素对象。
    let $price = obj.parents('.goods_info').find('.t-prices span').html(); //单价
    let $num = obj.parents('.goods_info').find('.t-quantity input').val(); //数量
    return ($price * $num).toFixed(2); //保留2位小数
}

//7.将修改后的值存的本地存储里面。
//商品编号和数量的数组。
let $arrsid = []; //存储的商品编号,以及获取本地存储的商品编号
let $arrnum = []; //存储商品的数量,以及获取本地存储的商品数量

function getLocalStorage() {
    if (localStorage.getItem('localsid') && localStorage.getItem('localnum')) { //商品已经存储过
        $arrsid = localStorage.getItem('localsid').split(','); //将获取的编号转换成数组，方便后面判断是否存在当前编号。
        $arrnum = localStorage.getItem('localnum').split(',');
    } else {
        $arrsid = [];
        $arrnum = [];
    }
}

//封装函数实现本地存储。
//获取当前商品的sid,通过商品的sid才能找到对应的数量。
function localStorageData(obj) { //obj:当前操作的元素对象。
    getLocalStorage(); //获取本地存储，将其转换成数组。
    let $index = obj.parents('.goods_info').find('.t-img img').attr('sid'); //获取对应的sid  
    console.log($index)
    $arrnum[$arrsid.indexOf($index)] = obj.parents('.goods_info').find('.t-quantity input').val(); //根据sid将对应的新的数量赋值给数组,重新存储。
    localStorage.setItem('localnum', $arrnum); //本地存储
}

//8.删除购物车商品列表
$('.t-action').on('click', function() {
    let $this = $(this);
    if (window.confirm('你确定要删除吗?')) {
        $this.parents('.goods_info').remove();
        delstorage($arrsid, $(this).parents('.goods-item').find('.goods-pic img').attr('sid'));
        allprice(); //计算总价
    }
});


//通过删除按钮找到本地存储对应的值，将其删除，重新设置本地存储。

//[1,3,2,4]   3
function delstorage(arrsid, sid) { //arrsid:数组   sid:数组中对应的值
    getLocalStorage(); //将获取的本地存储的值转换成数组
    let $index = -1; //存储索引的
    $.each(arrsid, function(index, valuesid) {
        if (valuesid == sid) {
            $index = index; //满足条件的值对应的索引赋值给$index
        }
    });

    //获取对应的索引进行删除。
    $arrsid.splice($index, 1);
    $arrnum.splice($index, 1);

    //重新设置本地存储。
    localStorage.setItem('localsid', $arrsid);
    localStorage.setItem('localnum', $arrnum);
}