<template>
  <q-page class="flex flex-center cursor-pointer non-selectable">
    <div class="cardPage1">
      <header-actions :titlePage="'Reportes'" :btnAction="btnAction" :inputSearch="inputSearch" />
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import HeaderActions from 'src/components/compose/HeaderActions.vue'

export default defineComponent({
  name: 'ReportsPage',
  components: {
    HeaderActions
  },
  data () {
    return {
      btnAction: {
        btnTitle: 'Añadir reporte',
        show: true
      },
      inputSearch: {
        show: true,
        inputLabel: 'Buscar por título'
      }
    }
  }
})
</script>
