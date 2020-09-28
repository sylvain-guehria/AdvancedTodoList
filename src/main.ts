import Vue from 'vue';
import Vuex from 'vuex';
import App from './App.vue';
import router from './router';
import vuetify from './plugins/vuetify';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import VModal from 'vue-js-modal';
import Notifications from 'vue-notification';
import VueLodash from 'vue-lodash';
import lodash from 'lodash';
import { Todo, User } from './models/types';

import './assets/css/modalstyle.css';

Vue.use(Vuex);
Vue.use(VModal);
Vue.use(Notifications);
Vue.use(VueLodash, { lodash: lodash });

Vue.config.productionTip = false;

var todolist: Todo[] = [];
var coloredtodolist: Todo[] = [];
var user: User = {
  loggedIn: false,
  data: {}
};

const store = new Vuex.Store({
  state: {
    todolist: todolist,
    coloredtodolist: coloredtodolist,
    user: user
  },
  getters: {
    getUser: (state) => {
      return state.user;
    },
    getTodoList: (state) => {
      return state.todolist;
    },
    getColoredtodolist: (state) => {
      return state.coloredtodolist;
    }
  },
  mutations: {
    setTodoList (state, newList: Todo[]) {
      state.todolist = newList;
    },
    setColoredTodoList (state, newList: Todo[]) {
      state.coloredtodolist = newList;
    },
    setUser (state, user: User) {
      state.user = user;
    }
  },
  actions: {

  }
});

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app');
