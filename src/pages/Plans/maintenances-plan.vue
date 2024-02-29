<template>
  <q-page class="flex flex-center cursor-pointer non-selectable">
    <div class="card-page">
      <header-actions
        :titlePage="'Planes de mantenimientos'"
        :btnAction="btnAction"
        :inputSearch="inputSearch"
        v-model:searchModel="searchModel"
        v-model:switch-content="switchContent"
      />

      <div
        class="main-container-page  q-pa-sm"
        :class="{ 'card-color main-container-page-dark': switchContent === 1 }"
      >
        <q-scroll-area
          v-if="switchContent === 1"
          style="height: 93% !important"
          class="fit"
          :thumb-style="$store.getters['global/getThumbStyle']"
        >
          <div style="max-width: 100%">
            <div
              v-if="maintenancePlans.length > 0"
              class="row container-cards"
            >
              <div
                v-for="(maintenance, index) in cards"
                :key="index"
                class="col-xs-12 col-sm-auto col-md-auto col-lg-auto col-xl-auto"
              >
                <item-card
                  v-bind="maintenance"
                  :index="index"
                  :card-action="goToDetails"
                />
              </div>
            </div>

            <div
              v-else-if="loading"
              class="q-ma-md q-ma-sm-xl q-pa-xl text-center no-info border-rounded"
            >
              <q-spinner-pie
                color="primary"
                class="q-mt-lg"
                size="4em"
              />
              <div class="text-primary q-ma-lg">Cargando planes de mantenimientos</div>
            </div>

            <div
              class="q-ma-md q-ma-sm-xl q-pa-xl text-center no-info border-rounded"
              v-else-if="loading === false"
            >
              No hay planes para mostrar
              <strong class="text-negative">!</strong>
            </div>
          </div>
        </q-scroll-area>

        <div
          v-if="switchContent === 1 && maintenancePlans.length > 0"
          style="height: 6.55%"
          class="row justify-center q-pt-sm"
        >
          <q-pagination
            v-model="localPagination.page"
            dense
            class="q-mt-none pagination-style"
            :max="localPagination.totalPages"
            size="md"
            direction-links
            boundary-numbers
            :max-pages="6"
            @update:model-value="changePagination"
          />
        </div>

        <general-table
          v-else-if="switchContent === 2"
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
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import HeaderActions from 'src/components/compose/HeaderActions.vue'
import GeneralTable from 'src/components/compose/GeneralTable.vue'
import { showSuccess, showWarning } from 'app/utils/utils';
import ItemCard from 'src/components/atomic/ItemCard.vue';

export default defineComponent({
  name: 'MaintenancesPlan',
  components: {
    HeaderActions,
    GeneralTable,
    ItemCard,
  },
  data() {
    return {
      delaySearch: 300,
      searchModel: null,
      timeoutSearch: null,
      switchContent: 1,
      loading: true,

      localPagination: {
        totalPages: 1,
        descending: false,
        rowsPerPage: 12,
        page: 1,
      },

      btnAction: {
        show: true,
        btnTitle: 'Agregar plan',
        tooltip: 'Agregar nuevo plan',
        to: 'add-maintenance-plan',
        btnWidth: 'auto'
      },

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
        { name: 'user', label: 'Encargado', field: 'user', align: 'left', sortable: true },
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
          icnName: 'o_edit',
          icnSize: 'xs',
          icnAction: 'Edit',
          tooltip: 'Editar plan',
        },
        {
          icnName: 'o_delete',
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
      }
    }
  },

  mounted() {
    this.checkPermissions()
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

        this.params.page = 1

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

    pagination: {
      get() {
        return this.$store.getters['maintenancePlans/getPaginationGetter'];
      },
    },

    cards() {
      return this.maintenancePlans.map((e) => {
        return {
          id: e.id,
          cardTitle: e.planName,
          cardLabels: [
            {
              label: 'Encargado',
              info: e.user,
            }
          ],
        };
      });
    },

    userRole: {
      get() {
        return this.$store.getters['users/getRoleGetter'];
      },
    }
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
      try {
        const res = await this.$store.dispatch(
          'maintenancePlans/deleteMaintenancePlanAction',
          paylod
        );
        if (res === true) {
          showSuccess(this.$q, { title: 'Éxito al eliminar el plan', msg: 'El plan de mantenimientos se ha eliminado' });
          this.getMaintenancePlans()
        } else {
          showWarning(this.$q, { msg: 'Inténtalo de nuevo más tarde y si el error persiste, repórtalo' });
        }
      } catch (error) {
        console.log(error)
      }
    },

    checkPermissions() {
      switch (this.userRole) {
        case 2:
        case 3:
          this.btnAction.show = false;
          break;
      }
    },

    goToDetails(payload) {
      this.$router.push({ name: 'detail-maintenance-plan', params: { id: payload } });
    },

    goToEdit(payload) {
      this.$router.push({ name: 'edit-maintenance-plan', params: { id: payload } });
    },

    changePagination(pagination) {
      this.localPagination.page = pagination

      this.params = {
        ...this.params, ...{
          page: this.localPagination.page,
          rowsPerPage: this.localPagination.rowsPerPage,
        }
      }

      this.getMaintenancePlans(this.params);
    },

    goBack() {
      this.$router.go(-1);
    },
  },
})
</script>
