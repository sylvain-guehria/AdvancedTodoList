<template>
  <div>
    <ul>
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
        />
      </li>
    </ul>
    <div class="container">
      <todoform @onCreate="createTodo" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import TodosItem from './TodosItem.vue';
import TodoForm from '../components/TodoForm.vue';

interface Todo {
  task: string;
  deadline: Date;
  importance?: number;
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
  }

  supressTodo (index: number): void{
    this.todolist.splice(index, 1);
  }

  beforeMount (): void {
    this.todolist = [
      { task: 'do laundery',
        deadline: new Date(),
        importance: 42
      },
      {
        task: 'do cooking',
        deadline: new Date(2018, 8, 13),
        importance: 68
      },
      { task: 'do nothing',
        deadline: new Date(2020, 9, 22),
        importance: 11
      }
    ];
  }

  created (): void {

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
</style>
