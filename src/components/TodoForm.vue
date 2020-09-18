<template>
  <div class="container mt-5 border">
    <p class="mt-2">
      Add task :
    </p>
    <form>
      <div class="form-group ">
        <!-- <label for="task">task name</label>
        <input
          id="action"
          v-model="formData.task"
          type="text"
          class="form-control"
        ><br><br> -->
        <v-text-field
          v-model="formData.task"
          label="Task name"
        /><br>
        <v-textarea
          v-model="formData.description"
          auto-grow
          clearable
          placeholder="Task Description"
        />
        <br>
        <div class="row ml-1">
          <v-slider
            v-model="formData.importance"
            label="Importance of the task"
            min="0"
            max="100"
          /> {{ formData.importance }}
        </div>
        <br>
        <div class="alignleft ml-1">
          <span>Deadline</span>
          <v-date-picker
            v-model="dateHelper"
            full-width
            :landscape="$vuetify.breakpoint.smAndUp"
            class="mb-6"
          />
        </div>
      </div>

      <button
        class="btn btn-primary"
        @click.prevent="createTodo"
      >
        Create task
      </button>
    </form>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Todo } from '../models/types';

@Component
export default class TodoForm extends Vue {
  formData: Todo = {
    task: '',
    deadline: new Date(),
    importance: 0,
    description: ''
  };

  dateHelper: string = '';

  updated (){
    this.formData.deadline = new Date(this.dateHelper);
  }

  createTodo (){
    this.$emit('onCreate', this.formData);
    this.formData = {
      task: '',
      deadline: new Date(),
      description: ''
    };
  }
}
</script>

<style scoped>
.border{
  padding : 50px 50px 50px 50px
}
.alignleft{
  text-align: left;
}
</style>
