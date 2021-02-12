var app = new Vue({
  /**
   * [마운트할 요소]
   *   애플리케이션 인스턴스를 적용할 요소
   */
  el: '#app',

  /**
   * [데이터]
   *   애플리케이션에서 사용할 데이터(객체 or 배열)
   */
  data: {
    message: 'Hello Vue.js!',
    count: 0,
    list: ['사과', '바나나', '딸기'],
    show: true,
  },

  /**
   * [산출 속성]
   *   data와 비슷하게 사용하는 '함수로 인해 산출되는 데이터'(산출 속성)
   */
  computed: {
    computedMessage: function () {
      // 어떤 처리를 해서 결과 리턴하기
      return this.message + '!';
    },
  },

  /**
   * [라이프 사이클 훅]
   *   각자 적절한 시기에 자동으로 호출되는 함수
   *   - beforeCreate  인스턴스가 생성되고, 리액티브 초기화가 일어나기 전
   *   - created       인스턴스가 생성되고, 리액티브 초기화가 일어난 후
   *                    => 이 시점에는 DOM이 구축되지 않은 상태이므로 DOM 접근 불가능
   *   - beforeMount   인스턴스가 마운트되기 전
   *   - mounted       인스턴스가 마운트된 후
   *                    => 이 시점에는 DOM을 만든 직후에 호출되므로 DOM 접근 가능
   *                    => 하지만 모든 자식 컴포넌트가 마운트되었다는 것은 보증하지 않음
   *   - beforeUpdate  데이터가 변경되어 DOM에 적용되기 전
   *   - updated       데이터가 변경되어 DOM에 적용된 후
   *   - beforeDestroy Vue 인스턴스가 제거되기 전
   *   - destroyed     Vue 인스턴스가 제거된 후
   *   - errorCaptured 임의의 자식 컴포넌트에서 오류가 발생했을 때
   */
  created: function () {
    console.log('created');
  },

  /**
   * [메서드]
   *   애플리케이션에서 사용할 메서드
   */
  methods: {
    handleClick: function (event) {
      alert(event.target); // [object HTMLButtonElement]
    },
  },
});
