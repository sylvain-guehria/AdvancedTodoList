<template>
  <div class="home">
    <todos
      :key="componentKey"
      what-list="todoList"
      title="My TODO list"
    />
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
export default class Home extends Vue {
  componentKey: number = 0

//   forceRerender () {
//     //this.componentKey += 1;
//   }
}
</script>
