import { Module } from "vuex";
import { actionsUser } from "./actions";
import { gettersUser } from "./getters";
import { mutationsUser } from "./mutations";
import { stateUser } from "./state";
import { RootState } from "../../state";
import { User } from "@/common/models/types/index"


export const user: Module<User, RootState> = {
  state : stateUser,
  actions : actionsUser,
  mutations : mutationsUser,
  getters : gettersUser
};
