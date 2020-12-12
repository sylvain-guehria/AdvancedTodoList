<template>
  <div class="flex-column">
    <md-table v-model="paginatedTodos" md-sort="name" md-sort-order="asc" md-card>
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

      <md-table-row
        slot="md-table-row"
        slot-scope="{ item, index }"
        :class="index % 2 !== 0 ? 'other-color-row' : ''"
      >
        <md-table-cell
          md-numeric
          md-sort-by="order"
          md-label="Order"
          v-if="getSettings('order')"
          width="100px"
        >
          <div class="row-order">
            <div class="chevron-order">
              <feather
                class="hover-click"
                type="chevron-left"
                size="20px"
                @click="orderDown(item)"
                v-longclick="() => orderDown(item)"
              ></feather>
            </div>
            {{ item.order }}
            <div class="chevron-order">
              <feather
                class="hover-click"
                size="20px"
                v-longclick="() => orderUp(item)"
                type="chevron-right"
                @click="orderUp(item)"
              ></feather>
            </div>
          </div>
        </md-table-cell>

        <md-table-cell md-sort-by="task" md-label="Task Title" v-if="getSettings('task')"
          ><div class="flex">
            <!--in the div above =>  @click.self="DisplayModalTask(item)" -->
            <div class="plus-minus">
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
            </div>
            <div class="block">
              <input-contenteditable
                v-model="item.task"
                _is="p"
                class="task"
                :maxlength="200"
                placeholder="Type a title"
                @giveTodoKey="setCurrentTodoEdited_key_attribue(item.key, todoTaskEnum)"
                @keyup.enter="onPressEnterOrBlur"
                @blur="onPressEnterOrBlur"
              />
              &nbsp;
            </div>
            <p>({{ getNumberSubTaskActive(item) }})</p>
            <div class="bullet" :class="bulletClass(item)"></div>
          </div>

          <!-- start subtable -->
          <div v-if="includeKey(item.key)" class="subtable">
            <simple-table-lvl1
              :item="item"
              :key="getNumberSubtaskInTask(item.key)"
            ></simple-table-lvl1>
          </div>
          <!-- end subtable -->
        </md-table-cell>
        <md-table-cell
          md-sort-by="deadline"
          v-if="getSettings('deadline')"
          class="column-90"
          md-label="Deadline"
        >
          <p @click="showDatepickerDialog(item.key, item.deadline)" v-if="item.deadline">
            {{ dateOfTask(item.key) ? dateOfTask(item.key) : "" }}
          </p>
          <div class="hover-click">
            <feather
              size="20px"
              v-if="!item.deadline"
              @click="showDatepickerDialog(item.key, null)"
              type="calendar"
            ></feather>
          </div>
        </md-table-cell>

        <md-table-cell v-if="getSettings('numberdaysleft')" class="column-50">
          <p>{{ item.numberdaysleft }}</p>
        </md-table-cell>

        <md-table-cell
          md-sort-by="creationDate"
          v-if="getSettings('creationDate')"
          class="column-90"
          md-label="Create"
        >
          <p>
            {{ item.creationDate }}
          </p></md-table-cell
        >

        <md-table-cell
          md-sort-by="importance"
          v-if="getSettings('importance')"
          class="column-30"
        >
          <input-contenteditable
            v-model="item.importance"
            _is="p"
            :maxlength="100"
            type="number"
            placeholder="none"
            @giveTodoKey="setCurrentTodoEdited_key_attribue(item.key, todoImpEnum)"
            @keydown.enter="onPressEnterOrBlur"
            @blur="onPressEnterOrBlur"
          />
        </md-table-cell>

        <md-table-cell class="column-20">
          <div class="hover-click">
            <feather
              size="15px"
              @click="deleteTodo(item.key, item.order)"
              type="delete"
            ></feather>
            &nbsp;
            <feather
              @click="setTodoDone(item)"
              type="check"
              v-if="item.isdone"
              size="15px"
            ></feather>
            <feather
              @click="setTodoDone(item)"
              type="x"
              v-if="!item.isdone"
              size="15px"
            ></feather>
          </div>
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

      <md-dialog
        :md-active.sync="showDialogDate"
        :show="showDialogDate"
        @show="showDialogDate = $event"
      >
        <md-button class="md-icon-button simple" @click="closeDialogDate()">
          <md-icon>close</md-icon>
        </md-button>
        <v-date-picker v-model="date" width="290" class="mt-4"></v-date-picker>
        <md-checkbox v-model="noDeadLine">no deadline</md-checkbox>
        <md-button class="md-tertiary" @click="editDateTask"> Save </md-button>
      </md-dialog>
    </div>
  </div>
</template>

