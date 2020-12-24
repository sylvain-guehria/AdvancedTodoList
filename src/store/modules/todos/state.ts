import { Todos } from "@/common/models/types/index";

export const initialState: Todos =  {
  todolist: [],
  users: [],
  filtered_todo_list: [],
  currentSubtask: {},
  currentDetail: {},
  currentTodo: {
    task : '',
    isdone : false,
    creationDate: new Date().toISOString().substr(0, 10),
  },
  numberActiveTask: 0,
  numberTotalTask: 0,
  isLoading: false,
  rendAllListNumber: 0,
  }

export const stateTodos = { ...initialState };



