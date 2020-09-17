<template>
  <div>
    <div> FIRST MATRICE</div>
    <div>{{ todolist }}</div>
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

  beforeMount (): void {
    this.todolist = this.$store.state.todolist;
  }
}

</script>
