<template>
  <div class="week">
    <template v-for="(day, index) in days">
      <day-block
        v-on="$listeners"
        :key="generatedKey(index)"
        :day="day"
        :calendar="calendar"
        :placeholder="placeholder"
        :placeholder-for-create="placeholderForCreate"
      ></day-block>
    </template>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { Calendar, CalendarEvent, Weekday } from "dayspan";
import DayBlock from "./DayBlock.vue";

@Component({
  components: {
    "day-block": DayBlock,
  },
})
export default class DayRow extends Vue {
  @Prop() days!: Array<any>;
  @Prop() calendar!: Calendar<any, any>;
  @Prop() placeholder!: CalendarEvent<any, any>;
  @Prop() placeholderForCreate!: Boolean;


  created() {
    this.removeWeekend();
  }

  generatedKey(index){
    return this.$store.getters.getNumberTotalTask + this.$store.getters.getWithWeekEnd + index;
  }

  monthChanged(calendar: Calendar<any, any>) {
    this.removeWeekend();
  }

  removeWeekend() {
    if (!this.$store.getters.getWithWeekEnd) {
      this.calendar.days = this.calendar.days.filter(
        (d) =>
          d.dayOfWeek !== Weekday.SATURDAY && d.dayOfWeek !== Weekday.SUNDAY
      );
    }
  }
}
</script>

