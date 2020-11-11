<template>
  <div class="content no-padding-top planning-calendar">
    <div class="md-layout">
      <planning-calendar :key="this.showAddTask"/>
      <legend-bullet></legend-bullet>
    </div>

    <!-- drawer edti -->
    <edit-task-drawer
      :isActive="showAddTask"
      @isActive="updateIsActiveAddTask"
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
    // eslint-disable-next-line no-console
      console.log('drawer evenntn', payload);
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
