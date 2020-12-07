import { Module } from "vuex";
import { actionsSubtasks } from "./actions";
import { gettersSubtasks } from "./getters";
import { mutationsSubtasks } from "./mutations";
import { stateSubtasks } from "./state";
import { RootState } from "../../state";
import { SubTasks } from "@/common/models/types/types"

const namespaced: boolean = true;

export const subtasks: Module<SubTasks, RootState> = {
  state : stateSubtasks,
  actions : actionsSubtasks,
  mutations : mutationsSubtasks,
  getters : gettersSubtasks
};
