<template>
  <div class="pageView">
    <div class="myOrder-Head" @click="backHome()">
      套餐详情
    </div>
    <div class="myOrder-Body">
      
    </div>
  </div>
</template>

<script>
  export default {
    name: "package-detail",
    methods:{
      // 返回到，导航 >>> 会员VIP  
      backHome(){
        this.$router.push({ name: "VipMember" });
      },
    }
  }
</script>

<style lang="scss" scoped>
  .myOrder-Head {
    background: white url("../assets/images/icon/userCenter/arrow.png") 4% center no-repeat;
    background-size: 10px auto !important;
  }
</style>
