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
import EventBus from './EventBus';

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
      this.$set(this.tableData[1], 0, 'X');
    },
    onClickTd(rowIndex, cellIndex) {
      console.log(rowIndex, cellIndex);

      this.$set(this.tableData[rowIndex], cellIndex, this.turn);

      let win = false;
      if (this.tableData[rowIndex][0] === this.turn && this.tableData[rowIndex][1] === this.turn && this.tableData[rowIndex][2] === this.turn) {
          win = true;
      }
      if (this.tableData[0][cellIndex] === this.turn && this.tableData[1][cellIndex] === this.turn && this.tableData[2][cellIndex] === this.turn) {
          win = true;
      }
      if (this.tableData[0][0] === this.turn && this.tableData[1][1] === this.turn && this.tableData[2][2] === this.turn) {
          win = true;
      }
      if (this.tableData[0][2] === this.turn && this.tableData[1][1] === this.turn && this.tableData[2][0] === this.turn) {
          win = true;
      }

      if (win) { // 이긴 경우 : 3줄 달성
          this.winner = this.turn;
          this.turn = 'O';
          this.tableData = [['', '', ''], ['', '', ''], ['', '', '']];
      } else { // 지거나 무승부
          let all = true; // all이 true면 무승부라는 뜻
          this.tableData.forEach((row) => {
              row.forEach((cell) => {
                  if (!cell) {
                      all = false;
                  }
              });
          });
          if (all) { // 무승부
              this.turn = 'O';
              this.winner = '';
              this.tableData = [['', '', ''], ['', '', ''], ['', '', '']];
          }

          this.turn = this.turn === 'O' ? 'X' : 'O'; // 자식컴포넌트에서 부모컴포넌트의 데이터 변경가능
      }
    },
  },
  created() {
    // $on 으로 이벤트 등록
    EventBus.$on('clickTd', this.onClickTd);
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
