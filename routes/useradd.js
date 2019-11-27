var express = require('express');
var router = express.Router();
var app = express();
var golog = require('../models/usergolog')
require('../plugins/db')(app);
/* GET home page. */
router.get('/', function (req, res) {
    //添加完成朋友
    golog.find({
        phoneNum: req.query.phone//自己的电话
    }, function (err, data) {
        var k = data[0].friends.length
        if (!err) {
            golog.find({
                phoneNum: req.query.phoneNum//别人的电话
            }, function (err, data) {
                if (!err) {
                    golog.updateOne({
                        phoneNum: req.query.phone
                    }, {
                        $addToSet: {//朋友添加自己
                            "friends": req.query.phoneNum
                        }
                    }, err => {
                        if (!err) {
                            golog.find({
                                phoneNum: req.query.phone
                            }, function (err, data2) {
                                if (!err) {
                                    var i = data2[0].friends.length;
                                    // console.log("旧数组的长度是"+k+";新数组的长度是"+i)
                                    if (i != k) {
                                        golog.updateOne({//自己添加朋友
                                            phoneNum: req.query.phoneNum
                                        }, {
                                            $addToSet: {
                                                "friends": req.query.phone
                                            }
                                        }, err => {
                                            if (!err) {
                                                golog.updateOne({
                                                    phoneNum: req.query.phoneNum
                                                },{
                                                    $pull:{//朋友去掉自己的拒绝
                                                        "reject":req.query.phone
                                                    }
                                                },err=>{
                                                    if(!err){
                                                        golog.updateOne({
                                                            phoneNum:req.query.phone
                                                        },{
                                                            $pull:{//自己去掉朋友的拒绝
                                                                "reject":req.query.phoneNum
                                                            }
                                                        },err=>{
                                                            if(!err){
                                                                golog.updateOne({
                                                                    phoneNum:req.query.phone//自己电话
                                                                },{
                                                                    $pull:{//自己去掉朋友的申请
                                                                        "sendFriend":req.query.phoneNum
                                                                    } 
                                                                },err=>{
                                                                    if(!err){
                                                                        golog.updateOne({
                                                                            phoneNum:req.query.phoneNum//朋友电话
                                                                        },{
                                                                            $pull:{//朋友去掉自己的申请
                                                                                "sendFriend":req.query.phone
                                                                            } 
                                                                        },err=>{
                                                                            if(!err){
                                                                                res.send({
                                                                                    code: 1,
                                                                                    message: "添加好友完成"
                                                                                })
                                                                            }else{
                                                                                res.send({
                                                                                    code: 1,
                                                                                    message: '修改失败，err' + err
                                                                                })
                                                                            }
                                                                        }) 
                                                                    }else{
                                                                        res.send({
                                                                            code: 1,
                                                                            message: '修改失败，err' + err
                                                                        })
                                                                    }
                                                                })
                                                            }else{
                                                                res.send({
                                                                    code: 1,
                                                                    message: '修改失败，err' + err
                                                                })
                                                            }
                                                        })
                                                    }else{
                                                        res.send({
                                                            code: 1,
                                                            message: '失败，err' + err
                                                        })
                                                    }
                                                })
                                                
                                            }else{
                                                res.send({
                                                    code: 1,
                                                    message: '失败，err' + err
                                                })
                                            }
                                        })
                                    } else {
                                        res.send({
                                            code: 2,
                                            message: "已是你好友"
                                        })
                                    }
                                }else{
                                    res.send({
                                        code: 1,
                                        message: '失败，err' + err
                                    })
                                }
                            })
                        }
                    })
                }
            })
        } else {
            res.send({
                code: 1,
                message: '失败，err' + err
            })
        }
    })
});
module.exports = router;