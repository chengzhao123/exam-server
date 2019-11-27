var express = require('express');
var router = express.Router();
var app = express();
var golog = require('../models/usergolog')
require('../plugins/db')(app);
/* GET home page. */
router.get('/', function (req, res) {
    //客户端收到添加朋友信息
    var mp=req.query.phone//自己的电话
    golog.find({"sendFriend":{$in:[mp]}}, function (err, data) {
        if(!err){
            golog.find({"reject":{$in:[mp]}},function(err,data2){
                if(!err){
                    var a=[];//添加自己的人;
                    var b=[];//拒绝自己的人;
                    if(data.length>0){
                        for(var i=0;i<data.length;i++){
                            a.push({name:data[i].username,sex:data[i].sex,phone:data[i].phoneNum})
                        }
                    }
                    if(data2.length>0){
                        for(var j=0;j<data2.length;j++){
                            b.push({name:data2[j].username,sex:data2[j].sex,phone:data2[j].phoneNum})
                        }
                    }
                    res.send({code:0,messagea:a,messageb:b});
                }
            })
            
            
        }
    })
});
module.exports = router;