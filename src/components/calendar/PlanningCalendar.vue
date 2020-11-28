<template>
  <div class="md-layout-item md-size-100" style="margin-top: 20px">
    <toolbar :calendar="calendar" @monthChange="monthChanged($event)" />
    <weeks-view
      :calendar="calendar"
      :key="generatedKey"
    />
  </div>
</template>


<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { Calendar, Weekday } from "dayspan";
import WeeksView from "@/components/calendar/WeeksView.vue";
import Toolbar from "@/components/calendar/Toolbar.vue";

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

  updated(){
    this.removeWeekend();
  }

  get generatedKey(){
    return this.$store.getters.getNumberTotalTask + this.$store.getters.getWithWeekEnd;
  }

  monthChanged(calendar: Calendar<any, any>) {
    this.removeWeekend();
  }

  removeWeekend() {
    if(!this.$store.getters.getWithWeekEnd){
    this.calendar.days = this.calendar.days.filter(
      d => d.dayOfWeek !== Weekday.SATURDAY && d.dayOfWeek !== Weekday.SUNDAY
    );
    }else{
      this.calendar.days = Calendar.months().days
    }
  }
}
</script>
