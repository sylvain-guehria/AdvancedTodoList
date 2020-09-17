<template>
  <div class="home">
    <todos title="My TODO list" />
    <todoform />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Todos from '../components/Todos.vue';
import TodoForm from '../components/TodoForm.vue';

@Component({
  components: {
    todos: Todos,
    todoform: TodoForm
  }
})
export default class Home extends Vue {}
</script>
