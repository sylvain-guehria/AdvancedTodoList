<template>
  <v-card
    class="mx-auto my-12 container"
    max-width="374"
  >
    <div>
      <img
        width="100%"
        :src="imageLink"
      >
    </div>

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
        color="primary lighten-2"
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
import { Todo } from '../../models/types';
import { myFunctions } from '../helpers/helperfunction';

@Component
export default class TodoFullDescription extends Vue{
 @Prop() private currentTodo?: Todo;

 imageLink = require('../../assets/images/todo1.jpg');

 formatDate = myFunctions.formatDate;

 getdaysleft = myFunctions.getdaysleft;

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
