var express = require('express');

var path = require('path');

var bodyParser= require('body-parser');   //这个是获取post数据传过来的值的；

var app= express();

app.all("*",function(req,res,next){
    //设置允许跨域的域名，*代表允许任意域名跨域
    res.header("Access-Control-Allow-Origin","*");
    //允许的header类型
    res.header("Access-Control-Allow-Headers","content-type");
    //跨域允许的请求方式 
    res.header("Access-Control-Allow-Methods","DELETE,PUT,POST,GET,OPTIONS");
    if (req.method.toLowerCase() == 'options')
        // res.send(200);  //让options尝试请求快速结束
        res.sendStatus(200)
    else
        next();
  })

var router= require('./router')  //路由接口模块

app.use('./public',express.static(path.join(__dirname,'./public/')));   //开放public文件

app.use('./node_modules',express.static(path.join(__dirname,'./node_modules')));  //开放node_modules文件夹

app.use(bodyParser.urlencoded({extended:false}));  //配置一下这个获取post传值
app.use(bodyParser.json());

app.use(router);   //路由，专门router里面写路由

// app.get('/',function(req,res){
//     res.end('hello world')
// })

app.listen(3000,function(){
    console.log('服务器启动在了3000端口号了')
})