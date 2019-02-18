<template>
  <div class="pageView">
    <div class="myOrder-Head">
      <span @click="backHome()"><img src="../../assets/images/icon/userCenter/arrow.png"></span>
      <p>商品详情</p>
      <span style="text-align: right;" class="shareFun" @click="shareFun()">分享</span>
    </div>
    <div class="myOrder-Body">
      <div class="pageView-Body bgWhite">
        <!-- <swiper :options="swiperOption" ref="mySwiper">
          <swiper-slide v-for="(item, index) in bannerlist" :key="index">
            <img :src="item.imgurl" style="width: 100%;">
          </swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
        </swiper> -->
        <img :src="detail.images" style="max-height: 320px;">
        <div class="content-Div bgWhite border-bottom">
          <div class="index-Div">
            <div class="index-Div-left">享立来
              <span>自营品牌</span>
            </div>
            <div class="index-Div-cen"><img src="../../assets/images/icon/home/Truck-black.png">
              <span>全程冷链</span>
            </div>
            <div class="index-Div-right"><img src="../../assets/images/icon/home/Box-black.png">
              <span>极速宅配</span>
            </div>
          </div>
        </div>
        <div class="content-Div bgWhite border-bottom">
          <p class="listName" v-text="detail.name"></p>
          <p class="listText" style="margin-bottom: 2px;" v-text="detail.description"></p>
        </div>
        <div class="content-Div bgWhite border-bottom">
          <div class="index-Div" style="width: 100%;padding: 4px 0;">
            <p>悦享价:
              <i class="fa fa-jpy redText"></i><span class="redText" v-text="detail.rank1Price"></span>
            </p>
            <p class="grayText">
              <span class="underText"><i class="fa fa-jpy "></i><span class="" v-text="detail.originalPrice"></span></span>
            </p>
            <p>尊享价:
              <i class="fa fa-jpy redText"></i><span class="redText" v-text="detail.rank2Price"></span>
            </p>
          </div>
          <p class="bigText">销量:
            <span v-text="detail.salesVolume"></span>
          </P>
        </div>
        <div class="content-Div bgWhite ">
          <div class="index-Div" style="justify-content: flex-start;">
            <p style="color:#969696;">请选择：</p>
            <p class="changeNum">
              <span class="btnLeft" @click="changeNum(1)">-</span>
              <span v-text="commodityNum"></span>
              <span class="btnRight" @click="changeNum(2)">十</span>
            </p>
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
          <div class="product-footer-center" @click="addCart()">
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
import qs from "qs";
import { swiper, swiperSlide } from "vue-awesome-swiper";
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
          el: ".swiper-pagination"
        },
        slidesPerView: 1,
        autoplay: {
          delay: 3000,
          disableOnInteraction: false
        },
        spaceBetween: 30,
        loop: true
      },
      commodityNum: "1",
      detail: {},
      bannerlist: [
        {
          imgurl: require("../../assets/images/icon/home-banner.jpg"),
          gourl: "http://121.40.172.190:8023"
        },
        {
          imgurl: require("../../assets/images/icon/home-banner.jpg"),
          gourl: "http://www.epaynfc.com"
        },
        {
          imgurl: require("../../assets/images/icon/home-banner.jpg"),
          gourl: "https://www.baidu.com"
        }
      ],
      cartNum: "12",
      backstoreId: this.$route.query.storeId ? this.$route.query.storeId : "1",
      commodityId: this.$route.query.id
    };
  },
  mounted: function() {
    this.lookDetail();
    this.getCartNum();
  },
  methods: {
    // 返回到，导航 >>> 推荐
    backHome() {
      this.$router.push({
        name: "StoreVue",
        query: {
          storeId: this.backstoreId
        }
      });
    },
    getCartNum() {
      this.$axioshttp
        .post(
          "/json/commodityCart/commodityList",
          qs.stringify({
            commodityCartId: "34d0d978c1754115b421a18cc5245469"
          })
        )
        .then(response => {
          if(response.data.data){
            this.cartNum = response.data.data.length;
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    changeNum(id) {
      if (id == "1") {
        if (this.commodityNum != "1") {
          this.commodityNum--;
        }
      } else {
        this.commodityNum++;
      }
    },
    lookDetail() {
      this.$axioshttp
        .post(
          "/json/commodity/getCommodity",
          qs.stringify({
            commodityId: this.commodityId
          })
        )
        .then(response => {
          this.detail = response.data.data;
          this.detail.images = "http://www.xianglilai.vip/" + this.detail.images;
        })
        .catch(error => {
          console.log(error);
        });
    },
    shareFun(){
      console.log("去分享");
    },
    addCart() {
      this.$axioshttp
        .post(
          "/json/commodityCart/addCommodityCart",
          qs.stringify({
            userId: this.$store.state.indexData.UserData.id,
            specificationId: "1",
            commodityNumber: this.commodityNum,
            commodityId: this.commodityId
          })
        )
        .then(response => {
          console.log(response.data);
          return this.common.alert(response.data.message);
        })
        .catch(error => {
          console.log(error);
        });
    },
    // 查看购物车
    lookshoppCart() {
      this.$router.push({ name: "ShoppCartVue" });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/css/mixinCss";
.myOrder-Head {
  background: white;
  position: static;
  padding: 0 4%;
  @include flexDiv;
  span {
    width: 20%;
    position: static;
    &:nth-child(1) {
      text-align: left;
    }
    img {
      width: 18%;
    }
  }
  p {
    width: 60%;
    font-size: 17px;
    color: #101010;
  }
}
.cartimgBg {
  margin: 0 auto;
  width: 20px;
  height: 20px;
  background: url("../../assets/images/icon/detail_Shoppcart.png") center center
    no-repeat;
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
