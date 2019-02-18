<template>
  <div class="pageView">
    <div class="myOrder-Head" @click="backHome()">
      我的订单
    </div>
    <div class="myOrder-Body">
      <!-- 待付款:0   待发货:1  已发货:2  已完成:3  全部订单:4   -->
      <el-tabs class="orangeItem sleTypeList" v-model="activeType" :stretch="true">
        <el-tab-pane label="全部" name="4">
          <div class="productList" style="margin-top:0;background:#f2f2f2;" v-if="AllList.length>0">
            <div v-for="(al,index) in AllList" :key="index" class="marTop" @click="lookOrderDetail('4')">
              <div class="productList-title">
                <p class="product-Name" v-text="al.typeName"></p>
                <p class="product-type"><span class="smallText" v-text="al.time"></span><span class="sp-type" v-text="al.type"></span></p>
              </div>
              <div class="index-Div productListCon" style="padding:6px 4%;">
                <div class="orderList-Img">
                  <img :src="al.img">
                </div>
                <div class="orderList-Text">
                  <p class="listName" v-text="al.name"></p>
                  <p class="listText" v-text="al.text"></p>
                </div>
              </div>
              <div class="orderButtom">
                <button>催单提醒</button>
              </div>
            </div>
          </div>
          <div class="productList SpecialNoCon" style="margin-top:0;background:#f2f2f2;" v-if="!AllList.length>0">
            <img src="../../assets/images/icon/No-Order.png">
            <p>您还没有订单</p>
            <p><span>快去看看有什么要买的吧</span></p>
          </div>
        </el-tab-pane>
        <!--*****************************************************************************************************************-->
        <el-tab-pane label="待付款" name="0">
          <div class="productList" style="margin-top:0;background:#f2f2f2;" v-if="obligationList.length>0">
            <div v-for="(ol,index) in obligationList" :key="index" class="marTop" @click="lookOrderDetail('0')">
              <div class="productList-title">
                <p class="product-Name" v-text="ol.typeName"></p>
                <p class="product-type"><span class="smallText" v-text="ol.time"></span><span class="sp-type" v-text="ol.type"></span></p>
              </div>
              <div class="index-Div productListCon" style="padding:6px 4%;">
                <div class="orderList-Img">
                  <img :src="ol.img">
                </div>
                <div class="orderList-Text">
                  <p class="listName" v-text="ol.name"></p>
                  <p class="listText" v-text="ol.text"></p>
                </div>
              </div>
              <div class="orderButtom">
                <button>催单提醒</button>
              </div>
            </div>
          </div>
          <div class="productList SpecialNoCon" style="margin-top:0;background:#f2f2f2;" v-if="!obligationList.length>0">
            <img src="../../assets/images/icon/No-Order.png">
            <p>您还没有订单</p>
            <p><span>快去看看有什么要买的吧</span></p>
          </div>
        </el-tab-pane>
        <!--*****************************************************************************************************************-->
        <el-tab-pane label="待发货" name="1">
          <div class="productList" style="margin-top:0;background:#f2f2f2;" v-if="WaitSendList.length>0">
            <div v-for="(wsl,index) in WaitSendList" :key="index" class="marTop" @click="lookOrderDetail('1')">
              <div class="productList-title">
                <p class="product-Name" v-text="wsl.typeName"></p>
                <p class="product-type"><span class="smallText" v-text="wsl.time"></span><span class="sp-type" v-text="wsl.type"></span></p>
              </div>
              <div class="index-Div productListCon" style="padding:6px 4%;">
                <div class="orderList-Img">
                  <img :src="wsl.img">
                </div>
                <div class="orderList-Text">
                  <p class="listName" v-text="wsl.name"></p>
                  <p class="listText" v-text="wsl.text"></p>
                </div>
              </div>
              <div class="orderButtom">
                <button>催单提醒</button>
              </div>
            </div>
          </div>
          <div class="productList SpecialNoCon" style="margin-top:0;background:#f2f2f2;" v-if="!WaitSendList.length>0">
            <img src="../../assets/images/icon/No-Order.png">
            <p>您还没有订单</p>
            <p><span>快去看看有什么要买的吧</span></p>
          </div>
        </el-tab-pane>
        <!--********************************************************* *********************************************************-->
        <el-tab-pane label="已发货" name="2">
          <div class="productList" style="margin-top:0;background:#f2f2f2;" v-if="ReapList.length>0">
            <div v-for="(pl,index) in ReapList" :key="index" class="marTop" @click="lookOrderDetail('2')">
              <div class="productList-title">
                <p class="product-Name" v-text="pl.typeName"></p>
                <p class="product-type"><span class="smallText" v-text="pl.time"></span><span class="sp-type" v-text="pl.type"></span></p>
              </div>
              <div class="index-Div productListCon" style="padding:6px 4%;">
                <div class="orderList-Img">
                  <img :src="pl.img">
                </div>
                <div class="orderList-Text">
                  <p class="listName" v-text="pl.name"></p>
                  <p class="listText" v-text="pl.text"></p>
                </div>
              </div>
              <div class="orderButtom">
                <button>催单提醒</button>
              </div>
            </div>
          </div>
          <div class="productList SpecialNoCon" style="margin-top:0;background:#f2f2f2;" v-if="!ReapList.length>0">
            <img src="../../assets/images/icon/No-Order.png">
            <p>您还没有订单</p>
            <p><span>快去看看有什么要买的吧</span></p>
          </div>
        </el-tab-pane>
        <!--*****************************************************************************************************************-->
        <el-tab-pane label="已完成" name="3">
          <div class="productList" style="margin-top:0;background:#f2f2f2;" v-if="achieveList.length>0">
            <div v-for="(ywl,index) in achieveList" :key="index" class="marTop" @click="lookOrderDetail('3')">
              <div class="productList-title">
                <p class="product-Name" v-text="ywl.typeName"></p>
                <p class="product-type"><span class="smallText" v-text="ywl.time"></span><span class="sp-type" v-text="ywl.type"></span></p>
              </div>
              <div class="index-Div productListCon" style="padding:6px 4%;">
                <div class="orderList-Img">
                  <img :src="ywl.img">
                </div>
                <div class="orderList-Text">
                  <p class="listName" v-text="ywl.name"></p>
                  <p class="listText" v-text="ywl.text"></p>
                </div>
              </div>
              <div class="orderButtom">
                <button>催单提醒</button>
              </div>
            </div>
          </div>
          <div class="productList SpecialNoCon" style="margin-top:0;background:#f2f2f2;" v-if="!achieveList.length>0">
            <img src="../../assets/images/icon/No-Order.png">
            <p>您还没有订单</p>
            <p><span>快去看看有什么要买的吧</span></p>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
  export default {
    name: "my-order",
    data() {
      return {
        activeType: this.$route.query.type ? this.$route.query.type : '0',
        AllList: [
          {
            img: require("../../assets/images/icon/listImg.png"), name: '<极速宅配>千年贡品黄岩蜜桔',
            text: '地理标识水果不一样的味道', typeName: '享立来', num: '6.98', time: '2018-10-11 11:30', type: '全部' },
          {
            img: require("../../assets/images/icon/detail-02.png"), name: '<极速宅配>千年贡品黄岩蜜桔',
            text: '地理标识水果不一样的味道', typeName: '享立来', num: '6.98', time: '2018-10-11 11:30', type: '全部' },
          {
            img: require("../../assets/images/icon/listImg2.png"), name: '<极速宅配>千年贡品黄岩蜜桔',
            text: '地理标识水果不一样的味道', typeName: '享立来', num: '6.98', time: '2018-10-11 11:30', type: '全部' },
          {
            img: require("../../assets/images/icon/listImg2.png"), name: '<极速宅配>千年贡品黄岩蜜桔',
            text: '地理标识水果不一样的味道', typeName: '享立来', num: '6.98', time: '2018-10-11 11:30', type: '全部' },
          {
            img: require("../../assets/images/icon/detail-02.png"), name: '<极速宅配>千年贡品黄岩蜜桔',
            text: '地理标识水果不一样的味道', typeName: '享立来', num: '6.98', time: '2018-10-11 11:30', type: '全部' },
          {
            img: require("../../assets/images/icon/listImg.png"), name: '<极速宅配>千年贡品黄岩蜜桔',
            text: '地理标识水果不一样的味道', typeName: '享立来', num: '6.98', time: '2018-10-11 11:30', type: '全部' }
        ],
        AllList:[],
        obligationList: [
          {
            img: require("../../assets/images/icon/listImg.png"), name: '<极速宅配>千年贡品黄岩蜜桔',
            text: '地理标识水果不一样的味道', typeName: '享立来', num: '6.98', time: '2018-10-11 11:30', type: '待付款' },
          {
            img: require("../../assets/images/icon/detail-02.png"), name: '<极速宅配>千年贡品黄岩蜜桔',
            text: '地理标识水果不一样的味道', typeName: '享立来', num: '6.98', time: '2018-10-11 11:30', type: '待付款' },
          {
            img: require("../../assets/images/icon/listImg2.png"), name: '<极速宅配>千年贡品黄岩蜜桔',
            text: '地理标识水果不一样的味道', typeName: '享立来', num: '6.98', time: '2018-10-11 11:30', type: '待付款' },
          {
            img: require("../../assets/images/icon/listImg2.png"), name: '<极速宅配>千年贡品黄岩蜜桔',
            text: '地理标识水果不一样的味道', typeName: '享立来', num: '6.98', time: '2018-10-11 11:30', type: '待付款' },
          {
            img: require("../../assets/images/icon/detail-02.png"), name: '<极速宅配>千年贡品黄岩蜜桔',
            text: '地理标识水果不一样的味道', typeName: '享立来', num: '6.98', time: '2018-10-11 11:30', type: '待付款' },
          {
            img: require("../../assets/images/icon/listImg.png"), name: '<极速宅配>千年贡品黄岩蜜桔',
            text: '地理标识水果不一样的味道', typeName: '享立来', num: '6.98', time: '2018-10-11 11:30', type: '待付款' }
        ],
        // obligationList: [],
        WaitSendList: [
          {
            img: require("../../assets/images/icon/listImg.png"), name: '<极速宅配>千年贡品黄岩蜜桔',
            text: '地理标识水果不一样的味道', typeName: '享立来', num: '6.98', time: '2018-10-11 11:30', type: '待发货' },
          {
            img: require("../../assets/images/icon/detail-02.png"), name: '<极速宅配>千年贡品黄岩蜜桔',
            text: '地理标识水果不一样的味道', typeName: '享立来', num: '6.98', time: '2018-10-11 11:30', type: '待发货' },
          {
            img: require("../../assets/images/icon/listImg2.png"), name: '<极速宅配>千年贡品黄岩蜜桔',
            text: '地理标识水果不一样的味道', typeName: '享立来', num: '6.98', time: '2018-10-11 11:30', type: '待发货' }
        ],
        WaitSendList: [],
        ReapList: [
          {
            img: require("../../assets/images/icon/listImg.png"), name: '<极速宅配>千年贡品黄岩蜜桔',
            text: '地理标识水果不一样的味道', typeName: '享立来', num: '6.98', time: '2018-10-11 11:30', type: '待发货' },
          {
            img: require("../../assets/images/icon/detail-02.png"), name: '<极速宅配>千年贡品黄岩蜜桔',
            text: '地理标识水果不一样的味道', typeName: '享立来', num: '6.98', time: '2018-10-11 11:30', type: '待发货' },
          {
            img: require("../../assets/images/icon/listImg.png"), name: '<极速宅配>千年贡品黄岩蜜桔',
            text: '地理标识水果不一样的味道', typeName: '享立来', num: '6.98', time: '2018-10-11 11:30', type: '待发货' }
        ],
        // ReapList:[],
        achieveList: [
          {
            img: require("../../assets/images/icon/listImg.png"), name: '<极速宅配>千年贡品黄岩蜜桔',
            text: '地理标识水果不一样的味道', typeName: '享立来', num: '6.98', time: '2018-10-11 11:30', type: '已完成' },
          {
            img: require("../../assets/images/icon/detail-02.png"), name: '<极速宅配>千年贡品黄岩蜜桔',
            text: '地理标识水果不一样的味道', typeName: '享立来', num: '6.98', time: '2018-10-11 11:30', type: '已完成' },
          {
            img: require("../../assets/images/icon/listImg2.png"), name: '<极速宅配>千年贡品黄岩蜜桔',
            text: '地理标识水果不一样的味道', typeName: '享立来', num: '6.98', time: '2018-10-11 11:30', type: '已完成' }
        ],
        achieveList: []
      }
    },
    mounted: function () {
    },
    methods: {
      // 返回到，导航 >>> 个人中心
      backHome(){
        this.$router.push({ name: "userCenter" });
      },
      lookOrderDetail(num){
        this.$router.push({
          name: "OrderDetail",
          query: {
            backs: num
          }
        });
      }
    }
  }
</script>

<style scoped>
  .myOrder-Head{
    background: white url("../../assets/images/icon/userCenter/arrow.png") 4% center no-repeat;
    background-size: 10px auto !important;
  }
</style>
