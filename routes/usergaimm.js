var express=require('express');
var router=express.Router();
var app=express();
var golog=require('../models/usergolog')
require('../plugins/db')(app);
/* GET home page. */
router.get('/', function(req, res) {
    //忘记密码        
        golog.find({phoneNum:req.query.phoneNum},function(err,data){
            // console.log(req.query.phoneNum+'data'+data+'datalength'+data.length)
            if(!err){
                if(data.length==0){
                    res.send({code:0,message:'你还没有注册'})
                }else if(data[0].phoneNum==req.query.phoneNum){
                    // console.log(req.query.phoneNum+':'+req.query.password)
                    golog.updateOne({phoneNum:req.query.phoneNum},{$set:{password:req.query.password}},function(err){
                        if(!err){
                            res.send({code:1,message:'修改成功，你的密码是'+req.query.password})
                        }else{
                            res.send({code:2,message:'err:'+err})
                        }
                    })
                }
            }else{
                res.send({code:2,message:'err:'+err})
            }
        })
});
module.exports = router;