<script lang="ts">
import TablePaginationVue from "./TablePagination.vue";
import { myFunctions } from "@/common/helpers/helperfunction";
import { Todo, HTMLElementEvent, Drawer } from "@/common/models/types/index";
import DisplayTaskModal from "../modals/DisplayTaskModal.vue";
import lodash from "lodash";
import SimpleTableLvl1 from "./SimpleTableLvl1.vue";
import { bus } from "@/main";
import { BusEventEnum } from "@/common/models/enums/enum";
import InputContenteditable from "@/common/componentslib/input-contenteditable/input-contenteditable.vue";

//task
import { ActionTypes as tasksActionsType } from "@/store/modules/todos/actions";
import { MutationTypes as tasksMutationType } from "@/store/modules/todos/mutations";
import { todoEnum } from "@/modules/todos/shared/enumTodo";

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
  watch: {
    showDialogDate: function () {
      if (this.showDialogDate === false) {
        this.currentKey = "";
        this.date = "";
        this.selectedDate = null;
        this.noDeadLine = false;
      }
    },
  },
  methods: {
    editDateTask() {
      let value = this.date;
      if (this.noDeadLine) {
        value = "";
      }
      let todoKey = this.currentKey;
      let attribute = "deadline";
      this.$store.dispatch(tasksActionsType.EDITATTRIBUTETASK, {
        todoKey,
        attribute,
        value,
      });
      this.updatePaginationList(todoKey, attribute, value);
      this.showDialogDate = false;
    },
    updatePaginationList(todoKey: string, attribute: string, value: string) {
      var index = this.paginatedTodos.findIndex(function (o) {
        return o.key === todoKey;
      });
      if (index !== -1) {
        this.paginatedTodos[index][attribute] = value;
        if (attribute === todoEnum.DEADLINE) {
          this.paginatedTodos[index][todoEnum.NUMBERDAYSLEFT] = this.getdaysleft(value);
        }
      }
    },
    showDatepickerDialog(key: string, deadline) {
      this.currentKey = key;
      if (deadline) {
        this.date = deadline;
      }
      this.showDialogDate = true;
    },
    closeDialogDate() {
      this.showDialogDate = false;
    },
    setCurrentTodoEdited_key_attribue(key, attribute) {
      this.currentTodoKeyEdited = key;
      this.currentAttributeEdited = attribute;
    },
    onChangeInput(text) {
      // eslint-disable-next-line no-console
      console.log("le text ", text);
    },
    onPressEnterOrBlur(e) {
      if (e.keyCode == 13) {
        event.preventDefault();
      }
      if (!e.target.innerText) {
        return;
      }

      let todoKey = this.currentTodoKeyEdited;
      let attribute = this.currentAttributeEdited;
      let value = e.target.innerText;
      if (value) {
        value = value.trim();
      }

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
      let drawer: Drawer = {
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
        subtasks: [],
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

      if (this.paginatedTodos && this.paginatedTodos.length > 0) {
        this.paginatedTodos.unshift(emptyTodo);
      } else {
        this.paginatedTodos = [emptyTodo];
      }
    },
    updateFinishTime() {
      if (this.paginatedTodos && this.paginatedTodos.length > 0) {
        this.paginatedTodos.forEach((todo: Todo) => {
          todo.numberdaysleft = this.getdaysleft(todo.deadline);
        });
      }
    },
  },
  created() {
    this.todos = this.todolist;
    this.paginatedTodos = [...this.todos];

    this.updateFinishTime();

    if (this.mainList) {
      bus.$on(BusEventEnum.ADDEMPTYTASK, this.addEmptyTask);
    }
  },
  beforeDestroy() {
    bus.$off(BusEventEnum.ADDEMPTYTASK, this.addEmptyTask);
  },
  data() {
    return {
      selected: [],
      todos: [],
      paginatedTodos: [],
      getdaysleft: myFunctions.getdaysleft,
      dateOfTask: myFunctions.dateOfTask,
      giveColorTodo: myFunctions.giveColorTodo,
      item: {},
      showDialog: false,
      drawersOpenedArray: [],
      placeholder: "type your title",
      currentTodoKeyEdited: "",
      currentAttributeEdited: "",
      todoTaskEnum: todoEnum.TASK,
      todoImpEnum: todoEnum.IMPORTANCE,
      date: null,
      modal: false,
      showDialogDate: false,
      noDeadLine: false,
      currentKey: "",
      selectedDate: null,
      getNumberSubtaskInTask: myFunctions.getNumberSubtaskInTask,
    };
  },
};
</script>

<style lang="scss" scoped>
.hover-click {
  cursor: pointer;
}
.flex {
  display: flex;
}
.block {
  display: block !important ;
}
.flex-align {
  display: flex;
}
.bullet {
  margin-right: 10px;
  margin-top: 4px;
}

p {
  font-family: initial;
  margin-left: 10px;
  margin-right: 10px;
}
.chevron-order {
  width: 15px;
  margin: auto;
  padding-bottom: 5px;
}
.plus-minus {
  padding-top: 2px;
}
.row-order {
  display: flex;
}
.subtable {
  margin-left: 5px;
}
</style>
