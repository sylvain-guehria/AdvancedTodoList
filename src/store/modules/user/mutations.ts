import { MutationTree } from "vuex";
import { User } from "@/common/models/types/index";


export enum MutationTypes {
    SET_USER = "setUser"
}

export const mutationsUser: MutationTree<User> = {
    [MutationTypes.SET_USER](state, { user, loggedIn}: {user: User, loggedIn: boolean}) {
        state.loggedIn = loggedIn
        state.data = user;
      },
}