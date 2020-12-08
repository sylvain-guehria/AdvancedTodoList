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
        md-subtasks="Create a Task with the button above and it will show up here."
      ></md-empty-state>

      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell
          md-sort-by="order"
          md-label="Order"
          width="50px"
          v-if="getSettings('order')"
        >
          <div class="row">
            <div class="chevron-order">
              <feather
                class="hover-click"
                type="chevron-left"
                @click="orderDown(item)"
                v-longclick="() => orderDown(item)"
              ></feather>
            </div>
            <div class="block-order">
              <p>
                {{ item.order }}
              </p>
            </div>
            <div class="chevron-order">
              <feather
                class="hover-click"
                v-longclick="() => orderUp(item)"
                type="chevron-right"
                @click="orderUp(item)"
              ></feather>
            </div>
          </div>
        </md-table-cell>

        <md-table-cell
          md-sort-by="task"
          md-label="Task Title"
          v-if="getSettings('task')"
          ><div
            class="flex p-padding"
            
          >
          <!--in the div above =>  @click.self="DisplayModalTask(item)" -->
            <feather
              size="15px"
              class="hover-click"
              v-if="!includeKey(item.key)"
              type="plus"
              @click="togleSubtasks(item.key)"
            ></feather>
            <feather
              class="hover-click"
              size="15px"
              type="minus"
              @click="unTogleSubtasks(item.key)"
              v-if="includeKey(item.key)"
            ></feather>
            <div class="block">
              <input-contenteditable
                v-model="item.task"
                _is="p"
                :maxlength="35"
                placeholder="Type a title"
                @giveTodoKey="setCurrentTodoEdited_key_attribue(item.key, todoTaskEnum)"
                @keyup.enter="onPressEnterOrBlur"
                @blur="onPressEnterOrBlur"
              />
              &nbsp;
            </div>
            <p> ({{ getNumberSubTaskActive(item) }}) </p>
              <div class="bullet" :class="bulletClass(item)"></div>
          </div>

          <!-- start subtable -->
          <div v-if="includeKey(item.key)" class="subtable">
            <simple-table-lvl1 :item="item"></simple-table-lvl1>
          </div>
          <!-- end subtable -->
        </md-table-cell>
        <md-table-cell
          md-sort-by="deadline"
          md-label="Deadline"
          v-if="getSettings('deadline')"
          width="130px"
        >
          <p >
            {{ item.deadline }}
          </p>
        </md-table-cell>

        <md-table-cell
          md-label="Finish Time"
          width="100px"
          v-if="getSettings('numberdaysleft')"
        >
          <p >{{ item.numberdaysleft }}</p>
        </md-table-cell>

        <md-table-cell
          md-sort-by="creationDate"
          width="100px"
          md-label="Creation date"
          v-if="getSettings('creationDate')"
        >
          <p >
            {{ item.creationDate }}
          </p></md-table-cell
        >

        <md-table-cell
          md-sort-by="importance"
          md-label="Imp/100"
          width="50px"
          v-if="getSettings('importance')"
        >
          <p >{{ item.importance }}</p>
        </md-table-cell>
        <md-table-cell
          md-label="done?"
          class="last-column"
          width="50px"
          v-if="getSettings('isdone')"
        >
          <feather type="check" v-if="item.isdone"></feather>
          <feather type="x" v-if="!item.isdone"></feather>
        </md-table-cell>

        <md-table-cell md-fixed-header class="more-column" width="50px">
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
              <md-menu-item @click="deleteTodo(item.key, item.order)">
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
import { myFunctions } from "@/common/helpers/helperfunction";
import { Todo, HTMLElementEvent, drawer } from "@/common/models/types/types";
import DisplayTaskModal from "../modals/DisplayTaskModal.vue";
import lodash from "lodash";
import SimpleTableLvl1 from "./SimpleTableLvl1.vue";
import { bus } from "@/main";
import { BusEvent } from "@/common/models/enums/enum";
import InputContenteditable from "@/common/componentslib/input-contenteditable/input-contenteditable.vue";

//task
import { ActionTypes as tasksActionsType } from "@/store/modules/todos/actions";
import { MutationTypes as tasksMutationType } from "@/store/modules/todos/mutations";
import { todoEnum } from "@/common/modules/todos/enumTodo";


