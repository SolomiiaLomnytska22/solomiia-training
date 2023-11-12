import Vue from 'vue';
import VueRouter from 'vue-router';

import TablePage from "./components/TablePage"

Vue.use(VueRouter);

const routes = [
  { path: '/', component: TablePage },
  { path: '/about', component: TablePage },
  { path: '/contact', component: TablePage },
];

const router = new VueRouter({
  routes,
});

export default router;
