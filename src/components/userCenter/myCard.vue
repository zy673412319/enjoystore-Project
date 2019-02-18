<template>
  <div class="pageView" >
    <div class="myOrder-Head" @click="backHome()">
      卡包
    </div>
    <div class="myOrder-Body" style="overflow-y: auto;">
      <div class="cardList-Con" v-for="(cl,index) in cardList" :key="index">
        <div class="cardList-Con-Icon">
          <img :src="cl.img">
        </div>
        <div class="cardList-Con-Text">
          <p class="cardText" v-text="cl.text"></p>
          <p class="cardId"><span v-text="cl.cardId"></span></p>
        </div>
        <div class="cardList-Con-Time">
          <p>到期日：<span v-text="cl.time"></span></p>
        </div>
      </div>
      <div class="cardList-Con" @click="addCard()">
        <p class="cardListAdd"><span>十</span>添加银行卡</p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "my-card",
    data() {
      return {
        cardList: [
          {
            img: require("../../assets/images/icon/card-icon01.png"),
            text: '工商银行',
            cardId: '****   ****   ****   4567',
            time: '09/19'
          },
          {
            img: require("../../assets/images/icon/card-icon02.png"),
            text: '建设银行',
            cardId: '****   ****   ****   4567',
            time: '09/19'
          }
        ],
      }
    },
    methods: {
      // 返回到，导航 >>> 个人中心
      backHome() {
        this.$router.push({ name: "userCenter" });
      },
      addCard() {
        this.$router.push({
          name: "AddCard"
        });
      }
    }
  }
</script>

<style scoped>
  .myOrder-Head {
    background: white url("../../assets/images/icon/userCenter/arrow.png") 4% center no-repeat;
    background-size: 10px auto !important;
  }
</style>
