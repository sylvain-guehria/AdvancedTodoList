<template>
  <v-card
    class="mx-auto"
  >
    <div class="my-2 mr-7 header-todo">
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
    <v-card
      class="mx-auto"
      max-width="500"
    />
  </v-card>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import TodosItem from './TodosItem.vue';
import TodoForm from './TodoForm.vue';
import TodoEditForm from './TodoEditForm.vue';
import { Todo } from '../../models/types';
import TodoFullDescription from './TodoFullDescription.vue';

@Component({
  components: {
    todositem: TodosItem,
    todoform: TodoForm,
    todofulldescp: TodoFullDescription,
    todoeditform: TodoEditForm
  }
})

export default class HeaderList extends Vue {
  currentSortingMode: string='';

  @Prop() whatlist?: string;

  updatedToDoList: Todo[] = [];

  functionToCall?: string;

  todolist: Todo[] = [];

  beforeMount (): void {
    if (this.whatlist === 'normal') {
      this.todolist = this.$store.state.todolist;
      this.functionToCall = 'setTodoList';
    }

    if (this.whatlist === 'colored') {
      this.todolist = this.$store.state.coloredtodolist;
      this.functionToCall = 'setColoredTodoList';
    }
  }

  sortBy (attribut: string): void {
    this.$store.commit('sortBy', attribut);
  }

  sortByTimeLeft (): void {
    this.$store.commit('sortByTimeLeft');
  }
}
</script>

<style scoped>
.item-todo p {
  margin-bottom: 0!important;
  color: #7c795d;
  font-family: 'Trocchi', 'serif';
}
ul{
  list-style-type: none ;
  padding: 0;
}
.header-todo{
  position: relative;
  font-size: 20px;
  color: #7c795d;
  font-family: 'Trocchi', 'serif';
}
.border{
  padding : 20px 50px 50px 50px
}
</style>
