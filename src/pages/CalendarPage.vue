<template>
  <q-page class="flex flex-center cursor-pointer non-selectable">
    <div class="card-page">
      <header-actions
        :titlePage="'Calendario'"
        :btnAction="btnAction"
        :inputSearch="inputSearch"
      />
      <!-- Main container -->
      <div class="main-container-page">
        <div class="row q-pb-md" style="height: 99%;">
          <div class="col-auto">
            <q-date v-model="date" class="text-blue-grey-7" landscape />
            <div class="col q-mt-md">
              <div class="container-colorama q-pa-sm">
                <status-badge
                  v-for="(badge, i) in badges"
                  :key="i"
                  v-bind="badge"
                />
              </div>
              <div class="q-pa-md">
                <btn-action v-bind="btnAddPlan" />
              </div>
            </div>
          </div>
          <div class="col q-pl-md" style="height: 99%;">
            <div class="row flex items-center justify-between q-mb-sm">
              <label class="text-subtitle text-weight-light"> Resultados </label>
              <btn-switch />
            </div>
            <div style="overflow: scroll; height: 96%;" class="row w-100 q-pa-none q-ma-none">
              <q-scroll-area class="fit" :thumb-style="{ right: '6px', borderRadius: '5px', background: 'rgba(135, 192, 232, 0.44)', width: '5px', opacity: 1 }">
                <div
                    class="col-auto q-pa-sm"
                    v-for="(equipo, index) in 36"
                    :key="index"
                  >
                    <item-card :v-bind="equipo"/>
                </div>
              </q-scroll-area>
            </div>
          </div>
        </div>
      </div>
      <!-- Main container -->
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue'
import HeaderActions from 'src/components/compose/HeaderActions.vue'
import StatusBadge from 'src/components/atomic/StatusBadge.vue'
import BtnAction from 'src/components/atomic/BtnAction.vue'
import ItemCard from 'src/components/atomic/ItemCard.vue'
import BtnSwitch from 'src/components/atomic/BtnSwitch.vue'

export default defineComponent({
  name: 'CalendarPage',
  components: {
    HeaderActions,
    StatusBadge,
    BtnAction,
    ItemCard,
    BtnSwitch
  },
  data () {
    return {
      date: ref('2022/10/24'),
      badges: [
        { color: '#10D13A', text: 'Mantenimientos hechos' },
        { color: '#1C81CB', text: 'Mantenimientos programados' },
        { color: '#FFAA05', text: 'Recordatorios' }
      ],
      btnAction: {
        show: true,
        btnTitle: 'Añadir recordatorio'
      },
      inputSearch: {
        show: true,
        inputLabel: 'Buscar por fecha'
      },
      btnAddPlan: {
        btnTitle: 'Crear un plan de mantenimientos preventivos',
        btnWidth: '100%',
        iconName: null
      }
    }
  }
})
</script>

<style scoped>
.container-colorama {
  background: rgba(202, 227, 244, 0.36);
  border-radius: 5px;
}

.text-subtitle {
  font-style: normal;
  font-weight: 200;
  font-size: 25px;
  font-family: 'Inter';
  color: #1A86D4;
}
</style>
