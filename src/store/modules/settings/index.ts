import { Module } from "vuex";
import { actionsSettings } from "./actions";
import { gettersSettings } from "./getters";
import { mutationsSettings } from "./mutations";
import { stateSettings } from "./state";
import { RootState } from "../../state";
import { Settings } from "@/common/models/types/types"

const namespaced: boolean = true;

export const settings: Module<Settings, RootState> = {
  state : stateSettings,
  actions : actionsSettings,
  mutations : mutationsSettings,
  getters : gettersSettings
};
