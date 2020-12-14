import { createRouter, createWebHashHistory, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'

const routes: Array<RouteRecordRaw> = [{
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: 'Home'
    }
  }, {
    path: '/compareQuery',
    name: 'CompareQuery',
    component: () => import('../views/CompareQuery.vue'),
    meta: {
      title: 'Compare Query'
    }
  }, {
    path: '/ownerSummary',
    name: 'OwnerSummary',
    component: () => import('../views/OwnerSummary.vue')
  }, {
    path: '/labs',
    name: 'Labs',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/Labs.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
