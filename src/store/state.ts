import { Todo } from '@/modules/todos/shared/todoType'

export interface RootState {
  version: string;
}

export interface Todos {
  todolist: Todo[],
  filtered_todo_list: Todo[],
  currentTodo: Todo,
  numberActiveTask: number,
  numberTotalTask: number,
  isLoading: boolean,
  rendAllListNumber: number,
}

export interface SubTasks {

}

