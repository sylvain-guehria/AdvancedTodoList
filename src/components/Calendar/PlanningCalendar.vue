<template>
  <div class="md-layout-item md-size-100">
    <toolbar :calendar="calendar" @monthChange="monthChanged($event)" />
    <weeks-view :calendar="calendar" />
  </div>
</template>


<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { Calendar, Weekday } from "dayspan";
import WeeksView from "@/components/Calendar/WeeksView.vue";
import Toolbar from "@/components/Calendar/Toolbar.vue";

@Component({
  components: {
    "weeks-view": WeeksView,
    toolbar: Toolbar
  }
})
export default class PlanningCalendar extends Vue {
  calendar = Calendar.months();

  created() {
    this.removeWeekend();
  }

  monthChanged(calendar: Calendar<any, any>) {
    this.removeWeekend();
  }

  removeWeekend() {
    this.calendar.days = this.calendar.days.filter(
      d => d.dayOfWeek !== Weekday.SATURDAY && d.dayOfWeek !== Weekday.SUNDAY
    );
  }
}
</script>
