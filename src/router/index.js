import Vue from 'vue'
import Router from 'vue-router'
import Auth from '@/routing/auth'
import { store } from '../../store'
import Dashboard from '@/routing/dashboard'
import channels from '@/routing/dashboard/channels'
import newChannel from '@/routing/dashboard/channels/newChannel'
import packages from '@/routing/dashboard/packages'
import newPackages from '@/routing/dashboard/packages/newPackages'
import addChannelsToPackages from '@/routing/dashboard/packages/addChannels'
import Users from '@/routing/dashboard/users'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/auth',
      name: 'Auth',
      component: Auth
    },
    {
      path: '/',
      name: 'Dashboard',
      component: Dashboard,
      beforeEnter(to, from, next) {
        store.state.auth ? next() : next('/auth'); 
      },
      children: [
        
        {
          path: 'channels',
          name: 'channels',
          component: channels
        },
        {
          path: 'channels/new',
          component: newChannel
        },
        {
          path: 'packages',
          name: 'packages',
          component: packages
        },
        {
          path: 'packages/addChannels/:id',
          props: true,
          component: addChannelsToPackages
        },
        {
          path: 'packages/new',
          component: newPackages
        },
        {
          path: 'users',
          component: Users
        },
        {
          path: '*',
          component: channels
        }
      ]
    },
    
  ]
})
