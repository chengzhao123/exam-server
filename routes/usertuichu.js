var express=require('express');
var router=express.Router();
var app=express();
var golog=require('../models/usergolog')
require('../plugins/db')(app);
/* GET home page. */
router.get('/', function(req, res) {
    //退出      
    golog.updateOne({phoneNum:req.query.phoneNum},{$set:{zhuangtai:false}},function(err){
        if(err){
            res.send({code:2,message:'err:'+err})
        }
    })
});
module.exports = router;