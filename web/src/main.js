import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import VueGtag from 'vue-gtag'
import router from './router'
import store from './store'

import Antd from 'ant-design-vue/es'
import 'ant-design-vue/dist/antd.css'

import VueNativeSock from 'vue-native-websocket'

Vue.use(Antd)
Vue.use(VueNativeSock, process.env.VUE_APP_WS_URL, {
  store: store,
  format: 'json',
  connectManually: true,
  reconnection: false
  // reconnectionAttempts: 5,
  // reconnectionDelay: 3000
})

Vue.use(VueGtag, {
  config: { id: process.env.VUE_APP_GTAG }
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
