<template>
  <div
    class="calendar-event"
    :class="{ selected: showDetail, 'display-modal-left': displayModalLeft }"
  >
    <div class="event-info" @click="showDetail = true">
      <div class="bullet" :class="bulletClass"></div>
      <div class="event-text">
        {{ Title }} &nbsp; ({{ getNumberSubTaskActive() }})
      </div>
    </div>
    <modal
      :show="showDetail"
      @show="showDetail = $event"
      class="event-detail-modal"
    >
      <div slot="header">
        <div class="go-edit">
          <div @click="showDrawerEditTask(event)">
            <feather type="edit"></feather>
          </div>
        </div>
        <div class="md-layout-item md-size-100 header-title">
          <h1>
            {{ event.task }}
          </h1>
          <div class="horizontal-separator"></div>
        </div>
      </div>
      <div slot="body">
        <div class="md-layout-item md-size-100 duo-data-block no-padding">
          <div class="md-layout-item md-size-100 icon-list-item">
            <feather type="calendar"></feather>
            <div class="list-item-text">
              Creation date : {{ event.creationDate }}
            </div>
          </div>
          <div class="md-layout-item md-size-100 icon-list-item">
            <feather type="calendar"></feather>
            <div class="list-item-text">Deadline : {{ event.deadline }}</div>
          </div>
          <div class="md-layout-item md-size-100 icon-list-item">
            <feather type="alert-octagon"></feather>
            <div class="list-item-text">
              Importance : {{ event.importance }}
            </div>
          </div>
          <div class="md-layout-item md-size-100 icon-list-item">
            <feather type="folder"></feather>
            <div class="list-item-text">
              {{ event.isdone ? "finished" : "In progress" }}
            </div>
            <div class="bullet" :class="bulletClass"></div>
          </div>
          <div class="md-layout-item md-size-100 icon-list-item">
            <feather type="eye"></feather>
            <div
              class="list-item-text"
              :class="event.numberdaysleft <= 0 ? 'red-text' : 'green-text'"
            >
              Number Days Left : {{ event.numberdaysleft }}
            </div>
          </div>
          <div class="md-layout-item md-size-100 icon-list-item">
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
      </div>
    </modal>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { Calendar, Weekday } from "dayspan";
import DayBlock from "./DayBlock.vue";
import moment from "moment";
import Modal from "@/components/Modal.vue";
import SubTaskViewer from "@/pages/Forms/SubTaskViewer.vue";
import ReadOnlySubTask from "../../pages/Forms/ReadOnlySubTask.vue";
import { myFunctions } from "../../helpers/helperfunction";
import { bus } from "../../main";

@Component({
  components: {
    modal: Modal,
    "sub-tasks-viewer": SubTaskViewer,
    "sub-task-readonly": ReadOnlySubTask,
  },
})
export default class PCalendarEvent extends Vue {
  @Prop() days!: Array<any>;
  @Prop() calendar!: Calendar<any, any>;
  @Prop() event!: any;

  showDrawerEditTask(payload): void {
    if (payload) {
      this.showDetail = false;
      bus.$emit("openDrawerEdit", payload);
    }
  }

  showDetail: boolean = false;

  get Title() {
    return this.event.task;
  }

  getNumberSubTaskActive(): number {
    return this.event.description
      ? this.event.description.filter((subtask) => !subtask.isdone).length
      : 0;
  }

  get bulletClass() {
    const index = this.giveColorTodo();
    const classes = ["bullet1", "bullet2", "bullet3", "bullet4", "bullet5"];
    return classes[index];
  }

  get displayModalLeft() {
    const day = new Date(this.event.deadline).getDay();

    if (!this.$store.getters.getWithWeekEnd) {
      return day === 4 || day === 5;
    } else {
      return day === 6 || day === 7;
    }
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

<style scoped>
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
}

.md-layout-item {
  font-family: initial;
  font-size: 19px !important;
  margin-top: 10px;
}
</style>
