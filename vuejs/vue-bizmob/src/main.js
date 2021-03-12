import Vue from 'vue';
import App from './App.vue';
import bizMOB from '@/plugins/bizMOB';
import store from '@/store';
import vuetify from '@/plugins/vuetify';

Vue.use(bizMOB, { store });

Vue.config.productionTip = false;

window.vm = new Vue({
  bizMOB,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app');
