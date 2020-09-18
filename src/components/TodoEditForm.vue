<template>
  <div class="container mt-5 border">
    <p class="mt-2">
      Edit task
    </p>
    <form>
      <div class="form-group ">
        <v-text-field
          v-model="currentTodo.task"
          label="Task name"
        /><br>
        <v-textarea
          v-model="currentTodo.description"
          auto-grow
          clearable
          placeholder="Task Description"
        />
        <br>
        <div class="row ml-1">
          <v-slider
            v-model="currentTodo.importance"
            label="Importance of the task"
            min="0"
            max="100"
          /> {{ currentTodo.importance }}
        </div>
        <br>
        <div class="alignleft ml-1">
          <span>Deadline</span>
        </div>
        <div class="ml-1">
          <v-date-picker
            v-model="currentTodo.deadline"
            full-width
            :landscape="$vuetify.breakpoint.smAndUp"
            class="mb-6"
          />
        </div>
      </div>

      <button
        class="btn btn-primary"
        @click.prevent="editTodo"
      >
        Edit task
      </button>
    </form>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { Todo } from '../models/types';

@Component
export default class TodoEditForm extends Vue {
 @Prop() private currentTodo?: Todo;

 //  currentTodo: Todo = {
 //    task: '',
 //    deadline: new Date(),
 //    importance: 0,
 //    description: ''
 //  };

 dateHelper: string = '';

 created (){
   if (this.currentTodo){
     this.dateHelper =
      this.currentTodo.deadline ? this.currentTodo.deadline.toString()
        : new Date().toISOString().substr(0, 10);
   }
   console.log('the current TODO', this.currentTodo);
 }

 editTodo (){
   this.$emit('onEdit', this.currentTodo);
   this.currentTodo = {
     task: '',
     deadline: new Date(),
     description: '',
     importance: 0
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
