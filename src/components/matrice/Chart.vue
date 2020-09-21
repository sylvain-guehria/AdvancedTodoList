<template>
  <div class="container">
    <img
      :src="imageLink"
    >
    <button
      class="btn1 btn"
    >
      4 Task
    </button>
    <button
      class="btn2 btn"
    >
      4 Task
    </button>
    <button
      class="btn3 btn"
    >
      1 Task
    </button>
    <button
      class="btn4 btn"
    >
      0 Task
    </button>
    <div class="title1 title">
      <h3> Give these tasks up </h3>
    </div>
    <div class="title2 title">
      <h3>  Do it right now ! </h3>
    </div>
    <div class="title3 title">
      <h3>  Not Important / Urgent </h3>
    </div>
    <div class="title4 title">
      <h3>  Do it when you can</h3>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { Todo } from '../../models/types';

@Component
export default class Chart extends Vue{
  @Prop() todolist?: Todo[];

  imageLink = require('../../assets/images/4color.png');
}

</script>

<style scoped>

.container {
  position: relative;
  width: 100%;
}
.container img {
  width: 80%;
  height: auto;
}

.container .btn1 {
  position: absolute;
  top: 75%;
  left: 75%;
  transform: translate(-75%, -75%);
  -ms-transform: translate(-75%, -75%);
}

.container .btn2 {
  position: absolute;
  top: 25%;
  left: 25%;
  transform: translate(-25%, -25%);
  -ms-transform: translate(-25%, -25%);
}

.container .btn3 {
  position: absolute;
  top: 75%;
  left: 25%;
  transform: translate(-25%, -75%);
  -ms-transform: translate(-25%, -75%);
}

.container .btn4 {
  position: absolute;
  top: 25%;
  left: 75%;
  transform: translate(-75%, -25%);
  -ms-transform: translate(-75%, -25%);
}

.container .title1 {
  position: absolute;
  top: 90%;
  left: 75%;
  transform: translate(-75%, -75%);
  -ms-transform: translate(-75%, -75%);
}

.container .title2 {
  position: absolute;
  top: 10%;
  left: 25%;
  transform: translate(-25%, -25%);
  -ms-transform: translate(-25%, -25%);
}

.container .title3 {
  position: absolute;
  top: 90%;
  left: 25%;
  transform: translate(-25%, -75%);
  -ms-transform: translate(-25%, -75%);
}

.container .title4 {
  position: absolute;
  top: 10%;
  left: 75%;
  transform: translate(-75%, -25%);
  -ms-transform: translate(-75%, -25%);
}

.container .btn {
  border-radius: 50%;
  width: 10vw;
  height: 10vw;
  line-height: 10vw;
  background-color:white;
  color: #7c795d;
  font-family: 'Trocchi', serif;
  font-size: 30px;
}

.container .title {
  color: white;
  font-family: 'Trocchi';
}

</style>
