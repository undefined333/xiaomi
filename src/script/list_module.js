//引入jquery模块
import {} from "https://cdn.bootcdn.net/ajax/libs/jquery/1.12.4/jquery.js";

//引入懒加载模块
import {} from "./jquery.lazyload.js";

//引入分页的模块
import {} from "./jquery.pagination.js";

//渲染
const $list = $('.list ul');
let $page = null;

////排序的操作-设置初始变量
let $array = []; //排序后的数组
let $array_default = []; //排序前的数组
let $prev = 0; //上一个价格
let $next = 0; //下一个价格

$.ajax({
    url: 'http://10.31.165.20/xiaomi/php/list.php',
    dataType: 'json'
}).done(function(data) {
    $page = data.pagesize;
    console.log(data);
    let $arrdata = data.pagecontent; //获取初始数据
    let $strHtml = '';
    $.each($arrdata, function(index, value) {
        $strHtml += `
            <li>
                <a href="detail.html?sid=${value.sid}">
                    <img class='lazy' data-original="${value.picurl}" alt="图片加载失败了" width="200" height="200">
                    <p>${value.title}</p>
                    <span>￥${value.price}</span>
                    <img src="${value.smlpic}" alt="" class="smlpic">
                </a>
            </li>
        `;
    });
    $list.html($strHtml); //追加

    //第一页进行排序
    //将所以的li添加到数组中。
    //重新重置数组
    $array = []; //排序后的数组
    $array_default = []; //排序前的数组

    $('.list li').each(function(index, element) {
        $array[index] = $(this);
        $array_default[index] = $(this); //保留初始状态
    });


    //添加懒加载
    $('img.lazy').lazyload({
        effect: "fadeIn" //切换形式
    });


    //分页 - 点击分页触发
    $('.page').pagination({
        pageCount: $page, //总的页数
        jump: false, //是否开启跳转到指定的页数，布尔值。
        prevContent: '上一页', //将图标改成上一页下一页。
        nextContent: '下一页',
        callback: function(api) { //包含当前点击的分页的页码
            // console.log(api.getCurrent()); //获取当前的点击的页码。

            //将获取的页面传递给后端
            $.ajax({
                url: 'http://10.31.165.20/xiaomi/php/list.php',
                data: {
                    page: api.getCurrent() //将页码传递给后端。
                },
                dataType: 'json'
            }).done(function(data) {
                let $arrdata = data.pagecontent; //获取初始的数据。
                let $strhtml = '';
                $.each($arrdata, function(index, value) {
                    $strhtml += `
                    <li>
                        <a href="detail.html?sid=${value.sid}">
                            <img class='lazy' data-original="${value.picurl}" alt="" width="200" height="200">
                            <p>${value.title}</p>
                            <span>￥${value.price}</span>
                            <img src="${value.smlpic}" alt="" class="smlpic">
                        </a>
                    </li>
                `;
                });
                $list.html($strhtml); //追加


                //分页也要重排
                $array = []; //排序后的数组
                $array_default = []; //排序前的数组

                $('.list li').each(function(index, element) {
                    $array[index] = $(this);
                    $array_default[index] = $(this); //保留初始状态
                });



                //添加懒加载
                $('img.lazy').lazyload({
                    effect: "fadeIn" //切换形式
                });
            });
        }
    });
});


//排序 - 点击按钮事件 - 冒泡排序(相邻的两两比较)
$('.btn').eq(0).on('click', function() {
    $.each($array_default, function(index, value) { //value:每一个li元素
        $list.append(value); //append相当于appendChild,逐个追加
    });
    return;
});
$('.btn').eq(1).on('click', function() {
    for (let i = 0; i < $array.length - 1; i++) {
        for (let j = 0; j < $array.length - i - 1; j++) {
            $prev = parseFloat($array[j].find('span').html().substring(1)); //第一个价格
            $next = parseFloat($array[j + 1].find('span').html().substring(1)); //第二个价格
            if ($prev > $next) { //交换位置。
                let temp = $array[j];
                $array[j] = $array[j + 1];
                $array[j + 1] = temp;
            }
        }
    }

    $.each($array, function(index, value) { //value:每一个li元素
        $list.append(value); //append相当于appendChild,逐个追加
    });
});