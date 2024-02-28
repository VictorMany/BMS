<template>
  <q-page class="flex flex-center cursor-pointer non-selectable">
    <div class="card-page">

      <header-actions
        :titlePage="'Consumibles y equipos biomédicos'"
        :btnAction="btnAction"
        :inputSearch="inputSearch"
        v-model:searchModel="searchModel"
      />

      <div class="main-container-page q-pa-sm card-color main-container-page-dark row">
        <div class="col-12 col-sm-9">
          <q-scroll-area
            class="fit"
            style="height: 93% !important"
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
                  <item-card-store
                    v-bind="equipment"
                    :status="index % 2 === 0 ?
                      {
                        tooltip: 'Tiene reporte(s) sin atender',
                        color: '#10D13A',
                        label: 'En oferta'
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
            v-if="equipments.length > 0"
            style="height: 6.55%"
            class="row justify-center q-pt-sm"
          >
            <q-pagination
              v-model="localPagination.page"
              dense
              class="q-mt-none pagination-style"
              :max="localPagination.totalPages"
              size="md"
              @update:model-value="changePagination"
              direction-links
            />
          </div>
        </div>

        <div class="col-12 col-sm-3">
          <q-scroll-area
            class="fit"
            style="height: 93% !important"
            :thumb-style="$store.getters['global/getThumbStyle']"
          >
            <div class="w-100 q-pa-lg">
              <div class="q-mb-sm bg-accent border-rounded q-pa-sm q-mb-md">
                <div>
                  Subtotal del carrito: <span style="font-size: 21px;">
                    $230,512.17
                  </span>
                </div>
              </div>
              <q-btn
                class="form__button border-rounded text-blue-7 text-weight-medium w-100 q-mb-md"
                no-caps
                outline
                v-bind="btnBuyNow"
              >
                Ver carrito
              </q-btn>
              <q-btn
                class="form__button border-rounded bg-blue-7 text-weight-medium w-100"
                no-caps
                v-bind="btnBuyNow"
              >
                Proceder al pago
              </q-btn>
            </div>
          </q-scroll-area>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue';
import HeaderActions from 'src/components/compose/HeaderActions.vue';
import ItemCardStore from 'src/components/atomic/ItemCardStore.vue';

export default defineComponent({
  name: 'EquipmentsPage',
  components: {
    HeaderActions,
    ItemCardStore,
  },
  data() {
    return {

      delaySearch: 300,
      searchModel: null,
      showCards: true,
      timeoutSearch: null,
      loading: true,

      selectedFilterText: 'category',

      cartList: [],

      localPagination: {
        totalPages: 1,
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

      btnBuyNow: {
        show: true,
        btnTitle: 'Comprar ahora',
        iconName: 'buy',
        tooltip: 'Comprar ahora mismo',
        btnAction: this.updatePassword,
        loader: false,
      },

      inputSearch: {
        show: true,
        inputLabel: 'Categoría del equipo',
        setSelectedFilter: this.setSelectedFilter,
        setSelectedOptionFilter: this.setSelectedOptionFilter,
        heightModal: 150,
        items: [
          {
            title: 'Categoría del equipo',
            filter: 'category',
            icon: 'o_badge',
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
          }
        ],
      }
    };
  },

  created() {
    this.getEquipments({});
  },

  watch: {
    searchModel(val) {
      this.params[this.selectedFilterText] = val
      clearTimeout(this.timeoutSearch);

      this.timeoutSearch = setTimeout(() => {

        this.params.page = 1

        this.getEquipments(this.params);
      }, this.delaySearch);
    },

    selectedFilterText() {
      this.params.page = 1
    }
  },

  computed: {
    equipments() {
      console.log(this.$store.getters['storeModule/getEquipmentsGetter'])
      let equipments = this.$store.getters['storeModule/getEquipmentsGetter'].map(equipment => ({
        id: equipment.IdEquipment,
        cardTitle: equipment.categoryName,
        cardImg: equipment.photo,
        cardLabels: [
          { label: 'Modelo', info: equipment.equipmentModel },
          { label: 'Marca', info: 'MARCA' },
        ],
        status: 'onSale',
        cartAction: this.addToCart
      }));
      return equipments
    },

    pagination: {
      get() {
        return this.$store.getters['equipments/getPaginationGetter'];
      },
    },
  },

  methods: {
    async getEquipments(params) {
      this.loading = true
      await this.$store.dispatch('storeModule/getEquipmentsAction', params)

      this.localPagination = JSON.parse(JSON.stringify(this.pagination))

      this.loading = false
    },

    async getEquipment(id) {
      await this.$store.dispatch('storeModule/getEquipmentAction', { id })
    },

    addToCart(equipment) {
      console.log(equipment)
      this.cartList.push(equipment)
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
      this.localPagination.page = pagination

      this.params = {
        ...this.params, ...{
          page: this.localPagination.page,
          rowsPerPage: this.localPagination.rowsPerPage,
        }
      }

      this.getEquipments(this.params);
    }
  },
});
</script>
