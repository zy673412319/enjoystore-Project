<template>
  <div class="pageView">
    <div class="myOrder-Head" @click="backBuyPay()">
      配送地址
    </div>
    <div class="myOrder-Body" style="overflow-y: auto;">
      <p class="addText" @click="addAddressFun()">＋新增配送地址</p>
      <div class="shoppCart-address bgWhite border-bottom" v-for="(al,index) in addressList" :key="index" @click="changeSite(al)">
        <p class="SC-Name" v-text="al.name"></p>
        <div class="SC-Text">
          <p v-text="al.tel"></p>
          <p><span v-text="al.address"></span></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import qs from "qs";
import { mapState, mapActions, mapMutations } from "vuex";
export default {
  name: "select-address",
  data() {
    return {
      addressList: [
        // { name: "张三张三张三", tel: "158****3698", address: "陕西省西安市雁塔区大寨路陕西省西安市雁塔区大寨路陕西省西安市雁塔区大寨路" }
      ]
    };
  },
  mounted() {
    this.getList();
  },
  computed: {
    ...mapState({
      UserData: state => state.indexData.UserData
    })
  },
  methods: {
    backBuyPay() {
      history.back(-1);   // BuyPay 、 usercenter
    },
    addAddressFun() {
      this.$router.push({ name: "AddAddress" });
    },
    changeSite(data) {
      this.$router.push({
        name: "BuyPay",
        query: {
          newSite: data
        }
      });
    },
    getList() {
      this.$axioshttp
        .post(
          "/json/deliveryAddress/findDeliveryAddressList",
          qs.stringify({
            userId: this.UserData.id
          })
        )
        .then(response => {
          if(!response.data.success){
            return this.common.alert(response.data.message);
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>

<style scoped>
.myOrder-Head {
  background: white url("../../assets/images/icon/userCenter/arrow.png") 4% center no-repeat;
  background-size: 10px auto !important;
}
.addText {
  height: 44px;
  line-height: 44px;
  padding-left: 4%;
  background: white;
  border-bottom: 1px solid #f0f0f0;
}
</style>
