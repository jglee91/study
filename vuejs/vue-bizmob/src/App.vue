<template>
  <v-app>
    <router-view :key="$route.fullPath" />
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />

        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
          width="100"
        />
      </div>

      <v-spacer></v-spacer>

      <v-btn
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
        text
      >
        <span class="mr-2">Latest Release</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <SampleCard />
    </v-main>
  </v-app>
</template>

<script>
import SampleCard from './components/SampleCard';

export default {
  name: 'App',

  components: {
    SampleCard
  },

  data: () => ({
    //
  }),
  methods: {},
  created() {
    // call bizMOB from native
    window.bizMOB = {
      Device: {
        set Info(info) {
          this.setInfo(info);
        },
        setInfo: info => this.$bizMOB.Device.setInfo(info)
      }
    };

    window.bizMOBCore = {
      EventManager: {
        responser: (required, options) => console.log(required, options)
      },
      CallbackManager: {
        responser: (callback, response, serviceInfo) =>
          console.log(callback, response, serviceInfo)
      }
    };

    // javascript:bizMOB.Device.Info = {"device_id":"andbz_3e2650293ca459472d4e1cb6986656cdb51b1e381d314f02b7d99271f6f206bff531c6292e2a0280cf5e6868558ab0d7aafb60636c34e15bd9c90c29e72a30f3","os_type":"Android","device_os_type":"ANDROID","os_version":"7.1","device_os_version":"7.1.2","mobile_number":"+8201010027756","content_major_version":"2","content_minor_version":"0","app_major_version":"1","app_minor_version":"0","app_build_version":"0","network_operater_name":"SKTelecom","screen_density":"1.0","screen_density_dpi":"160","screen_width":"360","screen_height":"800","manufacturer":"samsung","model":"SM-G973N","device_type":"Phone","app_key":"BM35ANP0","release_flag":false,"language":"ko","locale":"ko_KR","push_key":"","carrier_code":"45005","push_provider_type":"GCM","web_log_level":"0000","plugin_version":"1.0"}
    // javascript:bizMOBCore.EventManager.responser({eventname:'onReady'}, {message:{}});
    // javascript:bizMOBCore.CallbackManager.responser({callback:''}, {message:{}}, {});

    // FIXME - test code
    window.vm = this;
  }
};
</script>
