<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item md-size-100">
        <div class="table-tools">
          <md-button class="md-tertiary" @click="showFilters = true">
            <feather type="filter"></feather>Filter
          </md-button>
        </div>
      </div>
      <div class="md-layout-item md-size-50 padding-20 text-align-left">
        <div class="menu-title"><p class="title">
        {{ new Date().toLocaleDateString() }}</p>
        </div>
      </div>
      <div class="md-layout-item md-size-50 padding-20 text-align-right">
        <!-- <p class="subtitle">Start of project phase 2019/12/06</p> -->
      </div>
      <div class="md-layout-item md-size-50 padding-20 text-align-right">
        
        <!-- button for drawer add task -->
    <md-button class="md-tertiary" @click="showDrawerAddTask">
      <feather type="plus"></feather>Add a task
    </md-button>

      </div>
      <div class="md-layout-item md-size-100" style="margin-top: 70px">
        <md-tabs>
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
              badge: this.$store.getters.getNumberActiveTask
            }"
          >
            <simple-table
              :key="this.$store.getters.getNumberActiveTask"
              :todolist="this.$store.getters.getActiveTodoList"
              @editTaskEvent="showDrawerEditTask"
              @showReadOnlyTaskDrawer="showReadOnlyTaskDrawer"
            ></simple-table>
          </md-tab>
          <md-tab
            id="tab-pages"
            md-label="All tasks"
            md-icon="list"
            :md-template-data="{
              badge: this.$store.getters.getNumberTotalTask
            }"
          >
            <simple-table
              :key="this.$store.getters.getNumberTotalTask"
              :todolist="this.$store.getters.getTodoList"
              @editTaskEvent="showDrawerEditTask"
              @showReadOnlyTaskDrawer="showReadOnlyTaskDrawer"
            ></simple-table>
          </md-tab>
        </md-tabs>
      </div>

      <!-- drawers -->

      <edit-task-drawer
        :isActive="showAddTask"
        @isActive="updateIsActiveAddTask"
        ></edit-task-drawer>

      <filters-drawer
        :isActive="showFilters"
        @isActive="updateIsActive"
      ></filters-drawer>
      
       <read-only-task-viewer
      :isActive="showReadTask"
      @isActive="updateIsActiveReadTask"
    ></read-only-task-viewer>

    </div>
    <div class="spinner-rotate" v-show="isLoading"></div>
  </div>
</template>

<script  lang="ts">
import { SimpleTable } from "@/components";
import FiltersDrawer from "../components/FiltersDrawer.vue";
import EditTaskDrawer from "../components/modals/EditTaskDrawer.vue";
import ReadOnlyTaskDrawer from  '../components/modals/ReadOnlyTaskDrawer.vue'

export default {
  name: "TotoList",
  components: {
    SimpleTable,
    "filters-drawer": FiltersDrawer,
    "edit-task-drawer": EditTaskDrawer,
    "read-only-task-viewer" : ReadOnlyTaskDrawer
  },
  data() {
    return {
      showFilters: false,
      showAddTask: false,
      currentStep: -1,
      stepClass: "step100",
      objectStep: 3,
      isLoading: true,
      showReadTask: false,
    };
  },
  created() {
    setTimeout(() => {
      this.isLoading = false;
    }, 0);
  },
  methods: {
      showDrawerAddTask (): void{
      this.$store.commit('resetCurrentTodo');
      this.showAddTask = true;
  },
    showDrawerEditTask (payload): void{
      if(payload){
      this.$store.commit('setCurrentTodo', payload.key);
      this.showAddTask = true;
      }
  },
  showReadOnlyTaskDrawer(payload): void {
      this.$store.commit('setCurrentTodo', payload.key);
      this.showReadTask = true;
    },
    updateIsActive(value) {
      this.showFilters = value;
    },
    updateIsActiveAddTask(value) {
      this.showAddTask = value;
    },
    updateIsActiveReadTask(value) {
      this.showReadTask = value;
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
  }
};
</script>
<style scoped>

</style>
