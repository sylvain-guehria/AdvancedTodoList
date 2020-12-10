
import { Drawer } from '@/common/models/types/index'

export interface Settings {
    langage: string,
    with_weekend: boolean,
    drawersOpened: Drawer[],
    loading: boolean,
    hidden_column: {
      order: boolean,
      task: boolean,
      deadline: boolean,
      creationDate: boolean,
      numberdaysleft: boolean,
      importance: boolean,
      isdone: boolean,
    },
    hidden_column_subtasks: {
      order: boolean,
      label: boolean,
      deadline: boolean,
      creationDate: boolean,
      numberdaysleft: boolean,
      importance: boolean,
      isdone: boolean,
      actions: boolean,
      details: boolean
    }
  }
  