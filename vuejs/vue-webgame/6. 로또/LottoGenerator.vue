<template>
  <div>
    <div>당첨 숫자</div>
    <div id="결과창">
      <lotto-ball
        v-for="ball in winBalls"
        :key="ball"
        :number="ball"
      ></lotto-ball>
    </div>
    <div>보너스</div>
    <lotto-ball v-if="bonus" :number="bonus"></lotto-ball>
    <button v-if="redo" @click="onClickRedo">한 번 더!</button>
  </div>
</template>

<script>
import LottoBall from './LottoBall';

function getWinNumbers() {
  console.log('getWinNumbers');
  const candidate = Array(45)
    .fill()
    .map((v, i) => i + 1);
  const shuffle = [];
  while (candidate.length > 0) {
    shuffle.push(
      candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]
    );
  }
  const bonusNumber = shuffle[shuffle.length - 1];
  const winNumbers = shuffle.slice(0, 6).sort((p, c) => p - c);
  return [...winNumbers, bonusNumber];
}

const timeouts = [];

export default {
  components: {
    // 'lotto-ball': LottoBall,
    LottoBall, // kebab-case와 PascalCase가 호환될 경우 축소해서 사용가능
  },
  data() {
    return {
      winNumbers: getWinNumbers(),
      winBalls: [],
      bonus: null,
      redo: false,
    };
  },
  computed: {},
  methods: {
    onClickRedo() {
      this.winNumbers = getWinNumbers();
      this.winBalls = [];
      this.bonus = null;
      this.redo = false;
    },
    showBalls() {
      for (let i = 0; i < this.winNumbers.length - 1; i++) {
        timeouts[i] = setTimeout(() => {
          this.winBalls.push(this.winNumbers[i]);
        }, (i + 1) * 1000);
      }
      timeouts[6] = setTimeout(() => {
        this.bonus = this.winNumbers[6];
        this.redo = true;
      }, 7000);
    },
  },
  mounted() {
    this.showBalls();
  },
  beforeDestroy() {
    timeouts.forEach((t) => clearTimeout(t));
  },
  watch: {
    // 어떤값이 변경되었는지를 감시
    winBalls(value, oldValue) {
      // data key를 함수명으로 작성
      // 객체나 배열형태는 데이터 참조형태라서 value, oldValue 값이 동일하게 나오는 부작용이 있음
      // 가능하면 watch를 안쓰는게 나음 (watch 없이도 충분히 구현 가능)
      // watch는 비동기로 동작하기 때문에 화면오류가 발생할 수 있음
      if (value.length === 0) {
        this.showBalls();
      }
    },
  },
};
</script>

<style scoped></style>