export default {
  name: "simple-table",
  components: {
    "table-pagination": TablePaginationVue,
    "display-task-modal": DisplayTaskModal,
    "simple-table-lvl1": SimpleTableLvl1,
    "input-contenteditable": InputContenteditable,
  },
  props: ["todolist", "mainList"],
  computed: {
    isCompletelist: function () {
      return this.completelist;
    },
  },
  methods: {
    setCurrentTodoEdited_key_attribue(key, attribute){
      this.currentTodoKeyEdited = key;
      this.currentAttributeEdited = attribute;
    },
    onChangeInput(text){
      // eslint-disable-next-line no-console
      console.log('le text ',text);
    },
    onPressEnterOrBlur(e){
      if(!e.target.innerText){
        return;
      }

      let todoKey =  this.currentTodoKeyEdited;
      let attribute = this.currentAttributeEdited;
      let value = e.target.innerText;
      if (value){value = value.trim()}

       this.$store.dispatch(tasksActionsType.EDITATTRIBUTETASK, {
        todoKey,
        attribute,
        value,
      });
    },
    includeKey(key) {
      let keyInList: number = this.drawersOpenedArray.findIndex(
        (drawer) => drawer.key === key
      );
      if (keyInList === -1) {
        return false;
      } else {
        return true;
      }
    },

    togleSubtasks(key) {
      let drawer: drawer = {
        key: key,
        open: true,
      };
      this.drawersOpenedArray.unshift(drawer);

      this.$store.commit("setDrawersSettings", this.drawersOpenedArray);
    },

    unTogleSubtasks(key) {
      let indexInList: number = this.drawersOpenedArray.findIndex(
        (drawer) => drawer.key === key
      );
      if (indexInList != -1) this.drawersOpenedArray.splice(indexInList, 1);

      this.$store.commit("setDrawersSettings", this.drawersOpenedArray);
    },
    getSettings(columnLabel) {
      let colums = this.$store.getters.getSettings;
      let colum;
      if (colums) {
        colum = colums.hidden_column[columnLabel];
      }
      return colum;
    },
    orderUp(item: Todo): void {
      let max_order_todo: Todo = lodash.maxBy(this.paginatedTodos, "order");

      if (max_order_todo && item && max_order_todo.order === item.order) {
        return;
      }

      let max_order = max_order_todo ? max_order_todo.order : 0;
      let keyItemToUpOrder = item.key;

      if (!item.order) {
        //varibale name here are just to use action and mutaion with same variable name
        max_order = max_order + 1;
        this.$store.dispatch("setOrder", { keyItemToUpOrder, max_order });
        return;
      }

      let todo_with_order_to_down = lodash.find(this.todolist, function (o) {
        return o.order === item.order + 1;
      });

      if (!todo_with_order_to_down) {
        max_order = item.order + 1;
        this.$store.dispatch("setOrder", { keyItemToUpOrder, max_order });
        return;
      }

      let keytodoOrderDown = todo_with_order_to_down.key;

      this.$store.dispatch("setOrderUpTodo", keyItemToUpOrder);
      this.$store.dispatch("setOrderDownTodo", keytodoOrderDown);
    },
    orderDown(item: Todo): void {
      if (item.order && item.order <= 1) {
        return;
      }
      let min_order_todo = lodash.minBy(this.todolist, "order");
      let min_order = min_order_todo ? min_order_todo.order : 0;
      let todo_with_order_to_up = lodash.find(this.todolist, function (o) {
        return o.order === item.order - 1;
      });

      if (!todo_with_order_to_up) {
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
      return item.subtasks && item.subtasks.length > 0
        ? item.subtasks.filter((subtask) => !subtask.isdone).length
        : 0;
    },
    deleteTodo(key: string, order: number): void {
      let vm = this;
      this.$store
        .dispatch(tasksActionsType.DELETETODO, key)
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
      //down order poof todos with order > to the one deleted
      this.paginatedTodos.forEach(function (todo) {
        if (todo.order > order) {
          vm.downOrderNoCOndition(todo.key);
        }
      });

      var index = this.paginatedTodos.findIndex(function (o) {
        return o.key === key;
      });
      if (index !== -1) this.paginatedTodos.splice(index, 1);
    },
    downOrderNoCOndition(key: string) {
      this.$store.dispatch("setOrderDownTodo", key);
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
    addEmptyTask() {
      let higher_order: number;
      let todo_with_max_order: Todo;

      todo_with_max_order = lodash.maxBy(this.todolist, "order");

      if (todo_with_max_order) {
        higher_order = todo_with_max_order.order + 1;
      } else {
        higher_order = 1;
      }

      let emptyTodo: Todo = {
        task: `your Task N°${higher_order}`,
        isdone: false,
        creationDate: new Date().toISOString().substr(0, 10),
        order: higher_order,
      };

      this.$store
        .dispatch(tasksActionsType.CREATETODO, emptyTodo)
        .then(() => {
          this.$toasted.show("Task added, it is now in your list", {
            icon: "create",
            theme: "bubble",
            position: "bottom-right",
            duration: 5000,
          });
        })
        .catch((error: Error) => {
          this.$toasted.show("Cannot create task", {
            icon: "error_outline",
            theme: "bubble",
            position: "bottom-right",
            duration: 5000,
          });
        });
      this.paginatedTodos.unshift(emptyTodo);
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

    if (this.mainList) {
      bus.$on(BusEvent.ADDEMPTYTASK, this.addEmptyTask);
    }
  },
  beforeDestroy() {
    bus.$off(BusEvent.ADDEMPTYTASK, this.addEmptyTask);
  },
  data() {
    return {
      selected: [],
      todos: [],
      paginatedTodos: [],
      getdaysleft: myFunctions.getdaysleft,
      item: {},
      showDialog: false,
      drawersOpenedArray: [],
      placeholder: 'type your title',
      currentTodoKeyEdited : '',
      currentAttributeEdited : '',
      todoTaskEnum : todoEnum.TASK
    };
  },
};
</script>

<style lang="scss" scoped>
.hover-click {
  cursor: pointer;
}
.p-padding {
  padding-top: 10px;
  padding-bottom: 10px;
}
.flex {
  display: flex  ;
}
.block {
  display: block !important ;
}
.flex-align {
  display: flex;
}
.bullet {
  margin-right: 10px;
  margin-top: 6px;
}

p {
  font-size: 19px !important;
  font-family: initial;
  margin-left: 10px;
  margin-right: 10px;
}
.chevron-order {
  width: 20px;
  margin: auto;
}
.row {
  display: flex;
  flex-direction: row;
  justify-content: center;
  position: absolute;
  margin: auto;
  top: 0;
  left: 25px;
  bottom: 0;
}
.block-order {
  justify-content: center;
  width: 30px;
  margin: auto;
}
.subtable {
  margin-left: 5px;
}
</style>
