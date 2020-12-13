import { Todo } from "../shared/todoType";
import { todoEnum } from "../shared/enumTodo"
import { filterSubtasksKeepOneAttribute } from "@/modules/subtasks/shared/filterSubtasks"

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

