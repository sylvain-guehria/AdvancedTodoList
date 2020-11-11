<template>
  <div class="layout">
    <div class="legend">
      <div class="legend-2">
        <div class="bullet bullet2"></div>
        <p>Task Important and Urgent</p>
      </div>
      <div class="legend-2">
        <div class="bullet bullet3"></div>
        <p>Task Important, Not Urgent</p>
      </div>
      <div class="legend-2">
        <div class="bullet bullet4"></div>
        <p>Task Urgent, Not Important</p>
      </div>
      <div class="legend-2">
        <div class="bullet bullet1"></div>
        <p>Task Not Urgent, Not Important</p>
      </div>
    </div>
    <div class="legend">
      <div class="legend-2">
        <feather type="check"></feather>
        <p>subtask done</p>
      </div>
      <div class="legend-2">
        <feather type="x-circle"></feather>
        <p>subtask not done</p>
      </div>
      <div class="legend-2">
        (x) number of active subtasks
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {};
  },
  methods: {}
};
</script>
<style scoped>
.legend {
  display: inline-block;
}
.legend-2 {
  display: flex;
  padding: 10px;
  margin-left: 15px;
}
.bullet {
  margin: 5px;
}
p {
  margin-left: 10px;
}
.layout{
  display: flex;
  margin-top : 25px
}
</style>
