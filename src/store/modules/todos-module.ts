import { Todo, User, State, SubTask, Settings } from '../../models/types';
import { database } from '../../firebase/firebase';
import lodash from 'lodash';
import store from '..';

var todolist: Todo[] = [];
var filtered_todo_list: Todo[] = [];
var coloredtodolist: Todo[] = [];
var numberActiveTask = 0;
var numberTotalTask = 0;
var isLoading: boolean = true;
var with_weekend: boolean = true;
var currentLang: string = 'en';
var rendAllListNumber: number = 0;

var currentTodo: Todo = {
  task: '',
  creationDate: new Date().toISOString().substr(0, 10),
  description: [],
  isdone: false
};
var user: User = {
  loggedIn: false,
  data: {}
};

var settings: Settings = {
  langage : 'en',
  with_weekend : true,
  hidden_column : {
    order : true,
    task : true,
    deadline : true,
    creationDate : true,
    numberdaysleft : true,
    importance : true,
    isdone : true,
  }
}

var currentSortingMode = '';

const state: State = {
  todolist: todolist,
  coloredtodolist: coloredtodolist,
  user: user,
  currentTodo: currentTodo,
  numberActiveTask: numberActiveTask,
  numberTotalTask: numberTotalTask,
  isLoading: isLoading,
  filtered_todo_list: filtered_todo_list,
  with_weekend: with_weekend,
  currentLang: currentLang,
  rendAllListNumber: rendAllListNumber,
  settings : settings
};

const getters = {
  getSettings: (state: State) => {
    return state.settings;
  },
  getRendAllListNumber: (state: State) => {
    return state.rendAllListNumber;
  },
  getIsLoading: (state: State) => {
    return state.isLoading;
  },
  getCurrentLang: (state: State) => {
    return state.currentLang;
  },
  getWithWeekEnd: (state: State) => {
    return state.with_weekend;
  },
  getUser: (state: State) => {
    return state.user;
  },
  getTodoList: (state: State) => {
    return state.todolist;
  },
  getFilteredTodoList: (state: State) => {
    return state.filtered_todo_list;
  },
  getActiveTodoList: (state: State) => {
    return state.todolist.filter(todo => !todo.isdone);
  },
  getColoredtodolist: (state: State) => {
    return state.coloredtodolist;
  },
  getCurrentTodo: (state: State) => {
    return state.currentTodo;
  },
  getNumberTotalTask: (state: State) => {
    return state.todolist.length;
  },
  getNumberTotalSubTask: (state: State) => {
    let numberSubTask = 0;
    state.todolist.forEach(function (todo) {
      if (todo.description) { numberSubTask = numberSubTask + todo.description.length; }
    });
    return numberSubTask;
  },
  getNumberTotalSubTaskOfTodo: (state: State, key: string) => {
    let numberSubTask = 0;
    state.todolist.forEach(function (todo) {
      if (todo.key === key && todo.description) { numberSubTask = todo.description.length }
    });
    return numberSubTask;
  },
  getNumberFilteredTask: (state: State) => {
    return state.filtered_todo_list.length;
  },
  getNumberActiveTask: (state: State) => {
    return state.todolist.filter(todo => !todo.isdone).length;
  }
};

const mutations = {
  setSettings(state: State, settings: Settings) {
    state.settings = settings;
  },
  hideColumn(state: State, setting: string){
    state.settings.hidden_column[setting] = !state.settings.hidden_column[setting]; 
  },
  incRendAllListNumber(state: State) {
    state.rendAllListNumber = state.rendAllListNumber + 1;
  },
  setIsLoading(state: State, bool: boolean) {
    state.isLoading = bool;
  },
  setCurrentLang(state: State, lang: string) {
    state.currentLang = lang;
  },
  setWithWeekEnd(state: State, bool: boolean) {
    state.with_weekend = bool;
  },
  setTodoList(state: State, newList: Todo[]) {
    state.todolist = newList;
  },
  setFilteredTodoList(state: State, newList: Todo[]) {
    state.filtered_todo_list = newList;
  },
  setColoredTodoList(state: State, newList: Todo[]) {
    state.coloredtodolist = newList;
  },
  setUser(state: State, user: User) {
    state.user = user;
  },
  setCurrentTodo(state: State, key: string) {
    const todofinded = state.todolist.find(obj => {
      return obj.key === key;
    });
    if (todofinded) {
      state.currentTodo = todofinded;
    }
  },
  resetCurrentTodo() {
    state.currentTodo = {
      task: '',
      creationDate: new Date().toISOString().substr(0, 10),
      description: [],
      isdone: false
    };
  },
  addNewTodo: (state: State, todo: Todo) => state.todolist.unshift(todo),
  removeTodo: (state: State, key: string) => {
    const index = state.todolist.findIndex(todo => todo.key === key);
    state.todolist.splice(index, 1);
  },
  removeTodoByKey(state: State, key: string) {
    var index = state.todolist.findIndex(function (o) {
      return o.key === key;
    });
    if (index !== -1) state.todolist.splice(index, 1);
  },
  editTodoByKey(state: State, todo: Todo) {
    var index = state.todolist.findIndex(function (o) {
      return o.key === todo.key;
    });
    if (index !== -1) {
      state.todolist.splice(index, 1);
      state.todolist.splice(index, 0, todo);
    }
  },
  sortBy(state: State, attribut: string) {
    if (currentSortingMode === 'desc' || currentSortingMode === '') {
      currentSortingMode = 'asc';
      state.todolist = lodash.orderBy(state.todolist, [attribut], ['asc']);
      state.coloredtodolist = lodash.orderBy(state.coloredtodolist, [attribut], ['asc']);
    } else {
      currentSortingMode = 'desc';
      state.todolist = lodash.orderBy(state.todolist, [attribut], ['desc']);
      state.coloredtodolist = lodash.orderBy(state.coloredtodolist, [attribut], ['desc']);
    }
  },
  upOrderTodo(state: State, key: string) {
    var index = state.todolist.findIndex(function (o) {
      return o.key === key;
    });
    if (state.todolist[index]) { state.todolist[index].order = state.todolist[index].order + 1 || 0; }
  },
  downOrderTodo(state: State, key: string) {
    var index = state.todolist.findIndex(function (o) {
      return o.key === key;
    });
    if (state.todolist[index]) { state.todolist[index].order = state.todolist[index].order - 1 || 0; }
  },
  setOrder(state: State, { keyItemToUpOrder, max_order }: { keyItemToUpOrder: string, max_order: number }){
    var index = state.todolist.findIndex(function (o) {
      return o.key === keyItemToUpOrder;
    });
    if(state.todolist[index]) { state.todolist[index].order = max_order }
  },
};

