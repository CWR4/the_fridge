import Vue from 'vue';
import VueRouter from 'vue-router';
import EnterFridgeName from '../views/EnterFridgeName.vue';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'login',
    component: EnterFridgeName,
  },
  {
    path: '/inventory',
    name: 'inventory',
    component: Home,
  },
  {
    path: '/shoppinglist',
    name: 'shopping-list',
    component: Home,
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
