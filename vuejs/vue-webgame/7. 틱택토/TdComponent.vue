<template>
    <td @click="onClickTd">{{ cellData }}</td>
</template>

<script>
export default {
    props: {
        cellData: String,
        cellIndex: Number,
        rowIndex: Number,
    },
    methods: {
        onClickTd() {
            if (this.cellData) {
                return;
            }
            
            // console.log(this.$root.$data); // { tableData, turn }
            // console.log(this.$parent.$data); // { parent }
            const rootData = this.$root.$data;
            const { tableData, turn } = rootData;
            this.$set(tableData[this.rowIndex], this.cellIndex, turn);
            // root, parent 참조관계는 component 갯수가 많아지면 한눈에 알기 어렵기 때문에 중앙통제실 개념의 Vuex를 사용하는 것이 좋음

            let win = false;
            if (tableData[this.rowIndex][0] === turn && tableData[this.rowIndex][1] === turn && tableData[this.rowIndex][2] === turn) {
                win = true;
            }
            if (tableData[0][this.cellIndex] === turn && tableData[1][this.cellIndex] === turn && tableData[2][this.cellIndex] === turn) {
                win = true;
            }
            if (tableData[0][0] === turn && tableData[1][1] === turn && tableData[2][2] === turn) {
                win = true;
            }
            if (tableData[0][2] === turn && tableData[1][1] === turn && tableData[2][0] === turn) {
                win = true;
            }

            if (win) { // 이긴 경우 : 3줄 달성
                rootData.winner = rootData.turn;
                rootData.turn = 'O';
                rootData.tableData = [['', '', ''], ['', '', ''], ['', '', '']];
            } else { // 지거나 무승부
                let all = true; // all이 true면 무승부라는 뜻
                tableData.forEach((row) => {
                    row.forEach((cell) => {
                        if (!cell) {
                            all = false;
                        }
                    });
                });
                if (all) { // 무승부
                    rootData.turn = 'O';
                    rootData.winner = '';
                    rootData.tableData = [['', '', ''], ['', '', ''], ['', '', '']];
                }

                rootData.turn = rootData.turn === 'O' ? 'X' : 'O'; // 자식컴포넌트에서 부모컴포넌트의 데이터 변경가능
            }
        },
    },
}
</script>