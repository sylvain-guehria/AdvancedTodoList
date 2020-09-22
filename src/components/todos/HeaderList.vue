<template>
  <div>
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
  </div>
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
    if (this.currentSortingMode === 'desc'){
      this.currentSortingMode = 'asc';
      this.updatedToDoList = this.lodash.orderBy(this.todolist, [attribut], ['asc']);
      this.$store.commit(this.functionToCall || '', this.updatedToDoList);
      this.$emit('onForceRerender');
    } else {
      this.currentSortingMode = 'desc';
      this.updatedToDoList = this.lodash.orderBy(this.todolist, [attribut], ['desc']);
      this.$store.commit(this.functionToCall || '', this.updatedToDoList);
      this.$emit('onForceRerender');
    }
  }

  sortByTimeLeft (): void {
    if (this.currentSortingMode === 'desc'){
      this.currentSortingMode = 'asc';
      this.updatedToDoList = this.lodash.orderBy(this.todolist,
        [function (resultItem: Todo) {
          if (resultItem && resultItem.deadline !== undefined) {
            return resultItem.deadline.getTime() - new Date().getTime();
          } else { return null; }
        }],
        ['asc']);
      this.$store.commit(this.functionToCall || '', this.updatedToDoList);
      this.$emit('onForceRerender');
    } else {
      this.currentSortingMode = 'desc';
      this.updatedToDoList = this.lodash.orderBy(this.todolist,
        [function (resultItem: Todo) {
          if (resultItem && resultItem.deadline !== undefined) {
            return resultItem.deadline.getTime() - new Date().getTime();
          } else { return null; }
        }],
        ['desc']);
      this.$store.commit(this.functionToCall || '', this.updatedToDoList);
      this.$emit('onForceRerender');
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
