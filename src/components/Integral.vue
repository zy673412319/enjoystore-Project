<template>
  <div class="pageView">
    <div class="myOrder-Head" @click="backHome()">
      我的积分
    </div>
    <div class="myOrder-Body">
      <div class="indexHead content-Div text-center">
        <p style="margin-top: 8px;">享立来可用积分</p>
        <p class="intergralNum" v-text="intergral"></p>
        <button class="loginBtn" style="margin: 10px auto;" @click="ToIntegralStore()">积分商城</button>
      </div>
      <div class="intergralList">
        <div class="intergralList-Div" v-for="(il,index) in intergralList" :key="index">
          <div class="intergralList-left">
            <p v-text="il.fun"></p>
            <p class="il-Special" v-text="il.time"></p>
          </div>
          <div class="intergralList-right">
            <p class="redText"><span class="smallText">十</span><span v-text="il.Num"></span></p>
            <p class="il-Special">有效期<span v-text="il.Dtime"></span></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "integral",
    data() {
      return {
        intergral: '360',
        intergralList: [
          {fun: '积分支付', time: '2018-09-13', Dtime: '2018-12-30', Num: '200'},
          {fun: '积分支付', time: '2018-09-13', Dtime: '2018-12-30', Num: '200'},
          {fun: '积分支付', time: '2018-09-13', Dtime: '2018-12-30', Num: '200'},
          {fun: '积分支付', time: '2018-09-13', Dtime: '2018-12-30', Num: '200'},
          {fun: '积分支付', time: '2018-09-13', Dtime: '2018-12-30', Num: '200'},
          {fun: '积分支付', time: '2018-09-13', Dtime: '2018-12-30', Num: '200'}
        ]
      }
    },
    methods: {
      // 返回到，导航 >>> 个人中心
      backHome(){
        this.$router.push({ name: "userCenter" });
      },
      ToIntegralStore(){
        this.$router.push({
          name: "IntegralStore"
        });
      }
    }
  }
</script>

<style scoped>
  .intergralNum {
    margin: 8px auto;
    font-size: 20px;
  }
  .myOrder-Head {
    background: white url("../assets/images/icon/userCenter/arrow.png") 4% center no-repeat;
    background-size: 10px auto !important;
  }
</style>
