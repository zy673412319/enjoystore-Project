<template>
  <div class="pageView">
    <div class="myOrder-Head" @click="backselAddress()">
      新增配送地址
    </div>
    <div class="myOrder-Body">
      <div class="AddCardCon border-bottom">
        <span class="login-title">收货人名：</span>
        <el-input placeholder="请输入收货人姓名" v-model="siteData.name" clearable class="addInput">
        </el-input>
      </div>
      <div class="AddCardCon border-bottom">
        <span class="login-title">联系电话：</span>
        <el-input placeholder="请输入联系电话" v-model="siteData.phone" clearable class="addInput">
        </el-input>
      </div>
      <div class="AddCardCon border-bottom">
        <span class="login-title">所在地址：</span>
        <p class="selText" :class="(siteData.city=='请选择所在地址')?'noSel':''" v-text="siteData.city" @click="toSelect()"></p>
      </div>
      <div class="AddCardCon border-bottom" style="align-items: self-start;">
        <span class="login-title">详细地址：</span>
        <el-input type="textarea" placeholder="请输入详细地址" v-model="siteData.address" clearable class="addInput">
        </el-input>
      </div>
      <button class="addCardBtn" @click="addSiteFun()">添加地址</button>
    </div>
    <div class="MtPickerBg" v-show="isChange">
      <div class="MtPicker-Con">
        <div class="MtPicker-Con-Head border-bottom">
          <p @click="toSelect()">取消</p>
          <p>选择城市</p>
          <p @click="toSelect()">确定</p>
        </div>
        <mt-picker :slots="myAddressSlots" @change="onMyAddressChange"></mt-picker>
      </div>
    </div>
  </div>
</template>

<script>
import { Picker } from "mint-ui";
import qs from "qs";
import { mapState, mapActions, mapMutations } from "vuex";
import myaddress from "../../common/address";
export default {
  name: "add-address",
  components: {
    "mt-picker": Picker
  },
  data() {
    return {
      isChange: false,
      siteData: {
        name: "",
        phone: "",
        city: "请选择所在地址",
        address: ""
      },
      myAddressSlots: [
        {
          flex: 1,
          defaultIndex: 1,
          values: Object.keys(myaddress), //省份数组
          className: "slot1",
          textAlign: "center"
        },
        {
          divider: true,
          content: "-",
          className: "slot2"
        },
        {
          flex: 1,
          values: [],
          className: "slot3",
          textAlign: "center"
        },
        {
          divider: true,
          content: "-",
          className: "slot4"
        },
        {
          flex: 1,
          values: [],
          className: "slot5",
          textAlign: "center"
        }
      ],
      myAddressProvince: "省",
      myAddressCity: "市",
      myAddresscounty: "区/县"
    };
  },
  mounted() {
    this.$nextTick(() => {
      // vue里面全部加载好了再执行的函数 （类似于setTimeout）
      this.myAddressSlots[0].defaultIndex = 26;
    });
  },
  computed: {
    ...mapState({
      UserData: state => state.indexData.UserData
    })
  },
  methods: {
    backselAddress() {
      history.back(-1);  //selectAddress
    },
    toSelect() {
      this.isChange = !this.isChange;
    },
    onMyAddressChange(picker, values) {
      if (myaddress[values[0]]) {
        // 这个判断类似于v-if的效果（可以不加，但是vue会报错，很不爽）
        picker.setSlotValues(1, Object.keys(myaddress[values[0]])); // Object.keys()会返回一个数组，当前省的数组
        picker.setSlotValues(2, myaddress[values[0]][values[1]]); // 区/县数据就是一个数组
        this.myAddressProvince = values[0];
        this.myAddressCity = values[1];
        this.myAddresscounty = values[2];
        this.siteData.city =
          this.myAddressProvince +
          " " +
          this.myAddressCity +
          " " +
          this.myAddresscounty;
      }
    },
    addSiteFun() {
      var em = this;
      var reg = /^([\u4e00-\u9fa5]){2,6}$/;
      if (!reg.test(this.siteData.name)) {
        return em.common.alert("您输入的姓名格式不正确");
      }
      var reg = /^1[3|4|5|7|8|6|9][0-9]{9}$/;
      if (!reg.test(this.siteData.phone)) {
        return em.common.alert("您输入的手机号码格式不正确");
      }
      if (!(this.siteData.address && this.siteData.city)) {
        return em.common.alert("请完善发货地址");
      }
      this.$axioshttp
        .post(
          "/json/deliveryAddress/addDeliveryAddress",
          qs.stringify({
            userId: this.UserData.id,
            phone: this.siteData.phone,
            address: this.siteData.city,
            name: this.siteData.name,
            area: this.siteData.address
          })
        )
        .then(response => {
          if (!response.data.success) {
            return this.common.alert(response.data.message);
          }
          this.$router.push({ name: "SelectAddress" });
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/css/mixinCss";
.myOrder-Head {
  background: white url("../../assets/images/icon/userCenter/arrow.png") 4% center
    no-repeat;
  background-size: 10px auto !important;
}
.selText {
  flex-grow: 1;
  padding-left: 14px;
  font-size: 15px;
}
.noSel {
  color: #cdcdcd;
}
.MtPickerBg {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.68);
  z-index: 100;
  .MtPicker-Con {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: auto;
    background: white;
    padding-bottom: 10px;
  }
  .MtPicker-Con-Head {
    width: 100%;
    margin: 0 auto;
    padding: 12px 6%;
    @include flexDiv;
    p {
      font-size: 15px;
      width: calc(100% / 3);
      color: #606060;
      &:nth-child(2) {
        text-align: center;
        color: #333333;
      }
      &:nth-child(3) {
        text-align: right;
        color: #ff971d;
      }
    }
  }
}
</style>