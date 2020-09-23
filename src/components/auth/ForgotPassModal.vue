<template>
  <v-card class="mx-auto container ">
    <div class="vue-tempalte">
      <form>
        <h3>Forgot Password</h3>

        <div class="form-group">
          <label>Email address</label>
          <input
            type="email"
            class="form-control form-control-lg"
          >
        </div>

        <button
          type="submit"
          class="btn btn-dark btn-lg btn-block"
        >
          Reset password
        </button>
      </form>
    </div>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class ForgotPassModal extends Vue {

}
</script>

<style scoped>

</style>
