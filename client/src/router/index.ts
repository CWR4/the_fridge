import Vue from 'vue';
import VueRouter from 'vue-router';
import EnterFridgeName from '../views/EnterFridgeName.vue';
import Inventory from '../views/Inventory.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'EnterFridgeName',
    component: EnterFridgeName,
  },
  {
    path: '/inventory',
    name: 'Inventory',
    component: Inventory,
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
