<template>
  <q-page class="flex flex-center cursor-pointer non-selectable">
    <q-form
      ref="myForm"
      class="card-page"
    >
      <div class="column items-end q-mt-md q-mb-xs">
        <btn-action v-bind="btnCloseWindow" />
      </div>

      <header-actions
        titlePage="Detalles del plan de mantenimientos"
        :btn-action="btnAction"
      />

      <div
        class="main-container-page main-container-page-medium-dark"
        style="height: 82%"
      >
        <q-scroll-area
          class="full-height q-px-lg q-pb-lg"
          style="height: 92% !important"
          :thumb-style="$store.getters['global/getThumbStyle']"
        >
          <div
            v-if="form.planName"
            class="row items-center q-mb-sm"
          >
            <div class="q-pt-sm form__item-label text-weight-thin">
              Nombre del plan
            </div>
            <div class="col-12 form__item-model text-weight-medium">
              {{ form.planName }}
            </div>
          </div>

          <div class="row d-flex justify-between">
            <div class="col-12 q-mb-sm">
              <div class="q-py-sm form__item-label text-weight-thin">
                Listado de equipos y fechas programadas de los mantenimientos
              </div>
              <div class="border-rounded border-line border-rounded q-pa-md">
                <div style="height: 100%">
                  <div class="row">
                    <div class="col-auto q-pa-xs">
                      <general-table
                        style="height: 43vh; overflow-y: scroll;"
                        class="w-100"
                        :rows="rows"
                        :columns="columns"
                        :paginationProp="{
                          rowsPerPage: null
                        }"
                        :show-pagination="false"
                      />
                    </div>

                    <div class="col q-px-sm">
                      <div
                        v-for="( day, index ) in sortedDates"
                        :key="index"
                      >
                        <div
                          class="text-left chip-date q-mt-sm q-pa-xs q-px-sm flex flex-center align-center justify-between"
                        >
                          {{ calcDate(day) }}
                        </div>
                        <div
                          style="font-size: 10px;"
                          class="text-primary q-px-sm"
                        >
                          {{ index == 0 ? 'Primer día de mantenimientos' : '' }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            class="col-12"
            v-if="form.observations"
          >
            <div class="q-py-sm form__item-label text-weight-thin">
              Observaciones
            </div>
            <div
              style="border-radius: 5px; height: 80%;"
              class="q-pa-sm border-line"
            >
              <div
                class="col-12 q-pr-md form__item-area"
                v-html="form.observations"
              />
            </div>
          </div>
        </q-scroll-area>
        <div
          class="col-12 form__date_container form__date column justify-center q-px-lg"
          style="height: 6%"
        >
          <div>Fecha de creación: <strong>{{ form.createdAt }}</strong></div>
        </div>
      </div>
    </q-form>
  </q-page>
</template>

<script>

import { defineComponent } from 'vue';
import BtnAction from 'src/components/atomic/BtnAction.vue';
import HeaderActions from 'src/components/compose/HeaderActions.vue';
import GeneralTable from 'src/components/compose/GeneralTable.vue';

export default defineComponent({
  name: 'EquipmentsPage',
  components: {
    HeaderActions,
    BtnAction,
    GeneralTable
  },
  data() {
    return {
      btnAction: {
        show: true,
        btnTitle: 'Guardar',
        btnWidth: 'auto',
        loader: false,
        btnAction: this.createOrEdit,
      },

      btnCloseWindow: {
        iconName: 'close',
        btnBackground: '#FF9900',
        btnColor: '#FFFFFF',
        btnSize: 'xs',
        btnAction: this.goBack,
      },

      rows: [],

      form: {
        id: null,
        planName: '',
        observations: '',
        createdAt: '',
        maintenanceDates: [],
      },

      columns: [
        {
          name: 'categoryName',
          required: true,
          label: 'Equipo',
          align: 'left',
          field: 'categoryName',
          sortable: true,
        },
        {
          name: 'equipmentModel',
          label: 'Modelo',
          field: 'equipmentModel',
          align: 'left',
          sortable: true,
        },
        {
          name: 'location',
          label: 'Ubicación',
          field: 'location',
          align: 'left',
          sortable: true,
        },
        {
          name: 'serialNumber',
          label: 'No. serie',
          field: 'serialNumber',
          align: 'center',
          sortable: true,
        }
      ],
    };
  },

  created() {
    this.getMaintenancePlan()
  },

  computed: {
    categories() {
      return this.$store.getters['equipments/getCategoriesGetter'];
    },

    sortedDates() {
      if (this.form?.maintenanceDates?.length >= 1) {
        const unsortedDates = [...this.form.maintenanceDates];
        const sortedDates = unsortedDates.sort((a, b) => new Date(a) - new Date(b));
        return sortedDates
      } else if (this.form.maintenanceDates?.lenght == 0) return []
      else return this.form.maintenanceDates
    },
  },

  watch: {
    'form.maintenanceDates': {
      handler(val, oldVal) {
        if (val && val != oldVal) {
          this.form.maintenanceDates = Array.isArray(val) ? val : [val];
        }
      },
      immediate: true, // Para manejar el caso cuando el componente se carga inicialmente
    },
  },

  methods: {
    async getMaintenancePlan() {
      const params = {
        id: this.$route.params.id
      }

      this.form = { ...this.form, ...await this.$store.dispatch('maintenancePlans/getMaintenancePlanAction', params) }

      this.rows = []

      this.form.equipments.forEach((e => {
        this.rows = [...this.rows, ...e.children]
      }))
    },

    calcDate(date) {
      const initialDate = new Date(date);
      initialDate.setDate(initialDate.getDate() + 1);
      const optFormat = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
      return initialDate.toLocaleDateString('es-MX', optFormat);
    },

    goBack() {
      this.$router.go(-1);
    }
  },
});
</script>

<style lang="scss" scoped>
.main-container-page {
  background-color: white;
}

.card-page {
  padding-top: 0 !important;
}

.chip-date {
  background-color: rgba($primary, 0.1);
  max-width: 300px;
  color: rgb(147, 150, 156);
  border-radius: 8px;
}
</style>
