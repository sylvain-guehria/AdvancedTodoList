<template>
  <div class="flex">
    <div class="in-block">
      <div class="md-size-100 icon-list-item flex">
        <feather type="calendar"></feather>
        <div class="list-item-text">Creation date : {{ event.creationDate }}</div>
      </div>

      <div class="md-size-100 icon-list-item flex">
        <feather type="calendar"></feather>
        <div class="list-item-text">
          Deadline : {{ event.deadline ? event.deadline : "none" }}
        </div>
      </div>
    </div>

    <div class="in-block">
      <div class="md-size-100 icon-list-item flex">
        <feather type="alert-octagon"></feather>
        <div class="list-item-text">
          Importance : {{ event.importance ? event.importance : "none" }}
        </div>
      </div>

      <div class="md-size-100 icon-list-item flex">
        <feather type="folder"></feather>
        <div class="list-item-text">
          {{ event.isdone ? "finished" : "In progress" }}
        </div>
        <div class="bullet" :class="bulletClass(event)"></div>
      </div>
    </div>

    <div class="in-block">
      <div class="md-size-100 icon-list-item flex">
        <feather type="eye"></feather>
        <div class="list-item-text">Finish : {{ numberdaysleft(event.deadline) }}</div>
      </div>

      <div class="md-size-100 icon-list-item flex">
        <feather type="list"></feather
        >{{ event.subtasks && event.subtasks.length > 0 ? "Subtasks" : "No subtask" }}
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

@Component({
  components: {},
})
export default class MetaDataTodo extends Vue {
  @Prop() event!: any;
  bulletClass = helperTodo.bulletClass;
  numberdaysleft = helperTodo.getdaysleft;
}
</script>

<style lang="scss" scoped>
.flex {
  display: flex !important;
  font-family: initial;
  font-size: 16px;
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
</style>
