var express=require('express');
var router=express.Router();
var app=express();
var golog=require('../models/usergolog')
require('../plugins/db')(app);
/* GET home page. */
  router.get('/', function(req, res) {
//fiends
   
    golog.find({phoneNum:req.query.phone},function(err,data){
      
        if(!err){         
            if(data[0].friends.length==0){
                res.send({code:2,message:'你还没有一个好友呢'});
            }else{
               var  use =[];
               var i=0 ;
               var len=data[0].friends.length;
               var aa=setInterval(() => {
                    if(i==len){
                        res.send({code:1,message:use})
                        clearInterval(aa);
                    }else{
                        golog.find({phoneNum:data[0].friends[i]},function(err,dataa){
                            if(!err){
                                use.push({name:dataa[0].username,fir:dataa[0].szm,phone:dataa[0].phoneNum,sex:dataa[0].sex});
                            }else{
                                res.send({code:2,message:'err:'+err});
                                clearInterval(aa);
                            } 
                            
                        })
                        i++;
                    }
               }, 20);
            } 
        }else{
            res.send({code:2,message:'err:'+err})
        }
    })
  });
  module.exports = router;