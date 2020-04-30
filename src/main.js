import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
import {uniPopup} from '@dcloudio/uni-ui'
Vue.component('uniPopup',uniPopup)

App.mpType = 'app'

const app = new Vue({
  ...App
})
app.$mount()
