import { Todo } from "../shared/todoType";
import { todoEnum } from "../shared/enumTodo"
import { filterSubtasksKeepOneAttribute, filterSubTaskActive, filterSubTaskAndDetailsActive } from "@/modules/subtasks/shared/filterSubtasks"

export const filterTodoKeepSubtasksOnly = function (todo: Todo): Todo {
    
    let todoFiltered = {
        [todoEnum.KEY]: todo[todoEnum.KEY],
        [todoEnum.SUBTASKS]:  todo[todoEnum.SUBTASKS],
        [todoEnum.ISDONE]:  todo[todoEnum.ISDONE],
    };
    return todoFiltered;
};

//prends le TODO, renvoie un todo avec seulement la liste de subtasks. Cette liste de subtask n'a que 'key', 'isdone' et l'attribute
export const filterTodoKeepSubtasksWithOneAttribute = function (todo: Todo): Todo {
    let todoFiltered = {
        [todoEnum.KEY]: todo[todoEnum.KEY],
        [todoEnum.SUBTASKS]:  filterSubtasksKeepOneAttribute(todo[todoEnum.SUBTASKS], 'deadline'),
        [todoEnum.ISDONE]:  todo[todoEnum.ISDONE],
    };
    return todoFiltered;
};

export const filterTodoOnlySubTaskActive = (todos: Todo[]): Todo[] =>  {
    var listTodos: Todo[] = [];
    let currentTodo: Todo = {isdone : false};
    todos.forEach(function (todo) {
        currentTodo = {...todo}
        currentTodo.subtasks = filterSubTaskActive(currentTodo.subtasks);
        listTodos.push(currentTodo)
      });
      return listTodos;
  }

export const filterTodoOnlySubTaskAndDetailActive = (todos: Todo[]): Todo[] =>  {
    var listTodos: Todo[] = [];
    let currentTodo: Todo = {isdone : false};
    todos.forEach(function (todo) {
        currentTodo = {...todo}
        if (currentTodo.subtasks && currentTodo.subtasks.length > 0)currentTodo.subtasks = filterSubTaskAndDetailsActive(currentTodo.subtasks);
        listTodos.push(currentTodo)
      });
      return listTodos;
  }