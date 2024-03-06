<template>
  <q-page class="flex flex-center cursor-pointer non-selectable">
    <div class="card-page">
      <header-actions
        :titlePage="'Calendario de mantenimientos'"
        :btnAction="btnAction"
      />
      <!-- Main container -->
      <div class="main-container-page main-container-page-medium-dark bg-grey-3 row h-90 q-pa-md-md">
        <div class="col-xs-12 col-md-auto">
          <q-date
            v-model="calendarModel"
            today-btn
            color="primary"
            mask="YYYY-MM-DD"
            class="text-blue-blue-grey-4 border-line border-rounded gt-xs form__date_container"
            landscape
            :events="events"
            @update:model-value="getEquipmentsByDate"
            @navigation="getDatesPerMonth"
          />

          <q-date
            v-model="calendarModel"
            today-btn
            color="primary"
            mask="YYYY-MM-DD"
            class="text-blue-blue-grey-4 border-line border-rounded lt-sm w-100 form__date_container"
            :events="events"
            @update:model-value="getEquipmentsByDate"
            @navigation="getDatesPerMonth"
          />
        </div>

        <div class="col-md col-12 q-px-sm h-90">
          <div class="row flex items-center justify-between q-mb-sm q-pa-xs-md">
            <div class="form__item-label text-weight-thin col">
              Selecciona una fecha en el calendario
            </div>
            <btn-switch
              class="col-auto"
              v-model:switch-content="switchContent"
            />
          </div>

          <div
            style="overflow: scroll"
            class="row q-pa-none q-px-md-md q-ma-none h-100 w-100"
          >
            <q-scroll-area
              v-if="switchContent === 1"
              class="fit h-90"
              :thumb-style="{
                right: '6px',
                borderRadius: '5px',
                background: 'rgba(29, 100, 231, 0.2)',
                width: '5px',
                opacity: 1,
              }"
            >
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
            </q-scroll-area>

            <div
              v-if="switchContent === 1 && equipments.length > 0"
              class="row justify-center q-pt-sm"
              style="height: 6.55%"
            >
              <q-pagination
                v-model="localPagination.page"
                :disable="loading"
                dense
                class="q-mt-none pagination-style"
                size="md"
                direction-links
                boundary-numbers
                :max-pages="6"
                :max="localPagination.totalPages"
                @update:model-value="changePagination"
              />
            </div>

            <general-table
              v-else-if="switchContent === 2"
              v-model:row-selected="rowSelected"
              class="w-100 h-100"
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
      <!-- Main container -->
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue';
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
      calendarModel: null,

      loading: true,

      selectedFilter: 'secondary',

      events: [],

      btnAction: {
        show: true,
        tooltip: 'Agregar nuevo plan',
        btnTitle: 'Crear plan de mantenimientos',
        to: 'add-maintenance-plan',
      },

      delaySearch: 300,
      searchModel: null,
      showCards: true,
      switchContent: 1,
      timeoutSearch: null,

      localPagination: {
        totalPages: 1,
        descending: false,
        rowsPerPage: 20,
        page: 1,
      },

      rowSelected: {},

      selectedFilterText: 'name',

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
        },
        {
          icnName: 'engineering',
          icnSize: 'xs',
          icnAction: 'Maintenance',
          tooltip: 'Realizarle mantenimiento',
        },
      ],
    };
  },

  created() {
    this.checkPermissions()
    this.checkParamsFromCreated()
  },

  methods: {
    async initInfo() {
      this.calendarModel = this.formatDate();

      const currentDate = new Date();

      await this.getDatesPerMonth({
        year: currentDate.getFullYear(),
        month: currentDate.getMonth() + 1,
      })

      await this.getEquipmentsByDate();
    },

    async getDatesPerMonth(date) {
      if (date) {
        let formattedPayload = date.year + '-' + date.month.toString().padStart(2, '0')
        const events = await this.$store.dispatch('equipments/getDatesPerMonthAction', formattedPayload);
        this.events = events
      }
    },

    async getEquipmentsByDate(date = null, changingPagination = false) {
      try {
        let auxDate = date ? date.replace(/-/g, '/') : this.formatDate().replace(/-/g, '/');
        this.loading = true;
        if (this.events.includes(auxDate)) {
          this.params.date = this.formatDate(date)
          await this.$store.dispatch('equipments/getEquipmentsByDateAction', this.params);
          this.localPagination = JSON.parse(JSON.stringify(this.pagination))
        } else if (this.params.date && changingPagination === true) {
          await this.$store.dispatch('equipments/getEquipmentsByDateAction', this.params);
          this.localPagination = JSON.parse(JSON.stringify(this.pagination))
        } else {
          this.$store.commit('equipments/MUTATE_EQUIPMENTS', []);
        }

        this.$store.dispatch('global/addGlobalsToLocalStorage', {
          paramsCalendarPage: date
        });

        this.loading = false;
      } catch (error) {
        console.log(error);
        this.$store.commit('equipments/MUTATE_EQUIPMENTS', []);
      }
    },

    async goToMaintenance(payload) {
      this.$store.commit('equipments/MUTATE_EQUIPMENT', null)
      await this.getEquipment(payload)
      this.$router.push({
        name: 'add-maintenance'
      });
    },

    async getEquipment(id) {
      await this.$store.dispatch('equipments/getEquipmentAction', { id })
    },

    checkPermissions() {
      switch (this.userRole) {
        case 2:
        case 3:
          this.btnAction.show = false;
          break;
      }
    },

    async checkParamsFromCreated() {
      if (this.localStorage?.paramsCalendarPage) {

        let dateLS = new Date(this.localStorage.paramsCalendarPage)

        this.calendarModel = this.formatDate(dateLS);

        await this.getDatesPerMonth({
          year: dateLS.getFullYear(),
          month: dateLS.getMonth() + 1,
        })

        await this.getEquipmentsByDate(this.localStorage.paramsCalendarPage);
      } else {
        this.initInfo()
      }
    },

    formatDate(date) {
      if (!date) {
        const currentDate = new Date();
        date = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
      } else {
        date = new Date(date)
      }
      // Obtener los componentes de la fecha
      const year = date.getUTCFullYear();
      const month = (date.getUTCMonth() + 1).toString().padStart(2, '0'); // Los meses van de 0 a 11
      const day = date.getUTCDate().toString().padStart(2, '0');
      // Formatear la fecha como YYYY-MM-DD
      const fechaFormateada = `${year}-${month}-${day}`;

      return fechaFormateada;
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

      this.getEquipmentsByDate(null, true);
    }
  },

  watch: {
    rowSelected: {
      handler(val) {
        if (val.action === 'Edit') {
          this.goToEdit(val.id);
        } else if (val.action === 'Detail') {
          this.goToDetails(val.id);
        } else if (val.action === 'Maintenance') {
          this.goToMaintenance(val.id);
        }
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
          model: e.cardLabels[0].info,
          no_serie: e.cardLabels[1].info,
          date: e.cardDate,
        };
      });
    },

    pagination: {
      get() {
        return JSON.parse(JSON.stringify(this.$store.getters['equipments/getPaginationGetter']));
      },
    },

    localStorage: {
      get() {
        return JSON.parse(JSON.stringify(this.$store.getters['global/getlocalStorageGetter']));
      },
    },

    userRole: {
      get() {
        return this.$store.getters['users/getRoleGetter'];
      },
    }
  }
});
</script>

<style lang="scss" scoped>
.container-colorama {
  max-width: 420px !important;
}

.text-subtitle {
  font-style: normal;
  font-weight: 200;
  font-size: 20px;
  font-family: "Inter";
  color: $primary;
}
</style>
