<template>
  <div class="pageView">
    <div class="myOrder-Head Div-Flex bgWhite">
      <input id="productSearch" autofocus="autofocus" class="inputC" placeholder="商品搜索" v-model="inputValue"/>
      <button class="searchBun" @click="getProduct()">搜索</button>
    </div>
    <div class="myOrder-Body" style="overflow-y: auto;">
      <div class="productList">
        <div class="index-Div productListCon" v-for="(pl,index) in productList" :key="index" @click="lookDetail(pl.id)">
          <div class="productList-Img">
            <img :src="pl.img">
          </div>
          <div class="productList-Text">
            <p class="listName" v-text="pl.name"></p>
            <p class="listText" v-text="pl.text"></p>
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
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState, mapActions, mapMutations } from "vuex";
  export default {
    name: "search-vue",
    data(){
      return{
        inputValue: '',
        productList: []
      }
    },
    computed: {
      ...mapState({
        SearchText: state => state.indexData.SearchData.SearchText
      })
    },
    mounted: function () {
      if(this.SearchText){
        this.inputValue = this.SearchText;
        this.getProduct();
      }
    },
    methods: {
      getProduct(){
        var em = this;
        if(!this.inputValue){
          return this.common.alert("请输入要搜索的关键字");
        }
        em.common.startLoading("搜索中...");
        var data = [
          { img: require("../assets/images/icon/listImg.png"), name: '<极速宅配>千年贡品黄岩蜜桔', text: '地理标识水果不一样的味道',
            rank2Price: "6.98", originalPrice: "12", id: "1", rank1Price: "5.6" },
          { img: require("../assets/images/icon/listImg2.png"), name: '<极速宅配>千年贡品黄岩蜜桔', text: '地理标识水果不一样的味道',
            rank2Price: "6.98", originalPrice: "12", id: "2", rank1Price: "5.6" },
          { img: require("../assets/images/icon/listImg2.png"), name: '<极速宅配>千年贡品黄岩蜜桔', text: '地理标识水果不一样的味道',
           rank2Price: "6.98", originalPrice: "12", id: "3", rank1Price: "5.6"},
          { img: require("../assets/images/icon/listImg.png"), name: '<极速宅配>千年贡品黄岩蜜桔', text: '地理标识水果不一样的味道',
            rank2Price: "6.98", originalPrice: "12", id: "4", rank1Price: "5.6"},
          { img: require("../assets/images/icon/listImg.png"), name: '<极速宅配>千年贡品黄岩蜜桔', text: '地理标识水果不一样的味道',
           rank2Price: "6.98", originalPrice: "12", id: "5", rank1Price: "5.6"},
          { img: require("../assets/images/icon/listImg2.png"), name: '<极速宅配>千年贡品黄岩蜜桔', text: '地理标识水果不一样的味道',
            rank2Price: "6.98", originalPrice: "12", id: "6", rank1Price: "5.6"},
          { img: require("../assets/images/icon/listImg2.png"), name: '<极速宅配>千年贡品黄岩蜜桔', text: '地理标识水果不一样的味道',
            rank2Price: "6.98", originalPrice: "12", id: "6", rank1Price: "5.6"},
          { img: require("../assets/images/icon/listImg.png"), name: '<极速宅配>千年贡品黄岩蜜桔', text: '地理标识水果不一样的味道',
            rank2Price: "6.98", originalPrice: "12", id: "7", rank1Price: "5.6"}
        ];
        setTimeout(function() {
          em.common.endLoading();
          em.productList = data;
          em.saveSearchTextFun(em.inputValue);
        }, 2000);
      },
      ...mapMutations({
        saveSearchTextFun: "updateSearchText"
      }),
      lookDetail(id) {
        this.$router.push({
          name: "SearchDetail",
          query: {
            id: id
          }
        });
      }
    }
  }
</script>

<style scoped>
  .inputC {
    width: 70%;
    margin-left: 5%;
    height: auto;
    padding: 7px 12px 6px 6px;
    border-radius: 8px;
    border: 1px solid #DBDBDB;
    outline: none;
    vertical-align: baseline;
  }
  .searchBun {
    padding: 6px;
    width: 17%;
    margin-right: 5%;
    border-radius: 8px;
    border: 1px solid #DBDBDB;
    outline: none;
  }
</style>
