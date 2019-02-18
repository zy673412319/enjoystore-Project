import Vue from 'vue'
import Router from 'vue-router'

// 首页底部导航
import Index from '@/components/tabVue/recommend'
import StoreVue from '@/components/tabVue/store'
import ShoppCartVue from '@/components/tabVue/shoppCart'
import VipMember from '@/components/tabVue/VipMember'
import userCenter from '@/components/tabVue/userCenter'
// 产品详情
import indexPD from '@/components/productDetail/IndexproductDetail'
import StorePD from '@/components/productDetail/StoreproductDetail'
// 登录+ 注册+ 忘记密码+ 密码登录
import Login from '@/components/loginCon/login'
import PwLogin from '@/components/loginCon/PwLogin'
import register from '@/components/loginCon/register'
import ForgetPw from '@/components/loginCon/ForgetPw'
// 个人中心 
import MyOrder from '@/components/userCenter/myOrder'
import MyCard from '@/components/userCenter/myCard'
import AddCard from '@/components/userCenter/addCard'
import SelectAddress from '@/components/userCenter/selectAddress'
import AddAddress from '@/components/userCenter/addAddress'
import OrderDetail from '@/components/userCenter/OrderDetail'
// 其他
import Integral from '@/components/Integral'
import IntegralStore from '@/components/IntegralStore'
import IntegralDetail from '@/components/IntegralDetail'
import BuyPay from '@/components/buyPay'
import SearchVue from '@/components/searchVue'
import SearchDetail from '@/components/SearchDetail'
import PackageDetail from '@/components/packageDetail'
import Protocol from '@/components/protocol'
import payPw from '@/components/payPw'
Vue.use(Router)

export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    }, {
      path: '/Login',
      name: 'Login',
      component: Login,
      meta: {
        title: '登录'
      }
    }, {
      path: '/PwLogin',
      name: 'PwLogin',
      component: PwLogin,
      meta: {
        title: '密码登录'
      }
    }, {
      path: '/register',
      name: 'register',
      component: register,
      meta: {
        title: '注册'
      }
    }, {
      path: '/ForgetPw',
      name: 'ForgetPw',
      component: ForgetPw,
      meta: {
        title: '忘记密码'
      }
    }, {
      path: '/StoreVue',
      name: 'StoreVue',
      component: StoreVue,
      meta: {
        title: '店铺'
      }
    }, {
      path: '/indexPD',
      name: 'indexPD',
      component: indexPD,
      meta: {
        title: '产品详情'
      }
    }, {
      path: '/StorePD',
      name: 'StorePD',
      component: StorePD,
      meta: {
        title: '产品详情'
      }
    }, {
      path: '/ShoppCartVue',
      name: 'ShoppCartVue',
      component: ShoppCartVue,
      meta: {
        title: '购物车'
      }
    }, {
      path: '/VipMember',
      name: 'VipMember',
      component: VipMember,
      meta: {
        title: '套餐'
      }
    }, {
      path: '/userCenter',
      name: 'userCenter',
      component: userCenter,
      meta: {
        title: '个人中心'
      }
    }
    , {
      path: '/Protocol',
      name: 'Protocol',
      component: Protocol,
      meta: {
        title: '协议'
      }
    }, {
      path: '/SearchVue',
      name: 'SearchVue',
      component: SearchVue,
      meta: {
        title: '搜索'
      }
    }, {
      path: '/SearchDetail',
      name: 'SearchDetail',
      component: SearchDetail,
      meta: {
        title: '产品详情'
      }
    }, {
      path: '/MyOrder',
      name: 'MyOrder',
      component: MyOrder,
      meta: {
        title: '我的订单'
      }
    }, {
      path: '/OrderDetail',
      name: 'OrderDetail',
      component: OrderDetail,
      meta: {
        title: '订单详情'
      }
    }, {
      path: '/MyCard',
      name: 'MyCard',
      component: MyCard,
      meta: {
        title: '卡包'
      }
    }, {
      path: '/AddCard',
      name: 'AddCard',
      component: AddCard,
      meta: {
        title: '绑定卡片'
      }
    }, {
      path: '/Integral',
      name: 'Integral',
      component: Integral,
      meta: {
        title: '我的积分'
      }
    }, {
      path: '/IntegralStore',
      name: 'IntegralStore',
      component: IntegralStore,
      meta: {
        title: '积分商城'
      }
    }, {
      path: '/IntegralDetail',
      name: 'IntegralDetail',
      component: IntegralDetail,
      meta: {
        title: '商品详情'
      }
    }, {
      path: '/BuyPay',
      name: 'BuyPay',
      component: BuyPay,
      meta: {
        title: '立即支付'
      }
    }, {
      path: '/SelectAddress',
      name: 'SelectAddress',
      component: SelectAddress,
      meta: {
        title: '配送地址'
      }
    }, {
      path: '/AddAddress',
      name: 'AddAddress',
      component: AddAddress,
      meta: {
        title: '新增配送地址'
      }
    }, {
      path: '/PackageDetail',
      name: 'PackageDetail',
      component: PackageDetail,
      meta: {
        title: '套餐详情'
      }
    }, {
      path: '/payPw',
      name: 'payPw',
      component: payPw,
      meta: {
        title: '套餐详情'
      }
    }
  ]
})