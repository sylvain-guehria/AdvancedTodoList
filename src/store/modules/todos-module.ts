import { Todo, User, State } from '../../models/types';
import { database } from '../../firebase/firebase';
import lodash from 'lodash';

var todolist: Todo[] = [];
var coloredtodolist: Todo[] = [];
var currentTodo: Todo = {
  task: '',
  creationDate: new Date().toISOString().substr(0, 10),
  description: []
};
var user: User = {
  loggedIn: false,
  data: {}
};

var currentSortingMode = '';

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
  setCurrentTodo (state: State, key: string) {
    const todofinded = state.todolist.find(obj => {
      return obj.key === key;
    });
    if (todofinded){
      state.currentTodo = todofinded;
    }
  },
  resetCurrentTodo (){
    state.currentTodo = {
      task: '',
      creationDate: new Date().toISOString().substr(0, 10),
      description: []
    };
  },
  addNewTodo: (state: State, todo: Todo) => state.todolist.unshift(todo),
  removeTodo: (state: State, key: string) => {
    const index = state.todolist.findIndex(todo => todo.key === key);
    state.todolist.splice(index, 1);
  },
  removeTodoByKey (state: State, key: string) {
    var index = state.todolist.findIndex(function (o){
      return o.key === key;
    });
    if (index !== -1) state.todolist.splice(index, 1);
  },
  editTodoByKey (state: State, todo: Todo){
    var index = state.todolist.findIndex(function (o){
      return o.key === todo.key;
    });
    if (index !== -1) {
      state.todolist.splice(index, 1);
      state.todolist.splice(index, 0, todo);
    }
  },
  sortBy (state: State, attribut: string){
    if (currentSortingMode === 'desc' || currentSortingMode === ''){
      currentSortingMode = 'asc';
      state.todolist = lodash.orderBy(state.todolist, [attribut], ['asc']);
      state.coloredtodolist = lodash.orderBy(state.coloredtodolist, [attribut], ['asc']);
    } else {
      currentSortingMode = 'desc';
      state.todolist = lodash.orderBy(state.todolist, [attribut], ['desc']);
      state.coloredtodolist = lodash.orderBy(state.coloredtodolist, [attribut], ['desc']);
    }
  },
  sortByTimeLeft (state: State){
    if (currentSortingMode === 'desc'){
      currentSortingMode = 'asc';
      state.todolist = lodash.orderBy(state.todolist,
        [function (resultItem: Todo) {
          if (resultItem && resultItem.deadline !== undefined) {
            const deadline = new Date(resultItem.deadline);
            return deadline.getTime() - new Date().getTime();
          } else { return null; }
        }],
        ['asc']);
    } else {
      currentSortingMode = 'desc';
      state.todolist = lodash.orderBy(state.todolist,
        [function (resultItem: Todo) {
          if (resultItem && resultItem.deadline !== undefined) {
            const deadline = new Date(resultItem.deadline);
            return deadline.getTime() - new Date().getTime();
          } else { return null; }
        }],
        ['desc']);
    }
  },
  sortByTimeLeftColored (state: State){
    if (currentSortingMode === 'desc'){
      currentSortingMode = 'asc';
      state.coloredtodolist = lodash.orderBy(state.coloredtodolist,
        [function (resultItem: Todo) {
          if (resultItem && resultItem.deadline !== undefined) {
            const deadline = new Date(resultItem.deadline);
            return deadline.getTime() - new Date().getTime();
          } else { return null; }
        }],
        ['asc']);
    } else {
      currentSortingMode = 'desc';
      state.coloredtodolist = lodash.orderBy(state.coloredtodolist,
        [function (resultItem: Todo) {
          if (resultItem && resultItem.deadline !== undefined) {
            const deadline = new Date(resultItem.deadline);
            return deadline.getTime() - new Date().getTime();
          } else { return null; }
        }],
        ['desc']);
    }
  }
};

// for API, often async
const actions = {
  createTodo ({ commit }: {commit: Function}, payload: Todo) {
    const { uid } = state.user.data;
    var newTodoKey = database.ref().child(`todos/${uid}`).push().key || 'key';
    database.ref(`todos/${uid}/${newTodoKey}`).set({
      creationDate: payload.creationDate,
      description: payload.description,
      importance: payload.importance,
      task: payload.task,
      deadline: payload.deadline
    });
    payload.key = newTodoKey;
    commit('addNewTodo', payload);
  },
  editTodo ({ commit }: {commit: Function}, payload: Todo) {
    const { uid } = state.user.data;
    database.ref(`todos/${uid}/${payload.key}`).set({
      creationDate: payload.creationDate,
      description: payload.description,
      importance: payload.importance,
      task: payload.task,
      deadline: payload.deadline
    });
    commit('editTodoByKey', payload);
  },
  deleteTodo ({ commit }: {commit: Function}, key: string) {
    const { uid } = state.user.data;
    database.ref(`todos/${uid}/${key}`).remove();
    commit('removeTodoByKey', key);
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
          creationDate: childSnapshot.val().creationDate
        };
        listoftodos.push(currentTodo);
      });
    }).then(() => {
      commit('setTodoList', listoftodos);
    }
    );
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
