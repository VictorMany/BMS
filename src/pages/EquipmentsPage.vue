<template>
  <q-page class="flex flex-center cursor-pointer non-selectable">
    <div class="card-page">
      <header-actions :titlePage="'Equipos'" :btnAction="btnAction" :inputSearch="inputSearch" />
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
  },
  data () {
    return {
      btnAction: {
        show: true,
        btnTitle: 'Añadir equipo'
      },
      inputSearch: {
        show: true,
        inputLabel: 'Buscar por nombre'
      }
    }
  }
})
</script>
