import Vue from 'vue';
import VueRouter from 'vue-router';

import MainPage from "./components/MainPage"

Vue.use(VueRouter);

const routes = [
  { path: '/', component: MainPage },
  { path: '/about', component: MainPage },
  { path: '/contact', component: MainPage },
];

const router = new VueRouter({
  routes,
});

export default router;
