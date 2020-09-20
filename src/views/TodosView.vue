<template>
  <div class="home">
    <todos title="My TODO list" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Todos from '../components/Todos.vue';

@Component({
  components: {
    todos: Todos
  }
})
export default class Home extends Vue {}
</script>
