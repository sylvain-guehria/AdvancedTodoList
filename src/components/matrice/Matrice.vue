<template>
  <div>
    <div>
      <h1>Eisenhower Matrix</h1> <h3> {{ numberOfTasks }} Tasks </h3>
    </div>
    <chartei :todolist="todolist" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Todo } from '../../models/types';
import Chart from './Chart.vue';

@Component({
  components: {
    chartei: Chart
  }
})
export default class Matrice extends Vue{
  todolist: Todo[] = [];

  numberOfTasks: number = 0 ;

  beforeMount (): void {
    this.todolist = this.$store.state.todolist;
    this.numberOfTasks = this.todolist ? this.todolist.length : 0;
  }
}

</script>

<style scoped>
h1 {
  color: #7c795d;
  font-family: 'Trocchi', 'serif';
  font-size: 45px;
  font-weight: normal;
  line-height: 48px;
   }
  h3 {
  color: #7c795d;
  font-family: 'Trocchi', 'serif';
  }
</style>
