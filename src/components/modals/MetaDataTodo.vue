<template>
  <div class="flex">
    <div class="in-block">
      <div class="md-size-100 icon-list-item flex fontstyle">
        <feather type="calendar"></feather>
        <div class="list-item-text">Creation date : {{ event.creationDate }}</div>
      </div>

      <div class="md-size-100 icon-list-item flex fontstyle">
        <feather type="calendar"></feather>
        <div class="list-item-text flex fontstyle">
          Deadline : 
          <div class="hover-click margin">
            <date-picker :item="event" @emitDate="editDateTask" :key="event.key" :customclass="true" />
          </div>
        </div>
      </div>
    </div>

    <div class="in-block">
      <div class="md-size-100 icon-list-item flex fontstyle">
        <feather type="alert-octagon"></feather>
        <div class="list-item-text">
          Importance : {{ event.importance ? event.importance : "none" }}
        </div>
      </div>

      <div class="md-size-100 icon-list-item flex fontstyle hover-click" @click="setTodoDone(event)">
        <feather type="folder"></feather>
        <div class="list-item-text">
          {{ event.isdone ? "finished" : "In progress" }}
        </div>
        <div class="bullet" :class="bulletClass(event)"></div>
      </div>
    </div>

    <div class="in-block">
      <div class="md-size-100 icon-list-item flex fontstyle">
        <feather type="eye"></feather>
        <div class="list-item-text">Finish : {{ numberdaysleft(event.deadline) }}</div>
      </div>

      <div class="md-size-100 icon-list-item flex fontstyle">
        <feather type="list"></feather
        >{{
          event.subtasks && event.subtasks.length > 0
            ? `Subtasks : ${getNumberSubtaskInTask(event.key)}`
            : "No subtask"
        }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { Calendar, Weekday } from "dayspan";
import DayBlock from "./DayBlock.vue";
import moment from "moment";
import { helperTodo } from "@/modules/todos/shared/todoHelper";
import { bus } from "@/main";
import vueCustomScrollbar from "vue-custom-scrollbar";
import "vue-custom-scrollbar/dist/vueScrollbar.css";
import SimpleTableLvl1 from "../tables/SimpleTableLvl1.vue";
import FilterTab from "@/common/componentslib/FilterTab.vue";
import { Todo } from "@/common/models/types";

import { todoEnum } from "@/modules/todos/shared/enumTodo";
import { serviceTodo } from "@/services";
import DatePickerCustom from "@/common/componentslib/DatePickerCustom.vue";

@Component({
  components: {
    "date-picker": DatePickerCustom,
  },
})
export default class MetaDataTodo extends Vue {
  @Prop() event!: any;
  bulletClass = helperTodo.bulletClass;
  numberdaysleft = helperTodo.getdaysleft;
  getNumberSubtaskInTask = helperTodo.getNumberSubtaskInTask;

  editDateTask({ item, noDeadline }: { item: Todo; noDeadline: boolean }) {
    let value = item.deadline;
    let todoKey = item.key;
    let attribute = todoEnum.DEADLINE;

    if (noDeadline) {
      value = null;
    }

    serviceTodo.editTodo(todoKey, attribute, value);
  }

   setTodoDone(item: Todo): void {
     item.isdone = ! item.isdone;
      serviceTodo.setTodoDone(item);
    }
  
}
</script>

<style lang="scss" scoped>
.flex {
  display: flex !important;
}

.icon-list-item {
  display: flex;

  i {
    color: #1d72b2;
    margin-right: 20px;
  }

  .list-item-text {
    text-align: left;
    &.subtasks {
      width: 100%;
    }
  }

  .bullet {
    margin-top: 5px;
    margin-left: 10px;
  }
}
.in-block {
  width: 33%;
  margin: 0 auto;
  text-align: left !important;
}

.hover-click {
  cursor: pointer;
}

.margin{
  margin-left: 20px;
}

.fontstyle{
 font-family: initial;
  font-size: 16px;
}
</style>
