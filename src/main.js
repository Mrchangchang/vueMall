// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueResources from 'vue-resource'
import './common/stylus/index.styl';
/*import mock from "./mock"*/
Vue.config.productionTip = false
Vue.use(VueResources)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
