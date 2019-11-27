module.exports =app =>{
    var mongoose=require('mongoose');
    mongoose.connect('mongodb://127.0.0.1:27017/users',{
        useNewUrlParser:true,
        useUnifiedTopology: true
    });
    mongoose.connection.once("open",function(){
        console.log("连接打开")
    })
}