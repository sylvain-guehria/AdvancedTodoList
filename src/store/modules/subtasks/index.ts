import { Module } from "vuex";
import { actionsSubtasks } from "./actions";
import { gettersSubtasks } from "./getters";
import { mutationsSubtasks } from "./mutations";
import { stateSubtasks } from "./state";
import { RootState } from "../../state";
import { SubTasks } from "@/common/models/types/index"

import { ActionTypes as subtasksActionsType } from "@/store/modules/subtasks/actions";
import { MutationTypes as subtasksMutationType } from "@/store/modules/subtasks/mutations";

const namespaced: boolean = true;

export const subtasks: Module<SubTasks, RootState> = {
  state : stateSubtasks,
  actions : actionsSubtasks,
  mutations : mutationsSubtasks,
  getters : gettersSubtasks
};

export {
  subtasksMutationType,
  subtasksActionsType
}