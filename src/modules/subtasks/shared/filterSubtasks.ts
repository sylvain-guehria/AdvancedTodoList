import { SubTask } from "../shared/subtaskTypes";
import { subtaskEnum } from "../shared/enumSubtask"
import { Detail } from '@/common/models/types';

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

export const filterSubTaskActive = (subtasks: SubTask[]) : SubTask[] =>  {
  var listsubtasks: SubTask[] = [];
  subtasks.forEach(function (subtask) {
      if(subtask.isdone === false) listsubtasks.push(subtask);
    });
    // eslint-disable-next-line no-console
    console.log(listsubtasks)
    return listsubtasks;
}

export const filterDetailsActive = (details: Detail[]) : Detail[] =>  {
  var listdetails: Detail[] = [];
  details.forEach(function (detail) {
      if(detail.isdone === false) listdetails.push(detail);
    });
    return listdetails;
}

export const filterSubTaskAndDetailsActive = (subtasks: SubTask[]) : SubTask[] =>  {
  var listsubtasks: SubTask[] = [];

  subtasks.forEach(function (subtask) {

      if(subtask.isdone === false) {
        if(subtask.details && subtask.details.length > 0) subtask.details = filterDetailsActive(subtask.details);
        listsubtasks.push(subtask);
      }

    });
    return listsubtasks;
}
