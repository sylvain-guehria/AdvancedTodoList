export interface Todo {
  key?: string ;
  task: string;
  deadline?: string;
  importance?: number;
  description?: SubTask[];
  creationDate: string;
  isdone: boolean;
  numberdaysleft?: number;
  urgency?: number;
  order?: number;
}

export interface User {
  loggedIn: boolean;
  data: Record<string, any>;
}

export interface State {
  todolist: Todo[];
  filtered_todo_list: Todo[];
  coloredtodolist: Todo[];
  user: User;
  currentTodo: Todo,
  numberActiveTask: number,
  numberTotalTask: number,
  isLoading: boolean,
  rendAllListNumber: number,
  settings: Settings
}

export interface Settings {
  langage : string,
  with_weekend : boolean,
  drawersOpened : drawer[],
  hidden_column : {
    order : boolean,
    task : boolean,
    deadline : boolean,
    creationDate : boolean,
    numberdaysleft : boolean,
    importance : boolean,
    isdone : boolean,
  }
}

export interface drawer {
  index?: number,
  open : boolean,
  key: string
} 

export interface SubTask {
  key?: string ;
  label: string;
  isdone: boolean;
  order?: number;
  description?: string
}

export type HTMLElementEvent<T extends HTMLElement> = Event & {
  target: T;
}
