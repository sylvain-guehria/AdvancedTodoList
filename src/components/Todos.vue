<template>
  <div class="hello">
    TODOS : 
<ul>
  <li>{{title}}<li>

  <li v-for="(todo, index) in todolist" :key="index">{{todo.task}} before {{todo.before}}</li>
</ul>

  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Todos extends Vue {

  todolist: Array<Object> = [];

  @Prop() private title?: string;

  created (): void {
    // Le composant a été instancié : il est possible par exemple de faire un appel d'API pour récupérer les données du véhicule
    this.todolist = [
      {'task': 'do laundery',
      'before': '05/41/60'},
      {
       'task': 'do cooking',
      'before': '09/78/16'
      },
      {'task': 'do nothing',
      'before': '85/91/984'}
    ]
  }

  getTodos(): Array<Object> {
    return this.todolist;
  }
}
</script>

<style >
</style>
