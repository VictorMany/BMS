<template>
  <q-page class="flex flex-center cursor-pointer non-selectable">
    <div class="card-page">
      <header-actions
        :titlePage="'Contratos de servicio'"
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
              v-if="contracts.length > 0"
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
              <div class="text-primary q-ma-lg">Cargando contratos de servicio</div>
            </div>

            <div
              class="q-ma-md q-ma-sm-xl q-pa-xl text-center no-info border-rounded"
              v-else-if="loading === false"
            >
              No hay contratos para mostrar
              <strong class="text-negative">!</strong>
            </div>
          </div>
        </q-scroll-area>

        <div
          v-if="switchContent === 1 && contracts.length > 0"
          style="height: 6.55%"
          class="row justify-center q-pt-sm"
        >
          <q-pagination
            v-model="localPagination.page"
            :disable="loading"
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
          :rows="contracts"
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
  name: 'ContractsPage',
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
      paramsFromCreated: false,

      localPagination: {
        totalPages: 1,
        descending: false,
        rowsPerPage: 20,
        page: 1,
      },

      btnAction: {
        show: true,
        btnTitle: 'Agregar contrato',
        tooltip: 'Agregar nuevo contrato',
        to: 'add-service-contract',
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
          name: 'contractName',
          required: true,
          label: 'Nombre del contrato',
          align: 'left',
          field: 'contractName',
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
          tooltip: 'Detalle de contrato',
        },
        {
          icnName: 'o_edit',
          icnSize: 'xs',
          icnAction: 'Edit',
          tooltip: 'Editar contrato',
          shouldHideAction: this.shouldHideAction
        },
        {
          icnName: 'o_delete',
          icnSize: 'xs',
          icnAction: 'Remove',
          tooltip: 'Eliminar contrato',
          shouldHideAction: this.shouldHideAction
        },
      ],

      rowSelected: {},

      selectedFilterText: 'contractName',

      inputSearch: {
        show: true,
        inputLabel: 'Nombre del contrato',
      },

      params: {
        contractName: '',
      }
    }
  },

  mounted() {
    this.checkPermissions()
    this.checkParamsFromCreated()
    this.getContracts()
  },

  watch: {
    rowSelected: {
      handler(val) {
        if (val.action === 'Edit') {
          this.goToEdit(val.id);
        } else if (val.action === 'Detail') {
          this.goToDetails(val.id);
        } else if (val.action === 'Remove') {
          this.removeContract(val.id);
        }
      },
      deep: true,
    },

    searchModel(val) {
      if (!this.paramsFromCreated) {
        this.params = { ...this.params, [this.selectedFilterText]: val }
        clearTimeout(this.timeoutSearch);
        this.timeoutSearch = setTimeout(() => {

          this.params.page = 1

          this.getContracts();
        }, this.delaySearch);
      }
    },
  },

  computed: {
    contracts: {
      get() {
        return this.$store.getters['contracts/getContractsGetter'];
      },
    },

    pagination: {
      get() {
        return JSON.parse(JSON.stringify(this.$store.getters['contracts/getPaginationGetter']));
      },
    },

    localStorage: {
      get() {
        return JSON.parse(JSON.stringify(this.$store.getters['global/getlocalStorageGetter']));
      },
    },

    cards() {
      return this.contracts.map((e) => {
        return {
          id: e.id,
          cardTitle: e.contractName,
          cardLabels: [
            {
              label: 'Encargado',
              info: e.user,
            },
            {
              label: 'Fecha',
              info: e.date,
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
    async getContracts() {
      this.loading = true

      this.localPagination = {
        ...this.localPagination,
        ...await this.$store.dispatch('contracts/getContractsAction', this.params)
      }

      this.paramsFromCreated = false

      this.$store.dispatch('global/addGlobalsToLocalStorage', {
        searchContracts: {
          inputLabel: this.inputSearch.inputLabel,
          selectedFilterText: this.selectedFilterText,
          searchModel: this.searchModel
        },
        paramsContractsPage: { ...this.params }
      });

      this.loading = false
    },

    async checkParamsFromCreated() {
      if (this.localStorage?.paramsContractsPage) {
        this.params = { ...this.params, ...this.localStorage.paramsContractsPage };
      }

      if (this.localStorage?.searchContracts) {
        this.paramsFromCreated = true

        this.inputSearch.inputLabel = this.localStorage.searchContracts?.inputLabel
        this.searchModel = this.localStorage.searchContracts?.searchModel
        this.selectedFilterText = this.localStorage.searchContracts?.selectedFilterText
      }
    },

    async removeContract(paylod) {
      try {
        const res = await this.$store.dispatch(
          'contracts/deleteContractAction',
          paylod
        );
        if (res === true) {
          showSuccess(this.$q, { title: 'Éxito al eliminar el contrato', msg: 'El contrato de mantenimientos se ha eliminado' });
          this.getContracts()
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

    shouldHideAction() {
      if (this.userRole != 1) {
        return false
      } else return true
    },

    goToDetails(payload) {
      this.$router.push({ name: 'detail-service-contract', params: { id: payload } });
    },

    goToEdit(payload) {
      this.$router.push({ name: 'edit-service-contract', params: { id: payload } });
    },

    changePagination(pagination) {
      this.localPagination.page = pagination

      this.params = {
        ...this.params, ...{
          page: this.localPagination.page,
          rowsPerPage: this.localPagination.rowsPerPage,
        }
      }

      this.getContracts(this.params);
    },

    goBack() {
      this.$router.go(-1);
    },
  },
})
</script>
