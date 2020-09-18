<template>
  <div class="container mt-5 border">
    <p>Add task : </p>
    <form>
      <div class="form-group row ">
        <label for="task">task name</label>
        <input
          id="action"
          v-model="formData.task"
          type="text"
          class="form-control"
        ><br><br>
        <label
          for="date"
          class=""
        >Date</label>
        <v-date-picker
          v-model="dateHelper"
          full-width
          :landscape="$vuetify.breakpoint.smAndUp"
          class="mb-6"
        />
        <v-slider
          v-model="formData.importance"
          label="Importance of the task"
          min="0"
          max="100"
        /> {{ formData.importance }}
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

interface Todo {
  task: string;
  deadline?: Date;
  importance?: number;
}

@Component
export default class TodoForm extends Vue {
  formData: Todo = {
    task: '',
    deadline: new Date(),
    importance: 0
  };

  dateHelper: string = '';

  updated (){
    this.formData.deadline = new Date(this.dateHelper);
  }

  createTodo (){
    this.$emit('onCreate', this.formData);
    this.formData = {
      task: '',
      deadline: new Date()
    };
  }
}
</script>

<style scoped>
.border{
  padding : 50px 50px 50px 50px
}
</style>
