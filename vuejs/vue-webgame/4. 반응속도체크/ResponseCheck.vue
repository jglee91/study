<template>
  <!-- template 바로 아래의 자식 element에는 template을 쓸 수 없음... -->
  <!-- 얘는 어쩔수 없이 div를 써야함 (쓸데없이 감싸는 방법이 있기는 하지만, 그냥 편하게 div를 쓰도록 하자) -->
  <div>
    <!-- <div id="screen" v-bind:class="state">{{ message }}</div> -->
    <div id="screen" :class="state" @click="onClickScreen">{{ message }}</div>
    <!-- 불필요한 div가 싫다! 라고 할 때는 template을 쓰자 (실제 화면에 렌더링 될때는 template 태그가 나타나지 않음) -->
    <!-- 하나 더 알게된 사실. template 태그에는 v-show가 안먹는다! (v-if는 먹음) -->
    <template v-if="result.length">  <!-- v-show 일 경우, display none 처리됨 -->
    <!-- <template v-show="result.length"> -->
      <!-- template 내에 js 데이터 가공 수식을 넣기보다는, computed를 활용하도록 하자 -->
      <!-- computed 는 caching 기능이 있음, data 변화가 일어나면 template이 다시 그려짐 -->
      <!-- js 가 오래걸릴수록 UX가 떨어짐 -->
      <div>평균 시간: {{ average }} ms</div>
      <button @click="onReset">리셋</button>
    </template>
    <!-- v-show 보다는 v-if를 더 많이 쓴다고 함 -->
    <div v-if="result.length">  <!-- v-if 일 경우, 태그 자체가 존재하지 않고 주석표시로 나타남 -->
      <div>평균 시간: {{ average }} ms</div>
      <button @click="onReset">리셋</button>
    </div>
  </div>
</template>

<script>
let startTime = 0;
let endTime = 0;
let timeout = null;

export default {
  data() {
    return {
      result: [],
      state: 'waiting',
      message: '클릭해서 시작하세요.',
    };
  },
  computed: {
    average() {
      return Math.floor((this.result.reduce((a, c) => a + c, 0) / this.result.length)) || 0;
    },
  },
  methods: {
    onReset() {
      this.result = [];
    },
    onClickScreen() {
      if (this.state === 'waiting') {
        this.state = 'ready';
        this.message = '초록색이 되면 클릭하세요.';
        timeout = setTimeout(() => {
          this.state = 'now';
          this.message = '지금 클릭!';
          startTime = new Date();
        }, Math.floor(Math.random() * 1000) + 2000);
      } else if (this.state === 'ready') {
        clearTimeout(timeout);
        this.state = 'waiting';
        this.message = '너무 성급하시군요! 초록색이 된 후에 클릭하세요.';
      } else if (this.state === 'now') {
        endTime = new Date();
        this.state = 'waiting';
        this.message = '클릭해서 시작하세요.';
        this.result.push(endTime - startTime);
      }
    },
  },
};
</script>

// scoped 를 붙이면, 해당 component 내에서만 style이 적용됨
// build 후 개발자 도구 element를 보면, uid값이 붙은 것을 확인할 수 있음
<style scoped>
#screen { width: 300px; height: 200px; text-align: center; user-select: none; }
#screen.waiting { background-color: aqua; }
#screen.ready { background-color: red; color: white; }
#screen.now { background-color: greenyellow; }
</style>
