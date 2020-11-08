<template>
  <div class="flex-column">
    <md-table v-model="paginatedTodos" md-sort="name" md-sort-order="asc" md-card>
      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-sort-by="task" md-label="Task Title">{{ item.task }}</md-table-cell>
        <md-table-cell md-sort-by="deadline" md-label="Deadline">{{ item.deadline }}</md-table-cell>
        <md-table-cell md-sort-by="creationDate" md-label="Creation date">{{
          item.creationDate
        }}</md-table-cell>
        <md-table-cell md-sort-by="numberdaysleft" md-label="Number days left">
          {{ item.numberdaysleft }}
        </md-table-cell>
        <md-table-cell md-sort-by="importance" md-label="Importance (/100)" class="last-column">
          {{ item.importance }}
        </md-table-cell>
        <md-table-cell md-fixed-header class="more-column right-arrow">
          <md-menu md-size="medium" :md-offset-x="-175" :md-offset-y="-120">
            <md-button md-menu-trigger>
              <md-icon>more_vert</md-icon>
            </md-button>
            <md-menu-content>
              <md-menu-item>
                <feather type="layout" class="md-icon"></feather>
                <span>Transfer to Gate 5</span>
              </md-menu-item>
              <md-menu-item>
                <feather type="arrow-right-circle" class="md-icon"></feather>
                <span>My Item 2</span>
              </md-menu-item>
              <md-menu-item>
                <feather type="file-plus" class="md-icon"></feather>
                <span>My Item 3</span>
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
import { myFunctions } from '../../helpers/helperfunction';
import { Todo } from '../../models/types';

export default {
  name: "simple-table",
  components: {
    "table-pagination": TablePaginationVue
  },
  props: {},
  methods: {
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
    },
  },
  created() {
    this.todos = this.$store.getters.getTodoList;
    this.paginatedTodos = [...this.todos];

    this.paginatedTodos.forEach( (todo: Todo) => {
      todo.numberdaysleft = this.getdaysleft(todo.deadline);
    })
  },
  data() {
    return {
      selected: [],
      todos: [],
      paginatedTodos: [],
      getdaysleft : myFunctions.getdaysleft
    };
  },
};
</script>

<style scoped>

</style>
