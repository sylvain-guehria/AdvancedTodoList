import { Module } from "vuex";
import { actionsTodos } from "./actions";
import { gettersTodos } from "./getters";
import { mutationsTodos } from "./mutations";
import { stateTodos } from "./state";
import { RootState } from "../../state";
import { Todos } from "@/common/models/types/index"
import { ActionTypes as tasksActionsType } from "@/store/modules/todos/actions";
import { MutationTypes as tasksMutationType } from "@/store/modules/todos/mutations";


export const todos: Module<Todos, RootState> = {
  state : stateTodos,
  actions : actionsTodos,
  mutations : mutationsTodos,
  getters : gettersTodos
};

export {
  tasksActionsType,
  tasksMutationType
}
