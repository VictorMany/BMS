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
  },
});
</script>

<style>
*::-webkit-scrollbar {
  height: 8px;
  background: transparent;
  margin-bottom: 0rem;
  scrollbar-width: none;
  -ms-overflow-style: none;
  overflow-y: scroll;
  width: 0px;
  background: transparent;
}

*::-webkit-scrollbar-thumb {
  background-color: rgba(29, 100, 231, 0.2);
  border-radius: 8px;
}
</style> 
