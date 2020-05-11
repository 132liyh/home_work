import Vue from 'vue'
import App from './App'
import store from './store';
// import axios from 'axios';

Vue.config.productionTip = false

App.mpType = 'app'

import {uniLoadMore} from '@dcloudio/uni-ui';

Vue.component("uniLoadMore", uniLoadMore);


// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// axios.interceptors.request.use(config => {
//     // 在发送请求之前做些什么
//     return config;
// }, error => {
//     // 对请求错误做些什么
//     return Promise.reject(error);
// });
//
// axios.interceptors.response.use(({status, data}) => {
//     return data
// }, error => {
//     // 对响应错误做点什么
//     return Promise.reject(error);
// });

const app = new Vue({
    ...store,
    ...App
})
app.$mount()
