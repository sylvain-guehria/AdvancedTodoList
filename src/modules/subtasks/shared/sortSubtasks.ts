import { SubTask } from "./subtaskTypes";
import lodash from "lodash";
import store from "@/store/index";
import { MutationTypes as subtasksMutationType } from '@/store/modules/subtasks/mutations';

export const sortSubtasksBy = function (subtasks: SubTask[], attribute: string, asc, todoKey: string): SubTask[] {
    var listsubtasks: SubTask[] = [];

    listsubtasks = lodash.orderBy(subtasks, attribute, asc);

    store.commit(subtasksMutationType.SETSUBTASKS,
        { subtasks, todoKey });

    return listsubtasks;
}

