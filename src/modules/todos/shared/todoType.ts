import { Detail, SubTask, User } from '@/common/models/types';

export interface Todo {
  key?: string;
  task?: string;
  deadline?: string;
  importance?: number;
  subtasks?: SubTask[];
  creationDate?: string;
  isdone: boolean;
  numberdaysleft?: number;
  urgency?: number;
  order?: number;
  tags?: string[];
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
