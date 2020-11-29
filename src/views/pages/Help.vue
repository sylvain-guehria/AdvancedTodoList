<template>
    <div class="content no-padding-top navigation-form">
    <div class="md-layout">
      <div
        class="md-layout-item md-small-size-100 md-size-66 transparent-block margin-top-20 nav-form-block"
      >
        <div class="light-horizontal-separator"></div>
        <accordion
          :isActive="isForm1Active"
          @isActive="isForm1Active = $event"
          title="What's coming ?"
          class="transparent"
        >
          <div
            class="md-layout-item md-size-100 data-block"
            style="height:300px"
          >
          <p>Languages: French will be available soon</p> <br><br>
          <p>The Eisenhower Matrix is currently in progress...</p>
          <p>It is not usable at the moment but i am working on it =)</p>
          <p>you can see the premise by typing '/eisenhower' in the URL after 'app'</p>
          
          </div>
        </accordion>
        <div class="light-horizontal-separator"></div>
        <accordion
          :isActive="isForm2Active"
          @isActive="isForm2Active = $event"
          title="einsonwer matrix"
          class="transparent"
        >
          <div
            class="md-layout-item md-size-100 data-block"
          >
           <img src="~@/assets/images/Eisenhower.png" alt />
          </div>
        </accordion>
        <div class="form-nav-title" id="driversTargets">
        </div>
        <div class="light-horizontal-separator"></div>
        <accordion
          :isActive="isForm3Active"
          @isActive="isForm3Active = $event"
          title="Contact me"
          class="transparent"
        >
          <div
            class="md-layout-item md-size-100 data-block"
          >
          <contact-me
          @reRender="reRender"
          :key="keyComponent"
          ></contact-me>
          </div>
        </accordion>
      </div>

      <div
        class="md-layout-item md-size-44 dashboard-right-panel margin-top-20"
      >
        <div class="md-layout-item md-size-100 data-block">
          <div class="form-nav-title">
            <div>
              <a href="#mainInfo">Astuces</a>
            </div>
          </div>
          <div class="light-horizontal-separator active"></div>
          <div class="form-nav-link">
            <a>...</a>
          </div>
          <div class="form-nav-link">
            <a>...</a>
          </div>
          <div class="form-nav-link">
            <a>...</a>
          </div>
          <div class="form-nav-title">
            <div>
              <a href="#driversTargets">Information</a>
            </div>
          </div>
          <div class="light-horizontal-separator"></div>
          <div class="form-nav-link">
            <a>...</a>
          </div>
          <div class="form-nav-link">
            <a>   ...</a>
          </div>
        </div>
      </div>
    </div>
    <div class="md-layout-item md-size-100">
      <div class="tabs">
        <filter-tab :activeTab.sync="activeTab">
          <template v-slot:tab-header>
            <div class="tabs-filters-button">
              Copyright 
              <feather type="chevron-up" class="chevron-up"></feather
              ><feather type="chevron-down" class="chevron-down"></feather>
            </div>
          </template>
          <template v-slot:tab-content>
           Copyright © 2020 Sylvain guehria, MIT License
          </template>
        </filter-tab>
        <filter-tab :activeTab.sync="activeTab">
          <template v-slot:tab-header>
            <div class="tabs-filters-button">
              The Author
              <feather type="chevron-up" class="chevron-up"></feather
              ><feather type="chevron-down" class="chevron-down"></feather>
            </div>
          </template>
          <template v-slot:tab-content>
           <a
          href="https://www.linkedin.com/in/sylvain-guehria-ab9737134/"
          target="_blank"
          > Mon LinkedIn.. =)</a>
          </template>
        </filter-tab>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Accordion from "@/common/componentslib/Accordion.vue";
import FilterTab from "@/common/componentslib/FilterTab.vue";
import ContactmeVue from '@/components/forms/Contactme.vue';

@Component({
  components: {
    accordion: Accordion,
    "filter-tab": FilterTab,
    "contact-me": ContactmeVue
  },
})
export default class NavigationForm extends Vue {
  isForm1Active: boolean = false;
  isForm2Active: boolean = false;
  isForm3Active: boolean = false;
  activeTab: string = "";
  keyComponent: number = 0;

  reRender(){
    this.keyComponent = this.keyComponent+1;
  }
}
</script>
