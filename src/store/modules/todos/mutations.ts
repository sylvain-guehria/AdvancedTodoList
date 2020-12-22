import { MutationTree } from "vuex";
import { Todos, Todo, SubTask, Detail } from "@/common/models/types/index";
import store from '@/store/index';

export enum MutationTypes {
    SET_ISLOADING = "setIsLoading",
    INCRENDALLLISTNUMBER = "incRendAllListNumber",
    SETTODOLIST = "setTodoList",
    SETFILTEREDTODOLIST = "setFilteredTodoList",
    RESETCURRENTTODO = "resetCurrentTodo",
    ADDNEWTODO = "addNewTodo",
    REMOVETODO = "removeTodo",
    REMOVETODOBYKEY = "removeTodoByKey",
    EDITTODOBYKEY = "editTodoByKey",
    UPORDERTODO = "upOrderTodo",
    DOWNORDERTODO = "downOrderTodo",
    SETORDER = "setOrder",
    EDITATTRIBUTETASK = "EDITATTRIBUTETASK",
    SETTASKSTATE = "setTaskState",
    SETCURRENTTODOKEY = "setCurrentTodoKey",


    SETCURRENTTODO = "setCurrentTodo",
    SETCURRENTSUBTASK = "setCurrentSubtask",
    SETCURRENTDETAIL = "setCurrentDetail",
}

export const mutationsTodos: MutationTree<Todos> = {
    [MutationTypes.SETTASKSTATE](state, { key, isDone }: { key: string, isDone: boolean }) {
        var index = store.getters.getTodoList.findIndex(function (o) {
            return o.key === key;
        });

        if (index !== -1) {
            store.getters.getTodoList[index].isdone = isDone;
        }
    },

    [MutationTypes.SET_ISLOADING](state, status: boolean) {
        state.isLoading = status;
    },
    [MutationTypes.INCRENDALLLISTNUMBER](state) {
        state.rendAllListNumber = state.rendAllListNumber + 1;
    },
    [MutationTypes.SETTODOLIST](state, newList: Todo[]) {
        state.todolist = newList;
    },
    [MutationTypes.SETFILTEREDTODOLIST](state, newList: Todo[]) {
        state.filtered_todo_list = newList;
    },
    [MutationTypes.EDITATTRIBUTETASK](state, { todoKey, attribute, value }: { todoKey: string, attribute: string, value }) {
        var index = store.getters.getTodoList.findIndex(function (o) {
            return o.key === todoKey;
        });
        if (index !== -1) {
            store.getters.getTodoList[index][attribute] = value;
        }
    },
    [MutationTypes.RESETCURRENTTODO](state) {
        state.currentTodo = {
            task: '',
            creationDate: new Date().toISOString().substr(0, 10),
            subtasks: [],
            isdone: false
        };
    },
    [MutationTypes.ADDNEWTODO](state, todo: Todo) { state.todolist.unshift(todo) },

    [MutationTypes.REMOVETODO](state, key: string) {
        const index = state.todolist.findIndex(todo => todo.key === key);
        state.todolist.splice(index, 1);
    },
    [MutationTypes.REMOVETODOBYKEY](state, key: string) {
        var index = state.todolist.findIndex(function (o) {
            return o.key === key;
        });
        if (index !== -1) state.todolist.splice(index, 1);
    },
    [MutationTypes.EDITTODOBYKEY](state, todo: Todo) {
        var index = state.todolist.findIndex(function (o) {
            return o.key === todo.key;
        });
        if (index !== -1) {
            state.todolist.splice(index, 1);
            state.todolist.splice(index, 0, todo);
        }
    },
    [MutationTypes.UPORDERTODO](state, key: string) {
        var index = state.todolist.findIndex(function (o) {
            return o.key === key;
        });
        if (state.todolist[index]) { state.todolist[index].order = state.todolist[index].order + 1 || 0; }
    },
    [MutationTypes.DOWNORDERTODO](state, key: string) {
        var index = state.todolist.findIndex(function (o) {
            return o.key === key;
        });
        if (state.todolist[index]) { state.todolist[index].order = state.todolist[index].order - 1 || 0; }
    },
    [MutationTypes.SETORDER](state, { keyItemToUpOrder, max_order }: { keyItemToUpOrder: string, max_order: number }) {
        var index = state.todolist.findIndex(function (o) {
            return o.key === keyItemToUpOrder;
        });
        if (state.todolist[index]) { state.todolist[index].order = max_order }
    },

    [MutationTypes.SETCURRENTTODOKEY](state, key: string) {
        const todofinded = state.todolist.find(obj => {
            return obj.key === key;
        });
        if (todofinded) {
            state.currentTodo = todofinded;
        }
    },

    [MutationTypes.SETCURRENTTODO](state, todo: Todo) {
        state.currentTodo = todo;
    },

    [MutationTypes.SETCURRENTSUBTASK](state, subtask: SubTask) {
        state.currentSubtask = subtask;
    },

    [MutationTypes.SETCURRENTDETAIL](state, detail: Detail) {
        state.currentDetail = detail;
    },
}