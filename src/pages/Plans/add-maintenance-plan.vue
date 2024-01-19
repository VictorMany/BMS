<template>
  <q-page class="flex flex-center cursor-pointer non-selectable">
    <div class="card-page">
      <div class="column items-end q-mt-md q-mb-xs">
        <btn-action v-bind="btnCloseWindow" />
      </div>
      <header-actions
        :titlePage="'Crear nuevo plan de mantenimientos'"
        :btn-action="btnAction"
      />
      <div
        class="main-container-page main-container-page-medium-dark"
        style="height: 82%"
      >
        <q-scroll-area
          class="full-height q-pb-sm"
          style="height: 92% !important"
          :thumb-style="$store.getters['global/getThumbStyle']"
        >
          <q-input
            v-model="form.planName"
            borderless
            dense
            class="form__item-input q-mb-md q-mx-lg bg-accent"
            label="Nombre del plan"
          />
          <div class="row q-px-lg d-flex justify-between">
            <div class="col-12 q-mb-sm">
              <div class="q-py-sm q-my-sm form__item-label text-weight-thin">
                1-. Elige los equipos que quieras incluir en el plan
              </div>
              <div
                class="select__form border-line border-rounded q-pa-md"
                style="height: 50vh"
              >
                <div style="height: 100%">
                  <q-scroll-area
                    class="fit"
                    :thumb-style="{
                      borderRadius: '5px',
                      background: 'rgba(29, 100, 231, 0.2)',
                      width: '5px',
                      opacity: 1,
                    }"
                  >

                    <div class="row">


                      <div
                        class="q-pr-md col-auto"
                        style="border-right: 1px solid #91c8ff84; "
                      >
                        <q-input
                          ref="filterRef"
                          v-model="filter"
                          borderless
                          dense
                          class="form__item-input q-mb-md q-input-equipments"
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
                          style="height: 36vh; overflow-y: scroll;"
                          v-model:ticked="form.equipmentIds"
                          :nodes="localCategories"
                          tick-strategy="leaf"
                          node-key="id"
                          label-key="label"
                          :filter="filter"
                          :filter-method="myFilterMethod"
                          @lazy-load="onLazyLoad"
                        />
                      </div>

                      <div class="col q-pl-md">
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
                    </div>
                  </q-scroll-area>
                </div>
              </div>
            </div>

            <div class="col-12 q-py-lg">
              <div class="row">
                <div class="col-sm-auto col-12">
                  <div class="q-py-sm q-my-sm form__item-label text-weight-thin">
                    2-. Selecciona la(s) fecha(s) del mantenimiento
                  </div>
                  <div
                    class="row q-mb-md"
                    style="max-width: 418px"
                  >
                    <div class="col-auto ">
                      <q-checkbox
                        size="sm"
                        v-model="form.hasFrequency"
                        label="Frecuencia"
                        class="form__checkbox q-mr-md q-pa-sm"
                        dense
                      />
                    </div>

                    <div class="col">
                      <q-select
                        v-model="form.maintenanceFrequency"
                        :options="options"
                        dense
                        hide-hint
                        hide-bottom-space
                        bottom-slots
                        stack-label
                        class="textfield-other form__item-input bg-accent"
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
                    mask="YYYY-MM-DD"
                    v-model="form.maintenanceDates"
                    class="text-blue-blue-grey-4 border-line border-rounded"
                    :multiple="!form.hasFrequency"
                    landscape
                  />
                </div>

                <div class="col-sm col-12 q-px-xl">
                  <div class="form__item-label text-weight-thin q-py-sm q-my-sm">
                    Lista de fechas programadas
                  </div>
                  <div
                    v-for="( day, index ) in sortedDates"
                    :key="index"
                  >
                    <div
                      class="text-left chip-date q-mt-sm q-pa-xs q-px-sm flex flex-center align-center justify-between"
                      @click="setCalendarTo(day)"
                    >
                      {{ calcDate(day) }}
                      <q-avatar
                        @click="deleteDate(index)"
                        size="xs"
                        class="avatar-item"
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
            </div>
          </div>

          <div class="col-12 col-sm-6 q-px-lg">
            <div class="q-py-sm q-my-sm form__item-label text-weight-thin">
              3-. Agrega algunas observaciones (opcional)
            </div>
            <q-editor
              v-model="form.observations"
              :placeholder="'Escribe aquí las notas del plan de mantenimientos'"
              class="form__item-textarea bg-accent"
              dense
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
              ]
                "
            />
          </div>
        </q-scroll-area>
        <div
          class="col-12 form__date_container"
          style="height: 6%"
        >
          <div class="form__date column items-end q-pa-sm q-mt-auto">
            <div>Fecha de creación <strong> 12/02/2022</strong></div>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>

