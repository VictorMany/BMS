<template>
  <q-page class="flex flex-center cursor-pointer non-selectable">
    <div class="card-page">
      <header-actions
        :titlePage="'Equipos'"
        :btnAction="btnAction"
        :inputSearch="inputSearch"
      />
      <div class="main-container-page">
        <q-scroll-area class="fit" :thumb-style="{ right: '6px', borderRadius: '5px', background: 'rgba(135, 192, 232, 0.44)', width: '5px', opacity: 1 }">
          <div
            style="max-width: 100%">
            <div class="row q-pa-none q-ma-none">
              <div
                class="col-auto q-pa-sm"
                v-for="(equipo, index) in Equipos"
                :key="index"
              >
                <item-card :v-bind="equipo"/>
              </div>
            </div>
          </div>
        </q-scroll-area>

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
