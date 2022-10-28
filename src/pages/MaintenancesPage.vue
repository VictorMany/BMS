<template>
  <q-page class="flex flex-center cursor-pointer non-selectable">
    <div class="card-page">
      <header-actions :titlePage="'Mantenimientos'" :btnAction="btnAction" :inputSearch="inputSearch" />
      <div class="row justify-end">
        <btn-switch />
      </div>
      <div class="main-container-page" style="height: 90%;">
        <!-- Main container -->
        <q-table
          class="table-style font-style my-sticky-header-table"
          :rows="rows"
          :columns="columns"
          row-key="id"
          v-model:pagination="pagination"
          hide-pagination
          >
          <template v-slot:header="props">
            <q-tr :props="props">
              <q-th
                v-for="col in props.cols"
                :key="col.name"
                :props="props"
                class="column-style"
              >
                {{ col.label }}
              </q-th>
            </q-tr>
          </template>
          <template  v-slot:body-cell-actions="props">
            <q-td :props="props">
                <q-icon size="sm" name="read_more" class="icon-style q-pr-xs" />
                <q-icon size="xs" name="edit" class="icon-style"/>
            </q-td>
          </template>
        </q-table>
          <div class="row justify-center">
            <q-pagination
              v-model="pagination.page"
              class="pagination-style"
              :max="pagesNumber"
              size="md"
            />
          </div>
        <!-- Main container -->
      </div>

    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref, computed } from 'vue'
import HeaderActions from 'src/components/compose/HeaderActions.vue'
import BtnSwitch from 'src/components/atomic/BtnSwitch.vue'
const columns = [
  {
    name: 'type_mainteinance',
    required: true,
    label: 'Tipo de mantenimiento',
    align: 'left',
    field: row => row.name,
    format: val => `${val}`,
    sortable: true
  },
  { name: 'encharged_name', label: 'Nombre del encargado', field: 'encharged_name', align: 'left' },
  { name: 'date', label: 'Fecha de mantenimiento', field: 'date', align: 'center' },
  { name: 'total_cost', label: 'Gasto total', field: 'total_cost', align: 'center' },
  { name: 'actions', label: 'Acciones', field: 'actions', align: 'center' }
]

