<template>
  <q-page class="flex flex-center cursor-pointer non-selectable">
    <q-form
      ref="myForm"
      class="card-page"
    >
      <header-actions
        :titlePage="getTitle()"
        :btn-action="btnAction"
        :btn-close-window="btnCloseWindow"
      />

      <div class="main-container-page main-container-page-medium-dark container-form">
        <q-scroll-area
          class="q-pa-md q-pa-lg-lg h-97"
          :thumb-style="$store.getters['global/getThumbStyle']"
        >
          <div
            class="form__item-label text-weight-medium q-mb-lg q-pa-md border-rounded"
            style="background-color: #008cff2b;"
          >
            1-. Elige un nombre para el plan y los equipos que desees incluir
          </div>

          <div class="col q-pr-md form__item-label text-weight-thin">
            Nombre del plan
          </div>

          <q-input
            v-model="form.planName"
            borderless
            dense
            hide-hint
            hide-bottom-space
            :rules="[
              rules.requiredString,
              rules.maxLength(50)
            ]"
            class="form__input bg-accent q-mb-lg"
          />

          <div
            class="row"
            style="gap: 20px"
          >
            <div class="col-12 col-sm-auto col-md-4 border-line q-pa-sm border-rounded bg-accent">
              <q-input
                ref="filterRef"
                v-model="filter"
                borderless
                dense
                class="form__input q-input-equipments"
                label="Buscar - Filtrar equipos"
              >
                <template v-slot:append>
                  <q-icon
                    v-if="filter !== ''"
                    name="clear"
                    class="cursor-pointer"
                    @click="resetFilter"
                  />
                </template>
              </q-input>

              <q-tree
                v-model:ticked="form.equipmentIds"
                class="font-tree"
                no-transition
                :nodes="localCategories"
                tick-strategy="leaf"
                node-key="id"
                no-nodes-label="No hay equipos para mostrar"
                label-key="label"
                :filter="filter"
                :filter-method="filterEquipments"
                @lazy-load="getEquipmentsByCategory"
              />
            </div>

            <div class="col-12 col-sm container-table-plans">
              <general-table
                class="w-100"
                style="height: auto;"
                :rows="rows"
                :columns="columns"
                :paginationProp="{
                  rowsPerPage: null
                }"
                :show-pagination="false"
              />
            </div>
          </div>

          <div
            class="form__item-label text-weight-medium q-my-lg q-pa-md border-rounded"
            style="background-color: #008cff2b;"
          >
            2-. Selecciona las fechas de los mantenimientos
          </div>

          <div
            class="row"
            style="gap: 20px"
          >
            <div class="col-sm-auto col-12">
              <div
                class="row q-mb-md"
                style="max-width: 418px"
              >
                <div class="col-auto ">
                  <q-checkbox
                    size="sm"
                    v-model="form.hasFrequency"
                    label="Frecuencia"
                    class="form__checkbox q-mr-md q-pa-sm border-rounded"
                    dense
                  />
                </div>

                <div
                  class="col"
                  v-if="form.hasFrequency"
                >
                  <q-select
                    v-model="form.maintenanceFrequency"
                    :options="options"
                    dense
                    hide-hint
                    :disable="!form.hasFrequency"
                    hide-bottom-space
                    bottom-slots
                    stack-label
                    class="form__select bg-accent"
                    borderless
                  >
                    <template v-slot:option="scope">
                      <q-item
                        v-bind="scope.itemProps"
                        dense
                      >
                        <q-item-section>
                          <q-item-label :class="scope.selected ? 'primary' : 'text-grey'">{{ scope.label
                          }}</q-item-label>
                        </q-item-section>
                      </q-item>
                    </template>
                  </q-select>
                </div>

                <div
                  style="font-size: 12px;"
                  class="text-primary q-pa-sm"
                >
                  <span style="font-size: 16px; line-height: 1.2; vertical-align: middle;">ⓘ</span>
                  <span style="margin-left: 5px;">Usa la frecuencia para calcular automáticamente las fechas de
                    mantenimiento a partir de una fecha inicial.</span>
                </div>
              </div>

              <q-date
                ref="myDatePicker"
                v-model="form.maintenanceDates"
                mask="YYYY-MM-DD"
                class="text-blue-blue-grey-4 border-line border-rounded w-100 lt-md"
                :multiple="!form.hasFrequency"
              />

              <q-date
                ref="myDatePicker"
                v-model="form.maintenanceDates"
                mask="YYYY-MM-DD"
                class="text-blue-blue-grey-4 border-line border-rounded not-show-in-mobile"
                :multiple="!form.hasFrequency"
                landscape
              />
            </div>

            <div class="col-sm col-12">
              <div
                v-if="sortedDates.length > 0"
                class="form__item-label text-weight-thin"
              >
                Lista de fechas agendadas
              </div>

              <div
                v-for="( day, index ) in sortedDates"
                :key="index"
              >
                <div
                  class="text-left chip-date border-rounded q-mt-sm q-pa-xs q-px-sm flex flex-center align-center justify-between"
                  @click="setCalendarTo(day)"
                >
                  {{ calcDate(day) }}
                  <q-avatar
                    v-if="!form.maintenanceFrequency"
                    @click="deleteDate(day)"
                    size="xs"
                    class="avatar-item "
                  >
                    <q-icon name="close" />
                  </q-avatar>
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

          <div>
            <div
              class="form__item-label text-weight-medium q-my-lg q-pa-md border-rounded"
              style="background-color: #008cff2b;"
            >
              3-. Agrega algunas observaciones (opcional)
            </div>

            <div class="w-100">
              <q-editor
                v-model="form.observations"
                :placeholder="'Escribe aquí las notas del plan de mantenimientos'"
                class="form__textarea bg-accent border-rounded"
                :toolbar="[
                  [
                    {
                      label: $q.lang.editor.fontSize,
                      icon: $q.iconSet.editor.fontSize,
                      fixedLabel: true,
                      fixedIcon: true,
                      list: 'no-icons',
                      options: [
                        'size-1',
                        'size-2',
                        'size-3',
                        'size-4',
                      ],
                    },
                    'bold',
                    'italic',
                    'strike',
                    'underline',
                  ],
                  ['unordered', 'ordered'],
                ]"
              />
            </div>
          </div>
        </q-scroll-area>
      </div>
    </q-form>
  </q-page>
