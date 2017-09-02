// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import EsayScroll from '../scrollbar'
import './assets/styles/shCore.css'
import './assets/styles/shThemeDefault.css'

Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use(EsayScroll);

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
