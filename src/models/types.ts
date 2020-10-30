export interface Todo {
  key?: string ;
  task: string;
  deadline?: string;
  importance?: number;
  description?: string;
  creationDate: string;
}

export interface User {
  loggedIn: boolean;
  data: Record<string, any>;
}

export interface State {
  todolist: Todo[];
  coloredtodolist: Todo[];
  user: User;
  currentTodo: Todo;
}
