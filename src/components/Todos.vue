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
              <strong> task</strong><v-btn
                icon
                color="green"
                @click="sortBy('task')"
              >
                <v-icon>mdi-cached</v-icon>
              </v-btn>
            </div>
            <div class="col">
              <strong>deadline</strong><v-btn
                icon
                color="green"
                @click="sortBy('deadline')"
              >
                <v-icon>mdi-cached</v-icon>
              </v-btn>
            </div>
            <div class="col">
              <strong>Number days left</strong><v-btn
                icon
                color="green"
                @click="sortByTimeLeft"
              >
                <v-icon>mdi-cached</v-icon>
              </v-btn>
            </div>
            <div class="col">
              <strong>importance (/100)</strong><v-btn
                icon
                color="green"
                @click="sortBy('importance')"
              >
                <v-icon>mdi-cached</v-icon>
              </v-btn>
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
          @onEdit="editTodo"
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

  currentSortingMode: string='';

  currentTodo: Todo ={
    task: '',
    deadline: new Date(),
    importance: 0,
    description: ''
  };

  @Prop() private title?: string;

  createTodo (todo: Todo): void{
    this.todolist.push(todo);
    console.log('jai push un todo');
  }

  editTodo (todo: Todo, date: string): void{
    console.log('j\'édit un todo, date :', date);
    todo.deadline = new Date(date);
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

  sortBy (attribut: string): void {
    if (this.currentSortingMode === 'desc'){
      this.currentSortingMode = 'asc';
      this.todolist = this.lodash.orderBy(this.todolist, [attribut], ['asc']);
    } else {
      this.currentSortingMode = 'desc';
      this.todolist = this.lodash.orderBy(this.todolist, [attribut], ['desc']);
    }
  }

  sortByTimeLeft (): void {
    if (this.currentSortingMode === 'desc'){
      this.currentSortingMode = 'asc';
      this.todolist = this.lodash.orderBy(this.todolist,
        [function (resultItem) {
          if (resultItem) {
            return resultItem.deadline.getTime() - new Date().getTime();
          } else { return null; }
        }],
        ['asc']);
    } else {
      this.currentSortingMode = 'desc';
      this.todolist = this.lodash.orderBy(this.todolist,
        [function (resultItem) {
          if (resultItem) {
            return resultItem.deadline.getTime() - new Date().getTime();
          } else { return null; }
        }],
        ['desc']);
    }
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
