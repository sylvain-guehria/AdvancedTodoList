<template>
  <div
    class="calendar-event"
    :class="{ selected: showDetail, 'display-modal-left': displayModalLeft }"
  >
    <div class="event-info" @click="DisplayModalTask">
      <div class="bullet" :class="bulletClass"></div>
      <div class="event-text">
        {{ Title }} &nbsp; ({{ getNumberSubTaskActive() }})
      </div>
    </div>



    <!-- modal display task -->
    <div>
      <md-dialog
        :md-active.sync="showDetail"
        :show="showDetail"
        @show="showDetail = $event"
      >
        <display-task-modal
          :key="event ? event.id : null"
          :event="event ? event : null"
          @closeDialog="showDetail = false"
        ></display-task-modal>
      </md-dialog>
    </div>



    <!-- <modal
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
    </modal> -->
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
import DisplayTaskModal from "../modals/DisplayTaskModal.vue";
import { Todo } from '@/models/types';


@Component({
  components: {
    modal: Modal,
    "sub-tasks-viewer": SubTaskViewer,
    "sub-task-readonly": ReadOnlySubTask,
    "display-task-modal": DisplayTaskModal
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

  DisplayModalTask(): void {
      this.showDetail = true;
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
     let item = this.event;
      if (item && item.importance) {
        // red Task : importance >= 75
        if (item.importance >= 75) {
          return 1;
        }
        // orange/jaune tasks : 50 >= importance > 75
        if ( 50 <= item.importance && item.importance < 75 ) {
          return 2;
        }
        // blue task : 25 >= importance > 50
        if ( 25 <= item.importance && item.importance < 50 ) {
          return 3;
        }
        // green  task : 0 >= importance > 25
        if ( 0 <= item.importance && item.importance < 25 ) {
          return 0;
        }
      }
      return ;
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
