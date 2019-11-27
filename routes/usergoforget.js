var express=require('express');
var router=express.Router();
var app=express();
var golog=require('../models/usergolog')
require('../plugins/db')(app);
/* GET home page. */
router.post('/', function(req, res) {
    //忘记密码        
        golog.find({phoneNum:req.body.phoneNum},function(err,data){
            // console.log(req.body.phoneNum+'data'+data+'datalength'+data.length)
            if(!err){
                if(data.length==0){
                    res.send({code:0,message:'你还没有注册'})
                }else if(req.body.mibao!=data[0].mibao){
                    res.send({code:1,message:'密保答案错误'})
                }else if(data[0].phoneNum==req.body.phoneNum){
                    res.send({code:2,message:data[0].password})
                }
            }else{
                res.send({code:1,message:"err:"+err})
            }
        })
});
module.exports = router;