var app = new Vue({
  el: '#app',

  data: {
    show: true,
    url: 'http://google.com',
  },

  mounted: function () {
    // root 요소 참조
    console.log(this.$el); // -> <div id="app"></div>

    // 특정 요소 참조
    console.log(this.$refs.hello); // p 요소를 DOM으로 다룰 수 있음!

    // $el, $refs는 가상 DOM을 사용하지 않으므로 렌더링 최적화를 실시하지 않음
    //  -> 자주 변경되는 DOM 변경에는 사용하기에 적합하지 않음
  },

  methods: {
    handleClick() {
      // count up을 아무리 많이 하더라도 v-if로 변경이 일어나면 다시 0으로 돌아옴
      //  -> 직접DOM을 사용해 변경된 사항은 가상 DOM에 영향이 없기 때문
      var count = this.$refs.count;
      if (count) {
        count.innerText = parseInt(count.innerText, 10) + 1;
      }
    },
  },
});
