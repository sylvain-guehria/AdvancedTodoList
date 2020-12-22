import lodash from "lodash";

import store from '@/store/index'
import Vue from 'vue';

import { SubTask } from '@/common/models/types';
import { subtasksActionsType } from "@/store/modules/subtasks";


export const serviceSubtask = {

  editSubtaskDetail({
    taskKey,
    subtaskKey,
    attribute,
    value,
    key
  }): Promise<{}> {
    return new Promise((resolve, reject) => {
      store.dispatch(subtasksActionsType.EDITSUBTASKDETAIL, {
        taskKey,
        subtaskKey,
        attribute,
        value,
        key
      }).then(() => {
        resolve({ success: true });
      })
        .catch(error => {
          reject(error);
        });
    });
  },
  deleteSubtaskDetail({
    taskKey,
    subtaskKey,
    key
  }): Promise<{}> {
    return new Promise((resolve, reject) => {
      store.dispatch(subtasksActionsType.DELETESUBTASKDETAIL, {
        taskKey,
        subtaskKey,
        key
      }).then(() => {
        resolve({ success: true });
      })
        .catch(error => {
          reject(error);
        });
    });
  },
  addSubtasksDetail({
    todoKey,
    subtaskKey,
    detail,
  }): Promise<{}> {
    return new Promise((resolve, reject) => {
      store.dispatch(subtasksActionsType.ADDSUBTASKDETAIL, {
        todoKey,
        subtaskKey,
        detail
      }).then(() => {
        resolve({ success: true });
      })
        .catch(error => {
          reject(error);
        });
    });
  },
}