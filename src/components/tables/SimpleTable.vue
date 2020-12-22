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
        <md-table-cell md-sort-by="order" class="column-50" v-if="getSettings('order')">
          <div class="flex">
            <div class="hover-click">
              <feather
                type="chevron-left"
                size="20px"
                @click="orderDown(item)"
                v-longclick="() => orderDown(item)"
              ></feather>
            </div>
            <div>
              {{ item.order }}
              <md-tooltip md-direction="top">Order</md-tooltip>
            </div>
            <div class="hover-click">
              <feather
                size="20px"
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
          class="padding-left"
        >
          <div class="flex">
            <div class="plus-minus hover-click">
              <feather
                size="15px"
                v-if="!includeKey(item.key)"
                type="plus"
                @click="togleSubtasks(item.key)"
              ></feather>
              <feather
                size="15px"
                type="minus"
                @click="unTogleSubtasks(item.key)"
                v-if="includeKey(item.key)"
              ></feather>
            </div>
            <input-contenteditable
              v-model="item.task"
              :class="item.isdone ? 'done' : ''"
              _is="p"
              class="task break-word"
              :maxlength="250"
              placeholder="Type a title"
              @giveTodoKey="setCurrentTodoEdited_key_attribue(item.key, todoTaskEnum)"
              @keyup.enter="onPressEnterOrBlur"
              @blur="onPressEnterOrBlur"
            />
            <div>({{ getNumberSubTaskActive(item) }})</div>
          </div>

          <!-- start table subtask and details -->
          <div v-if="includeKey(item.key)" class="subtable">
            <simple-table-lvl1 :item="item" :maintable="true"></simple-table-lvl1>
          </div>
          <!-- end -->
        </md-table-cell>

        <md-table-cell
          md-sort-by="deadline"
          v-if="getSettings('deadline')"
          class="column-90 center-icon"
          md-label="Deadline"
        >
          <div class="hover-click">
            <date-picker :item="item" @emitDate="editDateTask" :key="item.key" />
          </div>
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
          v-if="getSettings('numberdaysleft')"
          class="column-80"
          md-label="Finish"
        >
          <p>{{ item.numberdaysleft }}</p>
        </md-table-cell>

        <md-table-cell
          md-sort-by="importance"
          v-if="getSettings('importance')"
          class="column-30"
        >
          <div class="flex">
            <div class="bullet" :class="bulletClass(item)" v-if="bulletClass(item)"></div>
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
          </div>
          <md-tooltip md-direction="top">Importance</md-tooltip>
        </md-table-cell>

        <md-table-cell
          class="column-20 center-icon no-padding-cell"
          v-if="getSettings('isdone')"
        >
          <div class="hover-click flex">
            <md-checkbox v-model="item.isdone" @change="setTodoDone(item)">
              <feather
                size="25px"
                @click.stop.prevent="activeDeleteTodo(item.key, item.order, item.task)"
                type="delete"
              ></feather>
            </md-checkbox>
          </div>
        </md-table-cell>
      </md-table-row>
    </md-table>
    <table-pagination
      :data="todolist"
      @pagination="onPagination($event)"
      :serverSide="false"
    ></table-pagination>

    <!-- CONFIRM DELET DIALOG -->
    <confirm-dialog
      :confirmDialog="deleteDialog"
      title="Delete task?"
      :subtitle="currentTitle"
      content="You cannot go back if you press 'Yes'"
      @closeConfirmDialog="onCancelDialogDelete"
      @confirmDialog="onConfirmDialogDelete"
    />
  </div>
</template>

<script lang="ts">
import TablePaginationVue from "./TablePagination.vue";
import { Todo, HTMLElementEvent, Drawer, Settings } from "@/common/models/types/index";
import lodash from "lodash";
import SimpleTableLvl1 from "./SimpleTableLvl1.vue";
import { bus } from "@/main";
import { BusEventEnum } from "@/common/models/enums/enum";
import InputContenteditable from "@/common/componentslib/input-contenteditable/input-contenteditable.vue";
import ConfirmDialogCustom from "@/common/componentslib/ConfimDialogCustom.vue";
import DatePickerCustom from "@/common/componentslib/DatePickerCustom.vue";
import { helperFunctions } from "@/common/helpers/helperfunction";

