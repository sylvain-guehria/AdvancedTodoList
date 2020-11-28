import { MutationTree } from "vuex";
import { User } from "@/common/models/types";


export enum MutationTypes {
    SET_USER = "setUser"
}

export const mutationsUser: MutationTree<User> = {
    [MutationTypes.SET_USER](state, user: User) {
        state = user;
      },
}