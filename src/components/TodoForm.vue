<template>
  <div class="container mt-5">
    <h1>Add task : </h1>
    <form>
      <div class="form-group">
        <label for="action">action</label>
        <input
          type="text"
          class="form-control"
        >
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class TodoForm extends Vue {

}
</script>

<style >
</style>
