<template>
  <div>
    <p>{{ turn }}님의 턴입니다.</p>
    <!-- <table-component :table-data="tableData"></table-component> -->
    <!-- Vuex로 computed의 데이터는 store의 state가 변경될때마다 매번 실행됨 -->
    <!-- 실제 성능상의 큰 문제는 없으므로 table, tr, td component를 분리할 필요가 없어짐 -->
    <!-- Vue에서는 Virtual DOM 알고리즘을 통해 변경되는 element만 치환됨 -->
    <!-- <table>
      <tr v-for="(rowData, rowIndex) in tableData" :key="rowIndex">
        <td v-for="(cellData, cellIndex) in rowData" :key="cellIndex" @click="onClickTd(rowIndex, cellIndex)">{{ cellData }}</td>
      </tr>
    </table> -->
    <table-component>
      <!-- custom component 내에 element를 넣으면, component에서는 slot으로 받아서 사용할 수 있음 -->
      <!-- slot을 사용하면, TableComponent에 데이터를 넣지 않아도 됨 (IOC 개념) -->
      <tr v-for="(rowData, rowIndex) in tableData" :key="rowIndex">
        <td v-for="(cellData, cellIndex) in rowData" :key="cellIndex" @click="onClickTd(rowIndex, cellIndex)">{{ cellData }}</td>
      </tr>
    </table-component>
    <div v-if="winner">{{ winner }}님의 승리!</div>
  </div>
</template>

<script>
// component를 쪼갠 이유는, 데이터 업데이트시 리렌더링 되는 단위를 최소화하여 UI 최적화를 하기 위함
import { mapState } from 'vuex';
import store, { CHANGE_TURN, CLICK_CELL, NO_WINNER, RESET_GAME, SET_WINNER } from './store';
import TableComponent from './TableComponent';

export default {
  store, // this.$store 사용 가능
  components: {
    TableComponent,
  },
  data() {
    return {
      data: 1,
    };
  },
  computed: {
    // winner() {
    //   return this.$store.state.winner;
    // },
    // turn() {
    //   return this.$store.state.turn;
    // }
    ...mapState(['tableData', 'winner', 'turn']),
    // 아래와 같은 형태로도 작성 가능 (Vue 공식문서 참고할 것)
    // ...mapState({
    //   winner: state => state.winner,
    //   // winner(state) {
    //   //   return state.winner + this.data;
    //   // },
    //   turnState: 'turn',
    // }),
  },
  methods: {
    onChangeData() {
      this.$set(this.tableData[1], 0, 'X');
    },
    onClickTd(rowIndex, cellIndex) {
      if (this.cellData) {
          return;
      }

      // this.$set(this.tableData[rowIndex], cellIndex, this.turn);
      this.$store.commit(CLICK_CELL, { row: rowIndex, cell: cellIndex }); // mutation은 commit으로 실행

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
          // this.winner = this.turn;
          this.$store.commit(SET_WINNER, this.turn);
          // this.turn = 'O';
          // this.tableData = [['', '', ''], ['', '', ''], ['', '', '']];
          this.$store.commit(RESET_GAME);
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
              // this.winner = '';
              this.$store.commit(NO_WINNER);
              // this.turn = 'O';
              // this.tableData = [['', '', ''], ['', '', ''], ['', '', '']];
              this.$store.commit(RESET_GAME);
          } else {
              // this.turn = this.turn === 'O' ? 'X' : 'O'; // 자식컴포넌트에서 부모컴포넌트의 데이터 변경가능
              this.$store.commit(CHANGE_TURN);
          }
      }
    },
  },
  created() {
    
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
