import { Module } from "vuex";
import { actionsUser } from "./actions";
import { gettersUser } from "./getters";
import { mutationsUser } from "./mutations";
import { stateUser } from "./state";
import { RootState } from "../../state";
import { User } from "@/common/models/types/index"

export { ActionTypes as userActionsType } from "@/store/modules/user/actions";
export { MutationTypes as userMutationType } from "@/store/modules/user/mutations";



export const user: Module<User, RootState> = {
  state : stateUser,
  actions : actionsUser,
  mutations : mutationsUser,
  getters : gettersUser
};
