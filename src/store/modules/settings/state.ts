import { Settings } from "@/common/models/types";

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
    }
  }

export const stateSettings = { ...initialState };



