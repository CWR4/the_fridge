import Vue from 'vue';
import VueRouter from 'vue-router';
import EnterFridgeName from '../views/EnterFridgeName.vue';
import About from '../views/About.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: EnterFridgeName,
  },
  {
    path: '/inventory',
    name: 'inventory',
    component: About,
  },
  {
    path: '/shoppinglist',
    name: 'shopping-list',
    component: About,
  },
  {
    path: '/about',
    name: 'About',
    component: About,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
