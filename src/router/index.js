import Vue from 'vue'
import Router from 'vue-router'
import Auth from '@/routing/auth'
import { store } from '../../store'
import Dashboard from '@/routing/dashboard'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Dashboard',
      component: Dashboard,
      beforeEnter(to, from, next) {
        store.state.auth ? next() : next('/auth') 
      }
    },
    {
      path: '/auth',
      name: 'Auth',
      component: Auth
    }
  ]
})
