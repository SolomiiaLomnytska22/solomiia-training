import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

Vue.use(VueRouter)

const routes: RouteConfig[] = [
  { path: '/', component: () => import('@/Users.vue') },
  { path: '/about', component: () => import('@/Users.vue') },
  { path: '/contact', component: () => import('@/Users.vue') }
]

const router = new VueRouter({
  routes: routes
})

export default router
