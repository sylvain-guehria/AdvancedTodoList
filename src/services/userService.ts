import lodash from "lodash";

import store from '@/store/index'

import { Message, User } from '@/common/models/types';
import { userActionsType } from "@/store/modules/users";


export const serviceUser = {
  fetchUsers() {
    store.dispatch(userActionsType.FETCH_USERS);
  },
  sendMessage(payload: Message) {
    store.dispatch(userActionsType.SEND_MSG, payload);
  },
  deletUser(uid: string) {
    store.dispatch(userActionsType.DELETE_USER, uid);
  }
};
