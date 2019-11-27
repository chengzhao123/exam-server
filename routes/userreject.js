var express = require('express');
var router = express.Router();
var app = express();
var golog = require('../models/usergolog')
require('../plugins/db')(app);
/* GET home page. */
router.get('/', function (req, res) {
    //用户拒绝好友
    var b=req.query.phone//自己的电话
    golog.updateOne({
        phoneNum: req.query.phoneNum//朋友的电话
    }, {
        $pull:{//把朋友的发送好友申请中的自己去掉
            "sendFriend":b
        }
    }, function (err) {
       if(!err){
           golog.updateOne({
            phoneNum: req.query.phone//自己的电话
           },{
            $addToSet: {//在自己中，把拒绝的好友添加起来
                "reject": req.query.phoneNum//朋友的电话
            }
           },function(err){
                if(!err){
                    res.send({code:1,message:'拒绝了好友'})
                }else{
                    res.send({code:1,message:'err:'+err})
                }
           })
       }else{
           res.send({code:1,message:'err:'+err})
       }
    })
});
module.exports = router;