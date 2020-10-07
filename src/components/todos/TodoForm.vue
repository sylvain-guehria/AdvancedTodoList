<template>
  <v-card class="ml-7 mr-7 mt-7 mb-7 border">
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
  </v-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import * as firebase from 'firebase/app';
import { Todo } from '../../models/types';
import { database } from '../../firebase/firebase';

@Component
export default class TodoForm extends Vue {
  formData: Todo = {
    task: '',
    deadline: new Date(),
    importance: 0,
    description: ''
  };

  dateHelper: string = '';

  dateToday: string = '';

  useruid: string = '';

  created (){
    this.dateHelper = new Date().toISOString().substr(0, 10);
    this.dateToday = new Date().toISOString().substr(0, 10);

    var user = firebase.auth().currentUser;

    if (user != null) {
      this.useruid = user.uid;
    }
  }

  updated (){
    this.formData.deadline = new Date(this.dateHelper);
  }

  createTodo (){
    this.$emit('onCreate', this.formData);
    this.writeUserData(this.formData);
    this.formData = {
      task: '',
      deadline: new Date(),
      description: ''
    };
  }

  //FIXME : right now this function erase all the todos foir the user and doesnt provide a key to the todo
  writeUserData (todo: Todo) {
    const { task, deadline, importance, description } = todo;
    database.ref('todos/' + this.useruid).set({
      task: task,
      deadline: deadline,
      importance: importance,
      description: description,
      creationDate: this.dateToday
    });
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
