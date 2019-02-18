<template>
  <div class="pageView">
    <div class="pageView-Body">
      <div class="search-ConDiv">
        <div class="search-ConDiv-Left">
          <img src="../../assets/images/icon/home/state-black.png" class="stateICon">
          <span v-text="address"></span>
        </div>
        <label class="search-Con">
          <i class="fa fa-search"></i>
          <input placeholder="搜索" @click="toSearch()" />
        </label>
      </div>
      <!--  :stretch="true"   -->
      <el-tabs class="greenItem sleTypeList" v-model="activeType" @tab-click="handleClick">
        <el-tab-pane v-for="(cl,index) in classList" :key="index" :label="cl.name" :name="cl.id" @click="getDetailList(cl.id)">
          <div class="productList" style="margin-top: 0;">
            <div class="index-Div productListCon" v-for="(pl,index) in productList" :key="index" @click="lookDetail(pl.id)">
              <div class="productList-Img">
                <img :src="pl.images">
              </div>
              <div class="productList-Text">
                <p class="listName" v-text="pl.name"></p>
                <p class="listText" v-text="pl.description"></p>
                <div class="index-Div" style="width: 100%;padding: 4px 0;">
                  <p>尊享价:
                    <i class="fa fa-jpy redText"></i><span class="redText" v-text="pl.rank2Price"></span>
                  </p>
                  <p class="grayText">
                    <span class="underText"><i class="fa fa-jpy "></i><span class="" v-text="pl.originalPrice"></span></span>
                  </p>
                  <p>悦享价:
                    <i class="fa fa-jpy redText"></i><span class="redText" v-text="pl.rank1Price"></span>
                  </p>
                </div>
              </div>
            </div>
            <div class="productList SpecialNoCon" style="margin-top:0;background:#f2f2f2;" v-if="!productList.length>0">
              <img src="../../assets/images/icon/No-Order.png">
              <p style="margin-bottom: 0;">暂无产品</p>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="pageView-Footer home-ElTabs">
      <div @click="changeTabs('Index')">
        <img src="../../assets/images/icon/home/home-icon-01.png" class="home-ElTabs-Icon">
        <p>推荐</p>
      </div>
      <div @click="changeTabs('StoreVue')">
        <img src="../../assets/images/icon/home/home-icon-02active.png" class="home-ElTabs-Icon">
        <p class="specialText">店铺</p>
      </div>
      <div @click="changeTabs('VipMember')">
        <img src="../../assets/images/icon/home/home-icon-03.png" class="home-ElTabs-Icon">
        <P>会员VIP</p>
      </div>
      <div @click="changeTabs('ShoppCartVue')">
        <img src="../../assets/images/icon/home/home-icon-04.png" class="home-ElTabs-Icon">
        <p>购物车</p>
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
export default {
  name: "shop",
  data() {
    return {
      address: "软件园软件园",
      activeType: "",
      classList: [],
      productList: []
    };
  },
  mounted() {
    this.getList();
    this.getDetailList(this.activeType);
  },
  methods: {
    toSearch() {
      this.$router.push({ path: "/SearchVue" });
    },
    changeTabs(name) {
      this.$router.push({ name: name });
    },
    getList() {
      this.$axioshttp
        .post("/json/commodity/getCommodityTypeList")
        .then(response => {
          this.classList = response.data.data;
          if (this.$route.query.storeId) {
            this.activeType = this.$route.query.storeId;
            this.getDetailList(this.activeType);
          } else {
            this.activeType = this.classList[0].id;
            this.getDetailList(this.activeType);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    getDetailList(id) {
      this.$axioshttp
        .post(
          "/json/commodity/getCommodityList",
          qs.stringify({
            commodityTypeId: id
          })
        )
        .then(response => {
          // name：商品名   originalPrice：商品原价   salesPrice：商品销售价   costPrice：商品成本价   stock：商品库存
          // description：商品描述
          // discount：商品折扣      commodityStatus：商品状态(1)      salesVolume：销量      pointsRedemption：基础积分
          // rank1Price：悦享价   rank2Price：尊享价    recommend：不推荐(1)   id
          // "commodityType": {
          //     "name": "电器",    类别
          //     "commodityList": [ ],
          //     "id": "957efff71f2f473aad3107cad1e9f531"
          // },
          if (!response.data.success) {
            // this.common.alert(response.data.message);
          }
          this.productList = response.data.data;
          for (var i = 0; i < this.productList.length; i++) {
            if (this.productList[i].images) {
              this.productList[i].images =
                "http://www.xianglilai.vip/" + this.productList[i].images;
            }
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    handleClick(tab, event, index) {
      var newid = this.classList[tab.index].id;
      this.getDetailList(newid);
    },
    lookDetail(id) {
      this.$router.push({
        name: "StorePD",
        query: {
          id: id,
          storeId: this.activeType
        }
      });
    }
  }
};
</script>

<style scoped>
</style>
