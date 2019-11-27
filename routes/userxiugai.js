var express=require('express');
var router=express.Router();
var app=express();
var golog=require('../models/usergolog')
var  py=require('../pinyin/vuepy')
require('../plugins/db')(app);
/* GET home page. */
router.get('/', function(req, res) {
    //修改       
        golog.updateOne({phoneNum:req.query.phoneNum},{$set:{birthday:req.query.birthday}},function(err){
            if(!err){
                golog.updateOne({phoneNum:req.query.phoneNum},{$set:{sex:req.query.sex}},function(err){
                    if(!err){
                        golog.updateOne({phoneNum:req.query.phoneNum},{$set:{username:req.query.username}},function(err){
                            if(!err){
                                var az=py.chineseToPinYin(req.query.username)
                                var ad=az.substring(0,1).toLowerCase()
                                golog.updateOne({phoneNum:req.query.phoneNum},{$set:{szm:ad}},function(err){
                                    if(!err){
                                        res.send({code:0,message:'修改成功'})
                                    }
                                })
                            }
                        })
                    }else {
                        res.send({code:0,message:'err:'+err})
                    }
                })
            }
        })
    })
module.exports = router;