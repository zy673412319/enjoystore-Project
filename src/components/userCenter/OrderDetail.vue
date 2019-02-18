<template>
  <div class="pageView">
    <div class="myOrder-Head" @click="backOrderList()">
      订单详情
    </div>
    <div class="myOrder-Body bgWhite" style="overflow-y: auto;">
      <div class="content-Div Div-Flex border-bottom">
        <p>商家：</p>
        <p>就这样的</p>
      </div>
      <div class="content-Div Div-Flex border-bottom">
        <p>商品：</p>
        <p>的长度今年多大</p>
      </div>
      <div class="content-Div Div-Flex border-bottom">
        <p>订单号：</p>
        <p>123698455666</p>
      </div>
      <div class="content-Div Div-Flex border-bottom">
        <p>下单时间：</p>
        <p>2018-10-25</p>
      </div>
      <div class="content-Div Div-Flex border-bottom">
        <p>订单状态：</p>
        <p>已完成</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "order-detail",
  data() {
    return {
      backData: this.$route.query.backs ? this.$route.query.backs : "0"
    };
  },
  methods: {
    backOrderList() {
      this.$router.push({
        name: "MyOrder",
        query: {
          type: this.backData
        }
      });
    }
  }
};
</script>

<style scoped>
.myOrder-Head {
  background: white url("../../assets/images/icon/userCenter/arrow.png") 4% center
    no-repeat;
  background-size: 10px auto !important;
}
</style>