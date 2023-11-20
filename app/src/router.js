import Vue from 'vue'
import VueRouter from 'vue-router'
import Users from '@/Users.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', component: Users },
  { path: '/about', component: Users },
  { path: '/contact', component: Users }
]

const router = new VueRouter({
  routes
})

export default router
