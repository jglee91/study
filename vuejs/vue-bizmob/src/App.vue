<template>
  <v-app>
    <v-container>
      <v-btn @click="onClick('toast')">Toast</v-btn>
      <br /><br />
      <v-btn @click="onClick('signPad')">SignPad</v-btn>
      <br /><br />
      <v-btn @click="onClick('tel')">Tel</v-btn>
      <br /><br />
      <v-btn @click="onClick('sms')">SMS</v-btn>
      <br /><br />
      <v-btn @click="onClick('camera')">Camera</v-btn>
    </v-container>
  </v-app>
</template>

<script>
export default {
  name: 'App',

  components: {},

  computed: {},

  methods: {
    async onClick(method) {
      let res;

      switch (method) {
        case 'toast':
          this.$bizMOB.Window.toast({ message: 'toast message!!' });
          break;

        case 'signPad':
          res = await this.$bizMOB.Window.openSignPad({
            targetPath: '{external}/temp'
          });
          alert(JSON.stringify(res, null, 4));
          break;

        case 'tel':
          res = await this.$bizMOB.System.callTEL({ number: '01029320080' });
          alert(JSON.stringify(res, null, 4));
          break;

        case 'sms':
          res = await this.$bizMOB.System.callSMS({
            numbers: ['01029320080', '01012345678'],
            message: 'test message'
          });
          alert(JSON.stringify(res, null, 4));
          break;

        case 'camera':
          res = await this.$bizMOB.System.callCamera();
          alert(JSON.stringify(res, null, 4));
          break;
      }
    }
  }
};
</script>
