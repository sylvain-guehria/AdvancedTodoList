<template>
  <div class="container mt-5">
    <h3>Add task : </h3>
    <form>
      <div class="form-group ">
        <label for="action">task</label>
        <input
          id="action"
          v-model="formData.task"
          type="text"
          class="form-control"
        >
        <label for="action">Date</label>
        <input
          id="action"
          v-model="formData.date"
          type="date"
          class="form-control"
        >
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
  before?: Date;
}

@Component
export default class TodoForm extends Vue {
  formData: Todo = {
    task: '',
    before: new Date()
  };

  createTodo (){
    this.$emit('onCreate', this.formData);
  }
}
</script>

<style >
</style>
