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
      <div class="md-layout-item md-size-100" style="padding:0">
        <div class="steps-container">
          <div class="step-slider" :class="[stepClass]"></div>
          <div
            class="step first-step"
            :class="{ active: isActive(-1), reached: isReached(-1) }"
            @click="stepClick(-1)"
          >
            <div>Opportunity</div>
          </div>
          <div
            class="step"
            :class="{ active: isActive(0), reached: isReached(0) }"
            @click="stepClick(0)"
          >
            <div>Gate 0</div>
          </div>
          <div
            class="step"
            :class="{ active: isActive(1), reached: isReached(1) }"
            @click="stepClick(1)"
          >
            <div>Gate 1</div>
          </div>
          <div
            class="step"
            :class="{ active: isActive(2), reached: isReached(2) }"
            @click="stepClick(2)"
          >
            <div>Gate 2</div>
          </div>
          <div
            class="step last-active-step"
            :class="{ active: isActive(3), reached: isReached(3) }"
            @click="stepClick(3)"
          >
            <div>Gate 3</div>
          </div>
          <div
            class="step"
            :class="{ active: isActive(4), reached: isReached(4) }"
            @click="stepClick(4)"
          >
            <div>Gate 4</div>
          </div>
          <div
            class="step"
            :class="{ active: isActive(5), reached: isReached(5) }"
            @click="stepClick(5)"
          >
            <div>Gate 5</div>
          </div>
          <div
            class="step last-step"
            :class="{ active: isActive(6), reached: isReached(6) }"
            @click="stepClick(6)"
          >
            <div>Gate 6</div>
          </div>
        </div>
      </div>
      <div class="md-layout-item md-size-50 padding-20 text-align-left">
        <p class="subtitle">From 2019/04/28 to 2019/06/10</p>
      </div>
      <div class="md-layout-item md-size-50 padding-20 text-align-right">
        <p class="subtitle">Start of project phase 2019/12/06</p>
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
            md-label="My opportunities"
            md-icon="activity"
            :md-template-data="{ badge: counter1 }"
          >
            <simple-table :key="this.$store.getters.getTodoList.length"></simple-table>
          </md-tab>
          <md-tab
            id="tab-pages"
            md-label="All opportunities"
            md-icon="list"
            :md-template-data="{ badge: counter2 }"
          >
            <simple-table></simple-table>
          </md-tab>
        </md-tabs>
      </div>
      <filters-drawer :isActive="showFilters" @isActive="updateIsActive"></filters-drawer>
    </div>
    <div class="spinner-rotate" v-show="isLoading"></div>
  </div>
</template>

<script>
import { SimpleTable } from "@/components";
import FiltersDrawer from "../components/FiltersDrawer.vue";

export default {
  name:'TotoList',
  components: {
    SimpleTable,
    "filters-drawer": FiltersDrawer
  },
  data() {
    return {
      counter1: 5,
      counter2: 18,
      showFilters: false,
      currentStep: -1,
      stepClass: "step100",
      objectStep: 3,
      isLoading: true
    };
  },
  created() {
    setTimeout(() => {
      this.isLoading = false;
    }, 5000);
  },
  methods: {
    updateIsActive(value) {
      this.showFilters = value;
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
    }
  }
};
</script>
