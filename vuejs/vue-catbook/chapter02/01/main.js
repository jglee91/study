var state = { count: 0 };
var app = new Vue({
  el: '#app',
  data: {
    state: state,
    message: 'Vue.js!',
    list: ['사과', '바나나', '딸기'],
    num: 1,
    scroll: 0,
    count: 0,
    isChild: true,
    isActive: true,
    textColor: '#ff0000',
    bgColor: 'lightgray',
    classObject: {
      child: true,
      'is-active': false,
    },
    styleObject: {
      color: '#ff0000',
      backgroundColor: 'lightgray',
    },
    item: {
      id: 1,
      src:
        'https://images.unsplash.com/photo-1593642531955-b62e17bdaa9c?ixid=MXwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      alt: '상품1의 섬네일',
      width: 300,
      height: 200,
    },
    radius: 50,
    ok: false,
    monsters: [],
  },
  created: function () {
    axios
      .get('./list.json')
      .then(
        function (response) {
          this.monsters = response.data;
        }.bind(this)
      )
      .catch(function (e) {
        console.error(e);
      });
  },
  mounted: function () {
    this.scroll = 100;
  },
  methods: {
    increment: function () {
      this.count += 1;

      // 미리 다른 변수에 대입하여 사용
      var vm = this;
      setTimeout(function () {
        vm.count++;
      }, 1000);
      // bind로 this를 변경
      setTimeout(
        function () {
          this.count++;
        }.bind(this),
        2000
      );
      // 화살표 함수를 사용하면 Vue 인스턴스에 접근 가능
      setTimeout(() => this.count++, 3000);
    },
    increment2: () => {
      // 여기서는 Vue 인스턴스를 this로 사용불가능
      // 메서드 내부에서는 외부의 스코프가 this가 됨
    },
    increment3() {
      // 이렇게 하면 Vue 인스턴스를 this로 사용가능
    },
    doAdd: function () {
      var max = this.monsters.reduce(function (a, b) {
        return a > b.id ? a : b.id;
      }, 0);
      this.monsters.push({
        id: max + 1,
        name: this.name,
        hp: 500,
      });
    },
    doAttack: function (index) {
      this.monsters[index].hp -= 10;
      this.monsters = this.monsters.filter(function (monster) {
        return monster.hp >= 100;
      });
    },
    doRemove: function (index) {
      this.monsters.splice(index, 1);
    },
    created: function () {
      // 배열에 index를 통한 직접 접근시 Vue 인스턴스가 감지하지 못함
      // $set을 사용
      this.monsters.forEach(function (monster) {
        this.$set(monster, 'active', false);
      }, this);
    },
  },
});
state.count++; // state.count는 리액티브 데이터
