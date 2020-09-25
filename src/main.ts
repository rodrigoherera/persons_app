import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueInsProgressBar from "vue-ins-progress-bar";
import { install } from 'vuex';

Vue.config.productionTip = false

const options = {
  position: 'fixed',
  show: true,
  height: '3px'
}

VueInsProgressBar.install(VueInsProgressBar, options)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
