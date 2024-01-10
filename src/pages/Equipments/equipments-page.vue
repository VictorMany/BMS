<template>
  <q-page class="flex flex-center cursor-pointer non-selectable">
    <div class="card-page">
      <header-actions
        :titlePage="'Equipos'"
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
          style="height: 85% !important"
          class="fit"
          :thumb-style="$store.getters['global/getThumbStyle']"
        >
          <div style="max-width: 100%">
            <div
              v-if="equipments && equipments.length > 0"
              class="row q-pa-none q-ma-none q-px-sm"
            >
              <div
                class="col-xs-12 col-sm-auto col-md-auto col-lg-auto col-xl-auto q-px-sm q-pb-md"
                v-for="(equipment, index) in equipments"
                :key="index"
              >
                <item-card
                  v-bind="equipment"
                  :index="index"
                  :card-action="readMore"
                />
              </div>
            </div>
            <div
              class="q-ma-xl q-pa-xl text-center no-info"
              v-else-if="loading === false"
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
          :rows="rows"
          :columns="columns"
          :actions-table="actionsTable"
          :pagination-prop="pagination"
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

      paginationCards: {
        descending: false,
        rowsPerPage: 12,
        page: 1,
      },

      params: {
        name: '',
      },

      btnAction: {
        show: true,
        btnTitle: 'Añadir equipo',
        to: 'add-equipment',
      },

      inputSearch: {
        show: true,
        inputLabel: 'Buscar por nombre',
        setSelectedOpt: this.setSelectedOpt,
        heightModal: '290px',
        items: [
          {
            title: 'Nombre',
            icon: 'badge',
          },
          {
            title: 'Ubicación',
            icon: 'explore',
          },
          {
            title: 'Modelo',
            icon: 'alt_route',
          },
          {
            title: 'Marca',
            icon: 'sell',
          },
          {
            title: 'Número de serie',
            icon: 'fingerprint',
          },
          {
            title: 'Estatus',
            icon: 'toggle_on',
          },
          // Resto de opciones...
        ],
      },

      columns: [
        {
          name: 'equipment',
          required: true,
          label: 'Equipo',
          align: 'left',
          field: 'equipment',
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: 'brand',
          label: 'Marca del equipo',
          field: 'brand',
          align: 'left',
          sortable: true,
        },
        {
          name: 'no_serie',
          label: 'Numero de serie',
          field: 'no_serie',
          align: 'center',
          sortable: true,
        },
        {
          name: 'date',
          label: 'fecha de creacion',
          field: 'date',
          align: 'center',
          sortable: true,
        },
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
        },
        {
          icnName: 'edit',
          icnSize: 'xs',
          icnAction: 'Edit',
        },
      ],
    };
  },

  created() {
    this.getEquipments();
  },

  watch: {
    rowSelected: {
      handler(val) {
        if (val.action === 'Edit') {
          this.edit(val.id);
        } else if (val.action === 'Detail') {
          this.readMore(val.id);
        }
      },
      deep: true,
    },

    searchModel(val) {
      let params = {};
      if (Object.keys(this.params).length > 0) {
        params = {
          [Object.keys(this.params)[0]]: val,
        };
      }

      clearTimeout(this.timeoutSearch);
      this.timeoutSearch = setTimeout(() => {
        this.getEquipments(params);
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
  },
  computed: {
    equipments() {
      return this.$store.getters['equipments/getEquipmentsGetter'];
    },

    rows() {
      // Mapea la información de equipos a las filas requeridas por la tabla
      return this.equipments.map((e) => {
        return {
          equipment: e.cardTitle,
          brand: e.cardLabels[0].info,
          no_serie: e.cardLabels[1].info,
          date: e.cardDate,
        };
      });
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
      await this.$store.dispatch('equipments/getEquipmentsAction', params)
      this.loading = false
    },

    readMore(payload) {
      console.log('Ver detalle', payload);
      this.$router.push({ name: 'detail-equipment', params: { id: payload } });
    },

    edit(payload) {
      console.log('Editar', payload);
      this.$router.push({ name: 'edit-equipment', params: { id: payload } });
    },

    setSelectedOpt(opt) {
      this.inputSearch.inputLabel = opt;

      let type = '';
      switch (opt) {
        case 'Nombre':
          type = 'name';
          break;
        case 'Ubicación':
          type = 'location';
          break;
        case 'Modelo':
          type = 'model';
          break;
        case 'Marca':
          type = 'brand';
          break;
        case 'Número de serie':
          type = 'serialNumber';
          break;
        case 'Estatus':
          type = 'status';
          break;
      }

      this.params = {
        [type]: this.searchModel,
      };

      this.getEquipments(this.params);
    },

    changePagination(pagination) {
      console.log('Cambia la paginacion', pagination);
      this.getEquipments({
        page: pagination.page,
        rowsPerPage: pagination.rowsPerPage,
      });
    },

    // Changing pagination obj
    changePaginationCards(page) {
      this.getEquipments({
        page,
        rowsPerPage: 12,
      });
    },
  },
});
</script>
