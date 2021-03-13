import Vue from 'vue';
import App from './App.vue';
import router from '@/router';
import store from '@/store';
import vuetify from '@/plugins/vuetify';
import bizMOB from '@/plugins/bizMOB/index';

Vue.use(bizMOB, { store });

Vue.config.productionTip = false;

window.vm = new Vue({
  router,
  store,
  vuetify,
  bizMOB,
  render: h => h(App)
}).$mount('#app');
