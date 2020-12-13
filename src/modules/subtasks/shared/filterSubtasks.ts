import { SubTask } from "../shared/subtaskTypes";
import { subtaskEnum } from "../shared/enumSubtask"

export const filterSubtasksKeepOneAttribute = function (subtasks: SubTask[], attribute):  SubTask[]{
    var listsubtasks: SubTask[] = [];
   
    subtasks.forEach(function (subtask) {
        const currentSubtask: SubTask = {
          [subtaskEnum.KEY] : subtask[subtaskEnum.KEY] || '',
          [subtaskEnum.ISDONE] : subtask[subtaskEnum.ISDONE] || false,
          [attribute] : subtask[attribute] || '',
        }
        listsubtasks.push(currentSubtask);
      });

      return listsubtasks;
}

