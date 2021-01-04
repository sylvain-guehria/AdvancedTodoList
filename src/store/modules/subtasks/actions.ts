import { database } from '@/apis/firebase/firebase';
import { MutationTypes } from "./mutations";
import { SubTasks, SubTask, Detail } from "@/common/models/types/index";
import { RootState } from "../../state";
import { ActionTree } from "vuex";
import store from '@/store/index';
import { MutationTypes as TodoMutationTypes } from "@/store/modules/todos/mutations";
import { MutationTypes as SettingsMutationTypes } from "@/store/modules/settings/mutations";

export enum ActionTypes {
  CREATESUBTASK = "createSubtask",
  EDITSUBTASK = "editSubtask",
  SETSUBTASKSTATE = "setSubTaskState",
  DELETESUBTASK = "deleteSubtask",
  EDITATTRIBUTESUBTASK = "editAttributeSubtask",
  EDITSUBTASKDETAIL = "editSubtaskDetail",
  DELETESUBTASKDETAIL = "deleteSubtaskDetail",
  ADDSUBTASKDETAIL = "addSubtaskDetail",
}


// for API, often async
export const actionsSubtasks: ActionTree<SubTasks, RootState> = {

  // CREATE SUBTASK
  async [ActionTypes.CREATESUBTASK](context, subtask: SubTask): Promise<void> {

    let motherKey = subtask.motherKey;
    delete subtask.motherKey;

    Object.keys(subtask).forEach((key) => (subtask[key] == null) && delete subtask[key]);

    const { uid } = store.getters.getUser;

    var newSubtaskKey = database.ref().child(`todos/${uid}/${motherKey}/subtasks`).push().key || 'key';
    if (!newSubtaskKey || !motherKey) { return }

    subtask.key = newSubtaskKey;

    context.commit(SettingsMutationTypes.SET_ACTION_LOADING, true);
    await database.ref(`todos/${uid}/${motherKey}/subtasks/${newSubtaskKey}`).set({
      ...subtask
    }).then(result => {
      context.commit(MutationTypes.addNewSubtaskTodo, { subtask, motherKey });
      context.commit(SettingsMutationTypes.SET_ACTION_LOADING, false);
    }).catch((err) => {
      // eslint-disable-next-line no-console
      console.log(err);
      context.commit(SettingsMutationTypes.SET_ACTION_LOADING, false);

    })
  },

  // EDIT SUBTASK
  async [ActionTypes.EDITSUBTASK](context, subtask: SubTask): Promise<void> {

    let motherkey = subtask.motherKey;
    delete subtask.motherKey;

    Object.keys(subtask).forEach((key) => (subtask[key] == null) && delete subtask[key]);

    const { uid } = store.getters.getUser;

    if (!motherkey || !subtask.key) { return }

    context.commit(SettingsMutationTypes.SET_ACTION_LOADING, true);
    await database.ref(`todos/${uid}/${motherkey}/subtasks/${subtask.key}`).set({
      ...subtask
    }).then(() => {
      subtask.motherKey = motherkey;
      context.commit(MutationTypes.editSubtaskTodoByKey, subtask);
      context.commit(SettingsMutationTypes.SET_ACTION_LOADING, false);
    }).catch((err) => {
      // eslint-disable-next-line no-console
      console.log(err);
      context.commit(SettingsMutationTypes.SET_ACTION_LOADING, false);

    })

  },

  // EDIT ONE ATTRIBUT SUBTASK 
  async [ActionTypes.EDITATTRIBUTESUBTASK](context, { motherKey, key, attribute, value }: { motherKey: string, key: string, attribute: string, value }): Promise<void> {

    const { uid } = store.getters.getUser;

    if (!motherKey || !key) { return }
    context.commit(SettingsMutationTypes.SET_ACTION_LOADING, true);

    if (value === null) {
      await database.ref(`todos/${uid}/${motherKey}/subtasks/${key}/${attribute}`).remove().then(() => {
        context.commit(MutationTypes.editOneAttributSubtaskTodo, { motherKey, key, attribute, value });
        context.commit(SettingsMutationTypes.SET_ACTION_LOADING, false);
      }).catch((err) => {
        // eslint-disable-next-line no-console
        console.log(err);
        context.commit(SettingsMutationTypes.SET_ACTION_LOADING, false);
      })
    } else {
      await database.ref(`todos/${uid}/${motherKey}/subtasks/${key}`).update({
        [attribute]: value
      }).then(() => {
        context.commit(MutationTypes.editOneAttributSubtaskTodo, { motherKey, key, attribute, value });
        context.commit(SettingsMutationTypes.SET_ACTION_LOADING, false);
      }).catch((err) => {
        // eslint-disable-next-line no-console
        console.log(err);
        context.commit(SettingsMutationTypes.SET_ACTION_LOADING, false);
      })
    }
  },


  // SET SUBTASK STATE
  async [ActionTypes.SETSUBTASKSTATE](context, { subtaskKey, motherKey, isDone }: { subtaskKey: string, motherKey: string, isDone: boolean }) {
    const { uid } = store.getters.getUser;
    if (!motherKey || !subtaskKey) { return }

    context.commit(SettingsMutationTypes.SET_ACTION_LOADING, true);
    await database.ref(`todos/${uid}/${motherKey}/subtasks/${subtaskKey}`).update({
      isdone: isDone
    }).then(() => {
      context.commit(MutationTypes.setSubTaskState, { subtaskKey, motherKey, isDone });
      context.commit(SettingsMutationTypes.SET_ACTION_LOADING, false);
    }).catch((err) => {
      // eslint-disable-next-line no-console
      console.log(err);
      context.commit(SettingsMutationTypes.SET_ACTION_LOADING, false);
    })
  },

  // DELETE SUBTASK DETAIL 
  async [ActionTypes.DELETESUBTASKDETAIL](context, { subtaskKey, taskKey, key }: { subtaskKey: string, taskKey: string, key: string }) {
    const { uid } = store.getters.getUser;

    if (!taskKey || !subtaskKey || !key) { return }

    context.commit(SettingsMutationTypes.SET_ACTION_LOADING, true);
    await database.ref(`todos/${uid}/${taskKey}/subtasks/${subtaskKey}/details/${key}`).remove().then(() => {
      context.commit(MutationTypes.deleteSubtaskDetail, { subtaskKey, taskKey, key });
      context.commit(SettingsMutationTypes.SET_ACTION_LOADING, false);
    }).catch((err) => {
      // eslint-disable-next-line no-console
      console.log(err);
      context.commit(SettingsMutationTypes.SET_ACTION_LOADING, false);
    })
  },

  // DELETE SUBTASK
  async [ActionTypes.DELETESUBTASK](context, { subtaskKey, todoKey }: { subtaskKey: string, todoKey: string }) {
    const { uid } = store.getters.getUser;

    if (!todoKey || !subtaskKey) { return }

    context.commit(SettingsMutationTypes.SET_ACTION_LOADING, true);
    await database.ref(`todos/${uid}/${todoKey}/subtasks/${subtaskKey}`).remove().then(() => {
      context.commit(MutationTypes.removeSubtaskByKey, { subtaskKey, todoKey });
      context.commit(SettingsMutationTypes.SET_ACTION_LOADING, false);
    }).catch((err) => {
      // eslint-disable-next-line no-console
      console.log(err);
      context.commit(SettingsMutationTypes.SET_ACTION_LOADING, false);
    })
  },

  // SET SUBTASK DETAIL STATE
  async [ActionTypes.EDITSUBTASKDETAIL](context, { taskKey, subtaskKey, attribute, value, key }
    : { taskKey: string, subtaskKey: string, attribute: string, value: string, key: string }) {
    const { uid } = store.getters.getUser;

    if (!taskKey || !subtaskKey || !key) { return }

    context.commit(SettingsMutationTypes.SET_ACTION_LOADING, true);
    await database.ref(`todos/${uid}/${taskKey}/subtasks/${subtaskKey}/details/${key}`).update({
      [attribute]: value
    }).then(() => {
      context.commit(MutationTypes.EDITSUBTASKDETAIL, { subtaskKey, taskKey, key, attribute, value });
      context.commit(SettingsMutationTypes.SET_ACTION_LOADING, false);
    }).catch((err) => {
      // eslint-disable-next-line no-console
      console.log(err);
      context.commit(SettingsMutationTypes.SET_ACTION_LOADING, false);
    })
  },

  // ADD SUBTASK DETAIL
  async [ActionTypes.ADDSUBTASKDETAIL](context, { todoKey, subtaskKey, detail }
    : { todoKey: string, subtaskKey: string, detail: Detail }) {
    const { uid } = store.getters.getUser;

    if (!todoKey || !subtaskKey) { return }

    var newDetailKey = database.ref().child(`todos/${uid}/${todoKey}/subtasks/${subtaskKey}/details`).push().key || 'key';

    if (!newDetailKey) { return }

    detail.key = newDetailKey;

    Object.keys(detail).forEach((key) => (detail[key] == null) && delete detail[key]);

    context.commit(SettingsMutationTypes.SET_ACTION_LOADING, true);
    await database.ref(`todos/${uid}/${todoKey}/subtasks/${subtaskKey}/details/${newDetailKey}`).set({
      ...detail
    }).then(() => {
      context.commit(MutationTypes.ADDSUBTASKDETAIL, { todoKey, subtaskKey, detail });
      context.commit(TodoMutationTypes.SETCURRENTDETAIL, detail);
      context.commit(SettingsMutationTypes.SET_ACTION_LOADING, false);
    }).catch((err) => {
      // eslint-disable-next-line no-console
      console.log(err);
      context.commit(SettingsMutationTypes.SET_ACTION_LOADING, false);
    })
  },
};