<template>
  <div class="content no-padding-top planning-calendar">
    <div class="md-layout">
      <planning-calendar />
       <legend-bullet></legend-bullet>
    </div>
  </div>
</template>

<script>
import PlanningCalendar from "@/components/Calendar/PlanningCalendar";
import LegendBulletVue from './LegendBullet.vue';

export default {
  components: {
    "planning-calendar": PlanningCalendar,
    "legend-bullet" : LegendBulletVue
  },
  data() {
    return {};
  },
  methods: {}
};
</script>
