<template>
  <q-page class="flex flex-center cursor-pointer non-selectable">
    <div class="card-page">

      <header-actions
        :titlePage="'Activos biomédicos'"
        :btnAction="btnAction"
        :inputSearch="inputSearch"
        v-model:searchModel="searchModel"
        v-model:switch-content="switchContent"
      />

      <div
        class="main-container-page"
        :class="{ 'card-color main-container-page-dark': switchContent === 1 }"
      >
        <q-scroll-area
          v-if="switchContent === 1"
          style="height: 90.5% !important"
          class="fit"
          :thumb-style="$store.getters['global/getThumbStyle']"
        >
          <div style="max-width: 100%">
            <div
              v-if="equipments && equipments.length > 0"
              class="row container-cards"
            >
              <div
                class="col-xs-12 col-sm-auto col-md-auto col-lg-auto col-xl-auto"
                v-for="(equipment, index) in equipments"
                :key="index"
              >
                <item-card
                  v-bind="equipment"
                  :status="equipment.isReported ?
                    {
                      tooltip: 'Tiene reporte(s) sin atender',
                      color: '#FF9900',
                      label: 'Reportado'
                    } : null"
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
              <div class="text-primary q-ma-lg">Cargando equipos</div>
            </div>

            <div
              v-else-if="loading === false"
              class="q-ma-md q-ma-sm-xl q-pa-xl text-center no-info border-rounded"
            >
              No hay equipos para mostrar
              <strong class="text-negative">!</strong>
            </div>
          </div>
        </q-scroll-area>

        <div
          v-if="switchContent === 1 && equipments.length > 0"
          style="height: 6.55%"
          class="row justify-center q-pt-sm"
        >
          <q-pagination
            v-model="paginationCards.page"
            dense
            class="q-mt-none pagination-style"
            :max="paginationCards.pagesNumber"
            size="md"
            @update:model-value="changePaginationCards"
            direction-links
          />
        </div>

        <general-table
          v-else-if="switchContent === 2"
          v-model:row-selected="rowSelected"
          :height="'100%'"
          :rows="rows"
          :columns="columns"
          :actions-table="actionsTable"
          :pagination-prop="pagination"
          :loading="loading"
          @change-pagination="changePagination"
        />
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue';
import HeaderActions from 'src/components/compose/HeaderActions.vue';
import ItemCard from 'src/components/atomic/ItemCard.vue';
import GeneralTable from 'src/components/compose/GeneralTable.vue';

