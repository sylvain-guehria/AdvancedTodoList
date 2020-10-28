<template>
  <div class="home">
    <todos
      :key="componentKey"
      title="My TODO list"
      @onForceRerender="forceRerender"
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

  forceRerender () {
    console.log('je force le re render de todo');
    console.log(this.componentKey);
    this.componentKey += 1;
    console.log(this.componentKey);
  }
}
</script>
