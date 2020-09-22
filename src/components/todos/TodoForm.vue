<template>
  <div class="container border">
    <div>
      <v-btn
        color="primary lighten-2"
        text
      >
        Creating task
      </v-btn>
      <v-btn
        color="primary"
        fab
        x-small
        dark
        loading
      >
        <v-icon>mdi-plus-circle-outline</v-icon>
      </v-btn>
    </div>
    <form>
      <div class="form-group ">
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
            min="1"
            max="100"
          /> {{ formData.importance }}
        </div>
        <br>
        <div class="alignleft ml-1">
          <span>Deadline</span>
        </div>
        <div class="ml-1">
          <v-date-picker
            v-model="dateHelper"
            full-width
            :landscape="$vuetify.breakpoint.smAndUp"
            class="mb-6"
          />
        </div>
      </div>
      <br>
      <v-btn
        color="primary lighten-2"
        rounded
        @click.prevent="createTodo"
      >
        Create task
      </v-btn>
    </form>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Todo } from '../../models/types';

@Component
export default class TodoForm extends Vue {
  formData: Todo = {
    task: '',
    deadline: new Date(),
    importance: 0,
    description: ''
  };

  dateHelper: string = '';

  created (){
    this.dateHelper = new Date().toISOString().substr(0, 10);
  }

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
