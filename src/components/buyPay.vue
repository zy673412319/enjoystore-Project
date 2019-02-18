<template>
  <div class="pageView">
    <div class="myOrder-Head" @click="backShoppCart()">
      立即支付
    </div>
    <div class="myOrder-Body ">
      <div class="pageView-Body">
        <div class="shoppCart-address bgWhite" @click="changeAddress()">
          <p class="SC-Name" v-text="user.name"></p>
          <div class="SC-Text">
            <p v-text="user.tel"></p>
            <p><span v-text="user.address"></span></p>
          </div>
        </div>
        <div class="cartList-check" style="margin-top: 10px;">
          <div class="cartList-checkCon productList" v-for="(scl,index) in payList" :key="index">
            <div class="index-Div productListCon" style="width: 98%;">
              <div class="productList-Img">
                <img :src="scl.commodity.images">
              </div>
              <div class="productList-Text">
                <p class="listName" v-text="scl.commodity.name"></p>
                <p class="listText" v-text="scl.commodity.description"></p>
                <div class="index-Div" style="width: 100%;">
                  <p class="redText"><i class="fa fa-jpy"></i><span v-text="scl.commodity.salesPrice"></span></p>
                  <p><i class="fa fa-times myNUm"></i><span v-text="scl.commodityNumber"></span></p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="content-Div buyPayCon bgWhite border-bottom">
          <p>配送方式</p>
          <p><span v-text="dispatch"></span><i class="fa fa-angle-right changeText"></i></p>
        </div>
        <div class="content-Div buyPayCon bgWhite border-bottom">
          <p>积分</p>
          <p><span v-text="dispatchNum"></span></p>
        </div>
        <div class="content-Div buyPayCon bgWhite border-bottom">
          <p>留言</p>
          <textarea placeholder="选填：给商家留言" rows="3" class="Message" @focus="focusFun()" @blur="blurFun()"></textarea>
        </div>
      </div>
      <div class="pageView-Footer" style="position: fixed;">
        <div class="product-footer">
          <div class="product-footer-left">
          </div>
          <div class="product-footer-center">
            合计：<i class="fa fa-jpy"></i><span v-text="allNum"></span>
          </div>
          <div class="product-footer-right" @click="BuyPayFun()">
            立即购买
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState} from "vuex";
  export default {
    name: "buy-pay",
    data() {
      return {
        user: {
          name: '张三',
          tel: '158****3698',
          address: '陕西省西安市雁塔区大寨路陕西省西安市雁塔区大寨路陕西省西安市雁塔区大寨路'
        },
        dispatch: '快递 免费',
        dispatchNum: '20'
      }
    },
    computed: {
      ...mapState({
        payList: state => state.indexData.PayData.payList,
        allNum: state => state.indexData.PayData.payAllNum
      })
    },
    mounted(){
      if(this.$route.query.newSite){
        this.user = this.$route.query.newSite;
      }
    },
    methods: {
      // 返回到，导航 >>> 购物车
      backShoppCart() {
        this.$router.push({ name: "ShoppCartVue" });
      },
      focusFun(){
        $('.pageView').css('height','auto');
      },
      blurFun(){
        $('.pageView').css('height','100%');
      },
      changeAddress(){
        this.$router.push({name: "SelectAddress"});
      },
      checkMornal(){
        // deliveryAddress/tacitlyDeliveryAddress
        // userId
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../assets/css/mixinCss.scss";
  .myOrder-Head {
    background: white url("../assets/images/icon/userCenter/arrow.png") 4% center no-repeat;
    background-size: 10px auto !important;
  }
  .myNUm{
    -webkit-text-stroke: 1px white; color: #333333;
  }
  .buyPayCon{
    @include flexDiv;
    align-items: self-start;
    .Message{
      flex-grow: 1;
      @include focusClear;
      padding: 0 0 0 14px;
      margin: 0;
      line-height: 1;
      font-size: 14px;
    }
  }
  .changeText{
    color: #939393;
    margin-left: 4px;
  }
</style>
