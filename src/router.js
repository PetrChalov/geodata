import Vue from 'vue'
import Router from 'vue-router'
import FirstPage from '@/views/FirstPage'
import SecondPage from '@/views/SecondPage'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: FirstPage
    },
    {
      path: '/second',
      component: SecondPage
    }
  ]
})
