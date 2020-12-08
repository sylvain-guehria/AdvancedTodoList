import Vue from "vue";
import App from "./App.vue";
import VModal from 'vue-js-modal';
import Notifications from 'vue-notification';
import router from "./routes/routes";
import store from './store/';
import VueToasted from 'vue-toasted';
import { longClickDirective } from 'vue-long-click'


// Plugins
import GlobalDirectives from "@/common/directives/globalDirectives";
import vuetify from '@/plugins/vuetify' 

// MaterialDashboard plugin
import MaterialDashboard from "@/plugins/material-dashboard";

//chart
import VueApexCharts from 'vue-apexcharts'


export const bus = new Vue();

Vue.use(VueToasted, {
  iconPack : 'material' 
});
Vue.use(require('vue-moment'));

Vue.use(VModal);
Vue.use(Notifications);

Vue.use(MaterialDashboard);
Vue.use(GlobalDirectives);
Vue.use(VueApexCharts)

Vue.component('apexchart', VueApexCharts)

const longClickInstance = longClickDirective({delay: 400, interval: 50})
Vue.directive('longclick', longClickInstance)


/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  data: {},
  store,
  vuetify,
  render: h => h(App)
});

