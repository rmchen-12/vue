// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import fastclick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'
import axios from 'axios'
import store from './store'
require('../mock')

Vue.prototype.$http = axios

//懒加载错误图和占位图
Vue.use(VueLazyLoad,{
  preLoad:1.3,
  error:'./assets/logo.png',
  loading:'./assets/logo.png'
})

//解决移动端300ms延迟
fastclick.attach(document.body)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  data: {
    eventHub: new Vue()
  },
  template: '<App/>'
})
