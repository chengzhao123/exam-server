var mongose=require('mongoose')
var Schema=mongose.Schema;
var usergolog=new Schema({
    username:String,
    mibao:{
        type:String,
        default:''
    },
    phoneNum:Number,
    password:Number,
    sex:{
        type:String,
        default:'男'
    },
    birthday:{
        type:String,
        default:''
    },
    zhuangtai:{
        type:Boolean,
        default:false
    },
    friends:{
        type:Array
    },
    szm:{
        type:String,
        default:''
    },//等待添加的好友
    sendFriend:{
        type:Array
    },
    reject:{
        type:Array
    }
})
var golog=mongose.model('login',usergolog)
module.exports =golog