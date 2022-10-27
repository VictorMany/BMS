<template>
  <q-page class="flex flex-center cursor-pointer non-selectable">
    <div class="card-page">
      <header-actions :titlePage="'Equipos'" :btnAction="btnAction" :inputSearch="inputSearch" />
    </div>
    <div class="q-pa-md" style="max-width: 95%">
    <div style="width: 100%" class="row q-col-gutter-x-xl q-col-gutter-y-lg">
      <div
        class="col-lg-3 col-md-4 col-sm-6 col-xs-12"
        v-for="(equipo, index) in Equipos"
        :key="index"
      >
      <item-card/>
      </div>
    </div>
  </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import HeaderActions from 'src/components/compose/HeaderActions.vue'
import ItemCard from 'src/components/atomic/ItemCard.vue'

export default defineComponent({
  name: 'EquipmentsPage',
  components: {
    HeaderActions,
    ItemCard
  },
  data () {
    return {
      Equipos: 20,
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
