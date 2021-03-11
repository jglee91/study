import Vue from 'vue';

/**
 * Base(Private)
 */
const GATEWAY = 'bizMOB/GATEWAY';

/**
 * Base
 */
export const bizMOB = 'bizMOB';
export const INIT = 'bizMOB/INIT';

/**
 * Properties
 */
export const SET_FSTORAGE = 'bizMOB/SET_FSTORAGE';
export const REMOVE_FSTORAGE = 'bizMOB/REMOVE_FSTORAGE';

/**
 * Network
 */

/**
 * System
 */

/**
 * Window (will be deprecated)
 */

/**
 * SideView
 */

/**
 * App
 */

/**
 * Contacts
 */

/**
 * File
 */

/**
 * Push
 */

/**
 * Device
 */
export const GET_DEVICE_INFO = 'bizMOB/GET_DEVICE_INFO';
export const SET_DEVICE_INFO = 'bizMOB/SET_DEVICE_INFO';

/**
 * Database
 */

const state = {
  deviceInfo: {},
  module: {
    cmdwatcher: false,
    cmdPosition: 0,
    cmdQueue: []
  }
};

const getters = {};

const mutations = {
  [INIT](state) {},
  [GATEWAY](state, object) {},

  /**
   * Device
   */
  [GET_DEVICE_INFO](state, { key }) {},
  [SET_DEVICE_INFO](state, deviceInfo) {
    state.deviceInfo = deviceInfo;
  }
};

const actions = {
  [SET_DEVICE_INFO]({ commit }, deviceInfo) {
    commit(SET_DEVICE_INFO, deviceInfo);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
