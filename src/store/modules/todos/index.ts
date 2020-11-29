import { Module } from "vuex";
import { actionsTodos } from "./actions";
import { gettersTodos } from "./getters";
import { mutationsTodos } from "./mutations";
import { stateTodos } from "./state";
import { RootState } from "../../state";
import { Todos } from "@/common/models/types"


export const todos: Module<Todos, RootState> = {
  state : stateTodos,
  actions : actionsTodos,
  mutations : mutationsTodos,
  getters : gettersTodos
};