export default defineComponent({
  name: 'EquipmentsPage',
  components: {
    GeneralTable,
    HeaderActions,
    ItemCard,
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

      rowSelected: {},

      selectedFilterText: 'category',

      paginationCards: {
        descending: false,
        rowsPerPage: 12,
        page: 1,
      },

      params: {
        category: '',
      },

      btnAction: {
        show: false,
        btnTitle: 'Agregar equipo',
        iconName: 'o_data_saver_on',
        tooltip: 'Agregar nuevo equipo',
        to: 'add-equipment',
      },

      inputSearch: {
        show: true,
        inputLabel: 'Categoría del equipo',
        setSelectedFilter: this.setSelectedFilter,
        setSelectedOptionFilter: this.setSelectedOptionFilter,
        heightModal: 290,
        items: [
          {
            title: 'Categoría del equipo',
            filter: 'category',
            icon: 'o_badge',
          },
          {
            title: 'Ubicación',
            filter: 'location',
            icon: 'o_explore',
          },
          {
            title: 'Modelo',
            filter: 'model',
            icon: 'o_alt_route',
          },
          {
            title: 'Marca',
            filter: 'brand',
            icon: 'o_sell',
          },
          {
            title: 'Número de serie',
            filter: 'serialNumber',
            icon: 'o_fingerprint',
          },
          {
            title: 'Estatus',
            icon: 'o_supervisor_account',
            options: [
              {
                title: 'Activo',
                filter: 'status',
                value: 1,
              },
              {
                title: 'Inactivo',
                filter: 'status',
                value: 0,
              },
            ]
          },
        ],
      },

      columns: [
        {
          name: 'equipment',
          label: 'Equipo',
          align: 'left',
          style: 'white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 200px',
          field: 'equipment',
          sortable: true,
        },
        {
          name: 'model',
          label: 'Modelo',
          field: 'model',
          align: 'left',
          sortable: true,
        },
        {
          name: 'no_serie',
          label: 'No. serie',
          field: 'no_serie',
          align: 'center',
          sortable: true,
        },
        { name: 'badge', label: 'Reportes', field: 'status', align: 'center', sortable: true },
        {
          name: 'actions',
          label: 'Acciones',
          field: 'actions',
          align: 'center',
        },
      ],

      actionsTable: [
        {
          icnName: 'read_more',
          icnSize: 'sm',
          icnAction: 'Detail',
          tooltip: 'Detalle de equipo',
        },
        {
          icnName: 'o_edit',
          icnSize: 'xs',
          icnAction: 'Edit',
          tooltip: 'Editar equipo',
          hidden: true
        },
      ],
    };
  },

  created() {
    this.checkPermissions()
    this.getEquipments({});
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
      this.params[this.selectedFilterText] = val

      clearTimeout(this.timeoutSearch);

      this.timeoutSearch = setTimeout(() => {
        this.getEquipments(this.params);
      }, this.delaySearch);
    },

    pagination: {
      handler(value) {
        this.paginationCards.rowsPerPage = value.rowsPerPage;
        this.paginationCards.pagesNumber = value.totalPages;
        this.paginationCards.rowsNumber = value.rowsNumber;
      },
      immediate: true,
      deep: true,
    },

    switchContent: {
      handler(val) {
        if (val === 1) this.paginationCards.page = this.pagination.page;
        else this.pagination.page = this.paginationCards.page;
      },
      deep: true,
    },

    selectedFilterText() {
      this.params.page = 1
    }
  },

  computed: {
    equipments() {
      return this.$store.getters['equipments/getEquipmentsGetter'];
    },

    rows() {
      // Mapea la información de equipos a las filas requeridas por la tabla
      return this.equipments.map((e) => {
        return {
          id: e.id,
          equipment: e.cardTitle,
          model: e.cardLabels[0].info,
          no_serie: e.cardLabels[1].info,
          // date: e.cardDate,
          nextMaintenanceDate: e.cardDate,
          status: e.status
        };
      });
    },

    pagination: {
      get() {
        return this.$store.getters['equipments/getPaginationGetter'];
      },
    },

    userRole: {
      get() {
        return this.$store.getters['users/getRoleGetter'];
      },
    },
  },

  methods: {
    async getEquipments(params) {
      this.loading = true
      await this.$store.dispatch('equipments/getEquipmentsAction', params)
      this.loading = false
    },

    async getEquipment(id) {
      await this.$store.dispatch('equipments/getEquipmentAction', { id })
    },

    checkPermissions() {
      switch (this.userRole) {
        case 1:
          this.btnAction.show = true
          this.actionsTable[1].hidden = false
          break;
        case 2:
        case 3:
          this.btnAction.show = false
          break;
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

      this.getEquipments(this.params);
    },


    setSelectedFilter(opt) {
      // IF CHANGE THE MODEL SELECTED
      if (this.selectedFilterText) {
        delete this.params[this.selectedFilterText]
        if (this.searchModel) {
          this.getEquipments(this.params);
        }
      }

      this.selectedFilterText = opt.filter
      this.inputSearch.inputLabel = opt.title;

      if (opt.value && opt.filter) {
        this.params[opt.filter] = this.searchModel
        this.getEquipments(this.params);
      }
    },

    goToDetails(payload) {
      this.$router.push({ name: 'detail-equipment', params: { id: payload } });
    },

    goToEdit(payload) {
      this.$router.push({ name: 'edit-equipment', params: { id: payload } });
    },

    changePagination(pagination) {
      this.params = {
        ...this.params, ...{
          page: pagination.page,
          rowsPerPage: pagination.rowsPerPage,
        }
      }

      this.getEquipments(this.params);
    },

    changePaginationCards(page) {

      this.params = {
        ...this.params, ...{
          page,
          rowsPerPage: 12,
        }
      }

      this.getEquipments(this.params);
    }
  },
});
</script>
