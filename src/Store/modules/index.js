const state = {
  PayData: {
    payList: JSON.parse(localStorage.getItem('payListLocal')) ? JSON.parse(localStorage.getItem('payListLocal')) : [],
    payAllNum: localStorage.getItem('payAllNum') ? localStorage.getItem('payAllNum') : '0'
  },
  SearchData: {
    SearchText: localStorage.getItem('SearchText') ? localStorage.getItem('SearchText') : ''
  },
  UserData: JSON.parse(localStorage.getItem('UserData')) ? JSON.parse(localStorage.getItem('UserData')) : '',
  // {"id":"a0b4a758259e4ff687776dd7e691381c","createDate":"2018-11-09 15:40:32","updateDate":"2018-11-09 15:40:32","nickName":"",
  // "phoneNumber":"18591796935","password":"9510f34484694c55e1faa052834d847e","balance":0,"avatar":""}
};
// 更新状态
const mutations = {
  // 更新 用户ID
  updateUserData(state, msg) {
    state.UserData = msg;
    localStorage.setItem('UserData', JSON.stringify(msg));
  },
  // 更新 立即支付 列表
  updatePayList(state, msg) {
    state.PayData.payList = msg;
    localStorage.setItem('payListLocal', JSON.stringify(msg));
  },
  // 更新 支付金额
  updatePayNum(state, msg) {
    state.PayData.payAllNum = msg;
    localStorage.setItem('payAllNum', msg);
  },
  // 更新 搜索值
  updateSearchText(state, msg) {
    state.SearchData.SearchText = msg;
    localStorage.setItem('SearchText', msg);
  },
  deleteAll() {
    localStorage.removeItem("payListLocal");
    localStorage.removeItem("payAllNum");
    localStorage.removeItem("SearchText");
    localStorage.removeItem("UserData");
  }
};
export default {
  state,
  mutations
}
