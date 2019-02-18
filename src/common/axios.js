import { Toast, Indicator } from 'mint-ui';
import axios from 'axios'
import router from '../router'

// 添加请求拦截器
axios.interceptors.request.use(config => {
  config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
  // loading方法
  Indicator.open({
    text: 'Loading...',
    spinnerType: 'fading-circle'
  });
  return config
}, function (error) {
  Indicator.close();
  // 对请求错误做些什么
  Toast({
    message: '网络不可用,请检查',
    position: 'bottom',
    duration: 5000
  });
  return Promise.reject(error)
});

// 添加响应拦截器
axios.interceptors.response.use(response => {
  Indicator.close();
  if (typeof response.data === 'object') {
    if (response.data.respCode == -1) {
      router.replace({ name: "Login" });
    }
    return response;
  } else {
    return response
  }
}, function (error) {
  Indicator.close();
  // 对响应错误做点什么
  Toast({
    message: '网络不可用,请稍后再试',
    position: 'bottom',
    duration: 5000
  });
  return Promise.reject(error)
});

export default axios