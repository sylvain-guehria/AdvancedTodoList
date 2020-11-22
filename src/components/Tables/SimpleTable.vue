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

      <md-table-row slot="md-table-row" slot-scope="{ item, index }">
        <md-table-cell md-sort-by="order" md-label="Order" width="20px" v-if="getSettings('order')">
          <div class="row">
            <div class="block">
              <div class="chevron-order">
                <feather
                  type="chevron-up"
                  class="chevron-up"
                  @click="orderUp(item, index)"
                ></feather
                ><feather
                  type="chevron-down"
                  class="chevron-down"
                  @click="orderDown(item)"
                ></feather>
              </div>
            </div>
            <div class="block margin-left" @click="DisplayModalTask(item)">
              <p>{{ item.order }}</p>
            </div>
          </div>
        </md-table-cell>

        <md-table-cell md-sort-by="task" md-label="Task Title" v-if="getSettings('task')"
          ><div class="flex" @click="DisplayModalTask(item)">
            <div class="bullet" :class="bulletClass(item)"></div>
            <p>{{ item.task }} &nbsp; ({{ getNumberSubTaskActive(item) }})</p>
          </div>
        </md-table-cell>
        <md-table-cell md-sort-by="deadline" md-label="Deadline" v-if="getSettings('deadline')"  width="200px">
          <p @click="DisplayModalTask(item)">
            {{ item.deadline }}
          </p></md-table-cell
        >

         <md-table-cell
          md-label="Finish Time"
          width="200px"
          v-if="getSettings('numberdaysleft')"
        >
          <p @click="DisplayModalTask(item)">{{ item.numberdaysleft }}</p>
        </md-table-cell>

        <md-table-cell md-sort-by="creationDate"  width="200px" md-label="Creation date" v-if="getSettings('creationDate')">
          <p @click="DisplayModalTask(item)">
            {{ item.creationDate }}
          </p></md-table-cell
        >
       
        <md-table-cell
          md-sort-by="importance"
          md-label="Importance (/100)"
          width="50px"
          v-if="getSettings('importance')"
        >
          <p @click="DisplayModalTask(item)">{{ item.importance }}</p>
        </md-table-cell>
        <md-table-cell
          md-label="done / not done"
          class="last-column"
          width="50px"
          v-if="getSettings('isdone')"
        >
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
import lodash from "lodash";

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
    getSettings(column){
      return this.$store.getters.getSettings.hidden_column[column]
    },
    orderUp(item: Todo): void {
      let max_order = lodash.maxBy(this.todolist, "order").order;
      let keyItemToUpOrder = item.key;

      if (!item.order) {
        //varibale name here are just to use action and mutaion with same variable name
        max_order = max_order +1
        this.$store.dispatch("setOrder", { keyItemToUpOrder, max_order });
        return;
      }

      let todo_with_order_to_down = lodash.find(this.todolist, function (o) {
        return o.order === item.order + 1;
      });

      if (
        !todo_with_order_to_down
      ) {
        max_order = item.order + 1;
        this.$store.dispatch("setOrder", { keyItemToUpOrder, max_order });
        return;
      }

      let keytodoOrderDown = todo_with_order_to_down.key;

      this.$store.dispatch("setOrderUpTodo", keyItemToUpOrder);
      this.$store.dispatch("setOrderDownTodo", keytodoOrderDown);
    },
    orderDown(item: Todo): void {
      let min_order = lodash.minBy(this.todolist, "order").order;
      let todo_with_order_to_up = lodash.find(this.todolist, function (o) {
        return o.order === item.order - 1;
      });

      if (
        !todo_with_order_to_up
      ) {
        //varibale name here are just to use action and mutaion with same variable name
        let max_order = item.order - 1;
        let keyItemToUpOrder = item.key;
        this.$store.dispatch("setOrder", { keyItemToUpOrder, max_order });
        return;
      }

      let keytodoOrderDown = item.key;
      let keyItemToUpOrder = todo_with_order_to_up.key;

      this.$store.dispatch("setOrderUpTodo", keyItemToUpOrder);
      this.$store.dispatch("setOrderDownTodo", keytodoOrderDown);
    },
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
      if (item && item.importance) {
        // red Task : importance >= 75
        if (item.importance >= 75) {
          return 1;
        }
        // orange/jaune tasks : 50 >= importance > 75
        if (50 <= item.importance && item.importance < 75) {
          return 2;
        }
        // blue task : 25 >= importance > 50
        if (25 <= item.importance && item.importance < 50) {
          return 3;
        }
        // green  task : 0 >= importance > 25
        if (0 <= item.importance && item.importance < 25) {
          return 0;
        }
      }
      return;
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
.flex {
  display: flex !important ;
}
.flex-align {
  display: flex;
}
.bullet {
  margin-right: 10px;
  margin-top: 3px;
}

p {
  font-size: 19px !important;
  font-family: initial;
}
.chevron-order {
  display: block !important;
  width: 20px;
}
.row {
  width: 80%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  position: absolute;
  margin: auto;
  top: 0;
  left: 0;
  bottom: 0;
}
.block {
  justify-content: center;
  width: 30px;
  margin: auto;
}
.margin-left {
  margin-left: 20px;
}
</style>
