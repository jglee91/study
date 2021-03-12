import Vue from 'vue';
import Vuex from 'vuex';
import store from '@/store';

const vm = new Vue({ store });

const bizMOBHelper = Vuex.createNamespacedHelpers('bizMOB');

console.log(bizMOBHelper);

const bizMOB = {
  Device: {
    getInfo: key => console.log(vm),
    isIOS: () => {},
    isAndroid: () => {},
    isPhone: () => {},
    isTablet: () => {}
  }
};

export default bizMOB;