</template>

<script>

import { ref, defineComponent } from 'vue';
import HeaderActions from 'src/components/compose/HeaderActions.vue';
import GeneralTable from 'src/components/compose/GeneralTable.vue';
import { addMonths, format } from 'date-fns';
import { rules, showWarning, showSuccess } from 'app/utils/utils';


export default defineComponent({
  name: 'EquipmentsPage',
  components: {
    HeaderActions,
    GeneralTable
  },

  data() {
    return {
      delaySearch: 300,
      timeoutSearch: null,

      btnAction: {
        show: true,
        btnTitle: 'Guardar',
        iconName: 'save',
        btnWidth: 'auto',
        loader: false,
        tooltip: 'Agregar plan de mantenimientos',
        btnAction: this.createOrEdit,
      },

      btnCloseWindow: {
        iconName: 'exit_to_app',
        btnBackground: '#FF990020',
        btnColor: '#FF9900',
        btnAction: this.goBack
      },

      form: {
        id: null,
        planName: '',
        observations: '',
        createdAt: this.getCreatedAt(),
        userId: '',
        equipmentIds: [],
        hasFrequency: false,
        maintenanceFrequency: null,
        maintenanceDates: []
      },

      filter: ref(''),
      filterRef: ref(null),

      options: [
        'Mensual',
        'Bimestral',
        'Trimestral',
        'Semestral'
      ],

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

      localCategories: [],
      rules
    };
  },

  created() {
    this.getCategories();
  },

  computed: {
    categories() {
      return this.$store.getters['equipments/getCategoriesGetter'];
    },

    rows() {
      let children = [];
      this.localCategories.forEach(category => {
        if (category.children && category.children.length > 0) {
          const filteredChildren = category.children.filter(child => this.form.equipmentIds.includes(child.id));
          children.push(...filteredChildren);
        }
      });

      return children
    },

    dateItems() {
      if (this.form.maintenanceDates?.length >= 1 && this.form.maintenanceFrequency) {
        return this.calculateRemainingDates(this.form.maintenanceDates[0], this.form.maintenanceFrequency);
      } else return this.form.maintenanceDates
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

    dateItems: {
      handler(val) {
        if (val?.length != 1 && val?.toString() != this.form?.maintenanceDates?.toString()) {
          this.form.maintenanceDates = val
        }
      },
      deep: true
    },

    'form.hasFrequency'(val) {
      if (!val) {
        this.form.maintenanceFrequency = null
      }
    }
  },

  methods: {
    async createMaintenancePlan() {
      this.btnAction.loader = true;
      try {
        const res = await this.$store.dispatch(
          'maintenancePlans/postMaintenancePlanAction',
          this.form
        );
        if (res === true) {
          showSuccess(this.$q, { title: 'Éxito al crear el plan', msg: 'El plan de mantenimientos se ha agregado' });
          this.$router.go(-1);
        } else {
          showWarning(this.$q, { msg: 'Inténtalo de nuevo más tarde y si el error persiste, repórtalo' });
        }
        this.btnAction.loader = false;
      } catch (error) {
        this.btnAction.loader = false;
      }
    },

    async getMaintenancePlan() {
      try {
        const params = {
          id: this.$route.params.id
        }
        this.form = { ...this.form, ...await this.$store.dispatch('maintenancePlans/getMaintenancePlanAction', params) }
      } catch (error) {
        console.log(error)
      }
    },

    async editMaintenancePlan() {
      this.btnAction.loader = true;
      try {
        this.form.id = this.$route.params.id

        const res = await this.$store.dispatch(
          'maintenancePlans/updateMaintenancePlanAction',
          this.form
        );
        if (res === true) {
          showSuccess(this.$q, { title: 'Éxito al editar el plan de mantenimientos', msg: 'El plan de mantenimientos se ha actualizado' });
          this.$router.go(-1);
        } else {
          showWarning(this.$q, { msg: 'Inténtalo de nuevo más tarde y si el error persiste, repórtalo' });
        }
        this.btnAction.loader = false;
      } catch (error) {
        this.btnAction.loader = false;
      }
    },

    async createOrEdit() {
      this.$refs.myForm.validate().then(success => {
        if (success && this.validatePayload()) {
          if (this.isEditing()) {
            this.editMaintenancePlan()
          } else {
            this.createMaintenancePlan()
          }
        } else {
          return false
        }
      })
    },

    async getCategories() {
      try {
        await this.$store.dispatch('equipments/getCategoriesAction')
        this.localCategories = JSON.parse(JSON.stringify(this.categories));

        if (this.isEditing()) {
          await this.getMaintenancePlan()
          if (this.form && this.form?.equipments) {

            this.form.equipments.forEach((cat) => {
              let existingCategory = this.localCategories.find((cat2) => cat.id === cat2.id);
              if (existingCategory) {
                existingCategory.children = cat.children;
              } else {
                this.localCategories.unshift(cat);
              }
            });
          }
        }
      } catch (error) {
        console.log(error)
      }
    },

    async getEquipmentsByCategory({ key, node, done }) {
      try {
        const equipments = [
          ...node.children,
          ...await this.$store.dispatch('equipments/getEquipmentsByCategoryAction', {
            categoryId: key
          })]


        if (equipments.length > 0)
          done(equipments)
        else done([])
      } catch (error) {
        console.log(error)
      }
    },

    getTitle() {
      if (this.isEditing()) {
        return 'Editar plan'
      }
      else return 'Nuevo plan'
    },

    getCreatedAt() {
      if (this.isEditing()) {
        return ''
      }
      else return this.$store.getters['global/getDate']
    },

    isEditing() {
      return this.$route.params.id ? true : false
    },

    calcDate(date) {
      const initialDate = new Date(date);
      initialDate.setDate(initialDate.getDate() + 1);
      const optFormat = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
      return initialDate.toLocaleDateString('es-MX', optFormat);
    },

    calculateRemainingDates(initialDate, frequency) {
      const dates = [new Date(initialDate)];
      dates[0].setDate(dates[0].getDate() + 1);


      const currentYear = new Date().getFullYear();

      let iterationsInYear;
      switch (frequency) {
        case 'Mensual':
          iterationsInYear = 12;
          break;
        case 'Bimestral':
          iterationsInYear = 6;
          break;
        case 'Trimestral':
          iterationsInYear = 4;
          break;
        case 'Semestral':
          iterationsInYear = 2;
          break;
        default:
          console.error('Frecuencia no soportada');
          return [];
      }

      function moveToDateIfWeekend(date) {
        const dayOfWeek = date.getDay();
        if (dayOfWeek === 0) { // Es domingo
          date.setDate(date.getDate() + 1); // Mover al lunes
        } else if (dayOfWeek === 6) { // Es sábado
          date.setDate(date.getDate() + 2); // Mover al lunes
        }
        return date;
      }


      for (let i = 1; i < iterationsInYear; i++) {
        // Añade un mes sin cambiar el día
        const newDate = addMonths(dates[i - 1], 12 / iterationsInYear);
        moveToDateIfWeekend(newDate);
        // Añade la fecha solo si pertenece al año actual y no se encuentra ya en el array
        if (
          newDate.getFullYear() === currentYear &&
          !dates.some(date => date.getTime() === newDate.getTime())
        ) {
          dates.push(newDate);
        }
      }
      // Formatea las fechas en un formato más sencillo
      const formattedDates = dates.map(date => format(date, 'yyyy-MM-dd'));

      return formattedDates;
    },

    filterEquipments(node, filter) {
      const filt = filter.toLowerCase();
      if (filt === '') {
        return true; // Muestra todos los nodos cuando no hay filtro
      }
      return node.categoryName && node.categoryName.toLowerCase().indexOf(filt) > -1;
    },

    resetFilter() {
      if (this.filter) {
        this.filter = '';
        this.filterRef?.value?.focus();
      }
    },

    goBack() {
      this.$router.go(-1);
    },

    deleteDate(day) {
      const index = this.form.maintenanceDates.indexOf(day);
      if (index !== -1) {
        this.form.maintenanceDates.splice(index, 1);
      }
    },

    setCalendarTo(date) {
      const initialDate = new Date(date);
      initialDate.setDate(initialDate.getDate() + 1);
      this.$refs.myDatePicker.setCalendarTo(initialDate.getFullYear(), initialDate.getMonth() + 1);
    },

    validatePayload() {
      return (this.validateEquipments() && this.validateDates())
    },

    validateDates() {
      let dates = this.form.maintenanceDates.length > 0
      if (!dates) {
        showWarning(this.$q, {
          title: 'Mínimo debe contener una fecha',
          msg: 'El plan de mantenimientos al menos debe de contener una fecha'
        })
      }
      return dates
    },

    validateEquipments() {
      let equipments = this.form.equipmentIds.length > 0
      if (!equipments) {
        showWarning(this.$q, {
          title: 'Mínimo debe de incluir un equipo',
          msg: 'El plan de mantenimientos al menos debe de incluir un equipo'
        })
      }
      return equipments
    },
  },
});
</script>

<style lang="scss" scoped>
.main-container-page {
  background-color: white;
}

.q-tree__node-header-content {
  font-size: 13px;
  color: rgb(121, 123, 123) !important;
}

.q-field__label {
  padding-bottom: 0.5rem !important;
}

.chip-date {
  background-color: rgba($primary, 0.1);
  max-width: 300px;
  color: rgb(147, 150, 156);
}

.avatar-item {
  border-radius: 50% !important;
  background-color: #ea463d2b;
  color: #ea463d;
  cursor: pointer;
}

.q-input-equipments {
  background-color: #FF990020;
}
</style>
