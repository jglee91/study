// import Vue from 'vue';

import IF from '../interface/index';
// import { pathParser } from '../util';

const state = {
  // Mobile Device Informations
  deviceInfo: {
    device_id:
      'andbz_3e2650293ca459472d4e1cb6986656cdb51b1e381d314f02b7d99271f6f206bff531c6292e2a0280cf5e6868558ab0d7aafb60636c34e15bd9c90c29e72a30f3',
    os_type: 'Android',
    device_os_type: 'ANDROID',
    os_version: '7.1',
    device_os_version: '7.1.2',
    mobile_number: '+8201010027756',
    content_major_version: '2',
    content_minor_version: '0',
    app_major_version: '1',
    app_minor_version: '0',
    app_build_version: '0',
    network_operater_name: 'SKTelecom',
    screen_density: '1.0',
    screen_density_dpi: '160',
    screen_width: '360',
    screen_height: '800',
    manufacturer: 'samsung',
    model: 'SM-G973N',
    device_type: 'Phone',
    app_key: 'BM35ANP0',
    release_flag: false,
    language: 'ko',
    locale: 'ko_KR',
    push_key: '',
    carrier_code: '45005',
    push_provider_type: 'GCM',
    web_log_level: '0000',
    plugin_version: '1.0'
  },

  // Native Function call - listener
  listener: {},

  // Native Function call - storage
  storage: {}
};

const getters = {
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

const mutations = {};

const actions = {
  /**
   * Window
   */
  [IF.SHOW_MESSAGE](store, options) {
    console.log(store);
    console.log(options);
  },

  /**
   * System
   */
  [IF.TEL](store, { number }) {
    location.href = `tel:${number.replace('+82', '0')}`;
  },
  [IF.SMS](store, { numbers, message }) {
    // TODO 여러번호 한번에 넘기기 및 android 에서의 처리
    if (getters[IF.IS_IOS]) {
      location.href = `sms:${numbers.join(';')}&body=${encodeURIComponent(
        message
      )}`;
    }
    if (getters[IF.IS_ANDROID]) {
      location.href = '';
    }
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
