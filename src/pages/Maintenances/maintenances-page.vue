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
        titlePage="Mantenimientos"
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
        btnTitle: 'Añadir mantenimiento',
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

      actionsTable: [
        {
          icnName: 'read_more',
          icnSize: 'sm',
          icnAction: 'Detail'
        }
      ],

      rowSelected: {},

      selectedFilterText: 'reason',

      inputSearch: {
        show: true,
        inputLabel: 'Buscar por motivo',
        setSelectedFilter: this.setSelectedFilter,
        setSelectedOptionFilter: this.setSelectedOptionFilter,
        heightModal: 200,
        items: [
          {
            title: 'Tipo',
            icon: 'engineering',
            options: [
              {
                title: 'Correctivo',
                filter: 'maintenanceType',
                value: 'correctivo',
              },
              {
                title: 'Preventivo',
                filter: 'maintenanceType',
                value: 'preventivo',
              }
            ]
          },
          {
            title: 'Encargado',
            filter: 'userId',
            icon: 'supervisor_account'
          },
          {
            title: 'Precio',
            filter: 'price',
            icon: 'payments'
          },
          {
            title: 'Motivo',
            filter: 'reason',
            icon: 'report'
          }
        ],
      },

      params: {
        reason: '',
      },
    }
  },

  mounted() {
    this.chooseGetMaintenances()
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
        this.chooseGetMaintenances();
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
    chooseGetMaintenances() {
      if (this.$route.query.equipment) {
        this.params.id = this.$route.query.equipment
        this.getMaintenancesByEquipment(this.params);
      } else if (this.$route.query.user) {
        this.params.id = this.$route.query.user
        this.getMaintenancesByUser(this.params);
      } else {
        this.getMaintenances(this.params);
      }
    },

    async getMaintenancesByEquipment(params) {
      this.loading = true
      await this.$store.dispatch('maintenances/getMaintenancesByEquipmentAction', params);
      this.loading = false
    },

    async getMaintenancesByUser(params) {
      this.loading = true
      await this.$store.dispatch('maintenances/getMaintenancesByUserAction', params);
      this.loading = false
    },

    async getMaintenances(params) {
      this.loading = true
      await this.$store.dispatch('maintenances/getMaintenancesAction', params);
      this.loading = false
    },

    goToDetails(payload) {
      console.log('Ver detalle', payload);
      this.$router.push({ name: 'detail-maintenance', params: { id: payload } });
    },

    setSelectedFilter(opt) {
      if (this.selectedFilterText) {
        delete this.params[this.selectedFilterText]
        if (this.searchModel) {
          this.chooseGetMaintenances();
        }
      }

      this.selectedFilterText = opt.filter
      this.inputSearch.inputLabel = opt.title;

      if (opt.value && opt.filter) {
        this.params[opt.filter] = this.searchModel
        this.chooseGetMaintenances();
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
      this.chooseGetMaintenances();
    },

    changePagination(pagination) {
      this.params = {
        ...this.params, ...{
          page: pagination.page,
          rowsPerPage: pagination.rowsPerPage,
        }
      }

      this.chooseGetMaintenances();
    },

    goBack() {
      this.$router.go(-1);
    },
  },
})
</script>
