<template>
  <v-card class="ml-7 mr-7 mt-7 mb-7 border">
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
          label="Task title"
        /><br>
        <subtasks
          @onSubmitSubTasks="setSubTasks"
        />
        <br>
        <div class="row ml-1">
          <v-slider
            v-model="currentTodo.importance"
            label="Importance of the task"
            min="1"
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
      </div><br>
      <v-btn
        color="primary lighten-2"
        rounded
        @click.prevent="editTodo"
      >
        Edit task
      </v-btn>
    </form>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Todo, SubTask } from '../../models/types';
import SubtaskViewer from './SubTaskViewer.vue';

@Component({
  components: {
    subtasks: SubtaskViewer
  }
})
export default class TodoEditForm extends Vue {
  dateHelper: string = '';

  description: SubTask[]= [];

  currentTodo: Todo = {
    key: '',
    task: '',
    creationDate: new Date().toISOString().substr(0, 10)
  };

  setSubTasks (subtasks: SubTask[]){
    this.description = { ...subtasks };
  }

  created () {
    this.currentTodo = { ...this.$store.getters.getCurrentTodo };
    console.log('je created', this.$store.getters.getCurrentTodo);
  }

  editTodo (){
    this.currentTodo.description = { ...this.description };
    this.$emit('onEdit', this.currentTodo);
    this.$emit('onClose');
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
