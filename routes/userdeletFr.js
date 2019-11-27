var express=require('express');
var router=express.Router();
var app=express();
var golog=require('../models/usergolog')
require('../plugins/db')(app);
/* GET home page. */
  router.get('/', function(req, res) {
//删除好友
    golog.updateOne({phoneNum:req.query.phoneNum},{//别人的电话号码
        $pull:{
            "friends":req.query.phone//自己的电话号码
        }
    },err=>{
        if(!err){
            golog.updateOne({phoneNum:req.query.phone},{//自己的电话号码
                $pull:{
                    "friends":req.query.phoneNum//别人的电话号码
                }
            },err=>{
                if(!err){
                    res.send({code:0,message:'删除好友成功'})
                }else{
                    res.send({code:0,message:'删除好友失败'})
                }
            })
        }else{
            res.send({code:0,message:'删除好友失败'})
        }
    })
    
  });
  module.exports = router;