import lodash from "lodash";

import store from '@/store/index'
import Vue from 'vue';

import { Todo } from '@/common/models/types';
import { tasksActionsType } from "@/store/modules/todos";


export const serviceTodo = {

  orderUp(item: Todo): void {
    if(store.getters.getActionLoading){ return;}
    let todolist = store.getters.getTodoList;

    let max_order_todo: Todo = lodash.maxBy(todolist, "order");

    if (max_order_todo && item && max_order_todo.order === item.order) {
      return;
    }

    let max_order = max_order_todo ? max_order_todo.order : 0;
    let keyItemToUpOrder = item.key;

    if (!item.order) {
      max_order = max_order + 1;
      this.$store.dispatch("setOrder", { keyItemToUpOrder, max_order });
      return;
    }

    let todo_with_order_to_down = lodash.find(this.todolist, function (o) {
      return o.order === item.order + 1;
    });

    if (!todo_with_order_to_down) {
      max_order = item.order + 1;
      this.$store.dispatch("setOrder", { keyItemToUpOrder, max_order });
      return;
    }

    let keytodoOrderDown = todo_with_order_to_down.key;

    this.$store.dispatch("setOrderUpTodo", keyItemToUpOrder);
    this.$store.dispatch("setOrderDownTodo", keytodoOrderDown);
  },
  orderDown(item: Todo): void {
    if(store.getters.getActionLoading){ return;}
    let todolist = store.getters.getTodoList;

    if (item.order && item.order <= 1) {
      return;
    }
    let min_order_todo = lodash.minBy(todolist, "order");
    let min_order = min_order_todo ? min_order_todo.order : 0;
    let todo_with_order_to_up = lodash.find(todolist, function (o) {
      return o.order === item.order - 1;
    });

    if (!todo_with_order_to_up) {
      let max_order = item.order - 1;
      let keyItemToUpOrder = item.key;
      this.$store.dispatch("setOrder", { keyItemToUpOrder, max_order });
      return;
    }

    let keytodoOrderDown = item.key;
    let keyItemToUpOrder = todo_with_order_to_up.key;

    this.$store.dispatch("setOrderUpTodo", keyItemToUpOrder);
    this.$store.dispatch("setOrderDownTodo", keytodoOrderDown);
  },
  addTask(task: Todo) {
    if(store.getters.getActionLoading){ return;}
    store
      .dispatch(tasksActionsType.CREATETODO, task)
      .then(() => {
        Vue.toasted.show("Task added, it is now in your list", {
          icon: "create",
          theme: "bubble",
          position: "bottom-right",
          duration: 5000,
        });
      })
      .catch((error: Error) => {
        Vue.toasted.show("Cannot create task", {
          icon: "error_outline",
          theme: "bubble",
          position: "bottom-right",
          duration: 5000,
        });
      });
  },
  deleteTodo(key: string): void {
    if(store.getters.getActionLoading){ return;}
    store
      .dispatch(tasksActionsType.DELETETODO, key)
      .then(() => {
        Vue.toasted.show("Task deleted, it is no longer in your list", {
          icon: "delete_outline",
          theme: "bubble",
          position: "bottom-right",
          duration: 5000,
        });
      })
      .catch((error: Error) => {
        Vue.toasted.show("Cannot deleted Task", {
          icon: "error_outline",
          theme: "bubble",
          position: "bottom-right",
          duration: 5000,
        });
      });
  },
  editTodo(todoKey: string, attribute: string, value) {
    if(store.getters.getActionLoading){ return;}
    store.dispatch(tasksActionsType.EDITATTRIBUTETASK, {
      todoKey,
      attribute,
      value,
    });
  },
  setTodoDone(item: Todo): void {
    if(store.getters.getActionLoading){ return;}
    store.dispatch(tasksActionsType.SETTODOSTATE, {
      key: item.key,
      isDone: item.isdone,
    });
  },
  downOrderNoCondition(key: string) {
    if(store.getters.getActionLoading){ return;}
    store.dispatch(tasksActionsType.SETORDERDOWNTODO, key);
  },
};
