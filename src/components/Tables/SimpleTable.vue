<template>
  <div class="flex-column">
    <md-table
      v-model="paginatedTodos"
      md-sort="name"
      md-sort-order="asc"
      md-card
    >
      <md-empty-state v-if="this.$store.getters.getIsLoading"
        ><div class="spinner-rotate"></div
      ></md-empty-state>

      <md-empty-state
        v-if="!this.$store.getters.getIsLoading"
        class="md-primary"
        md-rounded
        md-icon="done"
        md-label="Nothing to do!"
        md-description="Create a Task with the button above and it will show up here."
      ></md-empty-state>

      <md-table-row
        slot="md-table-row"
        slot-scope="{ item }"
        @click="DisplayModalTask(item)"
      >
        <md-table-cell md-sort-by="order" md-label="Order"> 
          <p>{{
          item.order
        }}</p></md-table-cell>

        <md-table-cell md-sort-by="task" md-label="Task Title"
          ><div class="color-flex">
            <div class="bullet" :class="bulletClass(item)"></div>
            <p>{{ item.task }} &nbsp; ({{ getNumberSubTaskActive(item) }}) </p>
          </div>
        </md-table-cell>
        <md-table-cell md-sort-by="deadline" md-label="Deadline"> 
          <p>{{
          item.deadline
        }}</p></md-table-cell>
        <md-table-cell md-sort-by="creationDate" md-label="Creation date">
          <p>{{
          item.creationDate
        }}</p></md-table-cell>
        <md-table-cell md-sort-by="numberdaysleft" md-label="Number days left">
          <p>{{ item.numberdaysleft }}</p>
        </md-table-cell>
        <md-table-cell md-sort-by="importance" md-label="Importance (/100)">
          <p>{{ item.importance }}</p>
        </md-table-cell>
        <md-table-cell md-label="done / not done" class="last-column">
          <feather type="check" v-if="item.isdone"></feather>
          <feather type="x-circle" v-if="!item.isdone"></feather>
        </md-table-cell>
        <md-table-cell md-fixed-header class="more-column right-arrow">
          <md-menu
            md-size="medium"
            :md-offset-x="-175"
            :md-offset-y="-120"
            v-on:click.stop
          >
            <md-button md-menu-trigger>
              <md-icon>more_vert</md-icon>
            </md-button>
            <md-menu-content>
              <md-menu-item @click="editTodo(item.key)">
                <feather type="edit" class="md-icon"></feather>
                <span>Edit task</span>
              </md-menu-item>
              <md-menu-item @click="deleteTodo(item.key)">
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

    <!-- modal display task -->
    <div>
      <md-dialog
        :md-active.sync="showDialog"
        :show="showDialog"
        @show="showDialog = $event"
      >
        <display-task-modal
          :key="item ? item.id : null"
          :event="item ? item : null"
          @closeDialog="showDialog = false"
        ></display-task-modal>
      </md-dialog>
    </div>
  </div>
</template>

<script lang="ts">
import TablePaginationVue from "./TablePagination.vue";
import { myFunctions } from "../../helpers/helperfunction";
import { Todo } from "../../models/types";
import DisplayTaskModal from "../modals/DisplayTaskModal.vue";

export default {
  name: "simple-table",
  components: {
    "table-pagination": TablePaginationVue,
    "display-task-modal": DisplayTaskModal,
  },
  props: ["todolist"],
  computed: {
    isCompletelist: function () {
      return this.completelist;
    },
  },
  methods: {
    getNumberSubTaskActive(item): number {
      return item.description
        ? item.description.filter((subtask) => !subtask.isdone).length
        : 0;
    },
    deleteTodo(key: string): void {
      this.$store
        .dispatch("deleteTodo", key)
        .then(() => {
          this.$toasted.show("Task deleted, it is no longer in your list", {
            icon: "delete_outline",
            theme: "bubble",
            position: "bottom-right",
            duration: 5000,
          });
        })
        .catch((error: Error) => {
          this.$toasted.show("Cannot deleted Task", {
            icon: "error_outline",
            theme: "bubble",
            position: "bottom-right",
            duration: 5000,
          });
        });
    },
    editTodo(key: string): void {
      this.$emit("editTaskEvent", { key: key });
    },
    DisplayTask(key: string): void {
      this.$emit("showReadOnlyTaskDrawer", { key: key });
    },
    DisplayModalTask(item: Todo): void {
      this.item = item;
      this.showDialog = true;
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
    },
    bulletClass(item) {
      const index = this.giveColorTodo(item);
      const classes = ["bullet1", "bullet2", "bullet3", "bullet4", "bullet5"];
      return classes[index];
    },
    giveColorTodo(item): number {
      if (item && item.deadline) {
        // red Task : important and urgent ok
        if (this.getdaysleft(item.deadline) < 2 && item.importance >= 50) {
          return 1;
        }
        // orange/jaune tasks : important, not urgent
        if (this.getdaysleft(item.deadline) >= 2 && item.importance >= 50) {
          return 2;
        }
        // blue task : urgent but not important
        if (this.getdaysleft(item.deadline) < 2 && item.importance < 50) {
          return 3;
        }
        // green  task : not urgent and not important ok
        if (this.getdaysleft(item.deadline) >= 2 && item.importance < 50) {
          return 0;
        }
        if (item) {
          return 4;
        }
      }
    },
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
      item: {},
      showDialog: false,
    };
  },
};
</script>

<style lang="css" scoped>
.color-flex {
  display: flex;
}
.bullet {
  margin-right: 10px;
  margin-top: 3px;
}

p{
  font-size : 19px !important;
  font-family: initial;
}
</style>
