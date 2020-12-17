<template>
  <div>
    <div class="in-block">
      <div class="md-size-100 icon-list-item flex">
        <feather type="calendar"></feather>
        <div class="list-item-text">
          Creation date : {{ event.creationDate }}
        </div>
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
        <div class="bullet" :class="bulletClass"></div>
      </div>
    </div>

    <div class="in-block">
      <div class="md-size-100 icon-list-item flex">
        <feather type="eye"></feather>
        <div class="list-item-text">
          Number Days Left : {{ event.numberdaysleft }}
        </div>
      </div>

      <div class="md-size-100 icon-list-item flex">
        <feather type="list"></feather
        >{{
          event.subtasks && event.subtasks.length > 0
            ? "Subtasks"
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
import SubTaskViewer from "@/components/forms/SubTaskViewer.vue";
import ReadOnlySubTaskTable from "@/components/tables/ReadOnlySubTaskTable.vue";
import { myFunctions } from "@/common/helpers/helperfunction";
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
 giveColorTodo = myFunctions.giveColorTodo;

  get bulletClass() {
    const index = this.giveColorTodo(event);
    const classes = ["bullet1", "bullet2", "bullet3", "bullet4", "bullet5"];
    return classes[index];
  }


}
</script>

<style lang="scss" scoped>
.red-text {
  color: red;
}
.green-text {
  color: green;
}

.header-title {
  word-break: break-word;
  margin-top: 50px;
}
.event-info {
  font-size: 15px !important;
}

h1 {
  display: flex;
}
.go-edit {
  position: absolute;
  top: 7px;
  left: 10px;
  cursor: pointer;
  i {
    color: #a5a7a9;
  }
}
.go-close {
  position: absolute;
  top: 7px;
  right: 10px;
  cursor: pointer;
  i {
    color: #a5a7a9;
  }
}
.body {
  padding: 35px;
}

.flex {
  display: flex !important;
  margin-bottom: 15px;
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

.scroll-area {
  position: relative;
  margin: auto;
  padding-right: 50px;
  max-width: 1200px;
  max-height: 700px;
}
.in-block {
  width: 33%;
  margin: 0 auto;
  text-align: left !important;
}
.content {
  min-width: 1200px;
}
</style>
