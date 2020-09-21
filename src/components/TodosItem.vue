<template>
  <div class="item-todo">
    <div
      class="row mr-5"
      @click="showTask"
    >
      <div class="col ">
        <p>{{ todo.task }} </p>
      </div>
      <div class="col">
        {{ formatDate(todo.deadline) }}
      </div>
      <div class="col">
        {{ getdaysleft(todo.deadline) }}
      </div>
      <div class="col">
        {{ todo.importance }}
      </div>
    </div>
    <div
      class="btn-supr"
    >
      <v-btn
        color="error"
        fab
        small
        dark
        @click="supressTodo"
      >
        <v-icon>mdi-trash-can-outline</v-icon>
      </v-btn>
    </div>
    <div class="btn-edit">
      <v-btn
        color="primary"
        fab
        small
        dark
        @click="showEditModal"
      >
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Todo } from '../models/types';

@Component
export default class Todos extends Vue {
  todolist: Todo[] = [];

  @Prop() private todo?: Todo;

  @Prop() private index?: number;

  supressTodo (){
    this.$emit('onSuppress', this.index);
  }

  showTask (){
    this.$emit('onClickModal', this.index);
  }

  showEditModal (){
    this.$emit('onClickEditModal', this.index);
  }

  getdaysleft (deadline: Date): number{
    const DiffTime: number = deadline.getTime() - new Date().getTime();

    const diffTimeString: string = (DiffTime / (1000 * 3600 * 24)).toFixed(1);
    return parseFloat(diffTimeString);
  }

  formatDate (date: Date): string {
    const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(date);
    const mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(date);
    const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(date);
    return (`${da}-${mo}-${ye}`);
  }
}
</script>

<style scoped>
.item-todo{
  position: relative;
  padding: 20px 60px 20px 30px;
  font-size: 20px;
  height: 88px;
}
.btn-supr{
  position:absolute;
  top: 25px;
  right: 70px;
}
.btn-edit{
  position:absolute;
  top: 25px;
  right: 10px;
}
</style>
