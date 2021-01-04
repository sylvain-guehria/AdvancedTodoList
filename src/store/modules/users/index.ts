import { Module } from "vuex";
import { actionsUsers } from "./actions";
import { gettersUsers } from "./getters";
import { mutationsUsers } from "./mutations";
import { stateUsers } from "./state";
import { RootState } from "../../state";
import { Users } from "@/common/models/types/index"

export { ActionTypes as userActionsType } from "@/store/modules/users/actions";
export { MutationTypes as userMutationType } from "@/store/modules/users/mutations";



export const users: Module<Users, RootState> = {
  state : stateUsers,
  actions : actionsUsers,
  mutations : mutationsUsers,
  getters : gettersUsers
};
