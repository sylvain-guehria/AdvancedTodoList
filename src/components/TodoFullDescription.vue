<template>
  <div class="container mt-5">
    <div class="flex">
      <h3>{{ currentTodo.task }} </h3>  {{ currentTodo.importance }}/100
    </div>
    <hr>
    <div class="form-group ">
      <br>
      <div class="sameline">
        <div class="alignleft ml-1">
          <span>Deadline</span>
          <div>
            {{ formatDate(currentTodo.deadline) }}
          </div>
        </div>
        <div class="alignright ml-1">
          <span>number of days left</span>
          <div>
            {{ getdaysleft(currentTodo.deadline) }}
          </div>
        </div>
      </div>
      <div class="mt-9 container">
        <v-text-field
          v-model="currentTodo.description"
          label="Task description"
          readonly
        />
      </div>
    </div>

    <button
      class="btn btn-primary mb-4"
      @click.prevent="closeTask"
    >
      Close
    </button>
  </div>
</template>

<script lang="ts">

import { Component, Vue, Prop } from 'vue-property-decorator';
import { Todo } from '../models/types';

@Component
export default class TodoFullDescription extends Vue{
 @Prop() private currentTodo?: Todo;

 getdaysleft (deadline: Date): number{
   const DiffTime: number = deadline.getTime() - new Date().getTime();

   const diffTimeString: string = (DiffTime / (1000 * 3600 * 24)).toFixed(1);
   return parseFloat(diffTimeString);
 }

 formatDate (date: Date): string {
   const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(date);
   const mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(date);
   const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(date);
   return (`${da}-${mo}-${ye}`);
 }

 closeTask (){
   this.$emit('onClickCloseModal');
 }
}

</script>

<style>
.alignleft{
  text-align: center;
  margin-right: 50%;
}
.alignright{
  text-align: center;
  margin-left: 50%;
}
.sameline{
display: flex;
justify-content: center;
}
</style>
