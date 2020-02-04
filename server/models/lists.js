//这个是商品表
var mongoose = require('mongoose');  //引入mongodb数据库的mongoose；

mongoose.connect('mongodb://localhost/lists',{useUnifiedTopology:true,useNewUrlParser: true});  // 连接数据库

var Schema=mongoose.Schema;

var ListSchema= new Schema({
    productId:{
        type:String,
        required:true   //必须得传的意思
    },
    'productName':String,
    'salePrice':Number,
    'productImage':String,
})

module.exports=mongoose.model('lists',ListSchema)