<template>
  <transition name="modal">
    <div v-if="showModal" class="modal-component">
      <div class="modal-mask" @click="showModal=false"></div>
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header">
            <slot name="header"></slot>
            <md-button class="md-icon-button md-just-icon" v-on:click="showModal=false">
              <feather type="x"></feather>
            </md-button>
          </div>
          <div class="modal-body">
            <slot name="body"></slot>
          </div>
          <div class="modal-footer">
            <slot name="footer"></slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component({
  components: {}
})
export default class Modal extends Vue {
  @Prop({ default: false }) show!: boolean;

  get showModal(): boolean {
    return this.show;
  }

  set showModal(value: boolean) {
    this.$emit("show", value);
  }
}
</script>