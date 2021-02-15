// Vuex의 store는 여러개를 가질 수 있음 (단일 store인 redux와는 다른점)
import Vue from 'vue';
import Vuex from 'vuex';

// Store 하기전에 use로 연결해주어야함
// main.js의 import 순서 때문에 store에서 연결해주어야 함...
Vue.use(Vuex);

export const SET_WINNER = 'SET_WINNER';
export const CLICK_CELL = 'CLICK_CELL';
export const CHANGE_TURN = 'CHANGE_TURN';
export const RESET_GAME = 'RESET_GAME';
export const NO_WINNER = 'NO_WINNER';

export default new Vuex.Store({
    // Vuex 기본 구성 : state, mutations, getters, actions
    state: {
        tableData: [
            ['', '', ''],
            ['', '', ''],
            ['', '', ''],
        ],
        turn: 'O',
        winner: '',
    }, // vue의 data와 비슷
    getters: {
        turnMessage(state) {
            return state.turn + '님이 승리하셨습니다.';
        },
    }, // vue의 computed와 비슷
    mutations: {
        // mutation의 경우, vue-dev-tools에서 추적 및 디버깅 가능
        [SET_WINNER](state, winner) {
            state.winner = winner;
        },
        [CLICK_CELL](state, { row, cell }) {
            Vue.set(state.tableData[row], cell, state.turn);
        },
        [CHANGE_TURN](state) {
            state.turn = state.turn === 'O' ? 'X' : 'O';
        },
        [RESET_GAME](state) {
            state.turn = 'O';
            state.tableData = [
                ['', '', ''],
                ['', '', ''],
                ['', '', ''],
            ];
        },
        [NO_WINNER](state) {
            state.winner = '';
        },
    }, // state를 수정할때 사용(동기적으로)
    actions: {

    }, // 비동기를 사용할때, 또는 여러 뮤테이션을 연달아 실행할 때
});
