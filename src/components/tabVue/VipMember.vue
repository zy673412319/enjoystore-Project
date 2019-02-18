<template>
  <div class="pageView">
    <div class="pageView-Body">
      <div class="pageView bgWhite" style="overflow-y: auto;">
        <div class="content-Div bgOrange text-center">
          <div v-if="UserData">
            <img :src="UserData.avatar" class="userIcon" v-if="UserData.avatar">
            <img src="../../assets/images/icon/login/logo.png" class="userIcon" v-if="!UserData.avatar">
            <p class="userName" v-text="UserData.phoneNumber"></p>
          </div>
          <button class="loginBtn" @click="toLogin('3')" style="margin: 34px auto;" v-if="!UserData">登录</button>
          <div class="index-Div" style="color: white;">
            <div class="index-Div-left">享立来<span>自营品牌</span></div>
            <div class="index-Div-cen"><img src="../../assets/images/icon/home/Truck.png"><span>全程冷链</span></div>
            <div class="index-Div-right"><img src="../../assets/images/icon/home/Box.png"><span>极速宅配</span></div>
          </div>
        </div>
        <div class="content-Div" style="background:#fffce7;font-size:12px;line-height:1.4;">
          <span style="color:#5a0000;" v-text="hintTitle"></span>：<span v-text="hint"></span>
        </div>
        <div class="VipList-Con" v-for="(vtl,index) in VipTypeList" v-if="VipTypeList.length>0" :key="index" @click="lookPackage(vtl,index)">
            <div class="cardList-Con-Icon">
              <img :src="vtl.img">
            </div>
            <div class="VipList-Con-Text">
              <p class="VipText textOrange" v-text="vtl.title"></p>
              <p class="VipId"><span v-text="vtl.text"></span></p>
            </div>
          </div>
          <div class="productList SpecialNoCon" style="margin-top:0;" v-if="!VipTypeList.length>0">
              <img src="../../assets/images/icon/No-Order.png" class="noImg">
              <p style="margin-bottom: 0;">暂无特惠套餐</p>
          </div>
      </div>
    </div>
    <div class="pageView-Footer home-ElTabs">
      <div @click="changeTabs('Index')">
        <img src="../../assets/images/icon/home/home-icon-01.png" class="home-ElTabs-Icon">
        <p>推荐</p>
      </div>
      <div @click="changeTabs('StoreVue')">
        <img src="../../assets/images/icon/home/home-icon-02.png" class="home-ElTabs-Icon">
        <p>店铺</p>
      </div>
      <div @click="changeTabs('VipMember')">
        <img src="../../assets/images/icon/home/home-icon-03active.png" class="home-ElTabs-Icon">
        <P class="specialText">会员VIP</p>
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
</template>

<script>
import qs from "qs";
import { mapState, mapActions, mapMutations } from "vuex";
export default {
  name: "vip-member",
  data() {
    return {
      hintTitle: "站内通告：",
      hint: "本地 新品上市 请关注店铺",
      VipTypeList: [
        // {
        //   img: require("../../assets/images/icon/dredge/Package01.png"),
        //   title: "特惠一",
        //   text: "套餐描述套餐描述套餐描述"
        // },
        // {
        //   img: require("../../assets/images/icon/dredge/Package02.png"),
        //   title: "特惠二",
        //   text: "套餐描述套餐描述套餐描述"
        // }
      ]
    };
  },
  computed: {
    ...mapState({
      UserData: state => state.indexData.UserData
    })
  },
  mounted(){
    this.informText();
  },
  methods: {
    changeTabs(name) {
      this.$router.push({ name: name });
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
    toLogin() {
      this.$router.push({
        name: "Login",
        query: {
          newtype: "3"
        }
      });
    },
    lookPackage() {
      this.$router.push({
        name: "PackageDetail"
      });
    }
  }
};
</script>

<style scoped>
.userIcon {
  display: block;
  width: 22%;
  margin: 24px auto 10px auto;
}
.userName {
  color: white;
  margin-bottom: 16px;
}
.VipList-Con {
  background: white url("../../assets/images/icon/userCenter/arrow-right.png")
    96% center no-repeat;
  background-size: 10px auto !important;
}
</style>
