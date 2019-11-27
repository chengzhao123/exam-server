var express=require('express');
var router=express.Router();
var app=express();
var golog=require('../models/usergolog')

require('../plugins/db')(app);
/* GET home page. */
  router.post('/', function(req, res) {
//注册
    golog.find({phoneNum:req.body.phoneNum},function(err,data){
        if(!err){
            // console.log(req.body.phoneNum+'data'+data+'datalength'+data.length)
           if(data.length==0){
                golog.create({
                    username:req.body.username,
                    phoneNum:req.body.phoneNum,
                    password:req.body.password},function(err){
                    if(!err){
                        res.send({code:1,message:'注册成功'})
                    }else{
                        res.send({code:2,message:'注册失败'})
                        // console.log(err)
                    }
                })
            } else if(data[0].phoneNum==req.body.phoneNum){
                res.send({code:0,message:'该手机号已经注册'})
            }
        }else{
            res.send({code:2,message:'err:'+err})
        }
    })
  });
  module.exports = router;