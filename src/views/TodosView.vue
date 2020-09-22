<template>
  <div class="home">
    <todos title="My TODO list" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Todos from '../components/todos/Todos.vue';

@Component({
  components: {
    todos: Todos
  }
})
export default class Home extends Vue {}
</script>
