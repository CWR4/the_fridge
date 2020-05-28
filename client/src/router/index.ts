import Vue from 'vue';
import VueRouter from 'vue-router';
import EnterFridgeName from '../views/EnterFridgeName.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'EnterFridgeName',
    component: EnterFridgeName,
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('../views/Home.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
