import { Todo, User, State } from '../../models/types';
import { database } from '../../firebase/firebase';

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
  },
  getCurrentTodo: (state: State) => {
    return state.currentTodo;
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
  setCurrentTodo (state: State, index: number) {
    state.currentTodo = state.todolist[index];
  },
  addNewTodo: (state: State, todo: Todo) => state.todolist.unshift(todo),
  removeTodo: (state: State, index: number) => (
    state.todolist.splice(index, 1)
  )
};

// for API, often async
const actions = {
  createTodo ({ commit }, payload: Todo) {
    const { uid } = state.user.data;
    database.ref('todos/' + uid).push({
      creationDate: payload.creationDate,
      description: payload.description,
      importance: payload.importance,
      task: payload.task,
      deadline: payload.deadline
    });
  },
  fetchTodos ({ commit }: {commit: Function}, payload: string) {
    const uid: string = payload;
    var listoftodos: Todo[] = [];
    database.ref(`todos/${uid}`).once('value', (snapshot) => {
      snapshot.forEach(function (childSnapshot) {
        const currentTodo: Todo = {
          key: childSnapshot.key || '',
          task: childSnapshot.val().task,
          deadline: childSnapshot.val().deadline,
          importance: childSnapshot.val().importance,
          description: childSnapshot.val().description,
          creationDate: childSnapshot.val().dateToday
        };
        listoftodos.push(currentTodo);
      });
    });
    commit('setTodoList', listoftodos);
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
