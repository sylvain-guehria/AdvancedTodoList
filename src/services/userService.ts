import lodash from "lodash";

import store from '@/store/index'

import { Message, User } from '@/common/models/types';
import { userActionsType } from "@/store/modules/users";


export const serviceUser = {
  fetchUsers() {
    if(store.getters.getActionLoading){ return;}
    store.dispatch(userActionsType.FETCH_USERS);
  },
  sendMessage(payload: Message) {
    if(store.getters.getActionLoading){ return;}
    store.dispatch(userActionsType.SEND_MSG, payload);
  },
  deletUser(uid: string) {
    if(store.getters.getActionLoading){ return;}
    store.dispatch(userActionsType.DELETE_USER, uid);
  }
};
