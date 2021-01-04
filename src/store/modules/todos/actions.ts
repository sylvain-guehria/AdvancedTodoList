import { database } from '@/apis/firebase/firebase';

import { MutationTypes } from "./mutations";
import { Todos, Todo, SubTask } from "@/common/models/types/index";
import { RootState } from "../../state";
import { ActionTree } from "vuex";
import store from '@/store/index';
import lodash from "lodash";

import { MutationTypes as SettingsMutationTypes } from "@/store/modules/settings/mutations";

export enum ActionTypes {
  FETCH_TODOS = "fetchTodos",
  CREATETODO = "createTodo",
  EDITTODO = "editTodo",
  SETTODOSTATE = "setTodoState",
  DELETETODO = "deleteTodo",
  SETORDERUPTODO = "setOrderUpTodo",
  SETORDERDOWNTODO = "setOrderDownTodo",
  SETORDER = "setOrder",
  EDITATTRIBUTETASK = "editAttributeTask"
}


// for API, often async
export const actionsTodos: ActionTree<Todos, RootState> = {

  //CREATE TODO
  async [ActionTypes.CREATETODO](context, payload: Todo): Promise<void> {

    Object.keys(payload).forEach((key) => (payload[key] == null) && delete payload[key]);

    const { uid } = store.getters.getUser;
    var newTodoKey = database.ref().child(`todos/${uid}`).push().key || 'key';
    if (!newTodoKey) { return }

    payload.key = newTodoKey;
    context.commit(SettingsMutationTypes.SET_ACTION_LOADING, true);
    await database.ref(`todos/${uid}/${newTodoKey}`).set({
      ...payload
    }).then(() => {
      context.commit(MutationTypes.ADDNEWTODO, payload);
      context.commit(MutationTypes.SETCURRENTTODO, payload);
      context.commit(SettingsMutationTypes.SET_ACTION_LOADING, false);
    }).catch((err) => {
      // eslint-disable-next-line no-console
      console.log(err);
      context.commit(SettingsMutationTypes.SET_ACTION_LOADING, false);
    })
  },
  //EDIT TODO
  async [ActionTypes.EDITTODO](context, payload: Todo): Promise<void> {

    Object.keys(payload).forEach((key) => (payload[key] == null) && delete payload[key]);

    const { uid } = store.getters.getUser;
    if (!payload.key) { return }

    context.commit(SettingsMutationTypes.SET_ACTION_LOADING, true);
    await database.ref(`todos/${uid}/${payload.key}`).set({
      ...payload,
    }).then(() => {
      context.commit(MutationTypes.EDITTODOBYKEY, payload);
      context.commit(MutationTypes.INCRENDALLLISTNUMBER);
      context.commit(SettingsMutationTypes.SET_ACTION_LOADING, false);
    }).catch((err) => {
      // eslint-disable-next-line no-console
      console.log(err);
      context.commit(SettingsMutationTypes.SET_ACTION_LOADING, false);
    })
  },
  // EDIT ONE ATTRIBUT TASK 
  async [ActionTypes.EDITATTRIBUTETASK](context, { todoKey, attribute, value }: { todoKey: string, attribute: string, value }): Promise<void> {

    const { uid } = store.getters.getUser;
    if (!todoKey) { return }
    
    context.commit(SettingsMutationTypes.SET_ACTION_LOADING, true);
    if (value === null) {
      await database.ref(`todos/${uid}/${todoKey}/${attribute}`).remove().then(() => {
        context.commit(MutationTypes.EDITATTRIBUTETASK, { todoKey, attribute, value });
        context.commit(SettingsMutationTypes.SET_ACTION_LOADING, false);
      }).catch((err) => {
        // eslint-disable-next-line no-console
        console.log(err);
        context.commit(SettingsMutationTypes.SET_ACTION_LOADING, false);
      })
    } else {
      await database.ref(`todos/${uid}/${todoKey}`).update({
        [attribute]: value
      }).then(() => {
        context.commit(MutationTypes.EDITATTRIBUTETASK, { todoKey, attribute, value });
        context.commit(SettingsMutationTypes.SET_ACTION_LOADING, false);
      }).catch((err) => {
        // eslint-disable-next-line no-console
        console.log(err);
        context.commit(SettingsMutationTypes.SET_ACTION_LOADING, false);
      })
    }
  },
  //   FETCH TODOS
  async [ActionTypes.FETCH_TODOS](context, payload: string): Promise<void> {

    const uid: string = payload;
    var listoftodos: Todo[] = [];
    var listsubtasks: SubTask[] = [];

    context.commit(MutationTypes.SET_ISLOADING, true);
    try {
      await database.ref(`todos/${uid}`).once('value', (snapshot) => {
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
          if (childSnapshot.val().subtasks) {
            let listsubtasks: SubTask[] = Object.entries(childSnapshot.val().subtasks).reduce((acc, [key, subtask]) => {
              subtask['key'] = key;

              //subtask details : OBJECT to ARRAY
              if (subtask['details']) {
                let details = Object.values(subtask['details']);
                subtask['details'] = details;
              } else {
                subtask['details'] = [];
              }
              //end

              acc.push(subtask);
              return acc;
            }, []);
            listsubtasks = lodash.orderBy(listsubtasks, 'order', 'asc');
            currentTodo.subtasks = listsubtasks;
          }

          listsubtasks = [];
          if (!currentTodo.subtasks) { currentTodo.subtasks = [] }
          listoftodos.push(currentTodo);
        });
      }).then(() => {
        listoftodos = lodash.orderBy(listoftodos, 'order', 'asc');

        context.commit(MutationTypes.SETTODOLIST, listoftodos);
        context.commit(MutationTypes.INCRENDALLLISTNUMBER);
        context.commit(MutationTypes.SET_ISLOADING, false);
      });
    } catch (error) {
      context.commit(MutationTypes.SET_ISLOADING, false);
    }
  },

  // SET TASK STATE
  async [ActionTypes.SETTODOSTATE](context, { key, isDone }: { key: string, isDone: boolean }) {
    const { uid } = store.getters.getUser;
    if (!key) { return }

    context.commit(SettingsMutationTypes.SET_ACTION_LOADING, true);
    await database.ref(`todos/${uid}/${key}`).update({
      isdone: isDone
    }).then(() => {
      context.commit(MutationTypes.SETTASKSTATE, { key, isDone });
      context.commit(SettingsMutationTypes.SET_ACTION_LOADING, false);
    }).catch((err) => {
      // eslint-disable-next-line no-console
      console.log(err);
      context.commit(SettingsMutationTypes.SET_ACTION_LOADING, false);
    })
  },

  //DELETE TODO
  async [ActionTypes.DELETETODO](context, key: string): Promise<void> {
    const { uid } = store.getters.getUser;

    context.commit(SettingsMutationTypes.SET_ACTION_LOADING, true);
    await database.ref(`todos/${uid}/${key}`).remove().then(() => {
      context.commit(MutationTypes.REMOVETODOBYKEY, key);
      context.commit(SettingsMutationTypes.SET_ACTION_LOADING, false);
    }).catch((err) => {
      // eslint-disable-next-line no-console
      console.log(err);
      context.commit(SettingsMutationTypes.SET_ACTION_LOADING, false);
    })
  },

  //UP ORDER TODO
  async [ActionTypes.SETORDERUPTODO](context, keytodoOrderPlus: string): Promise<void> {

    const { uid } = store.getters.getUser;
    if (!keytodoOrderPlus) { return }

    context.commit(SettingsMutationTypes.SET_ACTION_LOADING, true);
    await database.ref(`todos/${uid}/${keytodoOrderPlus}/order`).transaction(function (order) {
      return (order || 0) + 1;
    }).then(() => {
      context.commit(MutationTypes.UPORDERTODO, keytodoOrderPlus);
      context.commit(SettingsMutationTypes.SET_ACTION_LOADING, false);
    }).catch((err) => {
      // eslint-disable-next-line no-console
      console.log(err);
      context.commit(SettingsMutationTypes.SET_ACTION_LOADING, false);
    })
  },

  //DOWN ORDER TODO
  async [ActionTypes.SETORDERDOWNTODO](context, keytodoOrderDown: string): Promise<void> {

    const { uid } = store.getters.getUser;
    if (!keytodoOrderDown) { return }

    context.commit(SettingsMutationTypes.SET_ACTION_LOADING, true);
    await database.ref(`todos/${uid}/${keytodoOrderDown}/order`).transaction(function (order) {
      return (order || 0) - 1;
    }).then(() => {
      context.commit(MutationTypes.DOWNORDERTODO, keytodoOrderDown);
      context.commit(SettingsMutationTypes.SET_ACTION_LOADING, false);
    }).catch((err) => {
      // eslint-disable-next-line no-console
      console.log(err);
      context.commit(SettingsMutationTypes.SET_ACTION_LOADING, false);
    })
  },

  // SET ORDER TODO WITH VALUE
  async [ActionTypes.SETORDER](context, { keyItemToUpOrder, max_order }: { keyItemToUpOrder: string, max_order: number }): Promise<void> {
    const { uid } = store.getters.getUser;
    if (!keyItemToUpOrder) { return }

    context.commit(SettingsMutationTypes.SET_ACTION_LOADING, true);
    await database.ref(`todos/${uid}/${keyItemToUpOrder}/order`).transaction(function (order) {
      return max_order;
    }).then(() => {
      context.commit(MutationTypes.SETORDER, { keyItemToUpOrder, max_order });
      context.commit(SettingsMutationTypes.SET_ACTION_LOADING, false);
    }).catch((err) => {
      // eslint-disable-next-line no-console
      console.log(err);
      context.commit(SettingsMutationTypes.SET_ACTION_LOADING, false);
    })
  },
};