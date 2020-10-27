export interface Todo {
  key: string ;
  task: string;
  deadline?: Date;
  importance?: number;
  description?: string;
  creationDate: Date;
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
