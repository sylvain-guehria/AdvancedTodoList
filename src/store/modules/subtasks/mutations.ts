import { MutationTree } from "vuex";
import { SubTask } from "@/common/models/types/index";
import store from '@/store/index';


export enum MutationTypes {
  addNewSubtaskTodo = "addNewSubtaskTodo",
  editSubtaskTodoByKey = "editSubtaskTodoByKey",
  setSubTaskState = "setSubTaskState",
  removeSubtaskByKey = "removeSubtaskByKey",
  editOneAttributSubtaskTodo = "editOneAttributSubtaskTodo",
  deleteSubtaskDetail = "deleteSubtaskDetail",
  ADDSUBTASKDETAIL = "addSubtasksDetail"
}

export const mutationsSubtasks: MutationTree<SubTask> = {

  // ADD SUBTASK
  [MutationTypes.addNewSubtaskTodo](state, subtask: SubTask) {
    let motherKey = subtask.motherKey;
    delete subtask.motherKey;

    for (var i in store.getters.getTodoList) {
      if (store.getters.getTodoList[i].key == motherKey) {
        if (store.getters.getTodoList[i].subtasks) {
          store.getters.getTodoList[i].subtasks.unshift(subtask);
        } else {
          store.getters.getTodoList[i].subtasks = [subtask];
        }
        break;
      }
    }
  },

  // DELETE AND REPLACE A SUBTASK
  [MutationTypes.editSubtaskTodoByKey](state, subtask: SubTask) {
    var index = store.getters.getTodoList.findIndex(function (o) {
      return o.key === subtask.motherKey;
    });

    if (index !== -1) {
      var index_child = store.getters.getTodoList[index].subtasks.findIndex(function (o) {
        return o.key === subtask.key;
      });

      if (index_child !== -1) {
        store.getters.getTodoList[index].subtasks.splice(index_child, 1);
        store.getters.getTodoList[index].subtasks.splice(index_child, 0, subtask);
      }
    }
  },

  //SET ONE ATTRIBUTE OF A SUBTASK
  [MutationTypes.editOneAttributSubtaskTodo](state, { motherKey, key, attribute, value }: { motherKey: string, key: string, attribute: string, value }) {
    var index = store.getters.getTodoList.findIndex(function (o) {
      return o.key === motherKey;
    });

    if (index !== -1 && store.getters.getTodoList[index].subtasks) {
      var index_child = store.getters.getTodoList[index].subtasks.findIndex(function (o) {
        return o.key === key;
      });

      if (index_child !== -1 && store.getters.getTodoList[index].subtasks[index_child]) {
        store.getters.getTodoList[index].subtasks[index_child][attribute] = value;
      }
    }
  },

  //SET DON UNDONE OF A SUBTASK
  [MutationTypes.setSubTaskState](state, { subtaskKey, motherKey, isDone }: { subtaskKey: string, motherKey: string, isDone: boolean }) {
    var index = store.getters.getTodoList.findIndex(function (o) {
      return o.key === motherKey;
    });

    if (index !== -1) {
      var index_child = store.getters.getTodoList[index].subtasks.findIndex(function (o) {
        return o.key === subtaskKey;
      });

      if (index_child !== -1) {
        store.getters.getTodoList[index].subtasks[index_child].isdone = isDone;
      }
    }
  },

  //REMOVE A SUBTASK WITH KEY
  [MutationTypes.removeSubtaskByKey](state, { subtaskKey, todoKey }: { subtaskKey: string, todoKey: string }) {
    var index = store.getters.getTodoList.findIndex(function (o) {
      return o.key === todoKey;
    });

    if (index !== -1) {
      var index_child = store.getters.getTodoList[index].subtasks.findIndex(function (o) {
        return o.key === subtaskKey;
      });

      if (index_child !== -1) {
        store.getters.getTodoList[index].subtasks.splice(index_child, 1);
      }
    }
  },

  //DELETE SUBTASK DETAIL
  [MutationTypes.deleteSubtaskDetail](state, { subtaskKey, taskKey, index }: { subtaskKey: string, taskKey: string, index: number }) {
    var indexTodo = store.getters.getTodoList.findIndex(function (o) {
      return o.key === taskKey;
    });

    if (index !== -1) {
      var index_child = store.getters.getTodoList[indexTodo].subtasks.findIndex(function (o) {
        return o.key === subtaskKey;
      });

      if (index_child !== -1
        && store.getters.getTodoList[indexTodo].subtasks[index_child].details
      ) {
          // eslint-disable-next-line no-console
      console.log(store.getters.getTodoList[indexTodo].subtasks[index_child]);
        store.getters.getTodoList[indexTodo].subtasks[index_child].details.splice(index, 1);
      }
    }
  },

  //ADD SUBTASK DETAIL
  [MutationTypes.ADDSUBTASKDETAIL](state, { todoKey, subtaskKey, detail }) {
    var indexTodo = store.getters.getTodoList.findIndex(function (o) {
      return o.key === todoKey;
    });

    if (indexTodo !== -1) {
      var index_subtask = store.getters.getTodoList[indexTodo].subtasks.findIndex(function (o) {
        return o.key === subtaskKey;
      });

      if (index_subtask !== -1
        && store.getters.getTodoList[indexTodo].subtasks[index_subtask].details
      ) {
        store.getters.getTodoList[indexTodo].subtasks[index_subtask].details.unshift({
          isdone: detail.isdone,
          label: detail.label
        })
      }
    }
  },
}