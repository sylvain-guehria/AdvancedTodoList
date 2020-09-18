<template>
  <div>
    <ul class="border">
      <li>Your tasks</li>
      <li>
        <div class="card my-2 header-todo">
          <div class="row">
            <div class="col ">
              <strong> task</strong>
            </div>
            <div class="col">
              <strong>deadline</strong>
            </div>
            <div class="col">
              <strong>Number days left</strong>
            </div>
            <div class="col">
              <strong>importance (/100)</strong>
            </div>
          </div>
        </div>
      </li>
      <li
        v-for="(todo, index) in todolist"
        :key="index"
      >
        <todositem
          :todo="todo"
          :index="index"
          @onSuppress="supressTodo"
        /><hr>
      </li>
    </ul>
    <div>
      <todoform @onCreate="createTodo" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import TodosItem from './TodosItem.vue';
import TodoForm from '../components/TodoForm.vue';
import { Todo } from '../models/types';

@Component({
  components: {
    todositem: TodosItem,
    todoform: TodoForm

  }
})

export default class Todos extends Vue {
  todolist: Todo[] = [];

  @Prop() private title?: string;

  createTodo (todo: Todo): void{
    this.todolist.push(todo);
  }

  supressTodo (index: number): void{
    this.todolist.splice(index, 1);
  }

  beforeMount (): void {
    this.todolist = this.$store.state.todolist;
  }

  updated (){
    this.$store.commit('setTodoList', this.todolist);
  }
}
</script>

<style scoped>
.item-todo p {
  margin-bottom: 0!important;
}
ul{
  list-style-type: none ;
  padding: 0;
}
.header-todo{
  position: relative;
  font-size: 20px;
}
.border{
  padding : 20px 50px 50px 50px
}
</style>
