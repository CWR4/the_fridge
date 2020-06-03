import 'bootswatch/dist/cyborg/bootstrap.min.css';
import Vue from 'vue';
import axios from 'axios';
import App from './App.vue';
import router from './router';

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
  provide() {
    return {
      axios,
      eventBus: new Vue(),
    };
  },
}).$mount('#app');
