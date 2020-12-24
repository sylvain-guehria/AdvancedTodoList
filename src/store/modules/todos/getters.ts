import { Todos } from "@/common/models/types/index";
import { GetterTree } from "vuex";
import { RootState } from "../../state";

export const gettersTodos : GetterTree<Todos, RootState> = {
  getRendAllListNumber: (state) => {
    return state.rendAllListNumber;
  },
  getIsLoading: (state: Todos) => {
    return state.isLoading;
  },
  getTodoList: (state: Todos) => {
    return state.todolist;
  },
  getFilteredTodoList: (state: Todos) => {
    return state.filtered_todo_list;
  },
  getActiveTodoList: (state: Todos) => {
    return state.todolist.filter(todo => !todo.isdone);
  },
  getNumberTotalTask: (state: Todos) => {
    return state.todolist.length;
  },
  getNumberFilteredTask: (state: Todos) => {
    return state.filtered_todo_list.length;
  },
  getNumberActiveTask: (state: Todos) => {
    return state.todolist.filter(todo => !todo.isdone).length;
  },

  //current TODO, SUBTASK and DETAIL

  getCurrentTodo: (state: Todos) => {
    return state.currentTodo;
  },
  getCurrentSubtask: (state: Todos) => {
    return state.currentSubtask;
  },
  getCurrentDetail: (state: Todos) => {
    return state.currentDetail
  },
  getUsers: (state: Todos) => {
    return state.users
  },
};