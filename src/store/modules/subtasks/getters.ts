import { SubTasks } from "@/common/models/types";
import { GetterTree } from "vuex";
import { RootState } from "../../state";
import store from '@/store/index'; 


export const gettersSubtasks : GetterTree<SubTasks, RootState> = {
  getNumberTotalSubTask: (state) => {
    let numberSubTask = 0;
    store.getters.getTodoList.forEach(function (todo) {
      if (todo.subtasks) { numberSubTask = numberSubTask + todo.subtasks.length; }
    });
    return numberSubTask;
  },
  getNumberTotalSubTaskOfTodo: (state, key: string) => {
    let numberSubTask = 0;
    store.getters.getTodoList.forEach(function (todo) {
      if (todo.key === key && todo.subtasks) { numberSubTask = todo.subtasks.length }
    });
    return numberSubTask;
  },
};