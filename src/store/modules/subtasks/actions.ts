import { database } from '@/apis/firebase/firebase';
import { MutationTypes } from "./mutations";
import { SubTasks, SubTask, Detail } from "@/common/models/types/index";
import { RootState } from "../../state";
import { ActionTree } from "vuex";
import store from '@/store/index';

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

    const { uid } = store.getters.getUser.data;

    var newSubtaskKey = database.ref().child(`todos/${uid}/${motherKey}/subtasks`).push().key || 'key';
    if (!newSubtaskKey || !motherKey) { return }

    subtask.key = newSubtaskKey;

    await database.ref(`todos/${uid}/${motherKey}/subtasks/${newSubtaskKey}`).set({
      ...subtask
    }).then(result => {
      context.commit(MutationTypes.addNewSubtaskTodo, { subtask , motherKey});
    }).catch((err) => {
      // eslint-disable-next-line no-console
      console.log(err);
    })
  },

  // EDIT SUBTASK
  async [ActionTypes.EDITSUBTASK](context, subtask: SubTask): Promise<void> {

    let motherkey = subtask.motherKey;
    delete subtask.motherKey;

    Object.keys(subtask).forEach((key) => (subtask[key] == null) && delete subtask[key]);

    const { uid } = store.getters.getUser.data;

    if (!motherkey || !subtask.key) { return }

    await database.ref(`todos/${uid}/${motherkey}/subtasks/${subtask.key}`).set({
      ...subtask
    });
    subtask.motherKey = motherkey;

    context.commit(MutationTypes.editSubtaskTodoByKey, subtask);
  },

  // EDIT ONE ATTRIBUT SUBTASK 
  async [ActionTypes.EDITATTRIBUTESUBTASK](context, { motherKey, key, attribute, value }: { motherKey: string, key: string, attribute: string, value }): Promise<void> {

    const { uid } = store.getters.getUser.data;

    if (!motherKey || !key) { return }

    if (value === null) {
      await database.ref(`todos/${uid}/${motherKey}/subtasks/${key}/${attribute}`).remove();
    } else {
      await database.ref(`todos/${uid}/${motherKey}/subtasks/${key}`).update({
        [attribute]: value
      });
    }

    context.commit(MutationTypes.editOneAttributSubtaskTodo, { motherKey, key, attribute, value });
  },


  // SET SUBTASK STATE
  async [ActionTypes.SETSUBTASKSTATE](context, { subtaskKey, motherKey, isDone }: { subtaskKey: string, motherKey: string, isDone: boolean }) {
    const { uid } = store.getters.getUser.data;
    if (!motherKey || !subtaskKey) { return }

    await database.ref(`todos/${uid}/${motherKey}/subtasks/${subtaskKey}`).update({
      isdone: isDone
    });
    context.commit(MutationTypes.setSubTaskState, { subtaskKey, motherKey, isDone });
  },

  // DELETE SUBTASK DETAIL 
  async [ActionTypes.DELETESUBTASKDETAIL](context, { subtaskKey, taskKey, key }: { subtaskKey: string, taskKey: string, key: string }) {
    const { uid } = store.getters.getUser.data;

      // eslint-disable-next-line no-console
      console.log({ subtaskKey, taskKey, key });

    if (!taskKey || !subtaskKey || !key) { return }

    await database.ref(`todos/${uid}/${taskKey}/subtasks/${subtaskKey}/details/${key}`).remove();
    context.commit(MutationTypes.deleteSubtaskDetail, { subtaskKey, taskKey, key });
  },

  // DELETE SUBTASK
  async [ActionTypes.DELETESUBTASK](context, { subtaskKey, todoKey }: { subtaskKey: string, todoKey: string }) {
    const { uid } = store.getters.getUser.data;

    if (!todoKey || !subtaskKey) { return }


    await database.ref(`todos/${uid}/${todoKey}/subtasks/${subtaskKey}`).remove();
    context.commit(MutationTypes.removeSubtaskByKey, { subtaskKey, todoKey });
  },

  // SET SUBTASK DETAIL STATE
  async [ActionTypes.EDITSUBTASKDETAIL](context, { taskKey, subtaskKey, attribute, value, key }
    : { taskKey: string, subtaskKey: string, attribute: string, value: string, key: string }) {
    const { uid } = store.getters.getUser.data;

    if (!taskKey || !subtaskKey || !key) { return }

    await database.ref(`todos/${uid}/${taskKey}/subtasks/${subtaskKey}/details/${key}`).update({
      [attribute]: value
    });
    context.commit(MutationTypes.EDITSUBTASKDETAIL, { subtaskKey, taskKey, key, attribute, value });
  },

  // ADD SUBTASK DETAIL
  async [ActionTypes.ADDSUBTASKDETAIL](context, { todoKey, subtaskKey, detail }
    : { todoKey: string, subtaskKey: string, detail: Detail }) {
    const { uid } = store.getters.getUser.data;

    if (!todoKey || !subtaskKey) { return }

    var newDetailKey = database.ref().child(`todos/${uid}/${todoKey}/subtasks/${subtaskKey}/details`).push().key || 'key';

    if (!newDetailKey) { return }

    detail.key = newDetailKey;

    await database.ref(`todos/${uid}/${todoKey}/subtasks/${subtaskKey}/details/${newDetailKey}`).set({
      isdone: detail.isdone,
      label: detail.label,
      key: newDetailKey
    });
    context.commit(MutationTypes.ADDSUBTASKDETAIL, { todoKey, subtaskKey, detail });
  },
};