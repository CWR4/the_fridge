import Vue from 'vue';
import VueRouter from 'vue-router';
import Fridges from '../views/Fridges.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/fridges',
    name: 'Fridges',
    component: Fridges,
  },
  {
    path: '/shoppingList',
    name: 'shoppingList',
    component: () => import('../views/ShoppingList.vue'),
  },
  {
    path: '/products',
    name: 'products',
    component: () => import('../views/Products.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
