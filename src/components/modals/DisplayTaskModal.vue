<template>
  <div class="content">
    <div class="header">
      <div class="go-edit">
        <div @click="showDrawerEditTask(event)">
          <feather type="edit"></feather>
        </div>
      </div>
      <div class="go-close">
        <div @click="closeModal">
          <feather type="x"></feather>
        </div>
      </div>
      <div class="md-layout-item md-size-100 header-title">
        <h1>
          {{ event.task }}
        </h1>
        <div class="horizontal-separator"></div>
      </div>
      <div class="accordion-margin">
        <accordion
          :isActive="isForm1Active"
          @isActive="isForm1Active = $event"
          title="Metadata Todo"
          class="transparent"
        >
          <div class="md-layout-item md-size-100 data-block">
            <meta-data-todo :event="event"></meta-data-todo>
          </div>
        </accordion>
      </div>
    </div>
    <div class="body">
        <div class="md-layout-item md-size-100 duo-data-block no-padding">
          <div
            class="md-layout-item table-border"
            v-if="event.subtasks && event.subtasks.length > 0"
          >
            <div class="light-horizontal-separator"></div>
            <simple-table-lvl1 :item="event"></simple-table-lvl1>
          </div>
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
import MetaDataTodo from "./MetaDataTodo.vue";
import Accordion from "@/common/componentslib/Accordion.vue";

@Component({
  components: {
    "sub-tasks-viewer": SubTaskViewer,
    "sub-task-readonly": ReadOnlySubTaskTable,
    "simple-table-lvl1": SimpleTableLvl1,
    "meta-data-todo": MetaDataTodo,
    accordion: Accordion,
  },
})
export default class PCalendarEvent extends Vue {
  @Prop() days!: Array<any>;
  @Prop() calendar!: Calendar<any, any>;
  @Prop() event!: any;
  isForm1Active: boolean = false;

  showDrawerEditTask(payload): void {
    if (payload) {
      this.closeModal();
      bus.$emit("openDrawerEdit", payload);
    }
  }

  closeModal(): void {
    this.$emit("closeDialog");
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
  display: flex;
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
.accordion-margin{
  margin-left:30px;

}
</style>
