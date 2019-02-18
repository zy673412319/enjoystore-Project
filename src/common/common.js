import vue from 'vue'
import { Loading } from 'element-ui'
let loading
// 错误提示框
function alert(message) {
  PostbirdAlertBox.alert({
    headBg: '#fdb146',
    headColor: 'white',
    content: message,
    okBtnColor: '#fdb146',
    okBtnborder: '1px solid #fdb146;'
  })
}

function startLoading(message) {
  loading = Loading.service({
    lock: true,
    text: '加载中...',
    spinner: 'el-icon-loading',
    background: 'rgba(0, 0, 0, 0.8)'
  });
}
function endLoading() {
  loading.close()
}

export default {
  alert: alert,
  startLoading: startLoading,
  endLoading: endLoading
};

