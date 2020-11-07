<template>
  <div class="month">
    <div class="week-header">
      <div
        class="week-header-day"
        v-for="(weekday, i) in weekdays"
        :key="weekday"
        :class="weekdayClasses(i)"
      >{{ weekday }}</div>
    </div>
    <transition-group name="fade" tag="div">
      <day-row
        v-for="i in rows"
        v-on="$listeners"
        :key="i"
        :days="daysAtRow(i, 5)"
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
import Toolbar from "@/components/Calendar/Toolbar.vue";

@Component({
  components: {
    "day-row": DayRow
  }
})
export default class WeeksView extends Vue {
  @Prop() calendar!: Calendar<any, any>;
  @Prop() placeholder!: CalendarEvent<any, any>;
  @Prop() placeholderForCreate!: Boolean;

  weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

  get rows() {
    return Math.floor(this.calendar.days.length / 5);
  }

  created() {}

  daysAtRow(row, rowSize) {
    var start = (row - 1) * rowSize;

    return this.calendar.days.slice(start, start + rowSize);
  }

  weekdayClasses(weekday) {
    return {
      "week-header-today": Day.today().dayOfWeek === weekday
    };
  }
}
</script>


