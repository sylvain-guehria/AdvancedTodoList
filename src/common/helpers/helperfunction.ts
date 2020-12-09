import moment from 'moment';
import store from '@/store/index'

export const myFunctions = {

  getdaysleft(deadlineS: string): string {

    if (deadlineS === new Date().toISOString().substring(0, 10)) {
      return 'today'
    }
    if (!deadlineS) { return '' }
    return moment(deadlineS).fromNow();
  },

  getNumberdaysleft(deadlineS: string): number {
    const deadline = new Date(deadlineS);
    const DiffTime: number = deadline.getTime() - new Date().getTime();

    const diffTimeString: string = (DiffTime / (1000 * 3600 * 24)).toFixed(1);
    return parseFloat(diffTimeString);
  },
  formatDate(dateS: string): string {
    const date = new Date(dateS);
    const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(date);
    const mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(date);
    const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(date);
    return (`${da}-${mo}-${ye}`);
  },
  dateOfTask(key) {

    var index = store.getters.getTodoList.findIndex(function (o) {
      return o.key === key;
    });

    if (index !== -1) {
      return store.getters.getTodoList[index].deadline;
    }
  },
  dateOfSubTask(motherKey, key) {
    var index = store.getters.getTodoList.findIndex(function (o) {
      return o.key === motherKey;
    });

    if (index !== -1 && store.getters.getTodoList[index].subtasks) {
      var index_child = store.getters.getTodoList[
        index
      ].subtasks.findIndex(function (o) {
        return o.key === key;
      });

      if (
        index_child !== -1 &&
        store.getters.getTodoList[index].subtasks[index_child]
      ) {
        return store.getters.getTodoList[index].subtasks[index_child]
          .deadline;
      }
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
    return;
  },
  getNumberDetailInSubtask(todoKey, SubtasKey) {
    if(!store.getters.getTodoList){return}
    var index = store.getters.getTodoList.findIndex(function (o) {
      return o.key === todoKey;
    });

    if (index !== -1 && store.getters.getTodoList[index].subtasks) {
      var index_child = store.getters.getTodoList[index].subtasks.findIndex(
        function (o) {
          return o.key === SubtasKey;
        }
      );

      if (
        index_child !== -1 &&
        store.getters.getTodoList[index].subtasks[index_child] &&
        store.getters.getTodoList[index].subtasks[index_child].details
      ) {
        return store.getters.getTodoList[index].subtasks[index_child].length;
      }
    } else {
      return 0;
    }
  }
};
