import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import { RootState } from "./state";
import { todos } from './modules/todos/index';
import { subtasks } from './modules/subtasks/index';
import { user } from './modules/user/index';
import { settings } from './modules/settings/index';


Vue.use(Vuex);

const storeOptions: StoreOptions<RootState> = {
  state: {
    version: "1.0.0"
  },

  modules: {
    settings,
    user,
    todos,
    subtasks
  }
};

const store = new Vuex.Store<RootState>(storeOptions);

export default store;
