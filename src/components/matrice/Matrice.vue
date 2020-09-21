<template>
  <div>
    <div> Matrice de eisenhower</div>
    <div>{{ todolist }}</div>
    <img :src="imageLink">
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

interface Todo {
  task: string;
  deadline: Date;
  importance?: number;
}

@Component
export default class Matrice extends Vue{
  todolist: Todo[] = [];

  imageLink = require('../../assets/images/4color.png');

  beforeMount (): void {
    this.todolist = this.$store.state.todolist;
  }
}

</script>
