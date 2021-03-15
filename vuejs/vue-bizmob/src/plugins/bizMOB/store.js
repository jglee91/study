import Vue from 'vue';

import IF from './interface/index';
import { pathParser } from './util';

const REQUEST_INTERFACE = 'REQUEST_INTERFACE';
const SAVE_CALLBACK = 'SAVE_CALLBACK';
const SET_LISTENER = 'SET_LISTENER';
const GET_LISTENER = 'GET_LISTENER';
const SET_STORAGE = 'SET_STORAGE';
const GET_STORAGE = 'GET_STORAGE';

const state = {
  // Mobile Device Informations
  deviceInfo: {},

  // Native Function call - listener
  listener: {},

  // Native Function call - storage
  storage: {}
};

const getters = {
  /**
   * Callback
   */
  [GET_LISTENER]: state => key => state.listener[key],
  [GET_STORAGE]: state => key => state.storage[key],

  /**
   * Device
   */
  [IF.GET_DEVICE_INFO]: state => key =>
    key ? state.deviceInfo[key] : state.deviceInfo,
  [IF.IS_IOS]: state =>
    state.deviceInfo.os_type.includes('iPhone') ||
    state.deviceInfo.os_type.includes('iOS'),
  [IF.IS_ANDROID]: state => state.deviceInfo.os_type.includes('Android'),
  [IF.IS_PHONE]: state => state.deviceInfo.device_type.includes('Phone'),
  [IF.IS_TABLET]: state => state.deviceInfo.device_type.includes('Tablet')
};

const mutations = {
  /**
   * Callback
   */
  [SET_LISTENER]: (state, { callbackId, callback }) =>
    Vue.set(state.listener, callbackId, callback),
  [SET_STORAGE]: (state, { callbackId, callback }) =>
    Vue.set(state.storage, callbackId, callback),

  /**
   * Device
   */
  [IF.SET_DEVICE_INFO]: (state, deviceInfo) => (state.deviceInfo = deviceInfo)
};

const actions = {
  /**
   *
   */
  [SAVE_CALLBACK]({ state, commit }, callback, type, name) {
    let index = 0;
    let callbackId = '';
    switch (type) {
      case 'listener':
        index = Object.keys(state.listener).length;
        callbackId = `lsn${index}`;
        commit(SET_LISTENER, { callbackId, callback });
        break;
      case 'custom':
        index = Object.keys(state.listener).length;
        callbackId = `cst_${name}`;
        commit(SET_LISTENER, { callbackId, callback });
        break;
      default:
        index = Object.keys(state.storage).length;
        callbackId = `stg${index}`;
        commit(SET_STORAGE, { callbackId, callback });
    }
    return callbackId;
  },
  [REQUEST_INTERFACE]({ getters }, tr) {
    // FIXME - temp logging
    console.log('[REQUEST]\n', JSON.stringify(tr, null, 4));

    const message = JSON.stringify(tr);

    if (getters[IF.IS_IOS]) {
      // eslint-disable-next-line no-undef
      webkit.messageHandlers.BMCManager.postMessage(message);
    }
    if (getters[IF.IS_ANDROID]) {
      window.BMCManager.execPluginWithJSB(message);
    }
  },

  /**
   * Callback
   */
  [IF.EXECUTE_CALLBACK]({ getters }, { callback, message, serviceInfo }) {
    if (callback.includes('stg')) {
      getters[GET_STORAGE](callback)(message, serviceInfo);
    } else if (callback.includes('lsn') || callback.includes('cst')) {
      getters[GET_LISTENER](callback)(message, serviceInfo);
    }
  },

  /**
   * Window
   */
  [IF.SHOW_MESSAGE]({ dispatch }, { message, duration } = {}) {
    const tr = {
      id: 'SHOW_MESSAGE',
      param: {
        message: message || '',
        duration: duration || 'long'
      }
    };
    dispatch(REQUEST_INTERFACE, tr);
  },
  async [IF.GOTO_SIGNATURE]({ dispatch }, { targetPath, callback } = {}) {
    const { type: target_path_type, path: target_path } = pathParser(
      targetPath
    );
    const tr = {
      id: 'GOTO_SIGNATURE',
      param: {
        target_path_type,
        target_path,
        callback: await dispatch(SAVE_CALLBACK, callback)
      }
    };
    dispatch(REQUEST_INTERFACE, tr);
  },
  async [IF.OPEN_FILE_BROWSER]({ dispatch }, { callback } = {}) {
    const tr = {
      id: 'OPEN_FILE_BROWSER',
      param: {
        callback: await dispatch(SAVE_CALLBACK, callback)
      }
    };
    dispatch(REQUEST_INTERFACE, tr);
  },

  /**
   * Device
   */
  [IF.SET_DEVICE_INFO]({ commit }, deviceInfo) {
    const {
      app_major_version,
      app_minor_version,
      app_build_version,
      content_major_version,
      content_minor_version
    } = deviceInfo;
    deviceInfo.app_version = `${app_major_version}.${app_minor_version}.${app_build_version}_${content_major_version}.${content_minor_version}`;
    commit(IF.SET_DEVICE_INFO, deviceInfo);
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
