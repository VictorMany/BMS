<template>
  <q-page class="flex flex-center">
    <Components />
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import Components from 'src/components/atomic/Components.vue'

export default defineComponent({
  name: 'IndexPage',
  components: { Components }
})
</script>
