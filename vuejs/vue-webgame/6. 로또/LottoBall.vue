<template>
  <div class="ball" :style="styleObject">{{ number }}</div>
</template>

<script>
export default {
  name: 'LottoBall', // name을 안적어도 파일명으로 세팅됨
  // props: ['number'], // 배열형태로도 쓸 수 있음, read only 성격의 데이터
  props: {
    number: Number, // data type 형태로 작성
  },
  computed: {
    styleObject() {
      let background;
      if (this.number <= 10) {
        background = 'red';
      } else if (this.number <= 20) {
        background = 'orange';
      } else if (this.number <= 30) {
        background = 'yellow';
      } else if (this.number <= 40) {
        background = 'blue';
      } else {
        background = 'green';
      }
      return { background };
    },
  },
};
</script>

<style>
.ball {
  display: inline-block;
  border: 1px solid black;
  border-radius: 20px;
  width: 40px;
  height: 40px;
  line-height: 40px;
  font-size: 20px;
  text-align: center;
  margin-right: 20px;
}
</style>
