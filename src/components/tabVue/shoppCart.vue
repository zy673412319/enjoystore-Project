<template>
  <div class="pageView">
    <div class="pageView-Body">
      <div class="pageView">
        <div class="pageView-Body">
          <div class="productList">
            <el-table :data="shoppCartList" :highlight-current-row="false" style="width: 100%;" v-show="shoppCartList.length">
              <el-table-column label="" width="40">
                <template slot-scope="scope">
                  <el-checkbox v-model="scope.row.checked"></el-checkbox>
                </template>
              </el-table-column>
              <el-table-column label="">
                <template slot-scope="scope">
                  <div class="index-Div productListCon" style="padding: 4px 0;border-top:none;">
                    <div class="productList-Img">
                      <img :src="scope.row.commodity.images">
                    </div>
                    <div class="productList-Text">
                      <p class="listName" v-text="scope.row.commodity.name"></p>
                      <p class="listText" v-text="scope.row.commodity.description"></p>
                      <div class="index-Div" style="width: 100%;">
                        <p class="redText">
                          <i class="fa fa-jpy"></i>
                          <span v-text="scope.row.commodity.salesPrice"></span>
                        </p>
                        <div class="addNumCon">
                          <p @click="changeNum(1,scope.row,scope.$index)">一</p>
                          <span v-text="scope.row.commodityNumber"></span>
                          <p @click="changeNum(2,scope.row,scope.$index)">十</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
        <div class="pageView-Footer">
          <div class="product-footer">
            <div class="product-footer-left">
              <p class="cartimgBg Div-Flex allchooseCon">
                <input type="checkbox" id="allchoose" class="circleCheck" v-model="allSel" @click="AllSelFun()">
                <label for="allchoose"></label>全选
              </p>
            </div>
            <div class="product-footer-center">
              合计:
              <i class="fa fa-jpy"></i>
              <span v-text="allNum"></span>
            </div>
            <div class="product-footer-right" @click="BuyPayFun()">
              立即购买
            </div>
          </div>
        </div>
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
        <P>会员VIP</p>
      </div>
      <div @click="changeTabs('ShoppCartVue')">
        <img src="../../assets/images/icon/home/home-icon-04active.png" class="home-ElTabs-Icon">
        <p class="specialText">购物车</p>
      </div>
      <div @click="changeTabs('userCenter')">
        <img src="../../assets/images/icon/home/home-icon-05.png" class="home-ElTabs-Icon">
        <p>个人中心</p>
      </div>
    </div>
  </div>
</template>

