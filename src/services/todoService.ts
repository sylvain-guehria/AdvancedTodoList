import lodash from "lodash";

import store from '@/store/index'
import { Todo } from '@/common/models/types';


export const preActionsTodo = {
 
  orderUp(item: Todo): void {
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
};
