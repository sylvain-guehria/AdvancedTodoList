<template>
  <div class="hello">
    <ul>
      <li>{{ title }}</li><li /><li
        v-for="(todo, index) in todolist"
        :key="index"
      >
        {{ todo.task }} before {{ todo.before }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Todos extends Vue {
  todolist: {task: string; before: Date}[] = [];

  @Prop() private title?: string;

  created (): void {
    // Le composant a été instancié : il est possible par exemple de faire un appel d'API pour récupérer les données du véhicule
    this.todolist = [
      { task: 'do laundery',
        before: new Date() },
      {
        task: 'do cooking',
        before: new Date(2018, 8, 13)
      },
      { task: 'do nothing',
        before: new Date(2020, 9, 22) }
    ];
  }

  getTodos (): {task: string; before: Date}[] {
    return this.todolist;
  }
}
</script>

<style >
</style>
