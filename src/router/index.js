import Vue from 'vue'
import Router from 'vue-router'
//@符号代表的是src这个目录
import Footer from "@/pages/Footer"
import Header from "@/pages/Header"
import index from "@/pages/index"
import Goodlist from "@/pages/Goodlists"

Vue.use(Router)

//这个文件是专门用来配置路由的。  这个非常重要，经常用到。
export default new Router({
  routes: [
    {
      path: '/',
      name: 'Goodlist',  //显示的组件名字
      component: Goodlist  //具体要显示的组件
    }
  ]
})
