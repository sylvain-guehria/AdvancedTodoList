// Sidebar on the right. Used as a local plugin in DashboardLayout.vue
import SideBar from "@/views/SidebarPlugin";

// asset imports//
//import VueMaterial from "vue-material";
import "vue-material/dist/vue-material.min.css";
import "vue-material/dist/theme/default.css";
import "@/assets/scss/material-dashboard.scss";
import VueFeather from "vue-feather";
import vSelect from "vue-select";
import "vue-select/src/scss/vue-select.scss";
import Datepicker from "vuejs-datepicker";
import VueBreadcrumbs from "vue-breadcrumbs";
import TimeAgo from "vue2-timeago";
import * as materialModule from "@/common/modules/materials";

// library auto imports
import "es6-promise/auto";

export default {
  install(Vue) {
    Vue.use(SideBar);
    //Vue.use(VueMaterial);
    Vue.use(VueFeather);
    Vue.use(VueBreadcrumbs, {
      template: `<nav class="breadcrumb" v-if="$breadcrumbs.length">
        <div v-for="(crumb, key) in $breadcrumbs">
          <router-link class="breadcrumb-item" :to="linkProp(crumb)" :key="key">
            <span v-if="key != 0"> {{ crumb | crumbText }} </span>
            <feather type="more-horizontal" v-if="key == 0"></feather>
          </router-link>
          <feather type="chevron-right"></feather>
        </div>
        </nav>`
    });
    Vue.component("v-select", vSelect);
    Vue.component("datepicker", Datepicker);
    Vue.component("time-ago", TimeAgo);
    new materialModule.MaterialModule();
  }
};
