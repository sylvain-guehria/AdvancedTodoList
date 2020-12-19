import moment from 'moment';
import lodash from "lodash";

import store from '@/store/index'
import { Todo } from '@/common/models/types';


export const helperTodo = {

  getdaysleft(deadlineS: string): string {

    if (deadlineS === new Date().toISOString().substring(0, 10)) {
      return 'today'
    }
    if (!deadlineS) { return '' }
    return moment(deadlineS).endOf('day').fromNow();
  },

  getNumberdaysleft(deadlineS: string): number {
    const deadline = new Date(deadlineS);
    const DiffTime: number = deadline.getTime() - new Date().getTime();

    const diffTimeString: string = (DiffTime / (1000 * 3600 * 24)).toFixed(1);
    return parseFloat(diffTimeString);
  },
  dateOfTask(key) {
    var index = store.getters.getTodoList.findIndex(function (o) {
      return o.key === key;
    });

    if (index !== -1) {
      return store.getters.getTodoList[index].deadline;
    }
  },
  giveColorTodo(item): number {
    if (item && item.importance) {
      // red Task : importance >= 75
      if (item.importance >= 75) {
        return 1;
      }
      // orange/jaune tasks : 50 >= importance > 75
      if (50 <= item.importance && item.importance < 75) {
        return 2;
      }
      // blue task : 25 >= importance > 50
      if (25 <= item.importance && item.importance < 50) {
        return 3;
      }
      // green  task : 0 >= importance > 25
      if (0 <= item.importance && item.importance < 25) {
        return 0;
      }
    }
    return 5;
  },
  getNumberSubtaskInTask(todoKey) {
    if(!store.getters.getTodoList){return}
    var index = store.getters.getTodoList.findIndex(function (o) {
      return o.key === todoKey;
    });

      if (
        index !== -1 &&
        store.getters.getTodoList[index] &&
        store.getters.getTodoList[index].subtasks
      ) {
        return store.getters.getTodoList[index].subtasks.length;
    } else {
      return 0;
    }
  },
};
