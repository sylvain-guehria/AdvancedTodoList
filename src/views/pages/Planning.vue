<template>
  <div class="content no-padding-top planning-calendar">
    <div class="md-layout">
      <div class="legend"><legend-bullet :planning="true"></legend-bullet></div>
      <planning-calendar />
    </div>
  </div>
</template>

<script>
import PlanningCalendar from "@/components/calendar/PlanningCalendar.vue";
import LegendBulletVue from "@/components/menus/LegendBullet.vue";

import { bus } from "@/main";

export default {
  name: "Planning",
  components: {
    "planning-calendar": PlanningCalendar,
    "legend-bullet": LegendBulletVue,
  },
  methods: {
    data() {
      return {
        showAddTask: false,
      };
    },
  },
};
</script>

<style scoped>
.legend {
  width: 100%;
  text-align: right;
  margin-right: 100px;
}
</style>
