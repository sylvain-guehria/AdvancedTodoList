import { database } from '@/apis/firebase/firebase';
import { MutationTypes } from "./mutations";
import { SubTasks, SubTask } from "@/common/models/types";
import { RootState } from "../../state";
import { ActionTree } from "vuex";
import store from '@/store/index';

export enum ActionTypes {
  CREATESUBTASK = "createSubtask",
  EDITSUBTASK = "editSubtask",
  SETSUBTASKSTATE = "setSubTaskState",
  DELETESUBTASK = "deleteSubtask",
  EDITATTRIBUTESUBTASK = "editAttributeSubtask",

}


// for API, often async
export const actionsSubtasks: ActionTree<SubTasks, RootState> = {

  // CREATE SUBTASK
  async [ActionTypes.CREATESUBTASK](context, subtask: SubTask): Promise<void> {

    let motherkey = subtask.motherKey;
    delete subtask.motherKey;

    Object.keys(subtask).forEach((key) => (subtask[key] == null) && delete subtask[key]);

    const { uid } = store.getters.getUser.data;

    var newSubtaskKey = database.ref().child(`todos/${uid}/${motherkey}/subtasks`).push().key || 'key';
    if (!newSubtaskKey) { return }

    subtask.key = newSubtaskKey;

    await database.ref(`todos/${uid}/${motherkey}/subtasks/${newSubtaskKey}`).set({
      ...subtask
    }).then(result => {
      subtask.motherKey = motherkey;
      context.commit(MutationTypes.addNewSubtaskTodo, subtask);
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

    await database.ref(`todos/${uid}/${motherkey}/subtasks/${subtask.key}`).set({
      ...subtask
    });
    subtask.motherKey = motherkey;

    context.commit(MutationTypes.editSubtaskTodoByKey, subtask);
  },

  // EDIT ONE ATTRIBUT SUBTASK 
  async [ActionTypes.EDITATTRIBUTESUBTASK](context, { motherKey, key, attribute, value }: { motherKey: string, key: string, attribute: string, value }): Promise<void> {

    const { uid } = store.getters.getUser.data;

    await database.ref(`todos/${uid}/${motherKey}/subtasks/${key}`).update({
      [attribute] : value
    });

    context.commit(MutationTypes.editOneAttributSubtaskTodo, { motherKey, key, attribute, value });
  },


  // SET SUBTASK STATE
  async [ActionTypes.SETSUBTASKSTATE](context, { subtaskKey, motherKey, isDone }: { subtaskKey: string, motherKey: string, isDone: boolean }) {
    const { uid } = store.getters.getUser.data;
    await database.ref(`todos/${uid}/${motherKey}/subtasks/${subtaskKey}`).update({
      isdone: isDone
    });
    context.commit(MutationTypes.setSubTaskState, { subtaskKey, motherKey, isDone });
  },

  // DELETE SUBTASK
  async [ActionTypes.DELETESUBTASK](context, { subtaskKey, todoKey }: { subtaskKey: string, todoKey: string }) {
    const { uid } = store.getters.getUser.data;
    await database.ref(`todos/${uid}/${todoKey}/subtasks/${subtaskKey}`).remove();
    context.commit(MutationTypes.removeSubtaskByKey, { subtaskKey, todoKey });
  },


};