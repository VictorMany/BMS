<template>
  <q-page class="flex flex-center cursor-pointer non-selectable">
    <q-form
      ref="myForm"
      class="card-page"
    >
      <header-actions
        titlePage="Detalles del plan"
        :btn-actions="btnActions"
        :btn-close-window="btnCloseWindow"
      />

      <div class="main-container-page main-container-page-medium-dark container-form">
        <q-scroll-area
          class="h-97 q-pa-md"
          :thumb-style="$store.getters['global/getThumbStyle']"
        >
          <div class="w-100 q-mb-sm">
            <div class="q-pa-sm border-rounded form__label-area bg-accent">
              <strong class="q-mr-sm">Fecha de creación: </strong>
              {{ form.createdAt }}
            </div>
          </div>
          <div class="q-pa-xs">
            <div
              v-if="form.planName"
              class="row items-center"
            >
              <div class="form__item-label text-weight-medium">
                Nombre del plan
              </div>
              <div class="col-12 form__item-model text-weight-medium">
                {{ form.planName }}
              </div>
            </div>

            <div class="row d-flex justify-between">
              <div class="col-12">
                <div class="form__item-label text-weight-medium q-mt-lg q-mb-xs">
                  Listado de equipos y fechas programadas de los mantenimientos
                </div>
                <div
                  class="row"
                  style="gap: 20px;"
                >
                  <div class="col-12 col-sm container-table-plans q-mt-sm">
                    <general-table
                      style="overflow: scroll;"
                      class="w-100"
                      :height="'auto'"
                      :rows="rows"
                      :columns="columns"
                      v-model:row-selected="rowSelected"
                      :paginationProp="{
                        rowsPerPage: null
                      }"
                      :show-pagination="false"
                      :actions-table="actionsTable"
                    />
                  </div>

                  <div class="col-12 col-sm">
                    <div
                      v-for="( day, index ) in sortedDates"
                      :key="index"
                    >
                      <div
                        class="text-left chip-date border-rounded q-mt-sm q-pa-xs q-px-sm flex flex-center align-center justify-between"
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

            <div
              class="col-12"
              v-if="form.observations"
            >
              <div class="form__item-label text-weight-medium q-mt-lg q-mb-sm">
                Observaciones
              </div>
              <div
                style="height: 80%;"
                class="q-pa-sm border-line border-rounded"
              >
                <div
                  class="col-12 q-pr-md form__label-area"
                  v-html="form.observations"
                />
              </div>
            </div>
          </div>
        </q-scroll-area>
      </div>
    </q-form>
  </q-page>
</template>

<script>

import { defineComponent } from 'vue';
import HeaderActions from 'src/components/compose/HeaderActions.vue';
import GeneralTable from 'src/components/compose/GeneralTable.vue';
import { showSuccess, showWarning } from 'app/utils/utils';

export default defineComponent({
  name: 'EquipmentsPage',
  components: {
    HeaderActions,
    GeneralTable
  },
  data() {
    return {
      btnActions: [
        {
          show: true,
          btnTitle: 'Editar plan',
          iconName: 'edit',
          btnWidth: 'auto',
          loader: false,
          tooltip: 'Ir a editar plan de mantenimientos',
          to: this.getIdToEdit(),
        },
        {
          show: true,
          btnTitle: 'Eliminar plan',
          iconName: 'delete',
          btnWidth: 'auto',
          loader: false,
          tooltip: 'Eliminar el plan de mantenimientos',
          btnAction: this.removePlan,
        }
      ],

      btnCloseWindow: {
        iconName: 'exit_to_app',
        btnBackground: '#FF990020',
        btnColor: '#FF9900',
        btnAction: this.goBack
      },

      rows: [],

      rowSelected: {},

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
        },
        { name: 'actions', label: 'Acciones', field: 'actions', align: 'center' }
      ],

      actionsTable: [
        {
          icnName: 'engineering',
          icnSize: 'xs',
          icnAction: 'Maintenance',
          tooltip: 'Realizarle mantenimiento'
        },
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

    rowSelected: {
      handler(val) {
        console.log(val.id)

        if (val.action === 'Maintenance') {
          console.log(val.id)
          this.goToMaintenance(val.id);
        }
      },
      deep: true,
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

    async goToMaintenance(payload) {
      this.$store.commit('equipments/MUTATE_EQUIPMENT', null)
      this.$store.commit('reports/MUTATE_REPORT', null)

      await this.getEquipment(payload)

      this.$router.push({
        name: 'add-maintenance'
      });
    },

    async getEquipment(id) {
      await this.$store.dispatch('equipments/getEquipmentAction', { id })
    },

    async removePlan() {
      try {
        const res = await this.$store.dispatch(
          'maintenancePlans/deleteMaintenancePlanAction',
          this.$route.params.id
        );
        if (res === true) {
          showSuccess(this.$q, { title: 'Éxito al eliminar el plan', msg: 'El plan de mantenimientos se ha eliminado' });
          this.goBack()
        } else {
          showWarning(this.$q, { msg: 'Inténtalo de nuevo más tarde y si el error persiste, repórtalo' });
        }
      } catch (error) {
        console.log(error)
      }
    },

    getIdToEdit() {
      return `edit-${this.$route.params.id}-maintenance-plan`
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



.chip-date {
  background-color: rgba($primary, 0.1);
  max-width: 300px;
  color: rgb(147, 150, 156);
}
</style>
