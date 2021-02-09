<template>
  <div>
    <!-- js표현식 내에는 camelCase로 써주어야함 / html tag면 kebab-case -->
    <div id="computer" :style="computedStyleObject"></div>
    <div>
      <button @click="onClickButton('rock')">바위</button>
      <button @click="onClickButton('scissors')">가위</button>
      <button @click="onClickButton('paper')">보</button>
    </div>
    <div>{{ result }}</div>
    <div>현재 {{ score }}점</div>

    <lifecycle-example v-if="true" />
  </div>
</template>

<script>
const rspCoords = {
  rock: '0',
  scissors: '-142px',
  paper: '-284px',
};
const scores = {
  rock: 1,
  scissors: 0,
  paper: -1,
};
const computerChoice = (imgCoord) => {
  return Object.entries(rspCoords).find((v) => {
    return v[1] === imgCoord;
  })[0];
};

let interval = null;

export default {
  data() {
    return {
      imgCoord: rspCoords.paper,
      result: '',
      score: 0,
    };
  },
  computed: {
    computedStyleObject() {
      return {
        background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${this.imgCoord} 0`,
      };
    },
  },
  methods: {
    changeHand() {
      setTimeout(() => {
        interval = setInterval(() => {
          if (this.imgCoord === rspCoords.rock) {
            this.imgCoord = rspCoords.scissors;
          } else if (this.imgCoord === rspCoords.scissors) {
            this.imgCoord = rspCoords.paper;
          } else if (this.imgCoord === rspCoords.paper) {
            this.imgCoord = rspCoords.rock;
          } 
        }, 100);
      }, 1000);
    },
    onClickButton(choice) {
      clearInterval(interval);

      const myScore = scores[choice];
      const cpuScore = scores[computerChoice(this.imgCoord)];
      const diff = myScore - cpuScore;

      switch (true) {
        case diff === 0:
          this.result = '비겼습니다.';
          break;

        case [-1, 2].includes(diff):
          this.result = '졌습니다.';
          this.score -= 1;
          break;

        default:
          this.result = '이겼습니다.';
          this.score += 1;
      }

      this.changeHand();
    },
  },

  /**
   * Life Cycle
   */
  beforeCreate() {
    console.log('beforeCreate');
  },
  created() {
    // component가 보여지기는 하지만, 화면에 나타나기 전
    console.log('created');
  },
  beforeMount() {
    console.log('beforeMount');
  },
  mounted() {
    // component가 보여지면서 화면에 나타난 후
    console.log('mounted');
    this.changeHand();
  },
  beforeUpdate() {
    console.log('beforeUpdate');
  },
  updated() {
    console.log('updated');
  },
  beforeDestroy() {
    // memory 해제 등의 작업을 실행 (memory leak 방지)
    console.log('beforeDestroy');
    clearInterval(interval);
  },
  destroyed() {
    console.log('destroyed');
  },
};
</script>

<style scoped>
#computer { width: 142px; height: 200px; background-position: 0 0; }
</style>
