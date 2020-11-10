<template>
  <div class="content no-padding-top navigation-form">
    <div class="md-layout">
      <div
        class="md-layout-item md-xsmall-size-100 md-size-85 data-block vert-info-bar"
      >
        <div class="flex-row">
          <p class="light-subtitle left-label">IPC</p>
          <span></span>
        </div>
        <div class="vert-hr"></div>
        <div class="flex-row">
          <p class="light-subtitle left-label">Created</p>
          <span></span>
        </div>
        <div class="vert-hr"></div>
        <div class="flex-row">
          <p class="light-subtitle left-label">Customer</p>
          <span></span>
        </div>
        <div class="vert-hr"></div>
        <div class="flex-row">
          <p class="light-subtitle left-label">Name</p>
          <span></span>
        </div>
      </div>
      <div
        class="md-layout-item md-xsmall-size-20 md-size-13 data-block dash-notif-block"
      >
        <p class="light-subtitle left-label">Score</p>
        <span>0%</span>
      </div>
      <div
        class="md-layout-item md-small-size-100 md-size-66 transparent-block margin-top-20 nav-form-block"
      >
        <div class="form-nav-title" id="mainInfo">
          <div>
            <a>Main information</a>
          </div>
          <div>0%</div>
        </div>
        <div class="light-horizontal-separator"></div>
        <accordion
          :isActive="isForm1Active"
          @isActive="isForm1Active = $event"
          title="Details"
          class="transparent"
        >
          <div
            class="md-layout-item md-size-100 data-block"
            style="height:300px"
          >
            Details form
          </div>
        </accordion>
        <accordion
          :isActive="isForm2Active"
          @isActive="isForm2Active = $event"
          title="Customer information"
          class="transparent"
        >
          <div
            class="md-layout-item md-size-100 data-block"
            style="height:300px"
          >
            Customer information form
          </div>
        </accordion>
        <div class="form-nav-title" id="driversTargets">
          <div>
            <a>Drivers & targets</a>
          </div>
          <div>0%</div>
        </div>
        <div class="light-horizontal-separator"></div>
        <accordion
          :isActive="isForm3Active"
          @isActive="isForm3Active = $event"
          title="Client needs"
          class="transparent"
        >
          <div
            class="md-layout-item md-size-100 data-block"
            style="height:300px"
          >
            Client needs form
          </div>
        </accordion>
      </div>
      <div
        class="md-layout-item md-size-44 dashboard-right-panel margin-top-20"
      >
        <div class="md-layout-item md-size-100 data-block">
          <div class="form-nav-title">
            <div>
              <a href="#mainInfo">Main information</a>
            </div>
            <div>0%</div>
          </div>
          <div class="light-horizontal-separator active"></div>
          <div class="form-nav-link">
            <a>Details</a>
          </div>
          <div class="form-nav-link">
            <a>Customer information</a>
          </div>
          <div class="form-nav-link">
            <a>Project information</a>
          </div>
          <div class="form-nav-title">
            <div>
              <a href="#driversTargets">Drivers & targets</a>
            </div>
            <div>0%</div>
          </div>
          <div class="light-horizontal-separator"></div>
          <div class="form-nav-link">
            <a>Client needs</a>
          </div>
          <div class="form-nav-link">
            <a>Assembly technology already used</a>
          </div>
        </div>
        <div class="md-layout-item md-size-100">
          <md-button class="md-default" :disabled="true">
            <feather type="check"></feather>Create the opportunity
          </md-button>
        </div>
      </div>
    </div>
    <div class="md-layout-item md-size-100">
      <div class="tabs">
        <filter-tab :activeTab.sync="activeTab">
          <template v-slot:tab-header>
            <div class="tabs-filters-button">
              Product types
              <feather type="chevron-up" class="chevron-up"></feather
              ><feather type="chevron-down" class="chevron-down"></feather>
            </div>
          </template>
          <template v-slot:tab-content>
            The content of product types
          </template>
        </filter-tab>
        <filter-tab :activeTab.sync="activeTab">
          <template v-slot:tab-header>
            <div class="tabs-filters-button">
              Industry
              <feather type="chevron-up" class="chevron-up"></feather
              ><feather type="chevron-down" class="chevron-down"></feather>
            </div>
          </template>
          <template v-slot:tab-content>
            The content of industry
          </template>
        </filter-tab>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Accordion from "@/components/Accordion.vue";
import FilterTab from "@/components/FilterTab.vue";

@Component({
  components: {
    accordion: Accordion,
    "filter-tab": FilterTab,
  },
})
export default class NavigationForm extends Vue {
  isForm1Active: boolean = true;
  isForm2Active: boolean = true;
  isForm3Active: boolean = true;
  activeTab: string = "";
}
</script>
