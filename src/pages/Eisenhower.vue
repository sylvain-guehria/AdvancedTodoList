<template>
  <div class="content">
  <div class="md-layout-item md-size-100">
    <eisenhowerChart></eisenhowerChart>
    <chart-legend></chart-legend>
  </div>
  </div>

</template>

<script>
import EisenhowerChart from '@/components/chart/EisenhowerChart.vue';
import ChartLegend from '@/components/chart/ChartLegend.vue';

export default {
  components: {
    'eisenhowerChart' : EisenhowerChart,
    'chart-legend': ChartLegend
  },
  data() {
    return {};
  },
  methods: {}
};
</script>
