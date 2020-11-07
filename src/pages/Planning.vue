<template>
  <div class="content no-padding-top planning-calendar">
    <div class="md-layout">
      <planning-calendar />
    </div>
  </div>
</template>

<script>
import PlanningCalendar from "@/components/Calendar/PlanningCalendar";

export default {
  components: {
    "planning-calendar": PlanningCalendar
  },
  data() {
    return {};
  },
  methods: {}
};
</script>
