<template>
  <div class="flex-column">
    <md-table v-model="paginatedList" md-sort="name" md-sort-order="asc" md-card>
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
        <md-table-cell md-sort-by="task" md-label="Title" class="padding-left">
          <md-icon v-if="item.task">task</md-icon
          ><input v-if="item.task" v-model="item.task" readonly />
          <md-icon v-if="item.label">list</md-icon>
          <input v-if="item.label" v-model="item.label" readonly />
        </md-table-cell>

        <md-table-cell md-sort-by="order" class="column-30"  md-label="order">
          <div class="flex">
            <input-contenteditable
              v-model="item.order"
              _is="p"
              :maxlength="100"
              type="number"
              placeholder="none"
            />
          </div>
          <md-tooltip md-direction="top">order</md-tooltip>
        </md-table-cell>

        <md-table-cell
          md-sort-by="deadline"
          class="column-90 center-icon"
          md-label="Deadline"
        >
          <div class="hover-click">
            <date-picker :item="item" :key="item.key" />
          </div>
        </md-table-cell>

        <md-table-cell class="column-80" md-label="Finish">
          <p>{{ item.numberdaysleft }}</p>
        </md-table-cell>

        <md-table-cell md-sort-by="importance" class="column-30" md-label="Imp">
          <div class="flex">
            <div class="bullet" :class="bulletClass(item)" v-if="bulletClass(item)"></div>
            <input-contenteditable
              v-model="item.importance"
              _is="p"
              :maxlength="100"
              type="number"
              placeholder="none"
            />
          </div>
          <md-tooltip md-direction="top">Importance</md-tooltip>
        </md-table-cell>

        <md-table-cell class="column-20 center-icon no-padding-cell">
          <div class="hover-click flex">
            <md-checkbox v-model="item.isdone"> </md-checkbox>
          </div>
        </md-table-cell>
      </md-table-row>
    </md-table>
  </div>
</template>

<script lang="ts">
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
  name: "Priority-table",
  components: {
    "date-picker": DatePickerCustom,
    "input-contenteditable": InputContenteditable,
  },
  props: ["list"],
  computed: {
    isCompletelist: function () {
      return this.completelist;
    },
  },
  methods: {
    updateFinishTime() {
      if (this.paginatedTodos && this.paginatedTodos.length > 0) {
        this.paginatedTodos.forEach((todo: Todo) => {
          todo.numberdaysleft = this.getdaysleft(todo.deadline);
        });
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
  },
  created() {
    this.paginatedList = [...this.list];
    this.updateFinishTime();
  },
  data() {
    return {
      paginatedList: [],
      item: {},
      drawersOpenedArray: [],
      date: null,
      getdaysleft: helperTodo.getdaysleft,
      dateOfTask: helperTodo.dateOfTask,
      bulletClass: helperTodo.bulletClass,
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
