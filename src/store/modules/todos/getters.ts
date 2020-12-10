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
  getCurrentTodo: (state: Todos) => {
    return state.currentTodo;
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
};