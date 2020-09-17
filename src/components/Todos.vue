<template>
  <div>
    <ul>
      <li
        v-for="(todo, index) in todolist"
        :key="index"
      >
        <todositem
          :todo="todo"
          @onSuppress="supressTodo"
        />
      </li>
    </ul>
    <todoform @onCreate="createTodo" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import TodosItem from './TodosItem.vue';
import TodoForm from '../components/TodoForm.vue';

interface Todo {
  task: string;
  before: Date;
}

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
    console.log(todo);
  }

  supressTodo (index: number): void{
    this.todolist.splice(index, index);
    console.log(index);
  }

  created (): void {
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
</style>
