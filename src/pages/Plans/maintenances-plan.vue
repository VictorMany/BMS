<template>
  <q-page class="flex flex-center cursor-pointer non-selectable">
    <div class="card-page">
      <header-actions
        :titlePage="'Planes de mantenimientos'"
        :btnAction="btnAction"
        :inputSearch="inputSearch"
        v-model:switch-content="switchContent" />
      <!-- Main container -->
      <div class="main-container-page" style="height: 88%; overflow-y: hidden;">
        <q-scroll-area class="full-height" :thumb-style="{ borderRadius: '5px', background: 'rgba(135, 192, 232, 0.44)', width: '5px', opacity: 1 }">
          <div
            style="max-width: 100%" class="full-height">
              <general-table :rows="rows" :columns="columns" :actions-table="actionsTable" v-model:row-selected="rowSelected" />
          </div>
        </q-scroll-area>
      </div>
      <!-- Main container -->
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import HeaderActions from 'src/components/compose/HeaderActions.vue'
import GeneralTable from 'src/components/compose/GeneralTable.vue'
export default defineComponent({
  name: 'MaintenancesPage',
  components: {
    HeaderActions,
    GeneralTable
  },
  data () {
    return {
      btnAction: {
        show: true,
        btnTitle: 'Crear plan',
        to: 'add-maintenance-plan',
        btnWidth: 'auto'
      },
      inputSearch: {
        show: true,
        inputLabel: 'Buscar por nombre'
      },
      columns: [
        {
          name: 'plan_name',
          required: true,
          label: 'Nombre del plan',
          align: 'left',
          field: row => row.plan_name,
          format: val => `${val}`,
          sortable: true
        },
        { name: 'incharged', label: 'Encargado', field: 'incharged', align: 'center', sortable: true },
        { name: 'initial_date', label: 'Fecha', field: 'initial_date', align: 'left', sortable: true },
        { name: 'actions', label: 'Acciones', field: 'actions', align: 'center' }
      ],
      rows: [
        {
          id: 1,
          plan_name: 'PM-01 EQUIPOS PRIMERA NECESIDAD',
          initial_date: '21-Feb-2022',
          incharged: 'Victor Manuel Velázquez Fuentes',
          actions: ''
        },
        {
          id: 2,
          plan_name: 'PM-02 EQUIPOS PRIMERA NECESIDAD',
          initial_date: '21-Feb-2022',
          incharged: 'Victor Manuel Velázquez Fuentes',
          actions: ''
        },
        {
          id: 3,
          plan_name: 'PM-01 EQUIPOS PRIMERA NECESIDAD',
          initial_date: '21-Feb-2022',
          incharged: 'Victor Manuel Velázquez Fuentes',
          actions: ''
        },
        {
          id: 4,
          plan_name: 'PM-02 EQUIPOS PRIMERA NECESIDAD',
          initial_date: '21-Feb-2022',
          incharged: 'Victor Manuel Velázquez Fuentes',
          actions: ''
        },
        {
          id: 5,
          plan_name: 'PM-01 EQUIPOS PRIMERA NECESIDAD',
          initial_date: '21-Feb-2022',
          incharged: 'Victor Manuel Velázquez Fuentes',
          actions: ''
        },
        {
          id: 6,
          plan_name: 'PM-02 EQUIPOS PRIMERA NECESIDAD',
          initial_date: '21-Feb-2022',
          incharged: 'Victor Manuel Velázquez Fuentes',
          actions: ''
        },
        {
          id: 7,
          plan_name: 'PM-01 EQUIPOS PRIMERA NECESIDAD',
          initial_date: '21-Feb-2022',
          incharged: 'Victor Manuel Velázquez Fuentes',
          actions: ''
        },
        {
          id: 8,
          plan_name: 'PM-02 EQUIPOS PRIMERA NECESIDAD',
          initial_date: '21-Feb-2022',
          incharged: 'Victor Manuel Velázquez Fuentes',
          actions: ''
        },
        {
          id: 9,
          plan_name: 'PM-01 EQUIPOS PRIMERA NECESIDAD',
          initial_date: '21-Feb-2022',
          incharged: 'Victor Manuel Velázquez Fuentes',
          actions: ''
        },
        {
          id: 10,
          plan_name: 'PM-02 EQUIPOS PRIMERA NECESIDAD',
          initial_date: '21-Feb-2022',
          incharged: 'Victor Manuel Velázquez Fuentes',
          actions: ''
        },
        {
          id: 11,
          plan_name: 'PM-01 EQUIPOS PRIMERA NECESIDAD',
          initial_date: '21-Feb-2022',
          incharged: 'Victor Manuel Velázquez Fuentes',
          actions: ''
        },
        {
          id: 12,
          plan_name: 'PM-02 EQUIPOS PRIMERA NECESIDAD',
          initial_date: '21-Feb-2022',
          incharged: 'Victor Manuel Velázquez Fuentes',
          actions: ''
        },
        {
          id: 13,
          plan_name: 'PM-01 EQUIPOS PRIMERA NECESIDAD',
          initial_date: '21-Feb-2022',
          incharged: 'Victor Manuel Velázquez Fuentes',
          actions: ''
        },
        {
          id: 14,
          plan_name: 'PM-02 EQUIPOS PRIMERA NECESIDAD',
          initial_date: '21-Feb-2022',
          incharged: 'Victor Manuel Velázquez Fuentes',
          actions: ''
        },
        {
          id: 15,
          plan_name: 'PM-01 EQUIPOS PRIMERA NECESIDAD',
          initial_date: '23-Feb-2023',
          incharged: 'Victor Manuel Velázquez Fuentes',
          actions: ''
        },
        {
          id: 16,
          plan_name: 'PM-02 EQUIPOS PRIMERA NECESIDAD',
          initial_date: '24-Feb-2023',
          incharged: 'Victor Manuel Velázquez Fuentes',
          actions: ''
        },
        {
          id: 17,
          plan_name: 'PM-02 EQUIPOS PRIMERA NECESIDAD',
          initial_date: '21-Feb-2022',
          incharged: 'Victor Manuel Velázquez Fuentes',
          actions: ''
        },
        {
          id: 18,
          plan_name: 'PM-01 EQUIPOS PRIMERA NECESIDAD',
          initial_date: '23-Feb-2023',
          incharged: 'Victor Manuel Velázquez Fuentes',
          actions: ''
        },
        {
          id: 19,
          plan_name: 'PM-02 EQUIPOS PRIMERA NECESIDAD',
          initial_date: '24-Feb-2023',
          incharged: 'Victor Manuel Velázquez Fuentes',
          actions: ''
        },
        {
          id: 20,
          plan_name: 'PM-02 EQUIPOS PRIMERA NECESIDAD',
          initial_date: '21-Feb-2022',
          incharged: 'Victor Manuel Velázquez Fuentes',
          actions: ''
        },
        {
          id: 21,
          plan_name: 'PM-01 EQUIPOS PRIMERA NECESIDAD',
          initial_date: '23-Feb-2023',
          incharged: 'Victor Manuel Velázquez Fuentes',
          actions: ''
        },
        {
          id: 20,
          plan_name: 'PM-02 EQUIPOS PRIMERA NECESIDAD',
          initial_date: '21-Feb-2022',
          incharged: 'Victor Manuel Velázquez Fuentes',
          actions: ''
        },
        {
          id: 21,
          plan_name: 'PM-01 EQUIPOS PRIMERA NECESIDAD',
          initial_date: '23-Feb-2023',
          incharged: 'Victor Manuel Velázquez Fuentes',
          actions: ''
        }
      ],
      rowSelected: {},
      switchContent: 2,
      actionsTable: [
        {
          icnName: 'read_more',
          icnSize: 'sm',
          icnAction: 'Detail'
        },
        {
          icnName: 'edit',
          icnSize: 'xs',
          icnAction: 'Edit'
        }
      ]
    }
  },

  methods: {
    readMore (payload) {
      console.log('Ver detalle', payload)
      this.$router.push({ name: 'detail-maintenance-plan', params: { id: 100 } })
    },
    edit (payload) {
      console.log('Editar', payload)
      this.$router.push({ name: 'add-maintenance-plan', params: { id: 100 } })
    }
  },
  watch: {
    rowSelected: {
      handler (val) {
        if (val.action === 'Edit') {
          this.edit(val.id)
        } else if (val.action === 'Detail') {
          this.readMore(val.id)
        }
      },
      deep: true
    },
    switchContent: {
      handler (val) {
        if (val === 1) {
          console.log('Show cards')
        } else if (val === 2) {
          console.log('Show table')
        }
      },
      deep: true
    }
  }
})
</script>
