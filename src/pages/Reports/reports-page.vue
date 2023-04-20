<template>
  <q-page class="flex flex-center cursor-pointer non-selectable">
    <div class="card-page">
      <header-actions :titlePage="'Reportes'" :btnAction="btnAction" :inputSearch="inputSearch" v-model:switch-content="switchContent" />
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
        btnTitle: 'Añadir reporte',
        to: 'add-report'
      },
      inputSearch: {
        show: true,
        inputLabel: 'Buscar por nombre'
      },
      columns: [
        {
          name: 'title_report',
          required: true,
          label: 'Reporte',
          align: 'left',
          field: row => row.title_report,
          format: val => `${val}`,
          sortable: true
        },
        { name: 'encharged_name', label: 'Nombre del encargado', field: 'encharged_name', align: 'left', sortable: true },
        { name: 'date', label: 'Fecha del reporte', field: 'date', align: 'center', sortable: true },
        { name: 'status', label: 'Estatus', field: 'status', align: 'center', sortable: true },
        { name: 'actions', label: 'Acciones', field: 'actions', align: 'center' }
      ],
      rows: [
        {
          id: 1,
          title_report: 'Este es un reporte',
          encharged_name: 'Juan de Dios Balagarde',
          date: '12-Jun-2022',
          status: 'Atendido',
          actions: ''
        },
        {
          id: 2,
          title_report: 'Correctivo',
          encharged_name: 'Luis Andrés Pérez',
          date: '12-Jun-2022',
          status: 'Pendiente',
          actions: ''
        },
        {
          id: 3,
          title_report: 'Este es un reporte',
          encharged_name: 'Juan de Dios Balagarde',
          date: '12-Jun-2022',
          status: 'Atendido',
          actions: ''
        },
        {
          id: 4,
          title_report: 'Correctivo',
          encharged_name: 'Luis Andrés Pérez',
          date: '12-Jun-2022',
          status: 'Pendiente',
          actions: ''
        },
        {
          id: 5,
          title_report: 'Este es un reporte',
          encharged_name: 'Juan de Dios Balagarde',
          date: '12-Jun-2022',
          status: 'Atendido',
          actions: ''
        },
        {
          id: 6,
          title_report: 'Correctivo',
          encharged_name: 'Luis Andrés Pérez',
          date: '12-Jun-2022',
          status: 'Atendido',
          actions: ''
        },
        {
          id: 7,
          title_report: 'Este es un reporte',
          encharged_name: 'Juan de Dios Balagarde',
          date: '12-Jun-2022',
          status: 'Pendiente',
          actions: ''
        },
        {
          id: 8,
          title_report: 'Correctivo',
          encharged_name: 'Luis Andrés Pérez',
          date: '12-Jun-2022',
          status: 'Pendiente',
          actions: ''
        },
        {
          id: 9,
          title_report: 'Este es un reporte',
          encharged_name: 'Juan de Dios Balagarde',
          date: '12-Jun-2022',
          status: 'Atendido',
          actions: ''
        },
        {
          id: 10,
          title_report: 'Correctivo',
          encharged_name: 'Luis Andrés Pérez',
          date: '12-Jun-2022',
          status: 'Atendido',
          actions: ''
        },
        {
          id: 11,
          title_report: 'Este es un reporte',
          encharged_name: 'Juan de Dios Balagarde',
          date: '12-Jun-2022',
          status: 'Atendido',
          actions: ''
        },
        {
          id: 12,
          title_report: 'Correctivo',
          encharged_name: 'Luis Andrés Pérez',
          date: '12-Jun-2022',
          status: 'Atendido',
          actions: ''
        },
        {
          id: 13,
          title_report: 'Este es un reporte',
          encharged_name: 'Juan de Dios Balagarde',
          date: '12-Jun-2022',
          status: 'Atendido',
          actions: ''
        },
        {
          id: 14,
          title_report: 'Correctivo',
          encharged_name: 'Luis Andrés Pérez',
          date: '12-Jun-2022',
          status: 'Atendido',
          actions: ''
        },
        {
          id: 15,
          title_report: 'Este es un reporte',
          encharged_name: 'Ángel Omar Torres Padilla',
          date: '12-Jun-2022',
          status: 'Atendido',
          actions: ''
        },
        {
          id: 16,
          title_report: 'Correctivo',
          encharged_name: 'Luisa Juarez',
          date: '12-Jun-2022',
          status: 'Atendido',
          actions: ''
        },
        {
          id: 17,
          title_report: 'Correctivo',
          encharged_name: 'Luis Andrés Pérez',
          date: '12-Jun-2022',
          status: 'Atendido',
          actions: ''
        },
        {
          id: 18,
          title_report: 'Este es un reporte',
          encharged_name: 'Ángel Omar Torres Padilla',
          date: '12-Jun-2022',
          status: 'Atendido',
          actions: ''
        },
        {
          id: 19,
          title_report: 'Correctivo',
          encharged_name: 'Luisa Juarez',
          date: '12-Jun-2022',
          status: 'Atendido',
          actions: ''
        },
        {
          id: 20,
          title_report: 'Correctivo',
          encharged_name: 'Luis Andrés Pérez',
          date: '12-Jun-2022',
          status: 'Atendido',
          actions: ''
        },
        {
          id: 21,
          title_report: 'Este es un reporte',
          encharged_name: 'Ángel Omar Torres Padilla',
          date: '12-Jun-2022',
          status: 'Atendido',
          actions: ''
        },
        {
          id: 22,
          title_report: 'Correctivo',
          encharged_name: 'Luisa Juarez',
          date: '12-Jun-2022',
          total_cost: '$ 258000',
          status: 'Atendido',
          actions: ''
        }
      ],
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
      ],
      rowSelected: {},
      switchContent: 2
    }
  },
  methods: {
    readMore (payload) {
      console.log('Ver detalle', payload)
      this.$router.push({ name: 'detail-report', params: { id: 100 } })
    },
    edit (payload) {
      console.log('Editar', payload)
      this.$router.push({ name: 'edit-report', params: { id: 100 } })
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
