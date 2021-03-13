import bizStore from './store';
import IF from './interface';

const bizMOB = new Object();
export const namespace = 'bizMOB';

bizMOB.install = (Vue, options) => {
  const { store } = options;

  if (!store) {
    throw new Error('bizMOB Plugin 사용을 위해서는 Vuex store가 필요합니다.');
  }

  store.registerModule(namespace, bizStore);

  const vm = new Vue({ store });

  Vue.prototype.$bizMOB = {
    Device: {
      getInfo: (key) => vm.$store.getters[IF.GET_DEVICE_INFO](key),
      setInfo: (deviceInfo) =>
        vm.$store.dispatch(IF.SET_DEVICE_INFO, deviceInfo),
      isIOS: () => vm.$store.getters[IF.IS_IOS],
      isAndroid: () => vm.$store.getters[IF.IS_ANDROID],
      isPhone: () => vm.$store.getters[IF.IS_PHONE],
      isTablet: () => vm.$store.getters[IF.IS_TABLET],
    },
  };
};

export default bizMOB;
