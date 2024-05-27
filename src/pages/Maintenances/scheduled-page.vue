<template>
  <q-page class="flex flex-center cursor-pointer non-selectable">
    <div class="card-page">
      <header-actions
        titlePage="Mantenimientos agendados"
        :subtitle-page="subtitle"
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
              v-if="scheduled.length > 0"
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
                  :card-action="goToMaintenance"
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
          v-if="switchContent === 1 && scheduled.length > 0"
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
          :rows="rows"
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
  name: 'ScheduledPage',
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

      btnCloseWindow: {
        iconName: 'exit_to_app',
        btnBackground: '#FF990020',
        btnColor: '#FF9900',
        btnAction: this.goBack,
        shouldHide: this.$route.query?.equipment || this.$route.query?.user
      },

      columns: [
        {
          name: 'equipmentName', label: 'Equipo', field: 'equipmentName', align: 'left', sortable: true,
          style: 'white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 200px',
        },
        {
          name: 'equipmentModel', label: 'Modelo', field: 'equipmentModel', align: 'left', sortable: true,
          style: 'white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 200px',
        },
        {
          name: 'serialNumber', label: 'No. Serie', field: 'serialNumber', align: 'left', sortable: true,
          style: 'white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 200px',
        },
        { name: 'date', label: 'Fecha agendada', field: 'date', align: 'left', sortable: true },
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
          icnName: 'engineering',
          icnSize: 'sm',
          icnAction: 'Maintenance',
          tooltip: 'Realizar mantenimiento',
        }
      ],

      rowSelected: {},

      selectedFilterText: 'userName',

      inputSearch: {
        show: true,
        inputLabel: 'Encargado',
        setSelectedFilter: this.setSelectedFilter,
        setSelectedOptionFilter: this.setSelectedOptionFilter,
        heightModal: 100,
        items: [
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
        date: '2024-03-01'
      },
    }
  },

  mounted() {
    this.getScheduled()
  },

  watch: {
    rowSelected: {
      handler(val) {
        if (val.action === 'Maintenance') {
          this.goToMaintenance(val.id);
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

          this.getScheduled();
        }, this.delaySearch);
      }
    },
  },

  computed: {
    scheduled() {
      return this.$store.getters['equipments/getEquipmentsGetter'];
    },

    rows() {
      // Mapea la información de equipos a las filas requeridas por la tabla
      return this.scheduled.map((e) => {
        return {
          id: e.id,
          equipmentName: e.equipmentName,
          equipmentModel: e.equipmentModel,
          serialNumber: e.serialNumber,
          date: '12/03/2024',
          status: 'Agendado'
        };
      });
    },

    pagination: {
      get() {
        return JSON.parse(JSON.stringify(this.$store.getters['equipments/getPaginationGetter']));
      },
    },

    user: {
      get() {
        return this.$store.getters['users/getUserGetter'];
      },
    },

    localStorage: {
      get() {
        return JSON.parse(JSON.stringify(this.$store.getters['global/getlocalStorageGetter']));
      },
    },

    cards() {
      return this.scheduled.map((e) => {
        return {
          id: e.id,
          cardTitle: e.equipmentName,
          bottomStatus: {
            tooltip: 'El mantenimiento está agendado y pendiente por realizarse',
            color: '#1e65e8',
            label: 'Agendado'
          },
          cardLabels: [
            {
              label: 'Modelo',
              info: e.equipmentModel,
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
    async getScheduled() {
      this.loading = true

      await this.$store.dispatch('equipments/getEquipmentsByDateAction', this.params);
      this.localPagination = JSON.parse(JSON.stringify(this.pagination))

      this.loading = false
    },

    async getEquipment(id) {
      return await this.$store.dispatch('equipments/getEquipmentAction', { id })
    },

    async goToMaintenance(payload) {
      this.$store.commit('equipments/MUTATE_EQUIPMENT', null)
      this.$store.commit('reports/MUTATE_REPORT', null)

      let equipment = await this.getEquipment(payload)

      const formattedMaintenance = {
        id: payload,
        IdEquipment: payload,

        // FOR THE DETAILS MAINTENANCE AND REPORT
        serialNumber: equipment.serialNumber,
        equipmentModel: equipment.equipmentModel,
        equipmentName: equipment.equipmentName,
        categoryName: equipment.categoryName,
        isFromScheduled: true,
        date: 'Lunes 10, Marzo'
      }

      this.$store.commit('equipments/MUTATE_EQUIPMENT', formattedMaintenance)

      this.$router.push({
        name: 'add-maintenance'
      });
    },

    setSelectedFilter(opt) {
      if (this.selectedFilterText) {
        delete this.params[this.selectedFilterText]
        if (this.searchModel) {
          this.params[opt.filter] = this.searchModel
          this.getScheduled();
        }
      }

      this.selectedFilterText = opt.filter
      this.inputSearch.inputLabel = opt.title;

      if (opt.value && opt.filter) {
        this.params[opt.filter] = this.searchModel
        this.getScheduled();
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

      this.getScheduled();
    },

    changePagination(pagination) {
      this.localPagination.page = pagination

      this.params = {
        ...this.params, ...{
          page: this.localPagination.page,
          rowsPerPage: this.localPagination.rowsPerPage,
        }
      }

      this.getScheduled();
    },

    goBack() {
      this.$router.go(-1);
    },
  },
})
</script>
