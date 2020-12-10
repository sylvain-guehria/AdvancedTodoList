import { Settings } from "@/common/models/types/index";

export const initialState: Settings =  {
    langage: 'en',
    drawersOpened: [],
    with_weekend: true,
    loading: false,
    hidden_column: {
      order: true,
      task: true,
      deadline: true,
      creationDate: true,
      numberdaysleft: true,
      importance: true,
      isdone: true,
    },
    hidden_column_subtasks: {
      order: true,
      label: true,
      deadline: true,
      creationDate: true,
      numberdaysleft: true,
      importance: true,
      isdone: true,
      details: true,
      actions: true,
    }
  }

export const stateSettings = { ...initialState };