const rows = [
  {
    id: 1,
    name: 'Preventivo',
    encharged_name: 'Juan de Dios Balagarde',
    date: '12-Jun-2022',
    total_cost: '$ 2000',
    actions: '+  -'
  },
  {
    id: 2,
    name: 'Correctivo',
    encharged_name: 'Luis Andrés Pérez',
    date: '12-Jun-2022',
    total_cost: '$ 2000',
    actions: '+  -'
  },
  {
    id: 3,
    name: 'Preventivo',
    encharged_name: 'Juan de Dios Balagarde',
    date: '12-Jun-2022',
    total_cost: '$ 2000',
    actions: '+  -'
  },
  {
    id: 4,
    name: 'Correctivo',
    encharged_name: 'Luis Andrés Pérez',
    date: '12-Jun-2022',
    total_cost: '$ 2000',
    actions: '+  -'
  },
  {
    id: 5,
    name: 'Preventivo',
    encharged_name: 'Juan de Dios Balagarde',
    date: '12-Jun-2022',
    total_cost: '$ 2000',
    actions: '+  -'
  },
  {
    id: 6,
    name: 'Correctivo',
    encharged_name: 'Luis Andrés Pérez',
    date: '12-Jun-2022',
    total_cost: '$ 2000',
    actions: '+  -'
  },
  {
    id: 7,
    name: 'Preventivo',
    encharged_name: 'Juan de Dios Balagarde',
    date: '12-Jun-2022',
    total_cost: '$ 2000',
    actions: '+  -'
  },
  {
    id: 8,
    name: 'Correctivo',
    encharged_name: 'Luis Andrés Pérez',
    date: '12-Jun-2022',
    total_cost: '$ 2000',
    actions: '+  -'
  },
  {
    id: 9,
    name: 'Preventivo',
    encharged_name: 'Juan de Dios Balagarde',
    date: '12-Jun-2022',
    total_cost: '$ 2000',
    actions: '+  -'
  },
  {
    id: 10,
    name: 'Correctivo',
    encharged_name: 'Luis Andrés Pérez',
    date: '12-Jun-2022',
    total_cost: '$ 2000',
    actions: '+  -'
  },
  {
    id: 11,
    name: 'Preventivo',
    encharged_name: 'Juan de Dios Balagarde',
    date: '12-Jun-2022',
    total_cost: '$ 2000',
    actions: '+  -'
  },
  {
    id: 12,
    name: 'Correctivo',
    encharged_name: 'Luis Andrés Pérez',
    date: '12-Jun-2022',
    total_cost: '$ 2000',
    actions: '+  -'
  },
  {
    id: 13,
    name: 'Preventivo',
    encharged_name: 'Juan de Dios Balagarde',
    date: '12-Jun-2022',
    total_cost: '$ 2000',
    actions: '+  -'
  },
  {
    id: 14,
    name: 'Correctivo',
    encharged_name: 'Luis Andrés Pérez',
    date: '12-Jun-2022',
    total_cost: '$ 2000',
    actions: '+  -'
  },
  {
    id: 15,
    name: 'Preventivo',
    encharged_name: 'Ángel Omar Torres Padilla',
    date: '12-Jun-2022',
    total_cost: '$ 2000',
    actions: '+  -'
  },
  {
    id: 16,
    name: 'Correctivo',
    encharged_name: 'Luisa Juarez',
    date: '12-Jun-2022',
    total_cost: '$ 2000',
    actions: '+  -'
  },
  {
    id: 17,
    name: 'Correctivo',
    encharged_name: 'Luis Andrés Pérez',
    date: '12-Jun-2022',
    total_cost: '$ 2000',
    actions: '+  -'
  },
  {
    id: 18,
    name: 'Preventivo',
    encharged_name: 'Ángel Omar Torres Padilla',
    date: '12-Jun-2022',
    total_cost: '$ 2000',
    actions: '+  -'
  },
  {
    id: 19,
    name: 'Correctivo',
    encharged_name: 'Luisa Juarez',
    date: '12-Jun-2022',
    total_cost: '$ 2000',
    actions: '+  -'
  },
  {
    id: 20,
    name: 'Correctivo',
    encharged_name: 'Luis Andrés Pérez',
    date: '12-Jun-2022',
    total_cost: '$ 2000',
    actions: '+  -'
  },
  {
    id: 21,
    name: 'Preventivo',
    encharged_name: 'Ángel Omar Torres Padilla',
    date: '12-Jun-2022',
    total_cost: '$ 2000',
    actions: '+  -'
  },
  {
    id: 22,
    name: 'Correctivo',
    encharged_name: 'Luisa Juarez',
    date: '12-Jun-2022',
    total_cost: '$ 258000',
    actions: '+  -'
  }
]

export default defineComponent({
  name: 'MaintenancesPage',
  components: {
    HeaderActions,
    BtnSwitch
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
      }
    }
  },
  setup () {
    const pagination = ref({
      descending: false,
      page: 1,
      rowsPerPage: 10
      // rowsNumber: xx if getting data from a server
    })
    return {
      columns,
      rows,
      pagination,
      pagesNumber: computed(() => Math.ceil(rows.length / pagination.value.rowsPerPage))
    }
  }
})
</script>

<style scoped>
.table-style {
  height: 90%;
  background-color: #ffffff00;
  box-shadow: none;
}
.pagination-style {
  color: #017ED9;
}

.font-style {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 500;
  color: #000000;
}
.column-style {
  font-family: 'Inter';
  font-style: normal;
  font-size: 13px;
  font-weight: 600;
  color: #4d4d4d;
}

.icon-style {
  color: #017ED9;
}

.my-sticky-header-table {
  /* height or max-height is important */
  height: 90%;
  /* this is when the loading indicator appears */ }
  .my-sticky-header-table .q-table__top,
  .my-sticky-header-table .q-table__bottom,
  .my-sticky-header-table thead tr:first-child th {
    /* bg color is important for th; just specify one */
    background-color: #C6DFF1; }
  .my-sticky-header-table thead tr th {
    position: sticky;
    z-index: 1; }
  .my-sticky-header-table thead tr:first-child th {
    top: 0; }
  .my-sticky-header-table.q-table--loading thead tr:last-child th {
    /* height of all previous header rows */
    top: 48px; }

</style>
