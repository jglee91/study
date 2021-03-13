import IF from './interface';

const state = {
  deviceInfo: {},
  module: {
    cmdwatcher: false,
    cmdPosition: 0,
    cmdQueue: []
  }
};
const getters = {
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
   * Device
   */
  [IF.GET_DEVICE_INFO]: (state, deviceInfo) => (state.deviceInfo = deviceInfo),
  [IF.SET_DEVICE_INFO]: (state, deviceInfo) => (state.deviceInfo = deviceInfo)
};
const actions = {
  /**
   * Device
   */
  [IF.GET_DEVICE_INFO](state, deviceInfo) {
    state.deviceInfo = deviceInfo;
  },
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
