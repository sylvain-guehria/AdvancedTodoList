import { MutationTree } from "vuex";
import { drawer, Settings } from "@/common/models/types";


export enum MutationTypes {
    SET_LOADING = "setLoading",
    SET_LANGAGE = "setLangage",
    SET_WITH_WEEKEND = "setWithWeekEnd",
    SET_DRAWERS_SETTINGS = "setDrawersSettings",
    HIDECOLUMN = "hideColumn",
    SET_SETTINGS = "setSettings"
}

export const mutationsSettings: MutationTree<Settings> = {
    [MutationTypes.SET_SETTINGS](state, setting: Settings) {
        state = setting;
      },
    [MutationTypes.SET_LOADING](state, status: boolean) {
        state.loading = status;
    },
    [MutationTypes.SET_LANGAGE](state, langage: string) {
        state.langage = langage;
    },
    [MutationTypes.SET_WITH_WEEKEND](state, bool: boolean) {
        state.with_weekend = bool;
    },
    [MutationTypes.SET_DRAWERS_SETTINGS](state, drawers: drawer[]) {
        state.drawersOpened = drawers;
    },
    [MutationTypes.HIDECOLUMN](state, ths_hidden_column: string) {
        state.hidden_column[ths_hidden_column] = !state.hidden_column[ths_hidden_column];
    },
}