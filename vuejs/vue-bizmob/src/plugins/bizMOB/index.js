import { isApp } from './util';
import bizStore from './store/index';
import IF from './interface/index';

const bizMOB = new Object();

bizMOB.install = (Vue, options) => {
  const { store } = options;
  const { App, Web } = bizStore;

  if (!store) {
    throw new Error('bizMOB Plugin 사용을 위해서는 Vuex store가 필요합니다.');
  }

  store.registerModule('bizMOB', isApp ? App : Web);

  const vm = new Vue({ store });

  // call bizMOB from native
  window.bizMOB = {
    Device: {
      set Info(info) {
        this.setInfo(info);
      },
      setInfo: info => vm.$bizMOB.Device.setInfo(info)
    }
  };

  window.bizMOBCore = {
    EventManager: {
      responser: (required, options) => console.log(required, options)
    },
    CallbackManager: {
      responser: (callback, response, serviceInfo) =>
        vm.$store.dispatch(IF.EXECUTE_CALLBACK, {
          callback: callback.callback,
          message: response.message,
          serviceInfo
        })
    }
  };

  // javascript:bizMOB.Device.Info = {"device_id":"andbz_3e2650293ca459472d4e1cb6986656cdb51b1e381d314f02b7d99271f6f206bff531c6292e2a0280cf5e6868558ab0d7aafb60636c34e15bd9c90c29e72a30f3","os_type":"Android","device_os_type":"ANDROID","os_version":"7.1","device_os_version":"7.1.2","mobile_number":"+8201010027756","content_major_version":"2","content_minor_version":"0","app_major_version":"1","app_minor_version":"0","app_build_version":"0","network_operater_name":"SKTelecom","screen_density":"1.0","screen_density_dpi":"160","screen_width":"360","screen_height":"800","manufacturer":"samsung","model":"SM-G973N","device_type":"Phone","app_key":"BM35ANP0","release_flag":false,"language":"ko","locale":"ko_KR","push_key":"","carrier_code":"45005","push_provider_type":"GCM","web_log_level":"0000","plugin_version":"1.0"}
  // javascript:bizMOBCore.EventManager.responser({eventname:'onReady'}, {message:{}});
  // javascript:bizMOBCore.CallbackManager.responser({callback:''}, {message:{}}, {});

  // FIXME - test code
  window.vm = vm;

  Vue.prototype.$bizMOB = {
    Window: {
      toast: (params = {}) =>
        new Promise((resolve, reject) => {
          const { callback } = params;
          vm.$store
            .dispatch(IF.SHOW_MESSAGE, {
              ...params,
              callback: res => (callback ? callback(res) : resolve(res))
            })
            .catch(e => reject(e));
        }),
      openSignPad: (params = {}) =>
        new Promise((resolve, reject) => {
          const { callback } = params;
          vm.$store
            .dispatch(IF.GOTO_SIGNATURE, {
              ...params,
              callback: res => (callback ? callback(res) : resolve(res))
            })
            .catch(e => reject(e));
        }),
      openFileExplorer: (params = {}) =>
        new Promise((resolve, reject) => {
          const { callback } = params;
          vm.$store
            .dispatch(IF.OPEN_FILE_BROWSER, {
              ...params,
              callback: res => (callback ? callback(res) : resolve(res))
            })
            .catch(e => reject(e));
        }),
      openImageViewer: (params = {}) =>
        new Promise((resolve, reject) => {
          const { callback } = params;
          vm.$store
            .dispatch(IF.SHOW_IMAGE_VIEW, {
              ...params,
              callback: res => (callback ? callback(res) : resolve(res))
            })
            .catch(e => reject(e));
        }),
      openCodeReader: (params = {}) =>
        new Promise((resolve, reject) => {
          const { callback } = params;
          vm.$store
            .dispatch(IF.QR_AND_BAR_CODE, {
              callback: res => (callback ? callback(res) : resolve(res))
            })
            .catch(e => reject(e));
        })
    },

    Properties: {},

    System: {
      callTEL: (params = {}) =>
        new Promise((resolve, reject) => {
          const { callback } = params;
          vm.$store
            .dispatch(IF.TEL, {
              ...params,
              callback: res => (callback ? callback(res) : resolve(res))
            })
            .catch(e => reject(e));
        }),
      callSMS: (params = {}) =>
        new Promise((resolve, reject) => {
          const { callback } = params;
          vm.$store
            .dispatch(IF.SMS, {
              ...params,
              callback: res => (callback ? callback(res) : resolve(res))
            })
            .catch(e => reject(e));
        }),
      callBrowser: (params = {}) =>
        new Promise((_, reject) =>
          vm.$store.dispatch(IF.SHOW_WEBSITE, params).catch(e => reject(e))
        ),
      callGallery: (params = {}) =>
        new Promise((resolve, reject) => {
          const { callback } = params;
          vm.$store
            .dispatch(IF.GET_MEDIA_PICK, {
              ...params,
              callback: res => (callback ? callback(res) : resolve(res))
            })
            .catch(e => reject(e));
        }),
      callMap: (params = {}) =>
        new Promise((_, reject) =>
          vm.$store.dispatch(IF.SHOW_MAP, params).catch(e => reject(e))
        ),
      getGPS: (params = {}) =>
        new Promise((resolve, reject) => {
          const { callback } = params;
          vm.$store
            .dispatch(IF.GET_LOCATION, {
              ...params,
              callback: res => (callback ? callback(res) : resolve(res))
            })
            .catch(e => reject(e));
        }),
      callCamera: (params = {}) =>
        new Promise((resolve, reject) => {
          const { callback } = params;
          vm.$store
            .dispatch(IF.CAMERA_CAPTURE, {
              ...params,
              callback: res => (callback ? callback(res) : resolve(res))
            })
            .catch(e => reject(e));
        })
    },

    App: {
      openProgress: (params = {}) =>
        new Promise((resolve, reject) => {
          const { callback } = params;
          vm.$store
            .dispatch(IF.PROGRESS_CONTROLLER, {
              type: 'show',
              callback: res => (callback ? callback(res) : resolve(res))
            })
            .catch(e => reject(e));
        }),
      closeProgress: (params = {}) =>
        new Promise((resolve, reject) => {
          const { callback } = params;
          vm.$store
            .dispatch(IF.PROGRESS_CONTROLLER, {
              type: 'close',
              callback: res => (callback ? callback(res) : resolve(res))
            })
            .catch(e => reject(e));
        }),
      exit: (params = {}) =>
        new Promise((resolve, reject) =>
          vm.$store.dispatch(IF.APPLICATION_EXIT, params).catch(e => reject(e))
        ),
      requestTimeout: (params = {}) =>
        new Promise((resolve, reject) => {
          const { callback } = params;
          vm.$store
            .dispatch(IF.SET_SESSION_TIMEOUT, {
              ...params,
              callback: res => (callback ? callback(res) : resolve(res))
            })
            .catch(e => reject(e));
        }),
      getAvailableInterfaceList: (params = {}) =>
        new Promise((resolve, reject) => {
          const { callback } = params;
          vm.$store
            .dispatch(IF.GET_REGISTERED_CALL_IDS, {
              callback: res => (callback ? callback(res) : resolve(res))
            })
            .catch(e => reject(e));
        })
    },

    Storage: {},

    Network: {
      // will be deprecated
      requestTr: () => {},
      requestLogin: () => {}
    },

    Device: {
      getInfo: key => vm.$store.getters[IF.GET_DEVICE_INFO](key),
      setInfo: deviceInfo => vm.$store.dispatch(IF.SET_DEVICE_INFO, deviceInfo),
      isIOS: () => vm.$store.getters[IF.IS_IOS],
      isAndroid: () => vm.$store.getters[IF.IS_ANDROID],
      isPhone: () => vm.$store.getters[IF.IS_PHONE],
      isTablet: () => vm.$store.getters[IF.IS_TABLET]
    },

    Contacts: {
      get: (params = {}) =>
        new Promise((resolve, reject) => {
          const { callback } = params;
          vm.$store
            .dispatch(IF.GET_CONTACT, {
              ...params,
              callback: res => (callback ? callback(res) : resolve(res))
            })
            .catch(e => reject(e));
        })
    },

    File: {
      open: (params = {}) =>
        new Promise((resolve, reject) => {
          const { callback } = params;
          vm.$store
            .dispatch(IF.OPEN_FILE, {
              ...params,
              callback: res => (callback ? callback(res) : resolve(res))
            })
            .catch(e => reject(e));
        }),
      zip: (params = {}) =>
        new Promise((resolve, reject) => {
          const { callback } = params;
          vm.$store
            .dispatch(IF.ZIP_FILE, {
              ...params,
              callback: res => (callback ? callback(res) : resolve(res))
            })
            .catch(e => reject(e));
        }),
      unzip: (params = {}) =>
        new Promise((resolve, reject) => {
          const { callback } = params;
          vm.$store
            .dispatch(IF.UNZIP_FILE, {
              ...params,
              callback: res => (callback ? callback(res) : resolve(res))
            })
            .catch(e => reject(e));
        }),
      move: (params = {}) =>
        new Promise((resolve, reject) => {
          const { callback } = params;
          vm.$store
            .dispatch(IF.MOVE_FILE, {
              ...params,
              callback: res => (callback ? callback(res) : resolve(res))
            })
            .catch(e => reject(e));
        }),
      copy: (params = {}) =>
        new Promise((resolve, reject) => {
          const { callback } = params;
          vm.$store
            .dispatch(IF.COPY_FILE, {
              ...params,
              callback: res => (callback ? callback(res) : resolve(res))
            })
            .catch(e => reject(e));
        }),
      remove: (params = {}) =>
        new Promise((resolve, reject) => {
          const { callback } = params;
          vm.$store
            .dispatch(IF.REMOVE_FILES, {
              ...params,
              callback: res => (callback ? callback(res) : resolve(res))
            })
            .catch(e => reject(e));
        }),
      directory: (params = {}) =>
        new Promise((resolve, reject) => {
          const { callback } = params;
          vm.$store
            .dispatch(IF.GET_DIRECTORY_INFO, {
              ...params,
              callback: res => (callback ? callback(res) : resolve(res))
            })
            .catch(e => reject(e));
        }),
      exist: (params = {}) =>
        new Promise((resolve, reject) => {
          const { callback } = params;
          vm.$store
            .dispatch(IF.EXISTS_FILE, {
              ...params,
              callback: res => (callback ? callback(res) : resolve(res))
            })
            .catch(e => reject(e));
        }),
      upload: (params = {}) =>
        new Promise((resolve, reject) => {
          const { callback } = params;
          vm.$store
            .dispatch(IF.FILE_UPLOAD, {
              ...params,
              callback: res => (callback ? callback(res) : resolve(res))
            })
            .catch(e => reject(e));
        }),
      download: (params = {}) =>
        new Promise((resolve, reject) => {
          const { callback } = params;
          vm.$store
            .dispatch(IF.DOWNLOAD, {
              ...params,
              callback: res => (callback ? callback(res) : resolve(res))
            })
            .catch(e => reject(e));
        })
    },

    Push: {},

    Database: {}
  };
};

export default bizMOB;
