<template>
  <q-page class="flex flex-center cursor-pointer non-selectable">
    <div class="card-page">

      <header-actions
        titlePage="Historial de mantenimientos"
        :btnAction="btnAction"
        :btn-close-window="showCloseBtn() ? btnCloseWindow : null"
        :inputSearch="inputSearch"
        v-model:searchModel="searchModel"
        v-model:switch-content="switchContent"
      />

      <div
        class="main-container-page q-pa-sm"
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
              v-if="maintenances.length > 0"
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
              <div class="text-primary q-ma-lg">Cargando mantenimientos</div>
            </div>

            <div
              class="q-ma-md q-ma-sm-xl q-pa-xl text-center no-info border-rounded"
              v-else-if="loading === false"
            >
              No hay mantenimientos para mostrar
              <strong class="text-negative">!</strong>
            </div>
          </div>
        </q-scroll-area>

        <div
          v-if="switchContent === 1 && maintenances.length > 0"
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
import ItemCard from 'src/components/atomic/ItemCard.vue'

export default defineComponent({
  name: 'MaintenancesPage',
  components: {
    HeaderActions,
    GeneralTable,
    ItemCard
  },
  data() {
    return {
      delaySearch: 300,
      searchModel: null,
      timeoutSearch: null,
      loading: true,
      switchContent: 1,
      paramsFromCreated: false,
      subtitle: '',

      localPagination: {
        totalPages: 1,
        descending: false,
        rowsPerPage: 20,
        page: 1,
      },

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
        { name: 'encharged_name', label: 'Encargado', field: 'encharged_name', align: 'left', sortable: true },
        {
          name: 'equipment', label: 'Equipo', field: 'equipment', align: 'left', sortable: true,
          style: 'white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 200px',
        },

        { name: 'date', label: 'Fecha de mantenimiento', field: 'date', align: 'left', sortable: true },
        {
          name: 'badge',
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

      selectedFilterText: 'userName',

      inputSearch: {
        show: true,
        inputLabel: 'Encargado',
        setSelectedFilter: this.setSelectedFilter,
        setSelectedOptionFilter: this.setSelectedOptionFilter,
        heightModal: 160,
        items: [
          {
            title: 'Tipo',
            icon: 'o_engineering',
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
            icon: 'o_supervisor_account'
          },
          {
            title: 'Categoría del equipo',
            filter: 'category',
            icon: 'o_badge'
          },
        ],
      },

      params: {
        reason: '',
      },
    }
  },

  mounted() {
    this.checkParamsFromCreated()

    const equipment = this.$route?.query?.equipment
    if (equipment) {
      this.subtitle = this.equipment?.categoryName
      this.params.IdEquipment = equipment
      this.params.page = 1
      this.btnAction.show = this.equipment?.equipmentStatus
    } else if (this.$route?.query?.user) {
      this.subtitle = this.user?.userName

      this.params.userId = this.$route.query.user
    }

    this.getMaintenances()
  },

  unmounted() {
    this.$store.commit('maintenances/MUTATE_TOTAL_COST', null);
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
      if (!this.paramsFromCreated) {
        this.params = { ...this.params, [this.selectedFilterText]: val }
        clearTimeout(this.timeoutSearch);
        this.timeoutSearch = setTimeout(() => {

          this.params.page = 1

          this.getMaintenances();
        }, this.delaySearch);
      }
    },
  },

  computed: {
    maintenances: {
      get() {
        return this.$store.getters['maintenances/getMaintenancesGetter'];
      },
    },

    user: {
      get() {
        return this.$store.getters['users/getUserGetter'];
      },
    },

    pagination: {
      get() {
        return JSON.parse(JSON.stringify(this.$store.getters['maintenances/getPaginationGetter']));
      },
    },

    localStorage: {
      get() {
        return JSON.parse(JSON.stringify(this.$store.getters['global/getlocalStorageGetter']));
      },
    },

    cards() {
      return this.maintenances.map((e) => {
        return {
          id: e.id,
          cardTitle: e.equipment,
          bottomStatus: this.findIndicator(e.status),
          cardLabels: [
            {
              label: 'Encargado',
              info: e.encharged_name,
            },
            {
              label: 'Fecha',
              info: e.date,
            }
          ],
        };
      });
    },

    equipment: {
      get() {
        return this.$store.getters['equipments/getEquipmentGetter'];
      },
    },
  },

  methods: {
    async getMaintenances() {
      this.loading = true
      await this.$store.dispatch('maintenances/getMaintenancesAction', this.params);

      this.paramsFromCreated = false

      this.localPagination = JSON.parse(JSON.stringify(this.pagination))

      const paramsForMaintenances = { ...this.params }

      if (paramsForMaintenances?.IdEquipment) {
        delete paramsForMaintenances.IdEquipment
      }

      if (paramsForMaintenances?.userId) {
        delete paramsForMaintenances.userId
      }

      this.$store.dispatch('global/addGlobalsToLocalStorage', {
        searchMaintenances: {
          inputLabel: this.inputSearch.inputLabel,
          selectedFilterText: this.selectedFilterText,
          searchModel: this.searchModel
        },
        paramsMaintenancesPage: paramsForMaintenances
      });

      this.loading = false
    },

    async checkParamsFromCreated() {
      if (this.localStorage?.paramsMaintenancesPage) {
        this.params = { ...this.params, ...this.localStorage.paramsMaintenancesPage };

        if (Object.prototype.hasOwnProperty.call(this.params, 'maintenanceType')) {
          this.inputSearch.activeOptions = [await this.findItemByFilterAndValue(this.params.maintenanceType)]
        }
      }

      if (this.localStorage?.searchMaintenances) {
        this.paramsFromCreated = true

        this.inputSearch.inputLabel = this.localStorage.searchMaintenances?.inputLabel
        this.searchModel = this.localStorage.searchMaintenances?.searchModel
        this.selectedFilterText = this.localStorage.searchMaintenances?.selectedFilterText
      }
    },

    findItemByFilterAndValue(value) {
      for (const item of this.inputSearch.items) {
        if (item.options) {
          const foundOption = item.options.find(option => option.value === value);
          if (foundOption) {
            return foundOption;
          }
        }
      }
      return null;
    },

    findIndicator(status) {
      if (status === 'Preventivo') {
        return {
          tooltip: 'El mantenimiento es preventivo',
          color: '#10D13A',
          label: 'Preventivo'
        }
      } else {
        return {
          tooltip: 'El mantenimiento es correctivo',
          color: '#d1b410',
          label: 'Correctivo'
        }
      }
    },

    goToAddMaintenance() {
      // Delete from the LOCAL STORAGE IF EXIST
      this.$store.commit('reports/MUTATE_REPORT', null)

      if (!this.$route.query.equipment) {
        this.$store.commit('equipments/MUTATE_EQUIPMENT', null)
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
          this.params[opt.filter] = this.searchModel
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

      this.params.page = 1

      this.getMaintenances();
    },

    changePagination(pagination) {
      this.localPagination.page = pagination

      this.params = {
        ...this.params, ...{
          page: this.localPagination.page,
          rowsPerPage: this.localPagination.rowsPerPage,
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
