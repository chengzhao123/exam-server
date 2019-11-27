//这是主页
require('events').EventEmitter.defaultMaxListeners = 0//取消最大10连接的限制 https://www.cnblogs.com/3teeth/p/9606028.html
var express=require('express');
var app=express();
var bodyParser=require('body-parser')
app.use(bodyParser.urlencoded({extended:false}));//解析 x-www-form-urlencoded
app.use(bodyParser.json());
var usergolog=require('./routes/usergolog')//用户登录
var usergores=require('./routes/usergores')//用户注册
var usergoforget=require('./routes/usergoforget')//用户忘记密码
var usergaimm=require('./routes/usergaimm')//用户修改密码
var usergomibao=require('./routes/usergomibao')//用户密保
var userxiugai=require('./routes/userxiugai')//用户修改个人资料
var usertuichu=require('./routes/usertuichu')//用户退出
var add=require('./routes/useradd')//添加用户
var friends=require('./routes/userfriends')//显示用户
var show=require('./routes/usershow')//显示首页添加好友时用户
var sendFriend=require('./routes/usersendFriend')//发送添加朋友的信息
var getSendFr=require('./routes/usergetSendFr')//得到添加朋友的信息
var reject=require('./routes/userreject')//用户拒绝了朋友的信息
var deletFr=require('./routes/userdeletFr')//用户删除了好友
//跨域
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
})
app.use('/user/golog',usergolog)
app.use('/user/gores',usergores)
app.use('/user/goforget',usergoforget)
app.use('/user/gaimm',usergaimm)
app.use('/user/gomibao',usergomibao)
app.use('/user/xiugai',userxiugai)
app.use('/user/tuichu',usertuichu)
app.use('/user/add',add)
app.use('/user/friends',friends)
app.use('/user/show',show)
app.use('/user/sendFriend',sendFriend)
app.use('/user/getSendFr',getSendFr)
app.use('/user/reject',reject)
app.use('/user/deletFr',deletFr)
app.listen(8082,function(){
    console.log('在8082端口')
})