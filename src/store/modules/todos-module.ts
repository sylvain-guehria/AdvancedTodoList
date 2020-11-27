import { Todo, User, State, SubTask, Settings, drawer } from '../../models/types';
import { database } from '../../firebase/firebase';
import lodash from 'lodash';
import store from '..';

var todolist: Todo[] = [];
var filtered_todo_list: Todo[] = [];
var coloredtodolist: Todo[] = [];
var numberActiveTask = 0;
var numberTotalTask = 0;
var isLoading: boolean = true;
var rendAllListNumber: number = 0;

var currentTodo: Todo = {
  task: '',
  creationDate: new Date().toISOString().substr(0, 10),
  subtasks: [],
  isdone: false
};
var user: User = {
  loggedIn: false,
  data: {}
};

var settings: Settings = {
  langage: 'en',
  drawersOpened: [],
  with_weekend: true,
  hidden_column: {
    order: true,
    task: true,
    deadline: true,
    creationDate: true,
    numberdaysleft: true,
    importance: true,
    isdone: true,
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
  rendAllListNumber: rendAllListNumber,
  settings: settings,
};

const getters = {
  getSettings: (state: State) => {
    if (state) return state.settings;
  },
  getRendAllListNumber: (state: State) => {
    return state.rendAllListNumber;
  },
  getIsLoading: (state: State) => {
    return state.isLoading;
  },
  getLangage: (state: State) => {
    if (state.settings) return state.settings.langage;
  },
  getWithWeekEnd: (state: State) => {
    if (state.settings) return state.settings.with_weekend;
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
      if (todo.subtasks) { numberSubTask = numberSubTask + todo.subtasks.length; }
    });
    return numberSubTask;
  },
  getNumberTotalSubTaskOfTodo: (state: State, key: string) => {
    let numberSubTask = 0;
    state.todolist.forEach(function (todo) {
      if (todo.key === key && todo.subtasks) { numberSubTask = todo.subtasks.length }
    });
    return numberSubTask;
  },
  getNumberFilteredTask: (state: State) => {
    return state.filtered_todo_list.length;
  },
  getNumberActiveTask: (state: State) => {
    return state.todolist.filter(todo => !todo.isdone).length;
  },
  getColumnHidden: (state: State) => {
    if (state.settings) return state.settings.hidden_column;
  },
};

