<template>
  <div class="form-group ">
    <form
      action=""
      @submit.prevent="addSubTask"
    >
      <v-text-field
        disabled
        label="Sub Tasks"
      /><br>
      <input
        v-model="subTaskInput"
        name="add-todo"
        type="text"
        :class="{error: hasError}"
      >

      <button type="submit">
        Add
      </button>
    </form>

    <div
      v-if="subtasks && subtasks.length > 0"
      class="todo-subtasks"
    >
      <ul>
        <li
          v-for="subtask in subtasks"
          :key="subtask.order"
        >
          <input
            type="checkbox"
            :checked="subtask.isdone"
            @change="completeSubTask(subtask)"
          >
          <span
            class="label"
            contenteditable="true"
            :class="{completed: subtask.isdone}"
            @keydown.enter="updateSubTask($event, subtask)"
            @blur="updateSubTask($event, subtask)"
          >{{ subtask.label }}</span>
          <span
            class="remove"
            @click="removeSubTask(subtask)"
          >x</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { SubTask, HTMLElementEvent, Todo } from '@/models/types';
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class SubTaskViewer extends Vue {
  subTaskInput: string = '';

  hasError: boolean = false;

  subtasks: SubTask[]= [];

  currentTodo: Todo = {
    task: '',
    creationDate: new Date().toISOString().substr(0, 10),
    description: []
  };

  mounted (): void {
    this.currentTodo = { ...this.$store.getters.getCurrentTodo };
    console.log('current todo from viwer', this.currentTodo);
    if (this.currentTodo.key){
      const listTasks: SubTask[] = this.currentTodo.description || [];
      console.log('subta', listTasks);
      this.subtasks = [...listTasks];
      console.log('subta2', this.subtasks);
    } else {
      this.subtasks = [];
    }
  }

  sortbyorder () {
    this.subtasks = this.lodash.orderBy(this.subtasks, ['order'], ['desc']);
  }

  addSubTask (){
    if (!this.subTaskInput){
      this.hasError = true;
      return;
    }

    this.hasError = false;

    this.subtasks.push({
      order: this.subtasks ? this.subtasks.length : 0,
      label: this.subTaskInput,
      isdone: false
    });

    this.subTaskInput = '';
    this.$emit('onSubmitSubTasks', this.subtasks);
  }

  updateSubTask (e: HTMLElementEvent<HTMLTextAreaElement>, subtask: SubTask){
    e.preventDefault();
    if (e && e.target){
      subtask.label = e.target.innerText;
      e.target.blur();
    }
    this.$emit('onSubmitSubTasks', this.subtasks);
  }

  completeSubTask (subtask: SubTask){
    subtask.isdone = !subtask.isdone;
    this.$emit('onSubmitSubTasks', this.subtasks);
  }

  removeSubTask (subtask: SubTask){
    if (subtask.order) {
      this.subtasks.splice(subtask.order, 1);

      this.subtasks.forEach((subtask, index) => {
        subtask.order = index;
      });
      this.$emit('onSubmitSubTasks', this.subtasks);
    }
  }
}
</script>

<style scoped>
input[type=text]{
  font-size:16px;
  padding: 8px;
  border-radius: 10px;
  border: 1px solid #c4c4c4;
}

button{
  background: #3498db;
  background-image: linear-gradient(to bottom, #3498db, #2980b9);
  border-radius: 28px;

  color: #ffffff;
  font-size: 16px;
  padding: 8px 20px;
  border: none;
  cursor:pointer;
}
button:hover {
  background: #3cb0fd;
  background-image: linear-gradient(to bottom, #3cb0fd, #3498db);
}
input[type=text].error{border: 1px solid red;}
[contenteditable=true]:focus{

  overflow: hidden;
  border: 1px solid transparent;

  -webkit-appearance: textfield;
  -moz-appearance: textfield;
  appearance: textfield;

  white-space: nowrap;
  border-radius: 10px;

}

.label{
  display: inline-block;
  width: 200px;
  border: 1px solid transparent;
  padding: 8px;
  font-size: 16px;
  vertical-align:middle;
}

.label:hover{
  border:1px solid #c4c4c4;
  border-radius: 10px;
}

.remove{
  cursor:pointer;
  display:inline-block;
  border: 1px solid #c4c4c4;
  border-radius: 50%;
  padding:0px 4px;
}
.remove:hover{
  background: #3cb0fd;
}

.completed{
  text-decoration: line-through;
}
</style>
