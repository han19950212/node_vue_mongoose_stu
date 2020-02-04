<template>
  <div>
      <navheader></navheader>
        <navbread>
            <span slot="bread1">Goods</span>
            <span slot="bread2">Goods2</span>
        </navbread>
    <div class="accessory-result-page accessory-page">
      <div class="container">
        <div class="filter-nav">
          <span class="sortby">Sort by:</span>
          <a href="javascript:void(0)" class="default cur">Default</a>
          <a href="javascript:void(0)" class="price">
            Price
            <svg class="icon icon-arrow-short">
              <use xlink:href="#icon-arrow-short" />
            </svg>
          </a>
          <a href="javascript:void(0)" class="filterby stopPop">Filter by</a>
        </div>
        <div class="accessory-result">
          <!-- filter -->
          <div class="filter stopPop" id="filter">
            <dl class="filter-price">
              <dt>Price:</dt>
              <dd>
                <a @click="all" href="javascript:void(0)">All</a>
              </dd>
              <dd v-for="(item,index) in listPriceSection" :key="index">
                <a @click="sctionPrice(item.smallPrice,item.morePrice)" href="javascript:void(0)">{{item.smallPrice}} - {{item.morePrice}}</a>
              </dd>
              
            </dl>
          </div>

          <!-- search result accessories list -->
          <div class="accessory-list-wrap">
            <div class="accessory-list col-4">
              <ul>
                <li v-for="(item,index) in Goodlist" :key="index">
                  <div class="pic">
                    <a href="#">
                      <img :src="imgurl+item.productImage" alt />
                    </a>
                  </div>
                  <div class="main">
                    <div class="name">{{item.productName}}</div>
                    <div class="price">{{item.salePrice}}</div>
                    <div class="btn-area">
                      <a href="javascript:;" class="btn btn--m">加入购物车</a>
                    </div>
                  </div>
                </li>
               
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <navfooter/>
  </div>
</template>
<script>
import "@/assets/css/base.css";
import "@/assets/css/product.css";

import navheader from './Header'
import navfooter from './Footer'
import navbread from './navbread'

export default {
  data() {
    return{
        imgurl:"http://localhost:8080/static/img/",
        Goodlist:[],  //储存商品用的
        listPriceSection:[  //储存价格区间
       
          {
            smallPrice:0,
            morePrice:100
          },
          {
            smallPrice:100,
            morePrice:500
          },
          {
            smallPrice:500,
            morePrice:1000
          },
          {
            smallPrice:1000,
            morePrice:2000
          },
        ]
    }
  },
  created(){  
      this.getAlllists();
  },
  methods:{
      all(){   //选择所有的商品
          this.getAlllists();
      },

      //价格排序
      sort(){
        var list = this.Goodlist;

      },
      compare(x,y){  //封装的排序方法

      },



      sctionPrice(e,a){   //选择价格区间
        console.log(e);
        console.log(a)
        var that=this;
        this.$axios.post('http://localhost:3000/searchPriceSction',{
          smallprice:e,
          bigprice:a
        }).then(function(res){
          console.log(res)
            that.Goodlist=res.data.data;
        })
      },

      getAlllists(){  //获取所有的
        var that=this;
          this.$axios.post('http://localhost:3000/getAlllists').then(function(res){
            console.log(res)
            that.Goodlist=res.data.data;
            
          }).catch(function (error) {
            console.log(error);
          });
      },
  },
  components:{
      navheader:navheader,
      navbread,
      navfooter
  }
};
</script>
<style>
</style>