import Vue from 'vue'
import Router from 'vue-router'
import Auth from '@/routing/auth'
import { store } from '../../store'
import Dashboard from '@/routing/dashboard'
import channels from '@/routing/dashboard/channels'
import newChannel from '@/routing/dashboard/channels/newChannel'
import packages from '@/routing/dashboard/packages'
import newPackages from '@/routing/dashboard/packages/newPackages'
import editPackages from '@/routing/dashboard/packages/edit'
import addChannelsToPackages from '@/routing/dashboard/packages/addChannels'
import categories from '@/routing/dashboard/categories'
import newCategories from '@/routing/dashboard/categories/new'
import deleteCategories from '@/routing/dashboard/categories/delete'
import editCategories from '@/routing/dashboard/categories/edit'
import operators from '@/routing/dashboard/operators'
import newOperators from '@/routing/dashboard/operators/new'
import editOperator from '@/routing/dashboard/operators/edit'
import users from '@/routing/dashboard/users';
import newUsers from '@/routing/dashboard/users/new';
import editUser from '@/routing/dashboard/users/edit'
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
        store.state.auth ? next() : next('/auth')
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
          path: 'packages/edit/:id',
          props: true,
          component: editPackages
        },
        {
          path: 'categories',
          component: categories,
        },
        {
          path: 'categories/new',
          component: newCategories,
        },
        {
          path: 'categories/delete/:id',
          component: deleteCategories,
          props: true
        },
        {
          path: 'categories/edit/:id',
          component: editCategories,
          props: true
        },
        {
          path: 'operators',
          component: operators
        },
        {
          path: 'operators/new',
          component: newOperators
        },
        {
          path: 'operators/edit/:id',
          props: true,
          component: editOperator
        },
        {
          path: 'users',
          component: users
        },
        {
          path: 'users/new',
          component: newUsers
        },
        {
          path: 'users/edit/:id',
          props: true,
          component: editUser
        },
        {
          path: '*',
          component: channels
        }
      ]
    },

  ]
})
