var mongoose = require('mongoose');  //引入mongodb数据库的mongoose；

// mongoose.connect('mongodb://localhost/users',{useUnifiedTopology:true,useNewUrlParser: true});  // 连接数据库

var Schema=mongoose.Schema;

var usersSchema= new Schema({
    'userId':Number,
    "userName":String,
    "userPad":String,
    "orderList":Array,
    "cartList":[
        {
            "productId":String,
            "productName":String,
            "salePrice":String,
            "productImage":String,
            "checked":String,
            "productNum":{
                type:String,
                default:1
            }
        }
    ],
    "addressList":Array,

})

module.exports=mongoose.model('users',usersSchema)