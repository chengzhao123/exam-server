var express=require('express');
var router=express.Router();
var app=express();
var golog=require('../models/usergolog')
var  py=require('../pinyin/vuepy')

require('../plugins/db')(app);
/* GET home page. */
  router.get('/', function(req, res) {
//登录
    golog.find({phoneNum:req.query.phoneNum},function(err,data){
        if(!err){
            if(data.length==0){
                res.send({code:0,message:'你还没有注册'})
            }else if(data[0].phoneNum==req.query.phoneNum&&data[0].password!=req.query.password){
                res.send({code:1,message:'密码错误'})
            }
            else if(data[0].phoneNum==req.query.phoneNum&&data[0].password==req.query.password){
                golog.updateOne({phoneNum:req.query.phoneNum},{$set:{zhuangtai:true}},err=>{
                    if(!err){    
                        var az=py.chineseToPinYin(data[0].username)
                        var ad=az.substring(0,1).toLowerCase()
                        golog.updateOne({phoneNum:req.query.phoneNum},{$set:{szm:ad}},function(err){
                            if(!err){
                                res.send({code:2,message:'登录成功',username:data[0].username,sex:data[0].sex})
                            }
                        })
                    }
                })
            }
        }else{
            res.send({code:1,message:'err:'+err})
        }
    })
  });
  module.exports = router;