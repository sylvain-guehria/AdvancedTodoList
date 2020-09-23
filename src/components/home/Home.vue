<template>
  <div class="container">
    <h1>Eisenhower Matrix</h1> <h3> (Increase Your Productivity)</h3>
    <br>
    <p>
      It is also known as Urgent-Important Matrix.
      Actually it helps us to do our task in a efficient manner.
      You can prioritize your tasks on the basis of urgency and importance.
      In this way, you can about your priorities in a well mannered way.
    </p>

    <p> It has four quadrants on the basis of:</p>

    <p>
      1.Most Important & Urgent (Do First)<br>
      2.Most Important But Not Urgent (Do Later)<br>
      3.Not Important But Urgent (Delegate)<br>
      4.Not Important & Not Urgent (Eliminate)<br>
    </p>

    <p> Eisenhower Matrix looks like: </p> <br>

    <img
      width="70%"
      :src="imageLink"
    ><br>
    <div class="source">
      source : <a href="https://medium.com/@muhammad.mubashar128/eisenhower-matrix-increase-your-productivity-c3296b2d8d0b">Show full article </a>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  components: {
  }
})
export default class Home extends Vue {
  imageLink = require('../../assets/images/matrix.jpeg');
}
</script>

<style scoped>
h1 {
  color: #7c795d;
  font-family: 'serif';
  font-size: 45px;
  font-weight: normal;
  line-height: 48px;
   }
h3 {
  color: #7c795d;
  font-family: 'serif';
  }
p {
  color: #7c795d;
  font-family: 'serif';
  text-align: left;
  font-size: 25px;
  }
  .source{
    color: #7c795d;
  font-family: 'serif';
  text-align: center;
  font-size: 15px;
  }

</style>
