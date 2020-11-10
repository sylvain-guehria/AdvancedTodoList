<template>
  <navigation-form />
</template>
<script>
import InputText from "@/components/Form/InputText";
import NavigationForm from "./NavigationForm.vue";
export default {
  name: "dashboard-form",
  data() {
    return {};
  },
  components: {
    /*"input-text": InputText,*/
    "navigation-form": NavigationForm,
  },
};
</script>
