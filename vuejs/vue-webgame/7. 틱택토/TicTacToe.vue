<template>
  <div>
    <p>{{ turn }}님의 턴입니다.</p>
    <table-component :table-data="tableData"></table-component>
    <div v-if="winner">{{ winner }}님의 승리!</div>
  </div>
</template>

<script>
// component를 쪼갠 이유는, 데이터 업데이트시 리렌더링 되는 단위를 최소화하여 UI 최적화를 하기 위함

import Vue from 'vue';
import TableComponent from './TableComponent';

export default {
  components: {
    TableComponent,
  },
  data() {
    return {
      tableData: [
        ['', '', ''],
        ['', '', ''],
        ['', '', ''],
      ],
      turn: 'O',
      winner: '',
    };
  },
  computed: {},
  methods: {
    onChangeData() {
      // this.tableData[1][0] = 'X'; // 작동하지 않음
      // Vue.set(this.tableData[1], 0, 'X'); // this.$set과 동일
      this.$set(this.tableData[1], 0, 'X');
    },
  },
  mounted() {
    
  },
  beforeDestroy() {
    
  },
  watch: {
    
  },
};
</script>

<style scoped></style>
