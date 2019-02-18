<template>
  <div class="pageView">
    <div class="myOrder-Head" @click="backMyIntegral()">
      积分商城
    </div>
    <div class="myOrder-Body" style="overflow-y: auto;">
      <div class="intergralList-Div" v-for="(isl,index) in IntegralStoreList" :key="index" @click="lookDetail(isl.id)">
        <div class="intergralList-Div-Img">
          <img :src="isl.img">
        </div>
        <div class="intergralList-Center flexgrow">
          <p class="paddLeft" v-text="isl.name"></p>
          <p class="redText paddLeft" style="margin-top: 20px;"><span v-text="isl.num"></span>积分</p>
        </div>
        <div class="intergralList-Btn">
          <button class="conversion">去兑换</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "integral-list",
    data() {
      return {
        IntegralStoreList: [
          {img: require("../assets/images/icon/listImg.png"), name: '扫地机器人扫地机器人扫地机器人扫地机器人', num: '20',id:'1'},
          {img: require("../assets/images/icon/listImg2.png"), name: '扫地机器人', num: '20',id:'2'},
          {img: require("../assets/images/icon/listImg2.png"), name: '扫地机器人', num: '20',id:'3'},
          {img: require("../assets/images/icon/listImg.png"), name: '扫地机器人', num: '20',id:'4'},
          {img: require("../assets/images/icon/listImg2.png"), name: '扫地机器人', num: '20',id:'5'},
          {img: require("../assets/images/icon/listImg2.png"), name: '扫地机器人', num: '20',id:'6'},
          {img: require("../assets/images/icon/listImg.png"), name: '扫地机器人', num: '20',id:'7'}
        ]
      }
    },
    methods: {
      backMyIntegral() {
        this.$router.push({
          name: "Integral"
        });
      },
      lookDetail(id) {
        this.$router.push({
          name: "IntegralDetail",
          query: {
            id: id
          }
        });
      }
    }
  }
</script>

<style scoped>
  .myOrder-Head {
    background: white url("../assets/images/icon/userCenter/arrow.png") 4% center no-repeat;
    background-size: 10px auto !important;
  }
</style>
