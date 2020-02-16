import Vue from 'vue'
// import Antd from 'ant-design-vue'
import { Layout } from 'ant-design-vue'
import App from './App.vue'
import 'ant-design-vue/dist/antd.css'

const { Header, Content, Footer } = Layout

Vue.config.productionTip = false
Vue.use(Layout, Header, Content, Footer)

new Vue({
  render: h => h(App)
}).$mount('#app')
