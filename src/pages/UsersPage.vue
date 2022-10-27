<template>
  <q-page class="flex flex-center cursor-pointer non-selectable">
    <div class="cardPage1">
      <header-actions :titlePage="'Usuarios'" :btnAction="btnAction" :inputSearch="inputSearch" />
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import HeaderActions from 'src/components/compose/HeaderActions.vue'

export default defineComponent({
  name: 'UsersPage',
  components: {
    HeaderActions
  },
  data () {
    return {
      btnAction: {
        show: true,
        btnTitle: 'Añadir usuario'
      },
      inputSearch: {
        show: true,
        inputLabel: 'Buscar por nombre'
      }
    }
  }
})
</script>
