<template>
  <q-page class="flex flex-center cursor-pointer non-selectable">
    <div class="card-page">
      <div
        v-if="this.$route.query?.equipment || this.$route.query?.user"
        class="column items-end q-mb-xs"
      >
        <btn-action v-bind="btnCloseWindow" />
      </div>

      <header-actions
        :titlePage="'Planes de mantenimientos'"
        :btnAction="btnAction"
        :inputSearch="inputSearch"
        v-model:searchModel="searchModel"
      />
      <!-- Main container -->
      <div
        class="main-container-page"
        style="height: 88%; overflow-y: hidden;"
      >
        <general-table
          v-model:row-selected="rowSelected"
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
import BtnAction from 'src/components/atomic/BtnAction.vue';

export default defineComponent({
  name: 'MaintenancesPage',
  components: {
    HeaderActions,
    GeneralTable,
    BtnAction
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
        btnTitle: 'Añadir plan de mantenimiento',
        to: 'add-maintenance',
        btnWidth: 'auto'
      },

      btnCloseWindow: {
        iconName: 'close',
        btnBackground: '#FF9900',
        btnColor: '#FFFFFF',
        btnSize: 'xs',
        btnAction: this.goBack,
      },

      columns: [
        {
          name: 'planName',
          required: true,
          label: 'Nombre del plan',
          align: 'left',
          field: row => row.planName,
          format: val => `${val}`,
          sortable: true
        },
        { name: 'encharged_name', label: 'Nombre del encargado', field: 'encharged_name', align: 'left', sortable: true },
        { name: 'date', label: 'Fecha de creación', field: 'date', align: 'center', sortable: true },
        { name: 'actions', label: 'Acciones', field: 'actions', align: 'center' }
      ],

      actionsTable: [
        {
          icnName: 'read_more',
          icnSize: 'sm',
          icnAction: 'Detail'
        }
      ],

      rowSelected: {},

      selectedFilterText: 'planName',

      inputSearch: {
        show: true,
        inputLabel: 'Buscar por nombre',
        setSelectedFilter: this.setSelectedFilter,
        setSelectedOptionFilter: this.setSelectedOptionFilter,
        heightModal: 200,
        items: [
          {
            title: 'Nombre del plan',
            filter: 'planName',
            icon: 'supervisor_account'
          }
        ],
      },

      params: {
        planName: '',
      },
    }
  },

  mounted() {
    this.getMaintenancesPlan()
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
        this.getMaintenancesPlan();
      }, this.delaySearch);
    },
  },

  computed: {
    maintenancesPlan: {
      get() {
        return this.$store.getters['maintenances/getMaintenancesPlanGetter'];
      },
    },

    pagination: {
      get() {
        return this.$store.getters['maintenances/getPaginationPlanGetter'];
      },
    },
  },

  methods: {
    async getMaintenancesPlan() {
      this.loading = true
      await this.$store.dispatch('maintenances/getMaintenancesPlanAction', this.params);
      this.loading = false
    },

    goToDetails(payload) {
      this.$router.push({ name: 'detail-maintenance-plan', params: { id: payload } });
    },

    setSelectedFilter(opt) {
      if (this.selectedFilterText) {
        delete this.params[this.selectedFilterText]
        if (this.searchModel) {
          this.getMaintenancesPlan();
        }
      }

      this.selectedFilterText = opt.filter
      this.inputSearch.inputLabel = opt.title;

      if (opt.value && opt.filter) {
        this.params[opt.filter] = this.searchModel
        this.getMaintenancesPlan();
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
      this.getMaintenancesPlan();
    },

    changePagination(pagination) {
      this.params = {
        ...this.params, ...{
          page: pagination.page,
          rowsPerPage: pagination.rowsPerPage,
        }
      }

      this.getMaintenancesPlan();
    },

    goBack() {
      this.$router.go(-1);
    },
  },
})
</script>
