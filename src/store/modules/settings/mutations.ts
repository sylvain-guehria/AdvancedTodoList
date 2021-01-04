import { MutationTree } from "vuex";
import { Drawer, Settings } from "@/common/models/types/index";


export enum MutationTypes {
    SET_ACTION_LOADING = "setActionLoading",
    SET_LANGAGE = "setLangage",
    SET_WITH_WEEKEND = "setWithWeekEnd",
    SET_DRAWERS_SETTINGS = "setDrawersSettings",
    HIDECOLUMN = "hideColumn",
    SET_SETTINGS = "setSettings",
    HIDECOLUMNSUBTASKS = "hideColumnSubtasks",
}

export const mutationsSettings: MutationTree<Settings> = {
    [MutationTypes.SET_SETTINGS](state, settings: Settings) {
        if (settings.hidden_column) state.hidden_column = settings.hidden_column;
        if (settings.hidden_column_subtasks)  state.hidden_column_subtasks = settings.hidden_column_subtasks;
        if (settings.drawersOpened)  state.drawersOpened = settings.drawersOpened;

        if (settings.langage)  state.langage =settings.langage;
        if (settings.with_weekend)  state.with_weekend = settings.with_weekend;
    },
    [MutationTypes.SET_ACTION_LOADING](state, status: boolean) {
        state.actionLoading = status;
    },
    [MutationTypes.SET_LANGAGE](state, langage: string) {
        state.langage = langage;
    },
    [MutationTypes.SET_WITH_WEEKEND](state, bool: boolean) {
        state.with_weekend = bool;
    },
    [MutationTypes.SET_DRAWERS_SETTINGS](state, drawers: Drawer[]) {
        state.drawersOpened = drawers;
    },
    [MutationTypes.HIDECOLUMN](state, the_hidden_column: string) {
        state.hidden_column[the_hidden_column] = !state.hidden_column[the_hidden_column];
    },
    [MutationTypes.HIDECOLUMNSUBTASKS](state, the_hidden_column: string) {
        state.hidden_column_subtasks[the_hidden_column] = !state.hidden_column_subtasks[the_hidden_column];
    },
}