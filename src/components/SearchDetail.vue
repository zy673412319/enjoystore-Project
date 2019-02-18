<template>
  <div class="pageView">
    <div class="myOrder-Head">
      <span @click="backSearchVue()"><img src="../assets/images/icon/userCenter/arrow.png"></span>
      <p>商品详情</p>
      <span style="text-align: right;">分享</span>
    </div>
    <div class="myOrder-Body">
      <div class="pageView-Body">
        <swiper :options="swiperOption" ref="mySwiper">
          <swiper-slide v-for="(item, index) in bannerlist" :key="index">
            <img :src="item.imgurl" style="width: 100%;">
          </swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
        <div class="content-Div bgWhite border-bottom">
          <p class="listName" v-text="detail.Name"></p>
          <p class="listText" style="margin-bottom: 2px;" v-text="detail.Text"></p>
        </div>
        <div class="content-Div bgWhite">
          <p class="listName redText">
            <i class="fa fa-jpy"></i><span v-text="detail.num"></span>
          </p>
          <div class="index-Div" style="padding-top: 4px;">
            <div class="index-Div-left">享立来<span>自营品牌</span></div>
            <div class="index-Div-cen"><img src="../assets/images/icon/home/Truck-black.png"><span>全程冷链</span></div>
            <div class="index-Div-right"><img src="../assets/images/icon/home/Box-black.png"><span>极速宅配</span></div>
          </div>
        </div>
      </div>
      <div class="pageView-Footer">
        <div class="product-footer">
          <div class="product-footer-left" @click="lookshoppCart()">
            <p class="cartimgBg">
              <span v-text="cartNum"></span>
            </p>
            <p class="olText">购物车</p>
          </div>
          <div class="product-footer-center">
            加入购物车
          </div>
          <div class="product-footer-right">
            立即购买
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {swiper, swiperSlide} from 'vue-awesome-swiper'
  export default {
    name: "product-detail",
    components: {
      swiper,
      swiperSlide
    },
    data() {
      return {
        swiperOption: {
          pagination: {
            el: '.swiper-pagination',
          },
          slidesPerView: 1,
          autoplay: {
            delay: 3000,
            disableOnInteraction: false,
          },
          spaceBetween: 30,
          loop: true,
        },
        detail: {
          Name: '谁说我们绿皮就不好吃?我们甜着呢',
          Text: '<极速宅配>小青橘子',
          num: '6.98'
        },
        bannerlist: [
          {imgurl: require("../assets/images/icon/home-banner.jpg"), gourl: 'http://121.40.172.190:8023'},
          {imgurl: require("../assets/images/icon/home-banner.jpg"), gourl: 'http://www.epaynfc.com'},
          {imgurl: require("../assets/images/icon/home-banner.jpg"), gourl: 'https://www.baidu.com'}
        ],
        cartNum: '12',
        backhomeId: this.$route.query.homeId ? this.$route.query.homeId:'1',
        backstoreId: this.$route.query.storeId ? this.$route.query.storeId:'1'
      }
    },
    mounted: function () {
    },
    methods: {
      // 返回到，导航 >>> 推荐
      backSearchVue(){
        this.$router.push({
          name: "SearchVue"
        });
      },
      // 查看购物车
      lookshoppCart(){
        this.$router.push({ name: "ShoppCartVue" });
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../assets/css/mixinCss";
  .myOrder-Head {
    background: white;
    position: static;
    padding: 0 4%;
    @include flexDiv;
    span{
      width: 20%;
      position: static;
      &:nth-child(1){
        text-align: left;
      }
      img{
        width: 18%;
      }
    }
    p{
      width: 60%;
      font-size: 17px;
      color: #101010;
    }
  }
  .cartimgBg {
    margin: 0 auto;
    width: 20px;
    height: 20px;
    background: url("../assets/images/icon/detail_Shoppcart.png") center center no-repeat;
    background-size: 100% 100% !important;
    position: relative;
    span {
      position: absolute;
      width: 20px;
      height: 20px;
      line-height: 20px;
      @include circle-radius;
      display: block;
      font-size: 11px;
      color: #ffffff;
      background: #ff2121;
      border: 1px solid #ff2121;
      top: -4px;
      right: -8px;
    }
  }
</style>
