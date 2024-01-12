<template>
  <q-page class="flex flex-center cursor-pointer non-selectable">
    <div class="card-page">
      <header-actions
        :titlePage="'Mantenimientos'"
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
    GeneralTable
  },
  data() {
    return {
      delaySearch: 300,
      searchModel: null,
      showCards: true,
      switchContent: 1,
      timeoutSearch: null,
      loading: true,

      localPagination: {},

      btnAction: {
        show: true,
        btnTitle: 'Añadir mantenimiento',
        to: 'add-maintenance',
        btnWidth: 'auto'
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
        },
        {
          icnName: 'edit',
          icnSize: 'xs',
          icnAction: 'Edit'
        }
      ],

      rowSelected: {},

      inputSearch: {
        show: true,
        inputLabel: 'Buscar por nombre',
        setSelectedOpt: this.setSelectedOpt,
        setSelectedStatus: this.setSelectedStatus,
        heightModal: '200px',
        items: [
          {
            title: 'Tipo',
            icon: 'engineering'
          },
          {
            title: 'Encargado',
            icon: 'supervisor_account'
          },
          {
            title: 'Fecha',
            icon: 'calendar_month'
          },
          {
            title: 'Precio',
            icon: 'payments'
          }
        ],
      },

      params: {
        name: '',
      },
    }
  },

  created() {
    this.getMaintenances({});
  },

  watch: {
    rowSelected: {
      handler(val) {
        if (val.action === 'Edit') {
          this.goToEdit(val.id);
        } else if (val.action === 'Detail') {
          this.goToDetails(val.id);
        }
      },
      deep: true,
    },

    searchModel(val) {
      let params = {};
      if (Object.keys(this.params).length > 0) {
        /**
         * @this.params[0] -> Name, Status, Role
         */
        params = {
          [Object.keys(this.params)[0]]: val,
        };
      }

      clearTimeout(this.timeoutSearch);
      this.timeoutSearch = setTimeout(() => {
        this.getMaintenances(params);
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
    async getMaintenances(params) {
      this.loading = true
      await this.$store.dispatch('maintenances/getMaintenancesAction', params);
      this.loading = false
    },

    goToDetails(payload) {
      console.log('Ver detalle', payload);
      this.$router.push({ name: 'detail-maintenance', params: { id: payload } });
    },

    goToEdit(payload) {
      console.log(payload);
      this.$router.push({ name: 'edit-maintenance', params: { id: payload } });
    },

    setSelectedOpt(opt) {
      this.inputSearch.inputLabel = opt;

      let type = '';
      switch (opt) {
        case 'Nombre':
          type = 'name';
          break;
        case 'Estatus':
          type = 'status';
          break;
        case 'Role':
          type = 'role';
          break;
      }

      this.params = {
        [type]: this.searchModel,
      };

      this.getMaintenances(this.params);
    },


    setSelectedStatus(opt) {
      this.params = {
        status: opt ? 1 : 0,
      };
      this.getMaintenances(this.params)
    },

    changePagination(pagination) {
      this.getMaintenances({
        page: pagination.page,
        rowsPerPage: pagination.rowsPerPage,
      });
    },
  },
})
</script>
