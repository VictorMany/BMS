<template>
  <q-page class="flex flex-center cursor-pointer non-selectable">
    <div class="cardPage1">
      <header-actions :titlePage="'Calendario'" :btnAction="btnAction" :inputSearch="inputSearch" />
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import HeaderActions from 'src/components/compose/HeaderActions.vue'

export default defineComponent({
  name: 'CalendarPage',
  components: {
    HeaderActions
  },
  data () {
    return {
      btnAction: {
        show: true,
        btnTitle: 'Añadir recordatorio'
      },
      inputSearch: {
        show: true,
        inputLabel: 'Buscar por fecha'
      }
    }
  }
})
</script>
