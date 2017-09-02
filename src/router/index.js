import Vue from 'vue'
import Router from 'vue-router'
import EasyScroll from '@/components/EasyScroll'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'EasyScroll',
      component: EasyScroll
    }


  ]
})