//tasks
import { tasksActionsType } from "@/store/modules/todos";
import { tasksMutationType } from "@/store/modules/todos";
import { todoEnum } from "@/modules/todos/shared/enumTodo";
import { helperTodo } from "@/modules/todos/shared/todoHelper";
import { serviceTodo } from "@/services";

//subtasks
import { helperSubtask } from "@/modules/subtasks/shared/subtaskHelper";

export default {
  name: "simple-table",
  components: {
    "table-pagination": TablePaginationVue,
    "simple-table-lvl1": SimpleTableLvl1,
    "confirm-dialog": ConfirmDialogCustom,
    "input-contenteditable": InputContenteditable,
    "date-picker": DatePickerCustom,
  },
  props: ["todolist", "mainList"],
  computed: {
    isCompletelist: function () {
      return this.completelist;
    },
  },
  watch: {
    deleteDialog: function () {
      if (this.deleteDialog === false) {
        this.onCancelDialogDelete();
      }
    },
  },
  methods: {
    activeDeleteTodo(key: string, order: number, title: string) {
      this.currentTitle = title;
      this.deleteDialog = true;
      this.currentKey = key;
      this.currentOrder = order;
    },
    onCancelDialogDelete() {
      this.currentKey = "";
      this.currentOrder = null;
      this.deleteDialog = false;
      this.currentTitle = "";
    },
    onConfirmDialogDelete() {
      this.deleteTodo(this.currentKey, this.currentOrder);
      this.deleteDialog = false;
    },
    editDateTask({ item, noDeadline }: { item: Todo; noDeadline: boolean }) {
      let value = item.deadline;
      let todoKey = item.key;
      let attribute = todoEnum.DEADLINE;

      if (noDeadline) {
        value = null;
      }

      serviceTodo.editTodo(todoKey, attribute, value);
      
      this.updatePaginationList(todoKey, attribute, value);
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
    setCurrentTodoEdited_key_attribue(key, attribute) {
      this.currentTodoKeyEdited = key;
      this.currentAttributeEdited = attribute;
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
    getSettings(columnLabel: string) {
      let settings: Settings = this.$store.getters.getSettings;
      if (!settings || !settings.hidden_column) {
        return true;
      }
      let colums = settings.hidden_column;
      let colum: boolean = true;

      if (colums) {
        colum = colums[columnLabel];
      }
      if (colum != null) {
        return colum;
      } else {
        return true;
      }
    },
    deleteTodo(key: string, order: number): void {
      let vm = this;
      serviceTodo.deleteTodo(key);
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
      serviceTodo.downOrderNoCOndition(key);
    },
    setTodoDone(item: Todo): void {
      serviceTodo.setTodoDone(item);
    },
    onPagination(data) {
      this.paginatedTodos = data;
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
        isdone: false,
        creationDate: new Date().toISOString().substr(0, 10),
        order: higher_order,
        subtasks: [],
      };

      serviceTodo.addTask(emptyTodo);

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
    this.paginatedTodos = [...this.todolist];

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
      paginatedTodos: [],
      deleteDialog: false,
      currentTitle: "",
      item: {},
      drawersOpenedArray: [],
      placeholder: "type your title",
      currentTodoKeyEdited: "",
      currentAttributeEdited: "",
      todoTaskEnum: todoEnum.TASK,
      todoImpEnum: todoEnum.IMPORTANCE,
      date: null,
      modal: false,
      currentKey: "",
      currentOrder: null,
      getdaysleft: helperTodo.getdaysleft,
      dateOfTask: helperTodo.dateOfTask,
      bulletClass : helperTodo.bulletClass,
      getNumberSubtaskInTask: helperTodo.getNumberSubtaskInTask,
      orderUp: serviceTodo.orderUp,
      orderDown: serviceTodo.orderDown,
      getNumberSubTaskActive: helperSubtask.getNumberSubTaskActive,
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
.bullet {
  margin-top: 5px;
}
p {
  font-family: initial;
  margin-left: 10px;
  margin-right: 10px;
}
.plus-minus {
  padding-top: 2px;
}
.subtable {
  margin-left: 60px;
}
.done {
  text-decoration: line-through;
}
.padding {
  padding: 10px;
}

.break-word {
  word-break: break-all;
}

.padding-left {
  padding-left: 7px;
}
</style>
