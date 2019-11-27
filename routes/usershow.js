var express=require('express');
var router=express.Router();
var app=express();
var golog=require('../models/usergolog')
require('../plugins/db')(app);
/* GET home page. */
  router.get('/', function(req, res) {
//显示朋友
    golog.find({phoneNum:req.query.phone},function(err,data){
        if(!err){
            golog.find({phoneNum:req.query.phoneNum},function(err,dataa){
                if(!err){
                    if(dataa.length==0){
                        res.send({code:0,message:'该账号不存在'})
                    }else{
                        res.send({code:1,message:[dataa[0].username,dataa[0].sex,dataa[0].phoneNum]})
                    }
                }
            })          
        }else{
            res.send({code:0,message:'修改失败，err'+err})
        }
    })
  });
  module.exports = router;