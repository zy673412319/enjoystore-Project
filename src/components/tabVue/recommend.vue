<template>
  <div class="pageView">
    <div class="pageView-Body">
      <div class="indexHead content-Div">
        <div>
          <img src="../../assets/images/icon/home/state.png" class="stateICon">
          <span v-text="address"></span>
        </div>
        <label class="search-Con">
          <i class="fa fa-search"></i>
          <input placeholder="搜索" @click="toSearch()" />
        </label>
        <div class="index-Div">
          <div class="index-Div-left">
            <!-- 享立来 -->
            <span>自营品牌</span>
          </div>
          <div class="index-Div-cen"><img src="../../assets/images/icon/home/Truck.png">
            <span>全程冷链</span>
          </div>
          <div class="index-Div-right"><img src="../../assets/images/icon/home/Box.png">
            <span>极速宅配</span>
          </div>
        </div>
        <div class="index-Div" v-if="UserData">
          <div class="index-Div-Icon">
            <img :src="UserData.avatar" v-if="UserData.avatar">
            <img src="../../assets/images/icon/login/logo.png" v-if="!UserData.avatar">
          </div>
          <div class="index-Div-Text">
            <div class="indexName">
              <span v-text="UserData.phoneNumber"></span>
              <span class="smallText userText" v-text="user.type"></span>
            </div>
            <div class="index-Div">
              <p class="smallText">
                <span v-text="user.Integral"></span>积分</p>
              <p class="smallText">余额：
                <span v-text="UserData.balance"></span>
              </p>
            </div>
          </div>
        </div>
        <button class="loginBtn" v-if="!UserData" @click="toLogin()">登录</button>
      </div>
      <swiper :options="swiperOption">
        <swiper-slide v-for="(item, index) in bannerlist" :key="index">
          <img :src="item.imgPath" style="width: 100%;" @click="detail(item.urlPath)">
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
      <div class="content-Div bgWhite border-bottom" style="font-size:12px;line-height:1.4;">
        <span class="specialText" v-text="hintTitle"></span>：
        <span v-text="hint"></span>
      </div>
      <div class="productList">
        <p class="allTitle">推荐产品</p>
        <div class="index-Div productListCon" v-for="(pl,index) in productList" :key="index" @click="lookDetail(pl.id)">
          <div class="productList-Img">
            <img :src="pl.img">
          </div>
          <div class="productList-Text">
            <p class="listName" v-text="pl.name"></p>
            <p class="listText" v-text="pl.text"></p>
            <div class="index-Div" style="width: 100%;padding: 4px 0;">
              <p>尊享价:
                <i class="fa fa-jpy redText"></i><span class="redText" v-text="pl.rank2Price"></span>
              </p>
              <p class="grayText">
                <span class="underText"><i class="fa fa-jpy "></i><span class="" v-text="pl.originalPrice"></span></span>
              </p>
              <p>悦享价:
                <i class="fa fa-jpy redText"></i><span class="redText" v-text="pl.rank1Price"></span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="pageView-Footer home-ElTabs">
      <div @click="changeTabs('Index')">
        <img src="../../assets/images/icon/home/home-icon-01active.png" class="home-ElTabs-Icon">
        <p class="specialText">推荐</p>
      </div>
      <div @click="changeTabs('StoreVue')">
        <img src="../../assets/images/icon/home/home-icon-02.png" class="home-ElTabs-Icon">
        <p>店铺</p>
      </div>
      <div @click="changeTabs('VipMember')">
        <img src="../../assets/images/icon/home/home-icon-03.png" class="home-ElTabs-Icon">
        <P>会员VIP</p>
      </div>
      <div @click="changeTabs('ShoppCartVue')">
        <img src="../../assets/images/icon/home/home-icon-04.png" class="home-ElTabs-Icon">
        <p>购物车</p>
      </div>
      <div @click="changeTabs('userCenter')">
        <img src="../../assets/images/icon/home/home-icon-05.png" class="home-ElTabs-Icon">
        <p>个人中心</p>
      </div>
    </div>
  </div>
  <!-- banner：1080*420 -->
</template>

<script>
import qs from "qs";
import { mapState, mapActions, mapMutations } from "vuex";
import { swiper, swiperSlide } from "vue-awesome-swiper";
export default {
  name: "recommend",
  components: {
    swiper,
    swiperSlide
  },
  data() {
    return {
      address: "软件园",
      user: {
        Name: "ying",
        Icon: require("../../assets/images/icon/userIcon.png"),
        type: "悦享会员",
        Integral: "300",
        balance: "188"
      },
      hintTitle: "站内通告：",
      hint: "本地 新品上市 请关注店铺",
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
        loop: true,
        on: {
          click: () => {
            this.gotoUrl(this.swiper.gourl);
          }
        }
      },
      bannerlist: [
        // { imgPath: require("../../assets/images/icon/home-banner.jpg"), urlPath: "http://121.40.172.190:8023" }
      ],
      productList: [
        {
          img: require("../../assets/images/icon/listImg.png"),
          name: "<极速宅配>千年贡品黄岩蜜桔",
          text: "地理标识水果不一样的味道",
          rank2Price: "6.98",
          originalPrice: "12",
          id: "1",
          rank1Price: "5.6"
        },
        {
          img: require("../../assets/images/icon/listImg2.png"),
          name: "<极速宅配>千年贡品黄岩蜜桔",
          text: "地理标识水果不一样的味道",
          rank2Price: "6.98",
          originalPrice: "12",
          id: "2",
          rank1Price: "5.6"
        },
        {
          img: require("../../assets/images/icon/listImg2.png"),
          name: "<极速宅配>千年贡品黄岩蜜桔",
          text: "地理标识水果不一样的味道",
          rank2Price: "6.98",
          originalPrice: "12",
          id: "3",
          rank1Price: "5.6"
        }
      ]
    };
  },
  mounted() {
    this.swpierImg(); // 轮播图
    this.informText(); // 站内通知
  },
  computed: {
    ...mapState({
      UserData: state => state.indexData.UserData
    })
  },
  methods: {
    gotoUrl(url) {
      if (url.indexOf("http") >= 0) {
        window.location.href = url;
      } else {
        this.$router.push({ path: url });
      }
    },
    changeTabs(name) {
      this.$router.push({ name: name });
    },
    detail(path) {
      window.location.href = path;
    },
    toLogin() {
      this.$router.push({
        name: "Login",
        query: {
          newtype: "1"
        }
      });
    },
    toSearch() {
      this.$router.push({ path: "/SearchVue" });
    },
    lookDetail(id) {
      this.$router.push({
        name: "indexPD",
        query: {
          id: id
        }
      });
    },
    informText() {
      this.$axioshttp
        .post(
          "/json/commonconfig/getDetails",
          qs.stringify({
            K: "notice"
          })
        )
        .then(response => {
          this.hint = response.data.data.v;
          this.hintTitle = response.data.data.remarks;
        })
        .catch(error => {
          console.log(error);
        });
    },
    swpierImg() {
      this.$axioshttp({
        url: "/json/banner/list",
        method: "post",
        // data: {n:1},
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      })
        // .post("/banner/list")
        .then(response => {
          this.bannerlist = response.data.data;
          // for (var i = 0; i < this.bannerlist.length; i++) {
          //   if (this.bannerlist[i].imgPath) {
          //     this.bannerlist[i].imgPath =
          //       "http://67.218.141.88:8080" +
          //       this.bannerlist[i].imgPath.split("8080")[1];
          //   }
          // }
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>

<style scoped>
</style>