// for API, often async
const actions = {
  createTodo({ commit }: { commit: Function }, payload: Todo) {

    Object.keys(payload).forEach((key) => (payload[key] == null) && delete payload[key]);

    const { uid } = state.user.data;
    var newTodoKey = database.ref().child(`todos/${uid}`).push().key || 'key';
    if (!newTodoKey) { return }
    database.ref(`todos/${uid}/${newTodoKey}`).set({
      ...payload
    });

    payload.key = newTodoKey;
    commit('addNewTodo', payload);
    commit('incRendAllListNumber');
  },
  editTodo({ commit }: { commit: Function }, payload: Todo) {

    Object.keys(payload).forEach((key) => (payload[key] == null) && delete payload[key]);

    const { uid } = state.user.data;
    if (!payload.key) { return }
    database.ref(`todos/${uid}/${payload.key}`).set({
      ...payload,
    });
    commit('editTodoByKey', payload);
    commit('incRendAllListNumber');
  },
  setTodoDone({ commit }: { commit: Function }, payload: Todo) {
    payload.isdone = !payload.isdone;
    const { uid } = state.user.data;
    database.ref(`todos/${uid}/${payload.key}`).set({
      ...payload,
      isdone: payload.isdone
    });
    commit('editTodoByKey', payload);
    commit('incRendAllListNumber');
  },
  setSubTaskDone({ commit }: { commit: Function }, { todo, subtask }: { todo: Todo, subtask: SubTask }) {
    subtask.isdone = !subtask.isdone;
    const { uid } = state.user.data;
    database.ref(`todos/${uid}/${todo.key}/description/${subtask.order}`).set({
      ...subtask,
      isdone: subtask.isdone
    });
    //commit('incRendAllListNumber');
  },
  deleteTodo({ commit }: { commit: Function }, key: string) {
    const { uid } = state.user.data;
    database.ref(`todos/${uid}/${key}`).remove();
    commit('removeTodoByKey', key);
    commit('incRendAllListNumber');
  },
  fetchTodos({ commit }: { commit: Function }, payload: string) {
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
          creationDate: childSnapshot.val().creationDate,
          isdone: childSnapshot.val().isdone,
          order: childSnapshot.val().order

        };
        listoftodos.push(currentTodo);
      });
    }).then(() => {
      commit('setTodoList', listoftodos);
      commit('setIsLoading', false);
      commit('incRendAllListNumber');
    }
    );
  },
  setOrderUpTodo({ commit }: { commit: Function }, keytodoOrderPlus: { keytodoOrderPlus: string }) {

    const { uid } = state.user.data;

    database.ref(`todos/${uid}/${keytodoOrderPlus}/order`).transaction(function (order) {
      return (order || 0) + 1;
    });

    commit('upOrderTodo', keytodoOrderPlus);

  },
  setOrderDownTodo({ commit }: { commit: Function }, keytodoOrderDown: { keytodoOrderDown: string }) {

    const { uid } = state.user.data;

    database.ref(`todos/${uid}/${keytodoOrderDown}/order`).transaction(function (order) {
      return (order || 0) - 1;
    });

    commit('downOrderTodo', keytodoOrderDown);
  },
  setOrder({ commit }: { commit: Function }, { keyItemToUpOrder, max_order }: { keyItemToUpOrder: string, max_order: number }) {
    const { uid } = state.user.data;

    database.ref(`todos/${uid}/${keyItemToUpOrder}/order`).transaction(function (order) {
      return max_order;
    });

    commit('setOrder', { keyItemToUpOrder, max_order });

  }

};

export default {
  state,
  getters,
  actions,
  mutations
};
