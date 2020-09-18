<template>
  <div class="item-todo">
    <div class="row">
      <div class="col ">
        <p>{{ todo.task }} </p>
      </div>
      <div class="col">
        {{ formatDate(todo.deadline) }}
      </div>
      <div class="col">
        {{ getdaysleft(todo.deadline) }}
      </div>
      <div class="col">
        {{ todo.importance }}
      </div>
    </div>
    <div
      class="btn-supr btn btn-outline-danger"
      @click="supressTodo"
    >
      delete
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Todos extends Vue {
  todolist: {task: string; deadline: Date}[] = [];

  @Prop() private todo?: {task: string; deadline: Date; importance: number};

  @Prop() private index?: number;

  supressTodo (){
    this.$emit('onSuppress', this.index);
  }

  getdaysleft (deadline: Date): number{
    const DiffTime: number = deadline.getTime() - new Date().getTime();

    const diffTimeString: string = (DiffTime / (1000 * 3600 * 24)).toFixed(1);
    return parseFloat(diffTimeString);
  }

  formatDate (date: Date): string {
    const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(date);
    const mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(date);
    const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(date);
    return (`${da}-${mo}-${ye}`);
  }
}
</script>

<style scoped>
.item-todo{
  position: relative;
  padding: 20px 60px 20px 30px;
  font-size: 20px;
  height: 88px;
}
.btn-supr{
  position:absolute;
  top: 27px;
  right: 10px;
}
</style>
