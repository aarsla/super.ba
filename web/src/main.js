import Vue from 'vue'
import './plugins/axios'
// import { Layout } from 'ant-design-vue'
// const { Header, Content, Footer } = Layout
import App from './App.vue'
import Antd from 'ant-design-vue/es'
import 'ant-design-vue/dist/antd.css'
import router from './router'
import store from './store'

Vue.use(Antd)

Vue.config.productionTip = false
// Vue.use(Layout, Header, Content, Footer)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
