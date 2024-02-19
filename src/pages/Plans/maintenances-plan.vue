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
      <div class="main-container-page">
        <general-table
          v-model:row-selected="rowSelected"
          :height="'100%'"
          :rows="maintenancePlans"
          :loading="loading"
          :columns="columns"
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

      btnAction: [{
        show: true,
        btnTitle: 'Agregar plan de mantenimiento',
        tooltip: 'Agregar nuevo plan',
        to: 'add-maintenance-plan',
        btnWidth: 'auto'
      }],

      btnCloseWindow: {
        iconName: 'exit_to_app',
        btnBackground: '#FF990020',
        btnColor: '#FF9900',
        btnAction: this.goBack
      },

      columns: [
        {
          name: 'planName',
          required: true,
          label: 'Nombre del plan',
          align: 'left',
          field: 'planName',
          format: val => `${val}`,
          sortable: true
        },
        { name: 'user', label: 'Nombre del encargado', field: 'user', align: 'left', sortable: true },
        { name: 'date', label: 'Fecha de creación', field: 'date', align: 'center', sortable: true },
        { name: 'actions', label: 'Acciones', field: 'actions', align: 'center' }
      ],

      actionsTable: [
        {
          icnName: 'read_more',
          icnSize: 'sm',
          icnAction: 'Detail',
          tooltip: 'Detalle de plan',
        },
        {
          icnName: 'edit',
          icnSize: 'xs',
          icnAction: 'Edit',
          tooltip: 'Editar plan',
        },
        {
          icnName: 'delete',
          icnSize: 'xs',
          icnAction: 'Remove',
          tooltip: 'Eliminar plan',
        },
      ],

      rowSelected: {},

      selectedFilterText: 'planName',

      inputSearch: {
        show: true,
        inputLabel: 'Nombre del plan',
      },

      params: {
        planName: '',
      },
    }
  },

  mounted() {
    this.getMaintenancePlans()
  },

  watch: {
    rowSelected: {
      handler(val) {
        if (val.action === 'Edit') {
          this.goToEdit(val.id);
        } else if (val.action === 'Detail') {
          this.goToDetails(val.id);
        } else if (val.action === 'Remove') {
          this.removePlan(val.id);
        }
      },
      deep: true,
    },

    searchModel(val) {
      this.params[this.selectedFilterText] = val
      clearTimeout(this.timeoutSearch);
      this.timeoutSearch = setTimeout(() => {
        this.getMaintenancePlans();
      }, this.delaySearch);
    },
  },

  computed: {
    maintenancePlans: {
      get() {
        return this.$store.getters['maintenancePlans/getMaintenancePlansGetter'];
      },
    },
  },

  methods: {
    async getMaintenancePlans() {
      this.loading = true

      this.localPagination = {
        ...this.localPagination,
        ...await this.$store.dispatch('maintenancePlans/getMaintenancePlansAction', this.params)
      }

      this.loading = false
    },

    async removePlan(paylod) {
      console.log(paylod)
      this.localPagination = {
        ...this.localPagination,
        ...await this.$store.dispatch('maintenancePlans/getMaintenancePlansAction', this.params)
      }
    },

    goToDetails(payload) {
      this.$router.push({ name: 'detail-maintenance-plan', params: { id: payload } });
    },

    goToEdit(payload) {
      this.$router.push({ name: 'edit-maintenance-plan', params: { id: payload } });
    },

    changePagination(pagination) {
      this.params = {
        ...this.params, ...{
          page: pagination.page,
          rowsPerPage: pagination.rowsPerPage,
        }
      }

      this.getMaintenancePlans();
    },

    goBack() {
      this.$router.go(-1);
    },
  },
})
</script>
