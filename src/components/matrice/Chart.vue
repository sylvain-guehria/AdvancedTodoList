<template>
  <div class="container">
    <img
      :src="imageLink"
    >
    <button
      class="btn1 btn"
    >
      {{ yellowTasks.length }} Task
    </button>
    <button
      class="btn2 btn"
    >
      {{ redTasks.length }} Task
    </button>
    <button
      class="btn3 btn"
    >
      {{ blueTasks.length }} Task
    </button>
    <button
      class="btn4 btn"
    >
      {{ greenTasks.length }} Task
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
import { myFunctions } from '../helpers/helperfunction';

@Component
export default class Chart extends Vue{
  @Prop() todolist?: Todo[];

  redTasks: Todo[] = [];

  greenTasks: Todo[] = [];

  blueTasks: Todo[] = [];

  yellowTasks: Todo[] = [];

  noCategorieTasks: Todo[] = [];

  imageLink = require('../../assets/images/4color.png');

  mounted (): void {
    if (this.todolist){
      for (const task of this.todolist){
        // red Task : important and urgent
        if (
          task &&
          task.importance &&
          task.deadline &&
          myFunctions.getdaysleft(task.deadline) < 2 &&
          task.importance >= 50) {
          this.redTasks.push(task);
          continue;
        }
        // green tasks : important, not urgent
        if (
          task &&
          task.importance &&
          task.deadline &&
          myFunctions.getdaysleft(task.deadline) >= 2 &&
          task.importance >= 50) {
          this.greenTasks.push(task);
          continue;
        }
        // blue task : urgent but not important
        if (
          task &&
          task.importance &&
          task.deadline &&
          myFunctions.getdaysleft(task.deadline) < 2 &&
          task.importance < 50) {
          this.blueTasks.push(task);
          continue;
        }
        // yellow  task : not urgent and not important
        if (
          task &&
          task.importance &&
          task.deadline &&
          myFunctions.getdaysleft(task.deadline) >= 2 &&
          task.importance < 50) {
          this.yellowTasks.push(task);
          continue;
        }
        if (task){ this.noCategorieTasks.push(task); }
      }
    }
  }
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
