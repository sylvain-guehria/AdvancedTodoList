import { SubTask } from "./subtaskTypes";
import lodash from "lodash";

export const sortSubtasksBy = function (subtasks: SubTask[], attribute: string, asc):  SubTask[]{
    var listsubtasks: SubTask[] = [];
   
    listsubtasks = lodash.orderBy(subtasks, attribute, asc);

    return listsubtasks;
}

