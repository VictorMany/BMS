<template>
  <q-page class="flex flex-center cursor-pointer non-selectable">
    <div class="card-page">

      <header-actions
        titlePage="Mantenimientos"
        :btnAction="btnAction"
        :btn-close-window="showCloseBtn() ? btnCloseWindow : null"
        :inputSearch="inputSearch"
        v-model:searchModel="searchModel"
      />

      <!-- Main container -->
      <div class="main-container-page">
        <general-table
          v-model:row-selected="rowSelected"
          :height="'100%'"
          :rows="maintenances"
          :loading="loading"
          :columns="columns"
          :actions-table="actionsTable"
          :pagination-prop="pagination"
          @change-pagination="changePagination"
        />
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
    GeneralTable,
  },
  data() {
    return {
      delaySearch: 300,
      searchModel: null,
      timeoutSearch: null,
      loading: true,

      localPagination: {},

      btnAction: {
        show: true,
        btnTitle: 'Agregar mantenimiento',
        tooltip: 'Agregar nuevo mantenimiento',
        btnAction: this.goToAddMaintenance,
        btnWidth: 'auto'
      },

      btnCloseWindow: {
        iconName: 'exit_to_app',
        btnBackground: '#FF990020',
        btnColor: '#FF9900',
        btnAction: this.goBack,
        shouldHide: this.$route.query?.equipment || this.$route.query?.user
      },

      columns: [

        { name: 'encharged_name', label: 'Nombre del encargado', field: 'encharged_name', align: 'left', sortable: true },
        { name: 'total_cost', label: 'Costo', field: 'total_cost', align: 'center', sortable: true },
        { name: 'date', label: 'Fecha de mantenimiento', field: 'date', align: 'center', sortable: true },
        // { name: 'status', label: 'Estatus', field: 'status', align: 'center', sortable: true },
        {
          name: 'status',
          required: true,
          label: 'Tipo',
          align: 'center',
          field: row => row.status,
          sortable: true
        },
        { name: 'actions', label: 'Acciones', field: 'actions', align: 'center' }
      ],

      actionsTable: [
        {
          icnName: 'read_more',
          icnSize: 'sm',
          icnAction: 'Detail',
          tooltip: 'Detalle de mantenimiento',
        }
      ],

      rowSelected: {},

      selectedFilterText: 'reason',

      inputSearch: {
        show: true,
        inputLabel: 'Motivo',
        setSelectedFilter: this.setSelectedFilter,
        setSelectedOptionFilter: this.setSelectedOptionFilter,
        heightModal: 250,
        items: [
          {
            title: 'Motivo',
            filter: 'reason',
            icon: 'report'
          },
          {
            title: 'Tipo',
            icon: 'engineering',
            options: [
              {
                title: 'Correctivo',
                filter: 'maintenanceType',
                value: 'Correctivo',
              },
              {
                title: 'Preventivo',
                filter: 'maintenanceType',
                value: 'Preventivo',
              }
            ]
          },
          {
            title: 'Encargado',
            filter: 'userName',
            icon: 'supervisor_account'
          },
          {
            title: 'Costo mínimo',
            filter: 'minCost',
            icon: 'payments'
          },
          {
            title: 'Costo máximo',
            filter: 'maxCost',
            icon: 'payments'
          }
        ],
      },

      params: {
        reason: '',
      },
    }
  },

  mounted() {
    if (this.$route.query.equipment) {
      this.params.IdEquipment = this.$route.query.equipment
    } else if (this.$route.query.user) {
      this.params.userId = this.$route.query.user
    }

    this.getMaintenances()
  },

  watch: {
    rowSelected: {
      handler(val) {
        if (val.action === 'Detail') {
          this.goToDetails(val.id);
        }
      },
      deep: true,
    },

    searchModel(val) {
      this.params[this.selectedFilterText] = val
      clearTimeout(this.timeoutSearch);
      this.timeoutSearch = setTimeout(() => {
        this.getMaintenances();
      }, this.delaySearch);
    },
  },

  computed: {
    maintenances: {
      get() {
        return this.$store.getters['maintenances/getMaintenancesGetter'];
      },
    },

    pagination: {
      get() {
        return this.$store.getters['maintenances/getPaginationGetter'];
      },
    },
  },

  methods: {
    async getMaintenances() {
      this.loading = true
      await this.$store.dispatch('maintenances/getMaintenancesAction', this.params);
      this.loading = false
    },

    goToAddMaintenance() {
      // Delete from the LOCAL STORAGE IF EXIST
      if (!this.$route.query.equipment) {
        this.$store.commit('equipments/MUTATE_EQUIPMENT', null)
        this.$store.commit('reports/MUTATE_REPORT', null)
      }

      this.$router.push({
        name: 'add-maintenance'
      })
    },

    showCloseBtn() {
      return this.$route.query?.equipment || this.$route.query?.user
    },

    goToDetails(payload) {
      this.$router.push({ name: 'detail-maintenance', params: { id: payload } });
    },

    setSelectedFilter(opt) {
      if (this.selectedFilterText) {
        delete this.params[this.selectedFilterText]
        if (this.searchModel) {
          this.getMaintenances();
        }
      }

      this.selectedFilterText = opt.filter
      this.inputSearch.inputLabel = opt.title;

      if (opt.value && opt.filter) {
        this.params[opt.filter] = this.searchModel
        this.getMaintenances();
      }
    },

    setSelectedOptionFilter(activeFilters, removedFilter = null) {
      if (activeFilters.length) {
        activeFilters.forEach(item => {
          this.params[item.filter] = item.value
        })
      }
      if (removedFilter) {
        delete this.params[removedFilter]
      }
      this.getMaintenances();
    },

    changePagination(pagination) {
      this.params = {
        ...this.params, ...{
          page: pagination.page,
          rowsPerPage: pagination.rowsPerPage,
        }
      }

      this.getMaintenances();
    },

    goBack() {
      this.$router.go(-1);
    },
  },
})
</script>
