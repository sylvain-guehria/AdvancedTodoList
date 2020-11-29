<template>
  <div class="wrapper fullcontent">
    <md-toolbar md-elevation="0" class="md-transparent">
      <div class="md-toolbar-row">
        <div class="md-toolbar-section-start">
          <div class="logo">
            <a href="#" class="logo-big">
              <div class="logo-img smalllogo">
                <img :src="'logoLogin.svg'" alt />
              </div>
            </a>
          </div>
        </div>
      </div>
    </md-toolbar>
    <div class="main-panel">
      <full-layout-content></full-layout-content>
    </div>
  </div>
</template>
<style lang="scss"></style>
<script>
import FullLayoutContent from "./Content.vue";
export default {
  components: {
    FullLayoutContent
  }
};
</script>
<style scoped>
.smalllogo{
  width:300px;
}
</style>
