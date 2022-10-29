<template>
  <q-page class="flex flex-center cursor-pointer non-selectable">
    <div class="card-page">
      <header-actions :titlePage="'Mantenimientos'" :btnAction="btnAction" :inputSearch="inputSearch" />
      <div class="row justify-end">
        <btn-switch v-model:switch-content="switchContent" />
      </div>
      <!-- Main container -->
      <div class="main-container-page" style="height: 88%; overflow-y: hidden;">
        <general-table :rows="rows" :columns="columns" :actions-table="actionsTable" v-model:row-selected="rowSelected" />
      </div>
      <!-- Main container -->
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import HeaderActions from 'src/components/compose/HeaderActions.vue'
import BtnSwitch from 'src/components/atomic/BtnSwitch.vue'
import GeneralTable from 'src/components/compose/GeneralTable.vue'
export default defineComponent({
  name: 'MaintenancesPage',
  components: {
    HeaderActions,
    BtnSwitch,
    GeneralTable
  },
  data () {
    return {
      btnAction: {
        show: true,
        btnTitle: 'Añadir mantenimiento'
      },
      inputSearch: {
        show: true,
        inputLabel: 'Buscar por tipo'
      },
      columns: [
        {
          name: 'type_maintenance',
          required: true,
          label: 'Tipo de mantenimiento',
          align: 'left',
          field: row => row.type_maintenance,
          format: val => `${val}`,
          sortable: true
        },
        { name: 'encharged_name', label: 'Nombre del encargado', field: 'encharged_name', align: 'left', sortable: true },
        { name: 'date', label: 'Fecha de mantenimiento', field: 'date', align: 'center', sortable: true },
        { name: 'total_cost', label: 'Gasto total', field: 'total_cost', align: 'center', sortable: true },
        { name: 'actions', label: 'Acciones', field: 'actions', align: 'center' }
      ],
      rows: [
        {
          id: 1,
          type_maintenance: 'Preventivo',
          encharged_name: 'Juan de Dios Balagarde',
          date: '12-Jun-2022',
          total_cost: '$ 2000',
          actions: ''
        },
        {
          id: 2,
          type_maintenance: 'Correctivo',
          encharged_name: 'Luis Andrés Pérez',
          date: '12-Jun-2022',
          total_cost: '$ 2000',
          actions: '+  -'
        },
        {
          id: 3,
          type_maintenance: 'Preventivo',
          encharged_name: 'Juan de Dios Balagarde',
          date: '12-Jun-2022',
          total_cost: '$ 2000',
          actions: '+  -'
        },
        {
          id: 4,
          type_maintenance: 'Correctivo',
          encharged_name: 'Luis Andrés Pérez',
          date: '12-Jun-2022',
          total_cost: '$ 2000',
          actions: '+  -'
        },
        {
          id: 5,
          type_maintenance: 'Preventivo',
          encharged_name: 'Juan de Dios Balagarde',
          date: '12-Jun-2022',
          total_cost: '$ 2000',
          actions: '+  -'
        },
        {
          id: 6,
          type_maintenance: 'Correctivo',
          encharged_name: 'Luis Andrés Pérez',
          date: '12-Jun-2022',
          total_cost: '$ 2000',
          actions: '+  -'
        },
        {
          id: 7,
          type_maintenance: 'Preventivo',
          encharged_name: 'Juan de Dios Balagarde',
          date: '12-Jun-2022',
          total_cost: '$ 2000',
          actions: '+  -'
        },
        {
          id: 8,
          type_maintenance: 'Correctivo',
          encharged_name: 'Luis Andrés Pérez',
          date: '12-Jun-2022',
          total_cost: '$ 2000',
          actions: '+  -'
        },
        {
          id: 9,
          type_maintenance: 'Preventivo',
          encharged_name: 'Juan de Dios Balagarde',
          date: '12-Jun-2022',
          total_cost: '$ 2000',
          actions: '+  -'
        },
        {
          id: 10,
          type_maintenance: 'Correctivo',
          encharged_name: 'Luis Andrés Pérez',
          date: '12-Jun-2022',
          total_cost: '$ 2000',
          actions: '+  -'
        },
        {
          id: 11,
          type_maintenance: 'Preventivo',
          encharged_name: 'Juan de Dios Balagarde',
          date: '12-Jun-2022',
          total_cost: '$ 2000',
          actions: '+  -'
        },
        {
          id: 12,
          type_maintenance: 'Correctivo',
          encharged_name: 'Luis Andrés Pérez',
          date: '12-Jun-2022',
          total_cost: '$ 2000',
          actions: '+  -'
        },
        {
          id: 13,
          type_maintenance: 'Preventivo',
          encharged_name: 'Juan de Dios Balagarde',
          date: '12-Jun-2022',
          total_cost: '$ 2000',
          actions: '+  -'
        },
        {
          id: 14,
          type_maintenance: 'Correctivo',
          encharged_name: 'Luis Andrés Pérez',
          date: '12-Jun-2022',
          total_cost: '$ 2000',
          actions: '+  -'
        },
        {
          id: 15,
          type_maintenance: 'Preventivo',
          encharged_name: 'Ángel Omar Torres Padilla',
          date: '12-Jun-2022',
          total_cost: '$ 2000',
          actions: '+  -'
        },
        {
          id: 16,
          type_maintenance: 'Correctivo',
          encharged_name: 'Luisa Juarez',
          date: '12-Jun-2022',
          total_cost: '$ 2000',
          actions: '+  -'
        },
        {
          id: 17,
          type_maintenance: 'Correctivo',
          encharged_name: 'Luis Andrés Pérez',
          date: '12-Jun-2022',
          total_cost: '$ 2000',
          actions: '+  -'
        },
        {
          id: 18,
          type_maintenance: 'Preventivo',
          encharged_name: 'Ángel Omar Torres Padilla',
          date: '12-Jun-2022',
          total_cost: '$ 2000',
          actions: '+  -'
        },
        {
          id: 19,
          type_maintenance: 'Correctivo',
          encharged_name: 'Luisa Juarez',
          date: '12-Jun-2022',
          total_cost: '$ 2000',
          actions: '+  -'
        },
        {
          id: 20,
          type_maintenance: 'Correctivo',
          encharged_name: 'Luis Andrés Pérez',
          date: '12-Jun-2022',
          total_cost: '$ 2000',
          actions: '+  -'
        },
        {
          id: 21,
          type_maintenance: 'Preventivo',
          encharged_name: 'Ángel Omar Torres Padilla',
          date: '12-Jun-2022',
          total_cost: '$ 2000',
          actions: '+  -'
        },
        {
          id: 22,
          type_maintenance: 'Correctivo',
          encharged_name: 'Luisa Juarez',
          date: '12-Jun-2022',
          total_cost: '$ 258000',
          actions: '+  -'
        }
      ],
      rowSelected: {},
      switchContent: 2,
      actionsTable: [
        {
          icnName: 'read_more',
          icnColor: '#017ED9',
          icnSize: 'sm',
          icnAction: 'Detail'
        },
        {
          icnName: 'edit',
          icnColor: '#017ED9',
          icnSize: 'xs',
          icnAction: 'Edit'
        }
      ]
    }
  },

  methods: {
    readMore (payload) {
      console.log('Ver detalle', payload)
    },
    edit (payload) {
      console.log('Editar', payload)
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