import { ref, defineComponent } from 'vue';
import BtnAction from 'src/components/atomic/BtnAction.vue';
import HeaderActions from 'src/components/compose/HeaderActions.vue';
import GeneralTable from 'src/components/compose/GeneralTable.vue';
import { addMonths, format } from 'date-fns';


export default defineComponent({
  name: 'EquipmentsPage',
  components: {
    HeaderActions,
    BtnAction,
    GeneralTable
  },
  data() {
    return {
      fixed: ref(false),

      delaySearch: 300,
      timeoutSearch: null,


      btnAction: {
        show: true,
        btnTitle: 'Guardar',
        btnWidth: 'auto',
        loader: false,
        btnAction: this.createMaintenancePlan
      },

      btnCloseWindow: {
        iconName: 'close',
        btnBackground: '#FF9900',
        btnColor: '#FFFFFF',
        btnSize: 'xs',
        btnAction: this.goBack,
      },

      fields: {
        readImage: false,
        top: [
          {
            label: 'Nombre del plan',
            model: '',
          },
        ],
        left: [],
        right: [],
        textarea: {},
      },

      form: {
        planName: '',
        observations: '',
        userId: '',
        equipmentIds: [],
        hasFrequency: false,
        maintenanceFrequency: null,
        maintenanceDates: []
      },

      users: [
        {
          label: 'Angel Omar Torres Padilla',
          value: 1
        },
        {
          label: 'Andres Martínez Sierra',
          value: 2
        },
        {
          label: 'Víctor Pérez',
          value: 3
        }
      ],

      filter: ref(''),
      filterRef: ref(null),

      model: ref(null),

      days: ref(['Sábado 04, Feb 2023']),

      options: [
        'Mensual',
        'Bimestral',
        'Trimestral',
        'Semestral'
      ],

      date: ref('2019/02/01'),

      tickStrategy: ref('strict'),


      // simple: [
      //   { label: 'Electrocardiógrafo', children: [{ label: 'Electrocardiógrafo 001' }, { label: 'Electrocardiógrafo 002' }] },
      //   { label: 'Monitor de signos vitales', children: [{ label: 'Monitor de signos vitales 001' }, { label: 'Monitor de signos vitales 002' }] },
      //   { label: 'Equipo de rayos X', children: [{ label: 'Equipo de rayos X 001' }, { label: 'Equipo de rayos X 002' }] },
      //   { label: 'Tomógrafo', children: [{ label: 'Tomógrafo 001' }, { label: 'Tomógrafo 002' }] },
      //   { label: 'Ecógrafo', children: [{ label: 'Ecógrafo 001' }, { label: 'Ecógrafo 002' }] },
      //   { label: 'Endoscopio', children: [{ label: 'Endoscopio 001' }, { label: 'Endoscopio 002' }] },
      //   { label: 'Espectrómetro de masa', children: [{ label: 'Espectrómetro de masa 001' }, { label: 'Espectrómetro de masa 002' }] },
      //   { label: 'Analizador de gases en sangre', children: [{ label: 'Analizador de gases en sangre 001' }, { label: 'Analizador de gases en sangre 002' }] },
      //   { label: 'Analizador de hematología', children: [{ label: 'Analizador de hematología 001' }, { label: 'Analizador de hematología 002' }] },
      //   { label: 'Analizador de química clínica', children: [{ label: 'Analizador de química clínica 001' }, { label: 'Analizador de química clínica 002' }] },
      // ],


      // Table
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

      localCategories: []
    };
  },

  created() {
    this.getCategories();
  },

  computed: {
    categories() {
      return this.$store.getters['equipments/getCategoriesGetter'];
    },

    sortedDates() {
      const unsortedDates = [...this.form.maintenanceDates];
      const sortedDates = unsortedDates.sort((a, b) => new Date(a) - new Date(b));
      return sortedDates
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
  },

  watch: {
    categories: {
      handler(val) {
        this.localCategories = JSON.parse(JSON.stringify(val));
      },
      deep: true,
      immediate: true
    },

    'form.maintenanceDates': {
      handler(val, oldVal) {
        if (val && val != oldVal) {
          this.form.maintenanceDates = Array.isArray(val) ? val : [val];
          if (this.form.maintenanceDates.length == 1 && this.form.maintenanceFrequency) {
            this.form.maintenanceDates = this.calculateRemainingDates(this.sortedDates[0], this.form.maintenanceFrequency);
          }
        } else {
          this.maintenanceDates = null
        }
      },
      immediate: true, // Para manejar el caso cuando el componente se carga inicialmente
    },

    'form.maintenanceFrequency'(val, oldVal) {
      if (val && this.form.maintenanceDates.length > 0 && val != oldVal) {
        this.form.maintenanceDates = this.calculateRemainingDates(this.sortedDates[0], val);
      }
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
          'maintenances/postMaintenancePlanAction',
          this.form
        );
        if (res === true) {
          this.showAlert({ title: 'Éxito al crear', msg: 'El plan de mantenimientos se ha agregado', color: 'green-14' });
          this.$router.go(-1);
        } else {
          this.showAlert({});
        }
        this.btnAction.loader = false;
      } catch (error) {
        this.btnAction.loader = false;
        this.showAlert({ msg: error.response ? error.response.data.details : error });
      }
    },

    showAlert({ msg, color, title, classes }) {
      this.$q.notify({
        message: title ? title : 'Ocurrió un error al crear el plan de mantenimientos',
        caption: msg ? msg : 'Inténtalo de nuevo más tarde',
        color: color ? color : 'secondary',
        classes: classes ? classes : 'border-rounded',
      });
    },

    async getCategories() {
      this.loading = true
      await this.$store.dispatch('equipments/getCategoriesAction')
      this.loading = false
    },

    calcDate(date) {
      // Crear una nueva fecha a partir de la fecha proporcionada
      const initialDate = new Date(date);
      // Sumar un día a la fecha
      initialDate.setDate(initialDate.getDate() + 1);
      // Definir las opciones de formato deseado
      const optFormat = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
      // Obtener la fecha formateada con la configuración regional de México
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

    async onLazyLoad({ key, done }) {
      const equipments = await this.$store.dispatch('equipments/getEquipmentsByCategoryAction', {
        categoryId: key
      })

      if (equipments.length > 0)
        done(equipments)
      else done([])
    },

    myFilterMethod(node, filter) {
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

    deleteDate(index) {
      this.sortedDates.splice(index, 1);
    },

    setCalendarTo(date) {
      const initialDate = new Date(date);
      initialDate.setDate(initialDate.getDate() + 1);
      this.$refs.myDatePicker.setCalendarTo(initialDate.getFullYear(), initialDate.getMonth() + 1);
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

.select {
  &__form {
    border-radius: 8px;
  }
}

.checkbox-label {
  color: #e8f3fb;
  font-size: 13px;
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
  color: rgb(64, 60, 60);
  border-radius: 8px;
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
