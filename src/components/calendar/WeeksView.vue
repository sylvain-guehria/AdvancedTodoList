<template>
  <div class="month">
    <div class="week-header">
      <div
        class="week-header-day"
        v-for="(weekday, i) in getWeek"
        :key="weekday"
        :class="weekdayClasses(i)"
      >
        {{ weekday }}
      </div>
    </div>
    <transition-group name="fade" tag="div">
      <day-row
        v-for="(i, index) in rows"
        v-on="$listeners"
        :key="generatedKey(index)"
        :days="daysAtRow(i, numberOfDays)"
        :calendar="calendar"
        :placeholder="placeholder"
        :placeholder-for-create="placeholderForCreate"
      ></day-row>
    </transition-group>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { Weekday, Day, Calendar, CalendarEvent } from "dayspan";
import DayRow from "./DayRow.vue";
import Toolbar from "@/components/calendar/Toolbar.vue";

@Component({
  components: {
    "day-row": DayRow,
  },
})
export default class WeeksView extends Vue {
  @Prop() calendar!: Calendar<any, any>;
  @Prop() placeholder!: CalendarEvent<any, any>;
  @Prop() placeholderForCreate!: Boolean;

  weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  allWeekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  generatedKey(index){
    return this.$store.getters.getNumberTotalTask + this.$store.getters.getWithWeekEnd + index;
  }

  get rows() {
    return Math.floor(this.calendar.days.length / this.numberOfDays);
  }

  get getWeek() {
    return this.$store.getters.getWithWeekEnd
      ? this.allWeekDays
      : this.weekdays;
  }

  get numberOfDays() {
    return this.$store.getters.getWithWeekEnd ? 7 : 5;
  }

  daysAtRow(row, rowSize) {
    var start = (row - 1) * rowSize;
    return this.calendar.days.slice(start, start + rowSize);
  }

  weekdayClasses(weekday) {
    return {
      "week-header-today": Day.today().dayOfWeek === weekday,
    };
  }
}
</script>


