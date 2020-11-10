<template>
  <div
    class="calendar-event"
    :class="{selected: showDetail, 'display-modal-left': displayModalLeft}"
  >
    <div class="event-info" @click="showDetail=true">
      <div class="bullet" :class="bulletClass"></div>
      <div class="event-text">{{Title}}</div>
    </div>
    <modal :show="showDetail" @show="showDetail=$event" class="event-detail-modal">
      <div slot="header">
        <div class="md-layout-item md-size-100 align-left">
          <h1>{{ event.task }}</h1>
          <div class="horizontal-separator"></div>
        </div>
      </div>
      <div slot="body">
        <div class="md-layout-item md-size-100 duo-data-block no-padding">
          <div class="md-layout-item md-size-100 icon-list-item">
            <feather type="calendar"></feather>
            <div class="list-item-text">Creation date : {{ event.creationDate }}</div>
          </div>
          <div class="md-layout-item md-size-100 icon-list-item">
            <feather type="calendar"></feather>
            <div class="list-item-text">Deadline : {{ event.deadline }}</div>
          </div>
          <div class="md-layout-item md-size-100 icon-list-item">
            <feather type="alert-octagon"></feather>
            <div class="list-item-text">Importance : {{ event.importance }}</div>
          </div>
          <div class="md-layout-item md-size-100 icon-list-item">
            <feather type="folder"></feather>
            <div class="list-item-text">{{ event.isdone? 'finished' : 'In progress' }}</div>
            <div class="bullet" :class="bulletClass"></div>
          </div>
          <div class="md-layout-item md-size-100 icon-list-item">
            <feather type="eye"></feather>
            <div class="list-item-text" :class="event.numberdaysleft <= 0 ? 'red-text' : 'green-text' ">Number Days Left : {{ event.numberdaysleft }}</div>
          </div>
          <div class="md-layout-item md-size-100 icon-list-item">
            <feather type="type"></feather>
            <div class="list-item-text description">{{ event.description}}</div>
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

@Component({
  components: { modal: Modal }
})
export default class PCalendarEvent extends Vue {
  @Prop() days!: Array<any>;
  @Prop() calendar!: Calendar<any, any>;
  @Prop() event!: any;

  showDetail: boolean = false;

  get Title() {
    return this.event.task;
  }

  get bulletClass() {
    // FIXME : color selon matrice
    const index = Math.round(Math.random() * 4);
    const classes = ["bullet1", "bullet2", "bullet3", "bullet4", "bullet5"];
    return classes[index];
  }

  get displayModalLeft() {
    const day = new Date(this.event.deadline).getDay();
    return day === 4 || day === 5;
  }
}
</script>

<style scoped>
.red-text{
  color: red;
}
.green-text{
  color: green;
}
</style>
