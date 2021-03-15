import bizStore from './store';
import IF from './interface/index';

const bizMOB = new Object();

bizMOB.install = (Vue, options) => {
  const { store } = options;

  if (!store) {
    throw new Error('bizMOB Plugin 사용을 위해서는 Vuex store가 필요합니다.');
  }

  store.registerModule('bizMOB', bizStore);

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
        })
    },

    Device: {
      getInfo: key => vm.$store.getters[IF.GET_DEVICE_INFO](key),
      setInfo: deviceInfo => vm.$store.dispatch(IF.SET_DEVICE_INFO, deviceInfo),
      isIOS: () => vm.$store.getters[IF.IS_IOS],
      isAndroid: () => vm.$store.getters[IF.IS_ANDROID],
      isPhone: () => vm.$store.getters[IF.IS_PHONE],
      isTablet: () => vm.$store.getters[IF.IS_TABLET]
    }
  };
};

export default bizMOB;
