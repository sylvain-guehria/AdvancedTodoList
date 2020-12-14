<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item md-size-100" style="margin-top: 20px">

        <div class="flex">
        <div class="action-button">
        <div class="add_and_filter">
          <md-button class="md-tertiary" @click="addEmptyTask">
            <feather type="plus"></feather>Add a task
          </md-button>
          <md-button class="md-tertiary" @click="showFilters = true">
            <feather type="filter"></feather>Filter
          </md-button>
        </div>

          <colum-to-hide></colum-to-hide>
          <colum-subtasks-to-hide></colum-subtasks-to-hide>
          <legend-bullet :planning="true"></legend-bullet>
        </div>
        </div>

        <md-tabs :md-active-tab="dynamic_tab">
          <template slot="md-tab" slot-scope="{ tab }">
            <feather class="md-tab-icon" :type="tab.icon"></feather>
            <span class="md-tab-label">{{ tab.label }}</span>
            <i class="badge" v-if="tab.data.badge">{{ tab.data.badge }}</i>
          </template>

          <md-tab
            id="tab-home"
            md-label="Tasks not finished"
            md-icon="activity"
            :md-template-data="{
              badge: this.$store.getters.getNumberActiveTask,
            }"
          >
            <simple-table
              :key="this.$store.getters.getRendAllListNumber"
              :todolist="this.$store.getters.getActiveTodoList"
              @editTaskEvent="showDrawerEditTask"
              :mainList="true"
            ></simple-table>
          </md-tab>
          <md-tab
            id="tab-pages"
            md-label="All tasks"
            md-icon="list"
            :md-template-data="{
              badge: this.$store.getters.getNumberTotalTask,
            }"
          >
            <simple-table
              :key="this.$store.getters.getRendAllListNumber"
              :todolist="this.$store.getters.getTodoList"
              @editTaskEvent="showDrawerEditTask"
            ></simple-table>
          </md-tab>

          <!-- only when using filter -->
          <md-tab
            id="tab-posts"
            v-if="this.$store.getters.getNumberFilteredTask > 0"
            md-label="Filtered tasks"
            md-icon="filter"
            :md-template-data="{
              badge: this.$store.getters.getNumberFilteredTask,
            }"
          >
            <simple-table
              :key="this.$store.getters.getRendAllListNumber"
              :todolist="this.$store.getters.getFilteredTodoList"
            ></simple-table>
          </md-tab>
          <!-- end filter list -->
        </md-tabs>
      </div>

      <!-- drawers -->

      <edit-task-drawer
        :isActive="showAddTask"
        @isActive="updateIsActiveAddTask"
        :key="this.$store.getters.getRendAllListNumber"
      ></edit-task-drawer>

      <filters-drawer
        :isActive="showFilters"
        @isActive="updateIsActive"
        @activeFilterTab="setDynamicTab"
      ></filters-drawer>

    </div>
    <div class="spinner-rotate" v-show="isLoading"></div>
  </div>
</template>

<script lang="ts">
import SimpleTable from "@/components/tables/SimpleTable.vue";
import FiltersDrawer from "@/components/forms/FiltersDrawer.vue";
import EditTaskDrawer from "@/components/forms/EditTaskDrawer.vue";
import LegendBulletVue from "@/components/menus/LegendBullet.vue";
import { bus } from "@/main";
import ColumToHideVue from "@/components/menus/ColumToHide.vue";
import ColumnSubtasksToHideVue from "@/components/menus/ColumnSubtasksToHide.vue";

export default {
  name: "TotoList",
  components: {
    SimpleTable,
    "filters-drawer": FiltersDrawer,
    "edit-task-drawer": EditTaskDrawer,
    "legend-bullet": LegendBulletVue,
    "colum-to-hide": ColumToHideVue,
    "colum-subtasks-to-hide": ColumnSubtasksToHideVue,
  },
  data() {
    return {
      showFilters: false,
      showAddTask: false,
      currentStep: -1,
      stepClass: "step100",
      objectStep: 3,
      isLoading: false,
      dynamic_tab: "tab-home",
    };
  },
  created() {},
  mounted() {
    bus.$on("openDrawerEdit", this.showDrawerEditTask);
  },
  methods: {
    addEmptyTask() {
      bus.$emit("addEmptyTask");
    },
    setDynamicTab(tab: string) {
      this.dynamic_tab = tab;
    },
    showDrawerAddTask(): void {
      this.$store.commit("resetCurrentTodo");
      this.showAddTask = true;
    },
    showDrawerEditTask(payload): void {
      if (payload) {
        this.$store.commit("setCurrentTodo", payload.key);
        this.showAddTask = true;
      }
    },
    updateIsActive(value) {
      this.showFilters = value;
    },
    updateIsActiveAddTask(value) {
      this.showAddTask = value;
    },
    stepClick(stepNb) {
      if (this.objectStep >= stepNb) {
        this.currentStep = stepNb;
        this.stepClass = stepNb == -1 ? "step100" : "step" + stepNb;
      }
    },
    isActive(stepNb) {
      return this.currentStep == stepNb;
    },
    isReached(stepNb) {
      return this.objectStep >= stepNb;
    },
  },
};
</script>
<style scoped>
.add_and_filter{
  text-align: left;   

}
.legend-list {
  display: inline-block;
  position: absolute;
  bottom: 200px;
  left: 50px;
}
.column {
  display: inline-block;
  position: absolute;
  bottom: 200px;
  left: 250px;
}
.action-button {
  width: 100%;
  text-align: right;   
}
.column-subtask {
  display: inline-block;
  position: absolute;
  bottom: 200px;
  left: 450px;
}
.flex {
  display: flex;
}
</style>
