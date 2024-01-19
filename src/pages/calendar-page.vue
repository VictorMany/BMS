<template>
  <q-page class="flex flex-center cursor-pointer non-selectable">
    <div class="card-page">
      <header-actions
        :titlePage="'Calendario'"
        :btnAction="btnAction"
      />
      <!-- Main container -->
      <div class="main-container-page main-container-page-medium-dark">
        <div class="row card-color q-pa-md h-100">
          <div class="col-xs-12 col-sm-auto">
            <q-date
              v-model="date"
              today-btn
              color="primary"
              mask="YYYY-MM-DD"
              class="text-blue-blue-grey-4 border-line"
              landscape
              :events="events"
              @update:model-value="getEquipmentsByDate"
              @navigation="getDatesPerMonth"
            />
            <div class="col q-mt-md">
              <div class="container-colorama border-none q-pa-xs row">
                <q-radio
                  v-for="(badge, i) in optionsFilter"
                  :key="i"
                  v-model="selectedFilter"
                  checked-icon="task_alt"
                  unchecked-icon="panorama_fish_eye"
                  class="col-12 q-pa-xs"
                  :val="badge.color"
                  :dense="true"
                  :label="badge.label"
                  :color="badge.color"
                  :class="`text-${badge.color}`"
                />
              </div>
            </div>
          </div>
          <div
            class="col q-pl-md"
            style="height: 99%"
          >
            <div class="row flex items-center justify-between q-mb-sm">
              <div class="form__item-label text-weight-thin q-pr-lg col">
                Selecciona una fecha resaltada en el calendario y carga los equipos con mantenimiento programado </div>
              <btn-switch
                class="col-auto"
                v-model:switch-content="switchContent"
              />
            </div>

            <div
              style="overflow: scroll; height: 90%"
              class="row w-100 q-pa-none q-ma-none"
            >
              <q-scroll-area
                v-if="switchContent === 1"
                class="fit"
                style="height: 88% !important"
                :thumb-style="{
                  right: '6px',
                  borderRadius: '5px',
                  background: 'rgba(29, 100, 231, 0.2)',
                  width: '5px',
                  opacity: 1,
                }"
              >
                <div style="max-width: 100%">
                  <div
                    v-if="equipments && equipments.length > 0"
                    class="row q-pa-none q-ma-none"
                  >
                    <div
                      class="col-sm-auto q-pa-xs col-xs-12"
                      v-for="(equipo, index) in equipments"
                      :key="index"
                    >
                      <item-card
                        v-bind="equipo"
                        :index="index"
                        :card-action="goToDetails"
                      />
                    </div>
                  </div>

                  <div
                    v-else-if="loading"
                    class="q-ma-xl q-pa-xl text-center no-info"
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
                    class="q-ma-xl q-pa-xl text-center no-info"
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
                class="w-100"
                height="65vh"
                v-model:row-selected="rowSelected"
                :rows="rows"
                :columns="columns"
                :actions-table="actionsTable"
                :pagination-prop="pagination"
                :loading="loading"
                @change-pagination="changePagination"
              />
            </div>
          </div>
        </div>
      </div>
      <!-- Main container -->
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue';
import HeaderActions from 'src/components/compose/HeaderActions.vue';
import ItemCard from 'src/components/atomic/ItemCard.vue';
import BtnSwitch from 'src/components/atomic/BtnSwitch.vue';
import GeneralTable from 'src/components/compose/GeneralTable.vue';

export default defineComponent({
  name: 'CalendarPage',
  components: {
    HeaderActions,
    ItemCard,
    GeneralTable,
    BtnSwitch,
  },
  data() {
    return {
      date: ref('2019/02/01'),

      loading: true,

      selectedFilter: '#10D13A',
      events: [],
      optionsFilter: [
        { color: 'primary', label: 'Mantenimientos hechos', value: 'opt1' },
        {
          color: 'secondary',
          label: 'Mantenimientos programados',
          value: 'opt2',
        },
        // { color: 'secondary', label: 'Recordatorios', value: 'opt3' },
      ],

      btnAction: {
        show: true,
        btnTitle: 'Crear plan de mantenimientos',
        to: 'add-maintenance-plan',
      },

      delaySearch: 300,
      searchModel: null,
      showCards: true,
      switchContent: 1,
      timeoutSearch: null,

      localPagination: {},

      rowSelected: {},

      selectedFilterText: 'name',

      paginationCards: {
        descending: false,
        rowsPerPage: 12,
        page: 1,
      },

      params: {
        date: '2024-03-01'
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
          label: 'No. serie',
          field: 'no_serie',
          align: 'center',
          sortable: true,
        },
        // {
        //   name: 'date',
        //   label: 'fecha de creacion',
        //   field: 'date',
        //   align: 'center',
        //   sortable: true,
        // },
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
    this.getEquipmentsByDate();

    const currentDate = new Date();

    this.getDatesPerMonth({
      year: currentDate.getFullYear(),
      month: currentDate.getMonth() + 1,
    })
  },

  methods: {

    async getDatesPerMonth(date) {
      if (date) {
        let formattedPayload = date.year + '-' + date.month.toString().padStart(2, '0')

        const events = await this.$store.dispatch('equipments/getDatesPerMonthAction', formattedPayload);
        console.log(events)
        this.events = events
      }
    },

    goToDetails(payload) {
      console.log('Ver detalle', payload);
      this.$router.push({ name: 'detail-equipment', params: { id: 100 } });
    },
    goToEdit(payload) {
      console.log('Editar', payload);
      this.$router.push({ name: 'edit-equipment', params: { id: 100 } });
    },

    async getEquipmentsByDate(date = null) {
      try {
        this.loading = true;
        // Obtener los componentes de la fecha

        date = new Date(date)

        const year = date.getUTCFullYear();
        const month = (date.getUTCMonth() + 1).toString().padStart(2, '0'); // Los meses van de 0 a 11
        const day = date.getUTCDate().toString().padStart(2, '0');

        // Formatear la fecha como YYYY-MM-DD
        const fechaFormateada = `${year}-${month}-${day}`;
        this.params.date = fechaFormateada;

        await this.$store.dispatch('equipments/getEquipmentsByDateAction', this.params);
        this.loading = false;
      } catch (error) {
        console.log(error);
        this.$store.commit('equipments/MUTATE_EQUIPMENTS', []);
        console.log(error.response);
      }
    },

    changePagination(pagination) {
      this.params = {
        ...this.params, ...{
          page: pagination.page,
          rowsPerPage: pagination.rowsPerPage,
        }
      }

      this.getEquipmentsByDate();
    },

    changePaginationCards(page) {

      this.params = {
        ...this.params, ...{
          page,
          rowsPerPage: 12,
        }
      }

      this.getEquipmentsByDate();
    }
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

    // searchModel(val) {
    //   this.params[this.selectedFilterText] = val

    //   clearTimeout(this.timeoutSearch);

    //   this.timeoutSearch = setTimeout(() => {
    //     this.getEquipmentsByDate(this.params);
    //   }, this.delaySearch);
    // },

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
          id: e.id,
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
  }
});
</script>

<style lang="scss" scoped>
.container-colorama {
  max-width: 420px !important;
  border-radius: 5px;
}

.text-subtitle {
  font-style: normal;
  font-weight: 200;
  font-size: 20px;
  font-family: "Inter";
  color: $primary;
}
</style>
