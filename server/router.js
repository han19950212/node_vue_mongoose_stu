var express = require('express');

var router= express.Router();

var lists = require('./models/lists')   //在路由这个js文件中，引入表格
var users = require('./models/users') 

router.get('/',function(req,res){
    res.end('123')
})

router.post('/getGoodlists',function(req,res){   //接口，增加商品，增删改查的增
   
    var body =req.body;
    console.log(body);
    // res.end('hh')

    new lists(body).save(function(err,lists){
        if(err){
            return res.status(500).json({
                err_code:500,
                message:"接口出错了"
            })
        }
        res.status(200).json({
            err_code:200,
            message:'ok'
        })
    })
})


router.post('/getAlllists',function(req,res){   //增删该查的查询所有的内容
    lists.find( function(err, list) {   
        if (err) {
            return res.status(500).json({
                err_code:500,
               message:'接口出错'
            })
        } else {
        //   console.log(res);
          return res.status(200).json({
                err_code:200,
                message:'获取成功',
              data:list
          })
        }
      });
})




router.post('/getIdlists',function(req,res){   //增删该查的根据id来查询字符串
    var id = req.body._id
    console.log(id)
    lists.find({    //
        _id:id
    },function(err, list) {
        if (err) {
          console.log(err);
        } else {
        //   console.log(res); 
          return res.status(200).json({
              data:list
          }) 
        }
      });
})

router.post('/searchPriceSction',function(req,res){   //根据价格区间来查询商品
    var smallprice = Number(req.body.smallprice)
    var bigprice=Number(req.body.bigprice)
    console.log(smallprice)
    console.log(bigprice)
    lists.find({    //
        salePrice:{$gte: smallprice,$lte: bigprice},
    },function(err, list) {
        console.log(list)
        if (err) {
            return res.status(500).json({
                err_code:500,
                message:'接口出错'
            }) 
        } else {
        //   console.log(res); 
          return res.status(200).json({
            err_code:200,
            message:'获取成功',
            data:list
          }) 
        }
      });
})





router.post('/removeList',function(req,res){   //增删改查的删除
    var id = req.body._id;
    console.log(id)
    lists.deleteOne({
        _id:id
    },function(err,ress){
        if(err){
            return res.status(500).json({
                err_code:500,
                message:"接口出错了"
            })
        }else{
            return res.status(200).json({
                err_code:200,
                message:"删除成功"
            })
        }
        
    })
})

//添加一个用户
router.post('/addUser',function(req,res){
    var body=req.body

    var  jiaUserId= '韩鹏'
    users.findOne({
        userName:jiaUserId
    },function(err,data){
        if(err){
            return  res.status(500).json({
                err_code:500,
                message:"接口出错了"
            })
        }
        if(data){
           return res.status(200).json({
                err_code:200,
                message:'此账号已经存在'
            })
        }

        new users(body).save(function(err,user){
            if(err){
                return res.status(500).json({
                    err_code:500,
                    message:'接口出错'
                })
            }
            res.status(200).json({
                err_code:200,
                message:'ok'
            })
        })
 

    })
})



//购物车的接口  把商品添加到购物车
router.post('/addShopCar',function(req,res){   //加入购物车成功
    var pro = req.body.productId;
    var jiaUserId="韩鹏";
    users.findOne({userName:jiaUserId},function(err,data){
        if(err){
            return res.status(500).json({
                err_code:0,
                message:'接口出错'
            })
        }else if(data){
            
            let goodsItem= '';
            data.cartList.forEach(function(item){    //这里是判断，有没有商品是一样的，如果有，就是数量加1，如果没有再去加入购物车。
                if(item.productId==pro){   
                    console.log(item.productNum)
                    goodsItem=item;
                    item.productNum++;
                    data.save(function(err2,doc2){
                        if(err2){
                            return res.status(500).json({
                                err_code:0,
                                message:'添加商品到购物车步骤出错'
                            })
                        }else{
                            return res.status(200).json({
                                err_code:1,
                                message:"加入成功"
                            })
                        }
        
                    })
                }else{
                    lists.findOne({
                        productId:pro
                    },function(err1,data123){
                        // console.log(data123)
                        if(err1){
                            return res.status(500).json({
                                err_code:0,
                                message:'查找商品id接口出错'
                            })
                        }else if(data123){
                            // console.log(data123)
                            data.cartList.push(data123)  //添加到users数据库中
                            // console.log(data)
                            data.save(function(err2,doc2){
                                if(err2){
                                    return res.status(500).json({
                                        err_code:0,
                                        message:'添加商品到购物车步骤出错'
                                    })
                                }else{
                                    return res.status(200).json({
                                        err_code:1,
                                        message:"加入成功"
                                    })
                                }

                            })
                        }

                    })
                }

            })
    

        }else{
            return res.status(500).json({
                err_code:1,
                message:'暂无数据'
            })
        }
        
    })
})


























module.exports=router;