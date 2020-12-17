import { Settings } from "@/common/models/types/index";

export const initialState: Settings =  {
    langage: 'en',
    drawersOpened: [],
    with_weekend: true,
    loading: false,
    hidden_column: {
      order: true,
      deadline: true,
      creationDate: true,
      numberdaysleft: true,
      importance: true,
    },
    hidden_column_subtasks: {
      order: true,
      deadline: true,
      importance: true,
    }
  }

export const stateSettings = { ...initialState };



