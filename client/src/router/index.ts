import Vue from 'vue';
import VueRouter from 'vue-router';
import EnterFridgeName from '../views/EnterFridgeName.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/enterFridgeName',
    name: 'EnterFridgeName',
    component: EnterFridgeName,
  },
  // {
  //   path: '/enterFridgeName',
  //   name: 'EnterFridgeName',
  //   component: () => import( '../views/EnterFridgeName.vue'),
  // },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
