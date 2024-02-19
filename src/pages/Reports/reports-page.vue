<template>
  <q-page class="flex flex-center cursor-pointer non-selectable">
    <div class="card-page">
      <!-- <div
        v-if="this.$route.query.equipment"
        class="column items-end q-mb-xs not-show-in-mobile"
      >
        <btn-action v-bind="btnCloseWindow" />
      </div> -->

      <header-actions
        titlePage="Reportes"
        :btnAction="btnAction"
        :inputSearch="inputSearch"
        :btn-close-window="showCloseBtn() ? btnCloseWindow : null"
        v-model:searchModel="searchModel"
      />
      <!-- Main container -->
      <div class="main-container-page">
        <general-table
          v-model:row-selected="rowSelected"
          :height="'100%'"
          :rows="reports"
          :columns="columns"
          :loading="loading"
          :actions-table="actionsTable"
          :pagination-prop="localPagination"
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
  name: 'ReportsPage',
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

      btnCloseWindow: {
        iconName: 'exit_to_app',
        btnBackground: '#FF990020',
        btnColor: '#FF9900',
        btnAction: this.goBack
      },

      btnAction: {
        show: true,
        btnTitle: 'Agregar reporte',
        tooltip: 'Agregar nuevo reporte',
        btnAction: this.goToAddReport,
        btnWidth: 'auto'
      },

      actionsTable: [
        {
          icnName: 'read_more',
          icnSize: 'sm',
          icnAction: 'Detail',
          tooltip: 'Detalle de reporte',
        },
        {
          icnName: 'engineering',
          icnSize: 'xs',
          icnAction: 'Maintenance',
          tooltip: 'Atender reporte',
          // hidden: row => !row.isReported
        },
      ],

      rowSelected: {},

      selectedFilterText: 'reason',

      inputSearch: {
        show: true,
        inputLabel: 'Buscar por reporte',
        setSelectedFilter: this.setSelectedFilter,
        setSelectedOptionFilter: this.setSelectedOptionFilter,
        heightModal: 160,
        items: [
          {
            title: 'Buscar por reporte',
            icon: 'bug_report',
            filter: 'reason'
          },
          {
            title: 'Encargado',
            icon: 'supervisor_account',
            filter: 'userName'
          },
          {
            title: 'Estatus',
            icon: 'engineering',
            options: [
              {
                title: 'Resuelto',
                filter: 'reportStatus',
                value: 'Resuelto'
              },
              {
                title: 'Pendiente',
                filter: 'reportStatus',
                value: 'Pendiente'
              },
              {
                title: 'Cancelado',
                filter: 'reportStatus',
                value: 'Cancelado'
              }
            ]
          }
        ]
      },

      params: {
        reason: '',
      },

      columns: [
        { name: 'reason', required: true, label: 'Reporte', align: 'left', field: row => row.reason, format: val => `${val}`, sortable: true },
        { name: 'encharged_name', label: 'Encargado', field: 'encharged_name', align: 'left', sortable: true },
        { name: 'reportUrgency', label: 'Prioridad', field: 'reportUrgency', align: 'left', sortable: true },
        { name: 'date', label: 'Fecha del reporte', field: 'date', align: 'center', sortable: true },
        { name: 'status', label: 'Estatus', field: 'status', align: 'center', sortable: true },
        { name: 'actions', label: 'Acciones', field: 'actions', align: 'center' }
      ]
    }
  },

  mounted() {
    if (this.$route.query.equipment) {
      this.params.IdEquipment = this.$route.query.equipment
    } else if (this.$route.query.user) {
      this.params.userId = this.$route.query.user
    }
    this.getReports()
  },

  watch: {
    rowSelected: {
      handler(val) {
        if (val.action === 'Detail') {
          this.goToDetails(val.id);
        } else if (val.action === 'Maintenance') {
          this.goToMaintenance(val.id);
        }
      },
      deep: true,
    },

    searchModel(val) {
      this.params[this.selectedFilterText] = val

      clearTimeout(this.timeoutSearch);

      this.timeoutSearch = setTimeout(() => {
        this.getReports();
      }, this.delaySearch);
    },
  },

  computed: {
    reports: {
      get() {
        return this.$store.getters['reports/getReportsGetter'];
      },
    },
  },

  methods: {
    async getReports() {
      this.loading = true
      this.localPagination = {
        ...this.localPagination,
        ...await this.$store.dispatch('reports/getReportsAction', this.params)
      }
      this.loading = false
    },

    showCloseBtn() {
      return this.$route.query.equipment
    },

    goToAddReport() {
      // Delete from the LOCAL STORAGE IF EXIST
      if (!this.$route.query.equipment) {
        this.$store.commit('equipments/MUTATE_EQUIPMENT', null)
      }

      this.$router.push({
        name: 'add-report'
      })
    },

    goBack() {
      this.$router.go(-1);
    },

    goToDetails(payload) {
      this.$router.push({ name: 'detail-report', params: { id: payload } });
    },

    async goToMaintenance(payload) {
      // Delete from the LOCAL STORAGE IF EXIST
      this.$store.commit('equipments/MUTATE_EQUIPMENT', null)

      const report = JSON.parse(JSON.stringify(this.reports.find(e => e.id == payload)))

      report.Equipment.categoryName += ` - ${report.Equipment.equipmentModel} - No. serie: ${report.Equipment.serialNumber}`

      this.$store.commit('reports/MUTATE_REPORT', report)

      this.$router.push({
        name: 'add-maintenance'
      });
    },

    goToEdit(payload) {
      this.$router.push({ name: 'edit-report', params: { id: payload } });
    },

    setSelectedFilter(opt) {
      // IF CHANGE THE MODEL SELECTED
      if (this.selectedFilterText) {
        delete this.params[this.selectedFilterText]
        if (this.searchModel) {
          this.getReports();
        }
      }

      this.selectedFilterText = opt.filter
      this.inputSearch.inputLabel = opt.title;

      if (opt.value && opt.filter) {
        this.params[opt.filter] = this.searchModel
        this.getReports();
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
      this.getReports();
    },

    changePagination(pagination) {
      this.params = {
        ...this.params, ...{
          page: pagination.page,
          rowsPerPage: pagination.rowsPerPage,
        }
      }

      this.getReports();
    }
  },
})
</script>
