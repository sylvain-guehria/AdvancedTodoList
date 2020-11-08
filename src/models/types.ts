export interface Todo {
  key?: string ;
  task: string;
  deadline?: string;
  importance?: number;
  description?: SubTask[];
  creationDate: string;
  isdone?: boolean;
  numberdaysleft?: number;
}

export interface User {
  loggedIn: boolean;
  data: Record<string, any>;
}

export interface State {
  todolist: Todo[];
  coloredtodolist: Todo[];
  user: User;
  currentTodo: Todo,
  numberActiveTask: number,
  numberTotalTask: number,
}

export interface SubTask {
  key?: string ;
  label: string;
  isdone?: boolean;
  order?: number;
}

export type HTMLElementEvent<T extends HTMLElement> = Event & {
  target: T;
}
