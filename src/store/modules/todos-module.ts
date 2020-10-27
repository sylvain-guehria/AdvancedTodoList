import { Todo, User, State } from '../../models/types';

var todolist: Todo[] = [];
var coloredtodolist: Todo[] = [];
var currentTodo: Todo = {
  key: '',
  task: '',
  creationDate: new Date()
};
var user: User = {
  loggedIn: false,
  data: {}
};

const state: State = {
  todolist: todolist,
  coloredtodolist: coloredtodolist,
  user: user,
  currentTodo: currentTodo
};

const getters = {
  getUser: (state: State) => {
    return state.user;
  },
  getTodoList: (state: State) => {
    return state.todolist;
  },
  getColoredtodolist: (state: State) => {
    return state.coloredtodolist;
  }
};

const mutations = {
  setTodoList (state: State, newList: Todo[]) {
    state.todolist = newList;
  },
  setColoredTodoList (state: State, newList: Todo[]) {
    state.coloredtodolist = newList;
  },
  setUser (state: State, user: User) {
    state.user = user;
  },
  addNewTodo: (state: State, todo: Todo) => state.todolist.unshift(todo),
  removeTodo: (state: State, index: number) => (
    state.todolist.splice(index, 1)
  )
};

// for API, often async
const actions = {

};

export default {
  state,
  getters,
  actions,
  mutations
};
