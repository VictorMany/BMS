<template>
  <q-page class="flex flex-center cursor-pointer non-selectable">
    <div class="card-page">
      <header-actions
        titlePage="Mantenimientos agendados"
        v-model:switch-content="switchContent"
      />

      <div
        class="main-container-page q-pa-sm h-93"
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
                  @click="goToMaintenance(maintenance.PlanDateId)"
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
          rowKey="PlanDateId"
          :height="'100%'"
          :rows="scheduled"
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
      loading: true,
      switchContent: 1,
      paramsFromCreated: false,

      localPagination: {
        totalPages: 1,
        descending: false,
        rowsPerPage: 20,
        page: 1,
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
        { name: 'maintenanceDate', label: 'Fecha agendada', field: 'maintenanceDate', align: 'left', sortable: true },
        {
          name: 'badge',
          required: true,
          label: 'Tipo',
          align: 'center',
          field: () => 'Agendado',
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

      params: {},
    }
  },

  mounted() {
    this.getScheduled()
  },

  watch: {
    rowSelected: {
      handler(val) {
        if (val.action === 'Maintenance') {
          this.goToMaintenance(val.key);
        }
      },
      deep: true,
    },
  },

  computed: {
    scheduled() {
      return this.$store.getters['equipments/getEquipmentsGetter'];
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
          PlanDateId: e.PlanDateId,
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
              info: e.maintenanceDate,
            }
          ],
        };
      });
    },
  },

  created() {
    this.checkParamsFromCreated()
  },

  methods: {
    async getScheduled() {
      this.loading = true

      await this.$store.dispatch('equipments/getPendingMaintenancesAction', this.params);
      this.localPagination = JSON.parse(JSON.stringify(this.pagination))

      this.paramsFromCreated = false
      this.localPagination = JSON.parse(JSON.stringify(this.pagination))
      this.$store.dispatch('global/addGlobalsToLocalStorage', {
        paramsScheduledPage: { ...this.params }
      });

      this.loading = false
    },

    async goToMaintenance(payload) {
      this.$store.commit('equipments/MUTATE_EQUIPMENT', null)
      this.$store.commit('reports/MUTATE_REPORT', null)

      let equipment = this.scheduled.find(e => e.PlanDateId === payload);

      const formattedMaintenance = {
        id: payload,
        IdEquipment: equipment.id,
        PlanDateId: equipment.PlanDateId,
        // FOR THE DETAILS MAINTENANCE AND REPORT
        serialNumber: equipment.serialNumber,
        equipmentModel: equipment.equipmentModel,
        equipmentName: equipment.equipmentName,
        categoryName: `${equipment.equipmentName} - ${equipment.equipmentModel} - No. serie: ${equipment.serialNumber}`,
        isFromScheduled: true,
        photo: equipment.cardImg,
        maintenanceDate: equipment.maintenanceDate,
      }

      this.$store.commit('equipments/MUTATE_EQUIPMENT', formattedMaintenance)

      this.$router.push({
        name: 'add-maintenance'
      });
    },

    checkParamsFromCreated() {
      if (this.localStorage?.paramsScheduledPage) {
        this.params = { ...this.localStorage?.paramsScheduledPage };
      }

      if (this.localStorage?.search) {
        this.paramsFromCreated = true
      }
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
