<template>
  <q-page class="flex flex-center cursor-pointer non-selectable">
    <div class="card-page">
      <header-actions
        :titlePage="'Agregar nuevo equipo'"
        :inputSearch="inputSearch"
      />
      <div class="main-container-page">
        <form-text-field />
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import HeaderActions from 'src/components/compose/HeaderActions.vue'
import FormTextField from 'src/components/compose/FormTextField.vue'

export default defineComponent({
  name: 'EquipmentsPage',
  components: {
    HeaderActions,
    FormTextField
  },
  data () {
    return {
      Equipos: 40,
      btnAction: {
        show: true,
        btnTitle: 'Añadir equipo',
        to: 'add-equipment'
      },
      inputSearch: {
        show: true,
        inputLabel: 'Buscar por nombre'
      }
    }
  }
})
</script>

<style scoped>
.main-container-page {
  background-color: white;
}
</style>
