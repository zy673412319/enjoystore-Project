<template>
  <div class="pageView">
    <div class="pageView-Body">
      <div class="content-Div bgOrange" v-if="UserData">
        <div class="index-Div marginDiv">
          <div class="index-Div-Icon">
            <img :src="UserData.avatar" class="userIcon" v-if="UserData.avatar">
            <img src="../../assets/images/icon/login/logo.png" class="userIcon" v-if="!UserData.avatar">
          </div>
          <div class="index-Div-Text">
            <div class="indexName whiteText">
              <span v-text="UserData.phoneNumber"></span>
              <span class="smallText userText" v-text="user.type"></span>
            </div>
            <p class="smallText whiteText">
              <span v-text="UserData.updateDate"></span>会员过期</p>
          </div>
        </div>
        <div class="upgradeCon">
          <button>充值优惠套餐</button>
          <button>升级尊享会员</button>
        </div>
      </div>
      <div class="content-Div bgOrange text-center" v-if="!UserData">
        <button class="loginBtn" @click="toLogin('5')" style="margin: 34px auto;">登录</button>
      </div>
      <div class="userTwoCon">
        <div @click="detailCenter('Integral')">
          <p>积分</p>
          <p class="textOrange" v-text="UserData.Integral" v-if="UserData"></p>
          <p class="textOrange" v-if="!UserData">0</p>
        </div>
        <div>
          <p>余额</p>
          <p class="textOrange" v-text="UserData.balance" v-if="UserData"></p>
          <p class="textOrange" v-if="!UserData">0</p>
        </div>
      </div>
      <div class="user-order-Con">
        <div v-for="(ol,index) in oList" :key="index" @click="toDetail(index)">
          <p class="imgBg" v-bind:style="{ 'background-image': 'url(' + ol.img + ')'}">
            <span v-text="ol.num" class="olNum" v-show="(ol.num)"></span>
          </p>
          <p class="olText">
            <span v-text="ol.text"></span>
          </p>
        </div>
      </div>
      <div class="uesr-ListCon" v-for="(ul,index) in userList" :key="index" @click="detailCenter(ul.clickN)">
        <span v-text="ul.text"></span>
        <i class="fa fa-angle-right"></i>
      </div>
      <div class="uesr-ListCon" @click="loginOut()">
        <span>注销</span>
        <i class="fa fa-angle-right"></i>
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
        <img src="../../assets/images/icon/home/home-icon-03.png" class="home-ElTabs-Icon">
        <p>会员VIP</p>
      </div>
      <div @click="changeTabs('ShoppCartVue')">
        <img src="../../assets/images/icon/home/home-icon-04.png" class="home-ElTabs-Icon">
        <p>购物车</p>
      </div>
      <div @click="changeTabs('userCenter')">
        <img src="../../assets/images/icon/home/home-icon-05active.png" class="home-ElTabs-Icon">
        <P class="specialText">个人中心</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
export default {
  name: "user-center",
  data() {
    return {
      address: "软件园",
      user: {
        Name: "ying",
        Icon: require("../../assets/images/icon/userIcon.png"),
        type: "悦享会员",
        Integral: "300",
        balance: "188",
        time: "2018-10-11"
      },
      oList: [
        {
          img: require("../../assets/images/icon/userCenter/olist01.png"),
          num: "",
          text: "待付款"
        },
        {
          img: require("../../assets/images/icon/userCenter/olist02.png"),
          num: "20",
          text: "待发货"
        },
        {
          img: require("../../assets/images/icon/userCenter/olist03.png"),
          num: "6",
          text: "已发货"
        },
        {
          img: require("../../assets/images/icon/userCenter/olist04.png"),
          num: "10",
          text: "已完成"
        },
        {
          img: require("../../assets/images/icon/userCenter/olist05.png"),
          num: "",
          text: "全部订单"
        }
      ],
      userList: [
        { text: "我的卡包", clickN: "MyCard" },
        { text: "收获地址", clickN: "SelectAddress" },
        { text: "我的客服", clickN: "" }
      ]
    };
  },
  mounted: function() {
  },
  computed: {
    ...mapState({
      UserData: state => state.indexData.UserData
    })
  },
  methods: {
    changeTabs(name) {
      this.$router.push({ name: name });
    },
    toLogin() {
      this.$router.push({
        name: "Login",
        query: {
          newtype: "5"
        }
      });
    },
    toDetail(num) {
      var newNum = String(num);
      this.$router.push({
        name: "MyOrder",
        query: {
          type: newNum
        }
      });
    },
    detailCenter(path) {
      if (path) {
          this.$router.push({
            name: path
          });
        }
      // if(this.UserData){
      //   if (path) {
      //     this.$router.push({
      //       name: path
      //     });
      //   }
      // }else {
      //   return this.common.alert("请先去登录");
      // } 
    },
    loginOut() {
      PostbirdAlertBox.confirm({
        titleShow: "block",
        title: "提示",
        content: '<span style="color:#f0475b;">是否确认注销账户？</span>',
        footerCls: "postbird-box-footer",
        okBtnColor: "#f0475b",
        onConfirm: config => {
          this.$store.commit('deleteAll');
          this.$router.push({
            name: "Index"
          });
        },
        onCancel: function() {}
      });
    }
  }
};
</script>

<style>
</style>