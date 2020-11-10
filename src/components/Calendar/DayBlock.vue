<template>
  <div
    class="day"
    :class="classesDay"
    @mouseenter="mouseEnterDay"
    @mouseleave="mouseLeaveDay"
    @mousemove.stop="mouseMoveDay"
    @mousedown="mouseDownDay"
    @mouseup="mouseUpDay"
    @click.stop="add"
    @dragstart.prevent
  >
    <div :class="classesHeader">
      <a
        class="ds-dom"
        href
        :class="classesDayOfMonth"
        @click.stop.prevent="viewDay"
        @mousedown.stop
      >{{ dayOfMonth }}</a>
    </div>

    <template v-for="(event) in visibleEvents">
      <calendar-event :key="event.id" :event="event" :calendar="calendar"></calendar-event>
    </template>
    <div
      class="more-events"
      v-if="events.length > 3"
      @click="showMoreEvents = true"
    >+ {{events.length - 2}} more</div>
    <modal :show="showMoreEvents" @show="showMoreEvents=$event">
      <div slot="header">{{ dayOfMonth }}</div>
      <div slot="body">
        <template v-for="(event) in events">
          <calendar-event :key="event.id" :event="event" :calendar="calendar"></calendar-event>
        </template>
      </div>
    </modal>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { CalendarDay, Calendar, CalendarEvent, Functions as fn } from "dayspan";
import PCalendarEvent from "./PCalendarEvent.vue";
import Modal from "@/components/Modal.vue";

@Component({
  components: {
    "calendar-event": PCalendarEvent,
    modal: Modal
  }
})
export default class DayBlock extends Vue {
  @Prop() day!: CalendarDay<any, any>;
  @Prop() calendar!: Calendar<any, any>;
  @Prop() placeholder!: CalendarEvent<any, any>;
  @Prop() placeholderForCreate!: Boolean;

  formats = { month: "MM" };
  events = [
    {
      title: "Maintenance Meeting",
      creationDate: "2020-02-07T08:00:00Z",
      eventType: 1,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
    },
    {
      title: "Commercial Meeting",
      creationDate: "2020-02-05T09:00:00Z",
      eventType: 2,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
    },
    {
      title: "Trasnfer to Gate 3",
      creationDate: "2020-02-18T11:00:00Z",
      eventType: 3,
      description: "Smaller description of the event"
    },
    {
      title: "Workshop Bonding",
      creationDate: "2020-02-22T07:00:00Z",
      eventType: 4,
      description: "Smaller description of the event"
    }
  ];
  showMoreEvents: boolean = false;

  get classesDay() {
    return {
      today: this.day.currentDay,
      "first-day-day": this.day.dayOfMonth === 1,
      "out-calendar": !this.day.inCalendar
    };
  }

  get classesHeader() {
    return {
      "out-calendar": !this.day.inCalendar
    };
  }

  get classesDayOfMonth() {
    return {
      "today-dom": this.day.currentDay
    };
  }

  get dayOfMonth() {
    return this.day.dayOfMonth;
  }

  get month() {
    return this.day.format(this.formats.month);
  }

  get hasPlaceholder() {
    return this.placeholder && this.placeholder.time.matchesDay(this.day);
  }

  get visibleEvents() {
    const eventsNb = Math.round(Math.random() * 5);
    this.events = this.events.slice(0, eventsNb);
    return this.events.length < 4 ? this.events : this.events.slice(0, 2);
  }

  add() {
    this.$emit("add", this.day);
  }

  viewDay(event) {
    this.$emit("view-day", this.day);
  }

  mouseEnterDay($event) {
    this.$emit("mouse-enter-day", this.day);
  }

  mouseLeaveDay($event) {
    this.$emit("mouse-leave-day", this.day);
  }

  mouseMoveDay($event) {
    this.$emit("mouse-move-day", this.getEvent("mouse-move-day", $event));
  }

  mouseDownDay($event) {
    this.$emit("mouse-down-day", this.getEvent("mouse-down-day", $event));
  }

  mouseUpDay($event) {
    this.$emit("mouse-up-day", this.getEvent("mouse-up-day", $event));
  }

  getEvent(type, $event, extra = {}) {
    return fn.extend(
      {
        type: type,
        day: this.day,
        calendar: this.calendar,
        left: $event.button === 0 && $event.buttons > 0,
        right: $event.button === 1 && $event.buttons > 0,
        handled: false,
        $event: $event,
        $vm: this,
        $element: this.$el
      },
      extra
    );
  }
}
</script>



