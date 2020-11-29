<template>
  <div class="md-layout">
    <div
    >
      <legend-chart></legend-chart>
    </div>
  </div>
</template>
<script lang="ts">
import LegendBulletVue from "@/components/menus/LegendBullet.vue";
import { Component, Vue, Prop, PropSync } from "vue-property-decorator";

@Component({
  components: {
    'legend-chart': LegendBulletVue,
  },
})
export default class ChartLegend extends Vue {}
</script>
