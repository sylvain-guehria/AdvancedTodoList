
import { Drawer } from '@/common/models/types/index'

export interface Settings {
    langage: string,
    with_weekend: boolean,
    drawersOpened: Drawer[],
    actionLoading: boolean,
    hidden_column: {
      order: boolean,
      deadline: boolean,
      creationDate: boolean,
      numberdaysleft: boolean,
      importance: boolean,
    },
    hidden_column_subtasks: {
      order: boolean,
      deadline: boolean,
      importance: boolean,
    }
  }
  