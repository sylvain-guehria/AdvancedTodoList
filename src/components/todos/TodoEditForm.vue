<template>
  <div class="container border">
    <div>
      <v-btn
        color="primary lighten-2"
        text
      >
        Editing task
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
            v-model="dateHelper"
            full-width
            :landscape="$vuetify.breakpoint.smAndUp"
            class="mb-6"
          />
        </div>
      </div><br>
      <v-btn
        color="primary lighten-2"
        rounded
        @click.prevent="editTodo"
      >
        Edit task
      </v-btn>
    </form>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { Todo } from '../../models/types';

@Component
export default class TodoEditForm extends Vue {
 @Prop() private currentTodo?: Todo;

 dateHelper: string = '';

 created (){
   if (this.currentTodo){
     this.dateHelper =
      this.currentTodo.deadline ? this.currentTodo.deadline.toISOString().substr(0, 10)
        : new Date().toISOString().substr(0, 10);
   }
   console.log('the current date', this.dateHelper);
 }

 editTodo (){
   this.$emit('onEdit', this.currentTodo, this.dateHelper);
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
