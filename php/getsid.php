<?php

//接收前端sid，返回sid对应的数据。


//连接数据库
include "conn.php";
if(isset($_GET['datasid'])){
    $sid = $_GET['datasid'];
    $result=$conn->query("select * from shoplist where sid=$sid");//查询和当前条件满足的那一条数据，将其返回
    echo json_encode($result->fetch_assoc());//json格式输出这条数据
}