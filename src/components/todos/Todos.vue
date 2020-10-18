<template>
  <v-card
    class="mx-auto"
  >
    <ul class="ml-7 mr-7 mt-7 mb-7">
      <li class="container">
        <img
          width="40%"
          :src="imageLink"
        >
      </li>
      <li>
        <headerlist
          :todolist="todolist"
          whatlist="normal"
          @onForceRerender="forceRerender"
        />
      </li>
      <li
        v-for="(todo, index) in todolist"
        :key="index"
      >
        <todositem
          :key="componentKey"
          :todo="todo"
          :index="index"
          @onSuppress="supressTodo"
          @onClickModal="show"
          @onClickEditModal="showEditModal"
        />
      </li>
    </ul>
    <div class="my-2 container btn-plus">
      <v-btn
        color="#7c795d"
        fab
        dark
        @click="showFormModal"
      >
        <v-icon>mdi-plus-circle-outline</v-icon>
      </v-btn>
    </div>
    <modal
      scrollable
      name="formmodal"
      height="auto"
    >
      <div>
        <todoform
          title="Add task"
          @onCreate="createTodo"
        />
      </div>
    </modal>
    <modal
      scrollable
      name="viewmodal"
      height="auto"
    >
      <todofulldescp
        :current-todo="currentTodo"
        @onClickCloseModal="hide"
      />
    </modal>
    <modal
      scrollable
      name="editmodal"
      height="auto"
      @onClickCloseModal="hide"
    >
      <div>
        <todoeditform
          title="Edit task"
          :current-todo="currentTodo"
          @onEdit="editTodo"
          @onClose="hide"
        />
      </div>
    </modal>
    <v-card
      class="mx-auto"
    />
  </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import TodosItem from './TodosItem.vue';
import TodoForm from './TodoForm.vue';
import TodoEditForm from './TodoEditForm.vue';
import { Todo } from '../../models/types';
import TodoFullDescription from './TodoFullDescription.vue';
import HeaderList from './HeaderList.vue';
import { database } from '../../firebase/firebase';

@Component({
  components: {
    todositem: TodosItem,
    todoform: TodoForm,
    todofulldescp: TodoFullDescription,
    todoeditform: TodoEditForm,
    headerlist: HeaderList
  }
})

export default class Todos extends Vue {
  todolist: Todo[] = [];

  currentIndex: number = 0;

  currentSortingMode: string='';

  componentKey: number = 0 ;

  currentTodo: Todo ={
    key: '',
    task: '',
    deadline: new Date(),
    importance: 0,
    description: '',
    creationDate: new Date()
  };

  @Prop() private title?: string;

  imageLink = require('../../assets/images/To-Do-List.jpg');

  // FIXME : now must push into firebase
  createTodo (todo: Todo): void{
    this.todolist.push(todo);
    this.hide();
  }

  forceRerender () {
    this.componentKey += 1;
  }

  // FIXME : now must edit into firebase
  editTodo (todo: Todo, date: string): void{
    todo.deadline = new Date(date);
    this.hide();
  }

  // FIXME : now must delete into firebase
  supressTodo (index: number): void{
    this.todolist.splice(index, 1);
  }

  // FIXME : change VmNZkobYaFfsmEqTVF87XGlcwag1 by the UID of the curent user. fix the dates, they are undefined right now.
  beforeMount (): void {
    const listoftodos: Todo[] = [];
    database.ref('todos/VmNZkobYaFfsmEqTVF87XGlcwag1').once('value', (snapshot) => {
      snapshot.forEach(function (childSnapshot) {
        const currentTodo: Todo = {
          key: childSnapshot.key || '',
          task: childSnapshot.val().task,
          deadline: childSnapshot.val().deadline,
          importance: childSnapshot.val().importance,
          description: childSnapshot.val().description,
          creationDate: childSnapshot.val().dateToday
        };
        listoftodos.push(currentTodo);
      });
      console.log('list of todos', listoftodos);
      this.todolist = listoftodos;
      console.log('todolist', this.todolist);
    });
    this.$store.commit('setTodoList', this.todolist);
  }

  updated (){
    // this.$store.commit('setTodoList', this.todolist);
    this.todolist = this.$store.state.todolist;
  }

  show (index: number): void {
    this.currentIndex = index;
    this.currentTodo = this.todolist[index];
    this.$modal.show('viewmodal');
  }

  hide () {
    this.$modal.hide('editmodal');
    this.$modal.hide('viewmodal');
    this.$modal.hide('formmodal');
  }

  showEditModal (index: number): void {
    this.currentIndex = index;
    this.currentTodo = this.todolist[index];
    this.$modal.show('editmodal');
  }

  showFormModal (): void {
    this.$modal.show('formmodal');
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
