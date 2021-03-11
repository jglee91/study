import Vue from "vue";
import Vuex from "vuex";

import bizMOB from "./bizMOB";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    bizMOB,
  },
});
