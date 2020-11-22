<template>
  <div class="content no-padding-top planning-calendar">
    <div class="md-layout">
      <planning-calendar :key="this.showAddTask"/>
       <div class="legend"><legend-bullet :planning="true"></legend-bullet></div>
    </div>

    <!-- drawer edti -->
    <edit-task-drawer
      :isActive="showAddTask"
      @isActive="updateIsActiveAddTask"
      :key="this.$store.getters.getRendAllListNumber"
    ></edit-task-drawer>

  </div>
</template>

<script>
import PlanningCalendar from "@/components/Calendar/PlanningCalendar";
import LegendBulletVue from "./LegendBullet.vue";
import EditTaskDrawer from "@/components/modals/EditTaskDrawer.vue";


import { bus } from '../main';

export default {
  components: {
    "planning-calendar": PlanningCalendar,
    "legend-bullet": LegendBulletVue,
    "edit-task-drawer": EditTaskDrawer,
  },
  mounted (){
    bus.$on('openDrawerEdit', this.showDrawerEditTask);
  },
  methods:{
  showDrawerEditTask(payload){
    if (payload) {
      this.$store.commit("setCurrentTodo", payload.key);
      this.showAddTask = true;
    }
  },
  updateIsActiveAddTask(value) {
      this.showAddTask = value;
    }
  },
  data() {
    return {
      showAddTask: false
    };
  },
};
</script>

<style scoped>

.legend {
  margin-left: 20px;
}
</style>
