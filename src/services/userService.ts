import lodash from "lodash";

import store from '@/store/index'
import Vue from 'vue';

import { User } from '@/common/models/types';
import {  userActionsType } from "@/store/modules/user";


export const serviceUser = {
  fetchUsers(){
      store.dispatch(userActionsType.FETCH_USERS);
  }
};
