import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import { RootState } from "./state";
import todos from './modules/todos/todos-module';
import subtasks from './modules/subtasks/subtasks-module';
import { user } from './modules/user/index';
import { settings } from './modules/settings/index';


Vue.use(Vuex);

const storeOptions: StoreOptions<RootState> = {
  state: {
    version: "1.0.0"
  },

  modules: {
    settings,
    user
  }
};

const store = new Vuex.Store<RootState>(storeOptions);

export default store;
