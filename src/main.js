import Vue from 'vue'
import App from './App'
import store from './store';

Vue.config.productionTip = false

App.mpType = 'app'

import { uniLoadMore } from '@dcloudio/uni-ui';
Vue.component("uniLoadMore", uniLoadMore);

const app = new Vue({
      ...store,
      ...App
})
app.$mount()
