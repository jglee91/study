const bizMOB = new Object();

bizMOB.install = (Vue, { store }) => {
  Vue.prototype.$bizMOB = {
    Device: {
      getInfo: key => console.log(store),
      isIOS: () => {},
      isAndroid: () => {},
      isPhone: () => {},
      isTablet: () => {}
    }
  };
};

export default bizMOB;
