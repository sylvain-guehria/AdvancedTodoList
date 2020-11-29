import { Settings } from "@/common/models/types";
import { GetterTree } from "vuex";
import { RootState } from "../../state";

export const gettersSettings : GetterTree<Settings, RootState> = {
  getSettings: (stateSetting: Settings) => {
    if (stateSetting) return stateSetting;
  },
  getLangage: (stateSetting: Settings) => {
    if (stateSetting) return stateSetting.langage;
  },
  getWithWeekEnd: (stateSetting: Settings) => {
    if (stateSetting) return stateSetting.with_weekend;
  },
  getColumnHidden: (stateSetting: Settings) => {
    if (stateSetting) return stateSetting.hidden_column;
  },
  getNumberColumnHidden: (stateSetting: Settings) => {
    //if (stateSetting) return stateSetting.hidden_column;
  },
};