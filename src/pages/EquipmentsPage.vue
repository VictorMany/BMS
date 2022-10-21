<template>
  <q-page class="flex flex-center cursor-pointer non-selectable">
    <div class="cardPage1">
      <header-actions :titlePage="'Equipos'" />
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import HeaderActions from 'src/components/compose/HeaderActions.vue'

export default defineComponent({
  name: 'EquipmentsPage',
  components: {
    HeaderActions
  }
})
</script>
