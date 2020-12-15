<template>
  <div class="content no-padding-top planning-calendar" >
    <div class="md-layout">
    <div class="legend"><legend-bullet :planning="true"></legend-bullet></div>
      <planning-calendar :key="this.showAddTask"/>
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
import PlanningCalendar from "@/components/calendar/PlanningCalendar.vue";
import LegendBulletVue from "@/components/menus/LegendBullet.vue";
import EditTaskDrawer from "@/components/forms/EditTaskDrawer.vue";


import { bus } from '@/main';

export default {
  name: "Planning",
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
  width: 100%;
  text-align: right;
  margin-right: 100px;
}
</style>
