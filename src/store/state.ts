import { Detail, SubTask } from '@/common/models/types';
import { Todo } from '@/modules/todos/shared/todoType'

export interface RootState {
  version: string;
}

export interface Todos {
  todolist: Todo[],
  filtered_todo_list: Todo[],
  currentTodo: Todo,
  currentSubtask: SubTask,
  currentDetail: Detail,

  numberActiveTask: number,
  numberTotalTask: number,
  isLoading: boolean,
  rendAllListNumber: number,
}

export interface SubTasks {

}

