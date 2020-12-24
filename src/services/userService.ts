import lodash from "lodash";

import store from '@/store/index'
import Vue from 'vue';

import { Message, User } from '@/common/models/types';
import { userActionsType } from "@/store/modules/user";


export const serviceUser = {
  fetchUsers() {
    store.dispatch(userActionsType.FETCH_USERS);
  },
  sendMessage(payload: Message) {
    store.dispatch(userActionsType.SEND_MSG, payload);
  },
  deletUser(uid: string) {
 // eslint-disable-next-line no-console
 console.log('delete', uid);
  }
};
