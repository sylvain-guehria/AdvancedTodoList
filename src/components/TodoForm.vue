<template>
  <div class="container mt-5">
    <h4>Add task : </h4>
    <form>
      <div class="form-group row ">
        <label for="task">task</label>
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
        <input
          id="action"
          v-model="formData.date"
          type="date"
          class="form-control"
        >
        <v-slider
          v-model="importance"
          label="Max error count"
          min="0"
          max="10"
        />
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

  createTodo (){
    this.$emit('onCreate', this.formData);
    this.formData = {
      task: '',
      deadline: new Date(),
      importance: 0
    };
  }
}
</script>

<style >
</style>
