<template>
  <div>
    <ul class="border">
      <li class="container">
        Your TODO List
      </li>
      <li>
        <div class="card my-2 mr-7 header-todo">
          <div
            class="row"
          >
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
          @onClickModal="show"
          @onClickEditModal="showEditModal"
        /><hr>
      </li>
    </ul>
    <div>
      <todoform
        title="Add task"
        @onCreate="createTodo"
      />
    </div>
    <modal
      name="viewmodal"
      height="auto"
    >
      <todofulldescp
        :current-todo="currentTodo"
        @onClickCloseModal="hide"
      />
    </modal>
    <modal
      name="editmodal"
      height="auto"
      @onClickCloseModal="hide"
    >
      <div>
        <todoeditform
          title="Edit task"
          :current-todo="currentTodo"
        />
        <button
          class="btn btn-primary mb-2 mt-2"
          @click.prevent="hide"
        >
          Close
        </button>
      </div>
    </modal>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import TodosItem from './TodosItem.vue';
import TodoForm from '../components/TodoForm.vue';
import TodoEditForm from '../components/TodoEditForm.vue';
import { Todo } from '../models/types';
import TodoFullDescription from './TodoFullDescription.vue';

@Component({
  components: {
    todositem: TodosItem,
    todoform: TodoForm,
    todofulldescp: TodoFullDescription,
    todoeditform: TodoEditForm
  }
})

export default class Todos extends Vue {
  todolist: Todo[] = [];

  currentIndex: number = 0;

  currentTodo: Todo ={
    task: '',
    deadline: new Date(),
    importance: 0,
    description: ''
  };

  @Prop() private title?: string;

  createTodo (todo: Todo): void{
    this.todolist.push(todo);
  }

  editTodo (todo: Todo): void{
    // edit todo
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

  show (index: number): void {
    this.currentIndex = index;
    this.currentTodo = this.todolist[index];
    this.$modal.show('viewmodal');
  }

  hide () {
    this.$modal.hide('editmodal');
    this.$modal.hide('viewmodal');
  }

  showEditModal (index: number): void {
    this.currentIndex = index;
    this.currentTodo = this.todolist[index];
    this.$modal.show('editmodal');
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
