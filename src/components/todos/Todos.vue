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
        <headerlist />
      </li>
      <li
        v-for="(todo, index) in whatList === 'todoList' ?
          this.$store.getters.getTodoList : this.$store.getters.getColoredtodolist"
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
      @before-close="beforeCloseForm"
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
      @before-close="beforeCloseForm"
    >
      <todofulldescp
        @onClickCloseDescriptionModal="hideviewmodal"
      />
    </modal>
    <modal
      scrollable
      name="editmodal"
      height="auto"
      @before-close="beforeCloseForm"
    >
      <div>
        <todoeditform
          title="Edit task"
          @onEdit="editTodo"
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
  @Prop() whatList?: string;

  todolist: Todo[] = [];

  currentIndex: number = 0;

  currentSortingMode: string='';

  componentKey: number = 0 ;

  currentTodo: Todo ={
    key: '',
    task: '',
    deadline: new Date().toISOString().substr(0, 10),
    importance: 0,
    description: [],
    creationDate: new Date().toISOString().substr(0, 10)
  };

  @Prop() private title?: string;

  imageLink = require('../../assets/images/To-Do-List.jpg');

  createTodo (todo: Todo): void{
    this.$store.dispatch('createTodo', todo);
    this.$modal.hide('formmodal');
  }

  hideviewmodal (): void{
    this.$modal.hide('viewmodal');
  }

  editTodo (todo: Todo): void{
    this.$store.dispatch('editTodo', todo);
    this.$modal.hide('editmodal');
  }

  supressTodo (key: string): void{
    this.$store.dispatch('deleteTodo', key);
  }

  show (): void {
    this.$modal.show('viewmodal');
  }

  showEditModal (): void {
    this.$modal.show('editmodal');
  }

  showFormModal (): void {
    this.$modal.show('formmodal');
  }

  beforeCloseForm () {
    this.$store.commit('resetCurrentTodo');
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
