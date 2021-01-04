import { MutationTree } from "vuex";
import { User, Users } from "@/common/models/types/index";
import store from '@/store/index';

export enum MutationTypes {
  SET_USER = "setUser",
  SET_USERS = "setUsers",
  REMOVE_USER = "removeUser"
}

export const mutationsUsers: MutationTree<Users> = {
  [MutationTypes.SET_USER](state, user: User) {
    state.user = user;
  },
  [MutationTypes.SET_USERS](state, users: User[]) {
    state.users = users;
  },
  [MutationTypes.REMOVE_USER](state, uid) {
    var index = state.users.findIndex(function (o) {
        return o.uid === uid;
    });
    if (index !== -1) state.users.splice(index, 1);
  },
}