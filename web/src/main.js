import Vue from 'vue'
// import { Layout } from 'ant-design-vue'
// const { Header, Content, Footer } = Layout
import App from './App.vue'
import Antd from 'ant-design-vue/es'
import 'ant-design-vue/dist/antd.css'

Vue.config.productionTip = false
// Vue.use(Layout, Header, Content, Footer)
Vue.use(Antd)

new Vue({
  render: h => h(App)
}).$mount('#app')
