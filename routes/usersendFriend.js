var express = require('express');
var router = express.Router();
var app = express();
var golog = require('../models/usergolog')
require('../plugins/db')(app);
/* GET home page. */
router.get('/', function (req, res) {
    //发送添加朋友信息
    golog.find({
        phoneNum: req.query.phone
    }, function (err, data) {
        if (!err) {
            var b=req.query.phoneNum//朋友的电话
            // console.log(b)
            if(data[0].friends.length==0){
                golog.updateOne({
                    phoneNum: req.query.phone
                }, {
                    $addToSet: {
                        "sendFriend": req.query.phoneNum
                    }
                },err=>{
                    if(!err){
                        res.send({code:1,message:"发送好友信息成功"})
                    }
                })
            }else{
                // console.log(data[0].friends.indexOf(b))
                if(data[0].friends.indexOf(b)>=0){//大于0表示已经添加了该好友
                    res.send({code:1,message:"你已经添加了该好友"})
                }else{
                    golog.updateOne({
                        phoneNum: req.query.phone
                    }, {
                        $addToSet: {
                            "sendFriend": req.query.phoneNum
                        }
                    },err=>{
                        if(!err){
                            res.send({code:1,message:"发送好友信息成功"})
                        }
                    })
                }
            }
        } else {
            res.send({
                code: 1,
                message: '添加失败，err' + err
            })
        }
    })
});
module.exports = router;