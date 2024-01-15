<template>
  <router-view />
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'App',
  created() {
    if (this.isDarkLS)
      this.$q.dark.set(true)
  },
  computed: {
    isDarkLS: {
      get() {
        return this.$store.getters['global/getlocalStorageGetter']?.isDark;
      },
    },
  }
});
</script>

<style>
::-webkit-scrollbar {
  margin-bottom: 0rem;
  /* remove default margin */
  scrollbar-width: none;
  /* Also needed to disable scrollbar Firefox */
  -ms-overflow-style: none;
  /* Disable scrollbar IE 10+ */
  overflow-y: scroll;
  width: 0px;
  background: transparent;
  /* Disable scrollbar Chrome/Safari/Webkit */
}
</style>
