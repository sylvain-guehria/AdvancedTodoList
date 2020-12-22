import store from '@/store/index'

export const helperSubtask = {

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
        return store.getters.getTodoList[index].subtasks[index_child].details.length;
      }
    } else {
      return 0;
    }
  },
  getNumberSubTaskActive(item): number {
    return item.subtasks && item.subtasks.length > 0
      ? item.subtasks.filter((subtask) => !subtask.isdone).length
      : 0;
  }
};
