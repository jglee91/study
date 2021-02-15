<template>
  <div>
    <mine-form />
    <div>{{ timer }}</div>
    <table-component />
    <div>{{ result }}</div>
  </div>
</template>

<script>
// component를 쪼갠 이유는, 데이터 업데이트시 리렌더링 되는 단위를 최소화하여 UI 최적화를 하기 위함
import { mapState } from 'vuex';
import store, { INCREMENT_TIMER } from './store';
import MineForm from './MineForm';
import TableComponent from './TableComponent';

let interval;

export default {
  store, // this.$store 사용 가능
  components: {
    MineForm,
    TableComponent,
  },
  computed: {
    ...mapState(['timer', 'result', 'halted']),
  },
  methods: {
    
  },
  watch: {
    halted(value, oldValue) {
      if (!value) { // false일 때 게임시작
        interval = setInterval(() => {
          this.$store.commit(INCREMENT_TIMER);
          // 여담으로, javascript의 interval은 정확하지 않을 수 있다.
          // new Date를 써서 시간비교 하면서 하는게 정확함
        }, 1000);
      } else { // 게임 중단
        clearInterval(interval);
      }
    },
  },
};
</script>

<style>
table {
  border-collapse: collapse;
}
td {
  border: 1px solid black;
  width: 40px;
  height: 40px;
  text-align: center;
}
</style>
