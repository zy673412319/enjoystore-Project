<template>
  <div class="pageView">
    <div class="myOrder-Head" @click="backCardList()">
      绑定卡片
    </div>
    <div class="myOrder-Body">
      <div class="AddCardCon">
        <span class="login-title">银行卡号</span>
        <el-input placeholder="请输入内容" v-model="cardId" clearable class="addInput">
        </el-input>
      </div>
      <button class="addCardBtn" @click="loginFun()">登录</button>
    </div>
  </div>
</template>

<script>
  export default {
    name: "add-card",
    data() {
      return {
        cardId: ''
      }
    },
    methods: {
      // 返回到，卡列表
      backCardList() {
        this.$router.push({
          name: "MyCard"
        });
      },
    }
  }
</script>

<style scoped>
  .myOrder-Head {
    background: white url("../../assets/images/icon/userCenter/arrow.png") 4% center no-repeat;
    background-size: 10px auto !important;
  }
</style>
