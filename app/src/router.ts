import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

Vue.use(VueRouter)

const routes: RouteConfig[] = [
  { path: '/', component: () => import('@/Users.vue') },
  { path: '/about', component: () => import('@/About.vue') },
  { path: '/contact', component: () => import('@/Contact.vue') }
]

const router = new VueRouter({
  routes: routes
})

export default router
