<template>
  <div class="flex-column">
    <md-table
      v-model="paginatedTodos"
      md-sort="name"
      md-sort-order="asc"
      md-card
    >

    
     <md-empty-state v-if="this.$store.getters.getIsLoading"
      ><div class="spinner-rotate"></div></md-empty-state>

      <md-empty-state
       v-if="!this.$store.getters.getIsLoading"
        class="md-primary"
        md-rounded
        md-icon="done"
        md-label="Nothing to do!"
        md-description="Create a Task with the button above and it will show up here."
      ></md-empty-state> 

      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-sort-by="task" md-label="Task Title">{{
          item.task
        }}</md-table-cell>
        <md-table-cell md-sort-by="deadline" md-label="Deadline">{{
          item.deadline
        }}</md-table-cell>
        <md-table-cell md-sort-by="creationDate" md-label="Creation date">{{
          item.creationDate
        }}</md-table-cell>
        <md-table-cell md-sort-by="numberdaysleft" md-label="Number days left">
          {{ item.numberdaysleft }}
        </md-table-cell>
        <md-table-cell
          md-sort-by="importance"
          md-label="Importance (/100)"
          class="last-column"
        >
          {{ item.importance }}
        </md-table-cell>
        <md-table-cell md-fixed-header class="more-column right-arrow">
          <md-menu md-size="medium" :md-offset-x="-175" :md-offset-y="-120">
            <md-button md-menu-trigger>
              <md-icon>more_vert</md-icon>
            </md-button>
            <md-menu-content>
              <md-menu-item @click="editTask(item.key)">
                <feather type="edit" class="md-icon"></feather>
                <span>Edit task</span>
              </md-menu-item>
              <md-menu-item @click="deleteTask(item.key)">
                <feather type="delete" class="md-icon"></feather>
                <span>Delete task</span>
              </md-menu-item>
              <md-menu-item @click="setTodoDone(item)" v-show="!item.isdone">
                <feather type="check" class="md-icon"></feather>
                <span>Mark task as done</span>
              </md-menu-item>
               <md-menu-item @click="setTodoDone(item)" v-show="item.isdone">
                <feather type="arrow-up-left" class="md-icon"></feather>
                <span>Mark task as not done</span>
              </md-menu-item>
            </md-menu-content>
          </md-menu>
        </md-table-cell>
      </md-table-row>
    </md-table>
    <table-pagination
      :data="todos"
      @pagination="onPagination($event)"
      :serverSide="false"
      @paginationEvent="doServerPagination($event)"
    ></table-pagination>
  </div>
</template>

<script lang="ts">
import TablePaginationVue from "./TablePagination.vue";
import { myFunctions } from "../../helpers/helperfunction";
import { Todo } from "../../models/types";

export default {
  name: "simple-table",
  components: {
    "table-pagination": TablePaginationVue
  },
  props: ["todolist"],
  computed: {
    isCompletelist: function() {
      return this.completelist;
    }
  },
  methods: {
    deleteTask(key: string): void {
      this.$store.dispatch("deleteTodo", key);
    },
    editTask(key: string): void {
      // FIXME
      //open modal edit
    },
    setTodoDone(item: Todo): void {
      this.$store.dispatch("setTodoDone", item);
    },
    onPagination(data) {
      this.paginatedTodos = data;
    },
    doServerPagination(paginationEvent) {
      // eslint-disable-next-line no-console
      console.log(
        "previousPageIndex: " +
          paginationEvent.previousPageIndex +
          "\n" +
          "pageIndex: " +
          paginationEvent.pageIndex +
          "\n" +
          "pageSize: " +
          paginationEvent.pageSize +
          "\n" +
          "length: " +
          paginationEvent.length
      );
    }
  },
  created() {
    this.todos = this.todolist;
    this.paginatedTodos = [...this.todos];

    if (this.paginatedTodos) {
      this.paginatedTodos.forEach((todo: Todo) => {
        todo.numberdaysleft = this.getdaysleft(todo.deadline);
      });
    }
  },
  data() {
    return {
      selected: [],
      todos: [],
      paginatedTodos: [],
      getdaysleft: myFunctions.getdaysleft,
    };
  }
};
</script>

<style lang="scss" scoped>

</style>
