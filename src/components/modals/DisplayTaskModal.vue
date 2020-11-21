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
    </div>
    <div class="body">
      <vue-custom-scrollbar
        class="scroll-area"
        :settings="settings"
      >
        <div class="md-layout-item md-size-100 duo-data-block no-padding">
          <div class="md-layout-item md-size-100 icon-list-item flex">
            <feather type="calendar"></feather>
            <div class="list-item-text">
              Creation date : {{ event.creationDate }}
            </div>
          </div>
          <div class="md-layout-item md-size-100 icon-list-item flex">
            <feather type="calendar"></feather>
            <div class="list-item-text">Deadline : {{ event.deadline }}</div>
          </div>
          <div class="md-layout-item md-size-100 icon-list-item flex">
            <feather type="alert-octagon"></feather>
            <div class="list-item-text">
              Importance : {{ event.importance }}
            </div>
          </div>
          <div class="md-layout-item md-size-100 icon-list-item flex">
            <feather type="folder"></feather>
            <div class="list-item-text">
              {{ event.isdone ? "finished" : "In progress" }}
            </div>
            <div class="bullet" :class="bulletClass"></div>
          </div>
          <div class="md-layout-item md-size-100 icon-list-item flex">
            <feather type="eye"></feather>
            <div
              class="list-item-text"
              :class="event.numberdaysleft <= 0 ? 'red-text' : 'green-text'"
            >
              Number Days Left : {{ event.numberdaysleft }}
            </div>
          </div>
          <div class="md-layout-item md-size-100 icon-list-item flex">
            <feather type="list"></feather
            >{{
              event.description && event.description.length > 0
                ? "Subtasks"
                : "No subtask"
            }}
          </div>
          <div
            class="md-layout-item md-size-100 icon-list-item"
            v-if="event.description && event.description.length > 0"
          >
            <sub-task-readonly
              :subtasksreceived="event.description"
              :todo="event"
            ></sub-task-readonly>
          </div>
        </div>
      </vue-custom-scrollbar>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { Calendar, Weekday } from "dayspan";
import DayBlock from "./DayBlock.vue";
import moment from "moment";
import SubTaskViewer from "@/pages/Forms/SubTaskViewer.vue";
import ReadOnlySubTask from "../../pages/Forms/ReadOnlySubTask.vue";
import { myFunctions } from "../../helpers/helperfunction";
import { bus } from "../../main";
import vueCustomScrollbar from "vue-custom-scrollbar";
import "vue-custom-scrollbar/dist/vueScrollbar.css";

@Component({
  components: {
    "sub-tasks-viewer": SubTaskViewer,
    "sub-task-readonly": ReadOnlySubTask,
    "vue-custom-scrollbar": vueCustomScrollbar,
  },
})
export default class PCalendarEvent extends Vue {
  @Prop() days!: Array<any>;
  @Prop() calendar!: Calendar<any, any>;
  @Prop() event!: any;

  settings = {
    suppressScrollY: false,
    suppressScrollX: false,
    wheelPropagation: false
  };

  showDrawerEditTask(payload): void {
    if (payload) {
      this.closeModal();
      bus.$emit("openDrawerEdit", payload);
    }
  }

  closeModal(): void {
    this.$emit("closeDialog");
  }

  get bulletClass() {
    const index = this.giveColorTodo();
    const classes = ["bullet1", "bullet2", "bullet3", "bullet4", "bullet5"];
    return classes[index];
  }

  displayModalLeft() {
    const day = new Date(this.event.deadline).getDay();
    return day === 4 || day === 5;
  }

  giveColorTodo(): number {
    if (this.event && this.event.deadline) {
      // red Task : important and urgent ok
      if (
        myFunctions.getdaysleft(this.event.deadline) < 2 &&
        this.event.importance >= 50
      ) {
        return 1;
      }
      // orange/jaune tasks : important, not urgent
      if (
        myFunctions.getdaysleft(this.event.deadline) >= 2 &&
        this.event.importance >= 50
      ) {
        return 2;
      }
      // blue task : urgent but not important
      if (
        myFunctions.getdaysleft(this.event.deadline) < 2 &&
        this.event.importance < 50
      ) {
        return 3;
      }
      // green  task : not urgent and not important ok
      if (
        myFunctions.getdaysleft(this.event.deadline) >= 2 &&
        this.event.importance < 50
      ) {
        return 0;
      }
      if (this.event) {
        return 4;
      }
    }
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
  font-size: 19px;
}

.icon-list-item {
  display: flex;

  i {
    color: #1d72b2;
    margin-right: 20px;
  }

  .list-item-text {
    text-align: left;
    &.description {
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
  max-height: 500px;
}
</style>