const mutations = {
  setSettings(state: State, settings: Settings) {
    state.settings = settings;
  },
  setDrawersSettings(state: State, drawersOpened: drawer[]) {
    state.settings.drawersOpened = drawersOpened;
  },
  hideColumn(state: State, setting: string) {
    state.settings.hidden_column[setting] = !state.settings.hidden_column[setting];
  },
  incRendAllListNumber(state: State) {
    state.rendAllListNumber = state.rendAllListNumber + 1;
  },
  setIsLoading(state: State, bool: boolean) {
    state.isLoading = bool;
  },
  setLangage(state: State, lang: string) {
    state.settings.langage = lang;
  },
  setWithWeekEnd(state: State, bool: boolean) {
    state.settings.with_weekend = bool;
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
      subtasks: [],
      isdone: false
    };
  },
  addNewTodo: (state: State, todo: Todo) => state.todolist.unshift(todo),

  addNewSubtaskTodo: (state: State, subtask: SubTask) => {
    let motherKey = subtask.motherKey;
    delete subtask.motherKey;

    for (var i in state.todolist) {
      if (state.todolist[i].key == motherKey) {
        state.todolist[i].subtasks.unshift(subtask);
        break;
      }
    }
  },

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
  editSubtaskTodoByKey(state: State, subtask: SubTask) {
    var index = state.todolist.findIndex(function (o) {
      return o.key === subtask.motherKey;
    });

    if (index !== -1) {
      var index_child = state.todolist[index].subtasks.findIndex(function (o) {
        return o.key === subtask.key;
      });

      if (index_child !== -1) {
        state.todolist[index].subtasks.splice(index_child, 1);
        state.todolist[index].subtasks.splice(index_child, 0, subtask);
      }
    }
  },
  setSubTaskState(state: State,  { subtaskKey, motherKey, isDone} :  { subtaskKey : string, motherKey: string, isDone: boolean}) {
    var index = state.todolist.findIndex(function (o) {
      return o.key === motherKey;
    });

    if (index !== -1) {
      var index_child = state.todolist[index].subtasks.findIndex(function (o) {
        return o.key === subtaskKey;
      });

      if (index_child !== -1) {
        state.todolist[index].subtasks[index_child].isdone = isDone;
      }
    }
  },
  removeSubtaskByKey(state: State, { subtaskKey, todoKey }) {
    var index = state.todolist.findIndex(function (o) {
      return o.key === todoKey;
    });

    if (index !== -1) {
      var index_child = state.todolist[index].subtasks.findIndex(function (o) {
        return o.key === subtaskKey;
      });

      if (index_child !== -1) {
        state.todolist[index].subtasks.splice(index_child, 1);
      }
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
  setOrder(state: State, { keyItemToUpOrder, max_order }: { keyItemToUpOrder: string, max_order: number }) {
    var index = state.todolist.findIndex(function (o) {
      return o.key === keyItemToUpOrder;
    });
    if (state.todolist[index]) { state.todolist[index].order = max_order }
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
  createSubtask({ commit }: { commit: Function }, subtask: SubTask) {

    let motherkey = subtask.motherKey;
    delete subtask.motherKey;

    Object.keys(subtask).forEach((key) => (subtask[key] == null) && delete subtask[key]);

    const { uid } = state.user.data;
    var newSubtaskKey = database.ref().child(`todos/${uid}/${motherkey}`).push().key || 'key';
    if (!newSubtaskKey) { return }

    database.ref(`todos/${uid}/${motherkey}/subtasks/${newSubtaskKey}`).set({
      ...subtask
    });
    subtask.key = newSubtaskKey;
    subtask.motherKey = motherkey;

    commit('addNewSubtaskTodo', subtask);
    //commit('incRendAllListNumber');
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
  editSubtask({ commit }: { commit: Function }, subtask: SubTask) {

    let motherkey = subtask.motherKey;
    delete subtask.motherKey;

    Object.keys(subtask).forEach((key) => (subtask[key] == null) && delete subtask[key]);

    const { uid } = state.user.data;

    database.ref(`todos/${uid}/${motherkey}/subtasks/${subtask.key}`).set({
      ...subtask
    });
    subtask.motherKey = motherkey;

    commit('editSubtaskTodoByKey', subtask);
    //commit('incRendAllListNumber');
  },
  setTodoDone({ commit }: { commit: Function }, payload: Todo) {
    Object.keys(payload).forEach((key) => (payload[key] == null) && delete payload[key]);

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
    Object.keys(subtask).forEach((key) => (subtask[key] == null) && delete subtask[key]);

    subtask.isdone = !subtask.isdone;
    const { uid } = state.user.data;
    database.ref(`todos/${uid}/${todo.key}/subtasks/${subtask.order}`).set({
      ...subtask,
      isdone: subtask.isdone
    });
  },
  setSubTaskState({ commit }: { commit: Function }, { subtaskKey, motherKey, isDone}: { subtaskKey: string, motherKey: string, isDone: boolean }) {
    const { uid } = state.user.data;
    database.ref(`todos/${uid}/${motherKey}/subtasks/${subtaskKey}`).update({
      isdone: isDone
    });
    commit('setSubTaskState', { subtaskKey, motherKey, isDone});
  },
  deleteTodo({ commit }: { commit: Function }, key: string) {
    const { uid } = state.user.data;
    database.ref(`todos/${uid}/${key}`).remove();
    commit('removeTodoByKey', key);
    commit('incRendAllListNumber');
  },
  deleteSubtask({ commit }: { commit: Function }, { subtaskKey, todoKey }: { subtaskKey: string, todoKey: string }) {
    const { uid } = state.user.data;
    database.ref(`todos/${uid}/${todoKey}/subtasks/${subtaskKey}`).remove();
    commit('removeSubtaskByKey', { subtaskKey, todoKey });
  },
  fetchTodos({ commit }: { commit: Function }, payload: string) {
    const uid: string = payload;
    var listoftodos: Todo[] = [];
    var listsubtasks: SubTask[] = [];

    var promise = new Promise((resolve, reject) => {

      database.ref(`todos/${uid}`).once('value', (snapshot) => {
        snapshot.forEach(function (childSnapshot) {
          const currentTodo: Todo = {

            key: childSnapshot.key || '',
            task: childSnapshot.val().task,
            deadline: childSnapshot.val().deadline,
            importance: childSnapshot.val().importance,
            creationDate: childSnapshot.val().creationDate,
            isdone: childSnapshot.val().isdone,
            order: childSnapshot.val().order,
          }

          let listsubtasks = Object.entries(childSnapshot.val().subtasks).reduce((acc, [key, subtask]) => {
            subtask['key'] = key;
            acc.push(subtask);
            return acc;
          }, []);

          currentTodo.subtasks = listsubtasks;
          listsubtasks = [];
          listoftodos.push(currentTodo);
        });
      }).then(() => {
        commit('setTodoList', listoftodos);
        commit('setIsLoading', false);
        commit('incRendAllListNumber');
        resolve();
      });
    });

    return promise;
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
  },
  saveSetting({ commit }: { commit: Function }, payload) {

    Object.keys(payload).forEach((key) => (payload[key] == null) && delete payload[key]);

    const { uid } = state.user.data;

    database.ref(`settings/${uid}`).update({
      [payload.label]: payload.value
    });
  },
  fetchSettings({ commit }: { commit: Function }, payload: string) {
    const uid: string = payload;
    let settings = {};

    database.ref(`settings/${uid}`).once('value', (snapshot) => {
      settings = snapshot.val();
    }).then(() => {
      if (settings) commit('setSettings', settings);
    }
    );
  },

};

export default {
  state,
  getters,
  actions,
  mutations
};
