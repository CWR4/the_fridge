import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '@/views/Login.vue';
import Inventory from '@/views/Inventory.vue';
import ShoppingList from '@/views/ShoppingList.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'login',
    component: Login,
  },
  {
    path: '/inventory',
    name: 'inventory',
    component: Inventory,
  },
  {
    path: '/shoppinglist',
    name: 'shopping-list',
    component: ShoppingList,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
