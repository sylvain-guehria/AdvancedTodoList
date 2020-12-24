<template>
  <div class="content">
  <div class="md-layout-item md-size-100">
   <admin :key="customKey()" />
  </div>
  </div>

</template>

<script>
import Admin from '@/components/admin/Admin.vue'

export default {
  components: {
    'admin': Admin
  },
  data() {
    return {};
  },
  methods: {
    customKey(){
      return this.$store.getters.getUsers? this.$store.getters.getUsers.length: 0;
    }
  }
};
</script>
