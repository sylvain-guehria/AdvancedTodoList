<template>
  <div>
    <ul class="border">
      <li class="container">
        <!-- <img
          width="70%"
          :src="imageLink"
        > -->
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
        /><hr>
      </li>
    </ul>
    <modal
      name="viewmodal"
      height="auto"
    >
      <todofulldescp
        :current-todo="currentTodo"
        @onClickCloseModal="hide"
      />
    </modal>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import TodosItem from './TodosItem.vue';
import { Todo } from '../../models/types';
import TodoFullDescription from './TodoFullDescription.vue';
import HeaderList from '../todos/HeaderList.vue';

@Component({
  components: {
    todositem: TodosItem,
    todofulldescp: TodoFullDescription,
    headerlist: HeaderList
  }
})

export default class ColoredListTodos extends Vue {
    coloredtodolist: Todo[] = [];

    currentIndex: number = 0;

    currentSortingMode: string='';

    componentKey: number = 0 ;

    currentTodo: Todo ={
      task: '',
      deadline: new Date(),
      importance: 0,
      description: ''
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
  }

  forceRerender () {
    console.log('calling rerender colored');
    this.componentKey += 1;
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
