export interface Todo {
  task: string;
  deadline?: Date;
  importance?: number;
  description?: string;
}

export interface User {
  loggedIn: boolean;
  data: Record<string, any>;
}
