export interface Todo {
  key?: string ;
  task: string;
  deadline?: string;
  importance?: number;
  subtasks?: SubTask[];
  creationDate: string;
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
  numberActiveTask: number,
  numberTotalTask: number,
  isLoading: boolean,
  rendAllListNumber: number,
}

export interface User {
  loggedIn: boolean;
  data: Record<string, any>;
}

export interface Settings {
  langage : string,
  with_weekend : boolean,
  drawersOpened : drawer[],
  loading: boolean,
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
  detail?: string
  deadline? : string,
  creationDate? : string,
  numberdaysleft? : boolean,
  importance? : number,
  tags? : string[],
  motherKey?: string
}

export interface SubTasks {
  
}

export type HTMLElementEvent<T extends HTMLElement> = Event & {
  target: T;
}
