<template>
  <v-card
    class="mx-auto my-12"
    max-width="374"
  >
    <v-img
      height="250"
      src="https://wpformation.com/wp-content/uploads/2014/03/todo1.jpg"
    />

    <v-card-title>{{ currentTodo.task }}</v-card-title>

    <v-card-text>
      <v-row
        align="center"
        class="mx-0"
      >
        <v-rating
          :value="currentTodo.importance / 20"
          color="amber"
          dense
          half-increments
          readonly
          size="14"
        />

        <div class="grey--text ml-4">
          {{ currentTodo.importance }}/100
        </div>
      </v-row>

      <div class="my-4 subtitle-1">
        Deadline : {{ formatDate(currentTodo.deadline) }}
      </div>

      <div>{{ getdaysleft(currentTodo.deadline) }} days left.</div>
    </v-card-text>

    <v-divider class="mx-4" />

    <v-card-title> Description :</v-card-title>

    <v-card-text>
      {{ currentTodo.description }}
    </v-card-text>

    <v-card-actions>
      <v-btn
        color="deep-purple lighten-2"
        text
        @click="closeTask"
      >
        Close task
      </v-btn>
    </v-card-actions>
  </v-card>
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
