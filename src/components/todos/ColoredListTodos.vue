<template>
  <v-card class="mx-auto ml-7 mr-7 mt-7 mb-7">
    <br>
    <ul class="ml-7 mr-7">
      <li class="container mb-5">
        <img
          width="30%"
          :src="imageLink"
        >
      </li>
      <li>
        <headerlist
          :todolist="coloredtodolist"
          whatlist="colored"
          @onForceRerender="forceRerender"
        />
      </li>
      <li
        v-for="(todo, index) in coloredtodolist"
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
      <br>
    </ul>
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
          @onClose="hide"
        />
      </div>
    </modal>
  </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import TodosItem from './TodosItem.vue';
import { Todo } from '../../models/types';
import TodoFullDescription from './TodoFullDescription.vue';
import HeaderList from '../todos/HeaderList.vue';
import TodoEditForm from './TodoEditForm.vue';

@Component({
  components: {
    todositem: TodosItem,
    todofulldescp: TodoFullDescription,
    headerlist: HeaderList,
    todoeditform: TodoEditForm
  }
})

export default class ColoredListTodos extends Vue {
  coloredtodolist: Todo[] = [];

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

  updated (){
    // this.$store.commit('setColoredTodoList', this.coloredtodolist);
    this.coloredtodolist = this.$store.state.coloredtodolist;
  }

  beforeMount (): void {
    this.coloredtodolist = this.$store.state.coloredtodolist;
  }

  show (index: number): void {
    this.currentIndex = index;
    if (this.coloredtodolist) this.currentTodo = this.coloredtodolist[index];
    this.$modal.show('viewmodal');
  }

  hide () {
    this.$modal.hide('viewmodal');
    this.$modal.hide('editmodal');
  }

  forceRerender () {
    this.componentKey += 1;
  }

  supressTodo (indexColoredList: number): void{
    this.todolist = this.$store.state.todolist;
    if (this.coloredtodolist) this.currentTodo = this.coloredtodolist[indexColoredList];

    this.currentIndex = this.todolist.findIndex((todo: Todo) => {
      return this.lodash.isEqual(todo, this.currentTodo);
    });

    // surpess from todolist + coloredtodolist
    this.todolist.splice(this.currentIndex, 1);
    this.$store.commit('setTodoList', this.todolist);
    this.coloredtodolist.splice(indexColoredList, 1);
  }

  showEditModal (index: number): void {
    this.currentIndex = index;
    this.currentTodo = this.coloredtodolist[index];
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