<script>
import qs from "qs";
import { mapState, mapActions, mapMutations } from "vuex";
import ElTabPane from "element-ui/packages/tabs/src/tab-pane";
export default {
  components: { ElTabPane },
  name: "shopp-cart",
  data() {
    return {
      allSel: false,
      // allNum: '0',
      //  {
      //     "cartId": "34d0d978c1754115b421a18cc5245469",           购物车ID(每个用户对于一个)
      //     "specificationId": "3a43dd4aa875403cb6b4f6eceec3bb29",  规格ID
      //     "commodityNumber": 1,                                   数量
      //     "appendTime": 1540275799000,                            下单时间
      //     "commodity": {
      //       "commodityImageList": [],                             商品图片列表
      //       "commoditySpecificationList": [],                     商品规格列表
      //       "id": "19d9db14626a4c379a6152e3dbf73bb9"
      //     },
      //     "id": "dc054c4dd6f341e1ba902efe75155c65"                该商品ID
      //   },
      shoppCartList: [
        {
          img: require("../../assets/images/icon/listImg.png"),
          name: "sss<极速宅配>千年贡品黄岩蜜桔",
          text: "地理标识水果不一样的味道",
          price: "6.98",
          commodityNumber: "1",
          checked: false,
          id: "1"
        }
      ],
      checkedCities: [],
      istrue: false
    };
  },
  watch: {},
  computed: {
    allNum: function() {
      var a = 0;
      for (let i = 0; i < this.shoppCartList.length; i++) {
        if (this.shoppCartList[i].checked == true) {
          a +=
            this.shoppCartList[i].commodity.salesPrice *
            this.shoppCartList[i].commodityNumber;
        }
      }
      this.count = a;
      return this.count.toFixed(2);
    },
    ...mapState({
      UserData: state => state.indexData.UserData
    })
  },
  mounted: function() {
    this.getCart();
  },
  methods: {
    changeTabs(name) {
      this.$router.push({ name: name });
    },
    //   {   "cartId": "34d0d978c1754115b421a18cc5245469",
    //       "specificationId": "3a43dd4aa875403cb6b4f6eceec3bb29",
    //       "commodityNumber": 1,
    //       "appendTime": 1540233524000,
    // -     "commodity": {
    //           "name": "小刀",
    //           -"commodityType": {
    //                 "name": "电器",     "commodityList": [ ],       "id": "957efff71f2f473aad3107cad1e9f531"
    //           },
    //           "originalPrice": 299,          "salesPrice": 288,    "costPrice": 106,        "stock": 7,
    //           "description": "防守对方的",    "discount": 1,        "commodityStatus": 1,    "salesVolume": 357,
    //           "pointsRedemption": 21,        "rank1Price": 25,     "rank2Price": 15,        "recommend": "1",
    //           "images": "/xianglilai/userfiles/1/files/bizz.commodity/commodity/2018/11/01(1).jpg",
    //           -"commodityImageList": [
    //                 -{
    //                 "commodityId": "19d9db14626a4c379a6152e3dbf73bb9",
    //                 "image": "/userfiles/1/files/biz.commodity/commodity/2018/10/TIM%E5%9B%BE%E7%89%8720181002143713.jpg",
    //                 "remarks": "",  http://git.epaynfc.com/winnerServer/upcm/lxk.git
    //                 "id": "7d1e5456bfcf41629d0486963937e350"
    //                 }   git@git.epaynfc.com:lxk:lxk/xk/lxkoverseas.git
    //           -"commoditySpecificationList": [
    //                 -{
    //                 "commodityId": "19d9db14626a4c379a6152e3dbf73bb9",
    //                 "name": "不锈钢",      "image": "",     "price": 30,      "weight": "500G",      "introduce": "niubi",
    //                 "remarks": "",         "id": "3a43dd4aa875403cb6b4f6eceec3bb29"
    //                 }
    //           ],
    //           "remarks": "",
    //           "id": "19d9db14626a4c379a6152e3dbf73bb9"
    //       },
    //       "id": "adjio12j341iohn1i23huj"
    //   },
    getCart() {
      this.$axioshttp
        .post(
          "/json/commodityCart/commodityList",
          qs.stringify({
            // commodityCartId: this.UserData.id
            commodityCartId: "34d0d978c1754115b421a18cc5245469"
          })
        )
        .then(response => {
          console.log(response.data);
          if (response.data.success) {
            this.shoppCartList = response.data.data;
            for (var i = 0; i < this.shoppCartList.length; i++) {
              // this.shoppCartList[i].checked = false;
              if (this.shoppCartList[i].commodity.images) {
                this.shoppCartList[i].commodity.images =
                  "http://www.xianglilai.vip/" +
                  this.shoppCartList[i].commodity.images;
              }
            }
          } else {
            this.common.alert(response.data.message);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    changeNum(id, data, num) {
      // console.log(this.shoppCartList[num].cartId);
      this.$axioshttp
        .post(
          "/json/commodityCart/updateCommodityNumber",
          qs.stringify({
            cartCommodityId: this.shoppCartList[num].id,
            commodityNumber: this.shoppCartList[num].commodityNumber
          })
        )
        .then(response => {
          if (!response.data.success) {
            return this.common.alert(response.data.message);
          } else {
            if (id == "1") {
              if (data.commodityNumber != "1") {
                this.shoppCartList[num].commodityNumber--;
              }
            } else {
              this.shoppCartList[num].commodityNumber++;
            }
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    AllSelFun() {
      if (!this.allSel) {
        for (var i = 0; i < this.shoppCartList.length; i++) {
          this.shoppCartList[i].checked = true;
        }
      } else {
        for (var i = 0; i < this.shoppCartList.length; i++) {
          this.shoppCartList[i].checked = false;
        }
      }
    },
    BuyPayFun() {
      var em = this;
      if (this.allNum == "0") {
        return em.common.alert("请选择要购买的产品");
      }
      var newData = [];
      for (var i = 0; i < this.shoppCartList.length; i++) {
        if (this.shoppCartList[i].checked == true) {
          newData.push(this.shoppCartList[i]);
        }
      }
      this.savePayListFun(newData);
      this.savePayNumFun(this.allNum);
      this.$router.push({
        name: "BuyPay"
      });
    },
    ...mapMutations({
      savePayListFun: "updatePayList",
      savePayNumFun: "updatePayNum"
    })
  }
};
</script>

<style scoped>
.myOrder-Head {
  background: white url("../../assets/images/icon/userCenter/arrow.png") 5%
    center no-repeat;
  background-size: 10px auto !important;
}

.shoppCart-address {
  background: white url("../../assets/images/icon/userCenter/arrow-right.png")
    96% center no-repeat;
  background-size: 10px auto !important;
}
</style>
