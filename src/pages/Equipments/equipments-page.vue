<template>
  <q-page class="flex flex-center cursor-pointer non-selectable">
    <div class="card-page">

      <header-actions
        :titlePage="'Activos biomédicos'"
        :btn-actions="btnActions"
        :inputSearch="inputSearch"
        v-model:searchModel="searchModel"
        v-model:switch-content="switchContent"
      />

      <div
        class="main-container-page q-pa-sm"
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
          ref="generalTable"
          v-else-if="switchContent === 2"
          v-model:row-selected="rowSelected"
          :height="'100%'"
          :rows="rows"
          :columns="columns"
          :actions-table="actionsTable"
          :loading="loading"
          :pagination-prop="pagination"
          :change-selection="changeSelection"
          @change-pagination="changePagination"
        />
      </div>
    </div>

    <q-dialog
      v-model="modalUpdates"
      persistent
      class="border-rounded"
    >
      <q-card
        class="border-shadow q-pa-sm border-rounded modal-ios"
        style="width: 450px; height: 100%;"
      >
        <q-card-section>
          <div class="title-page text-primary">Modificación de equipos</div>
        </q-card-section>

        <q-card-section>
          <div class="setting__title text-weight-medium">
            Los campos que no modifiques nos se verán afectados
          </div>
        </q-card-section>

        <q-card-section
          class="q-pt-none row"
          style="gap: 10px"
        >
          <select-component
            class="form__input-12 bg-accent"
            v-model:model="form.equipmentStatus.model"
            :item="form.equipmentStatus"
          />

          <autocomplete-component
            class="form__input-12 bg-accent"
            :item="form.LocationId"
          />

          <autocomplete-component
            class="form__input-12 bg-accent"
            :item="form.DepartmentId"
          />

          <input-component
            class="bg-accent form__input-12"
            :item="form.provider"
            v-model:model="form.provider.model"
          />

          <input-component
            class="bg-accent form__input-12"
            :item="form.price"
            v-model:model="form.price.model"
          />

          <date-component
            class="form__input-12 bg-accent"
            v-model:model="form.warrantyDate.model"
            :item="form.warrantyDate"
          />

          <date-component
            class="form__input-12 bg-accent"
            v-model:model="form.acquisitionDate.model"
            :item="form.acquisitionDate"
          />

          <div class="q-pt-sm form__item-label text-weight-medium">
            Observaciones del equipo
          </div>

          <editor-component
            v-model:model="form.observations.model"
            :item="form.observations"
            class="form__textarea bg-accent w-100 border-rounded"
          />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn
            unelevated
            v-close-popup
            no-caps
            class="border-rounded q-my-sm"
            size="sm"
            outline
            align="left"
            color="blue-7"
          >
            Regresar
          </q-btn>
          <q-btn
            unelevated
            no-caps
            class="border-rounded q-my-sm"
            size="sm"
            align="left"
            color="blue-7"
            @click="editEquipments"
          >
            Modificar equipos
          </q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog
      v-model="modalConfirm"
      persistent
      class="border-rounded"
    >
      <q-card
        class="border-shadow q-pa-sm border-rounded modal-ios"
        style="width: 400px; height: auto;"
      >
        <q-card-section>
          <div class="title-page text-primary">Eliminar equipo</div>
        </q-card-section>

        <q-card-section
          class="q-pt-none row"
          style="gap: 10px"
        >
          <div class="setting__title text-weight-medium">
          </div>
          <div class="setting__title">
            ¿Estás seguro de que quieres eliminar este/estos equipo(s)?
            <ul>
              <li class="setting__paragraph">
                La acción no se puede completar si alguno de los equipos tiene reportes o mantenimientos
              </li>
            </ul>
          </div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn
            unelevated
            v-close-popup
            no-caps
            class="border-rounded q-my-sm"
            size="sm"
            outline
            align="left"
            color="blue-7"
          >
            Regresar
          </q-btn>
          <q-btn
            unelevated
            no-caps
            class="border-rounded q-my-sm"
            size="sm"
            align="left"
            color="blue-7"
            @click="deleteEquipments"
          >
            Confirmar
          </q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>

  </q-page>
</template>

<script>
import { defineComponent } from 'vue';
import HeaderActions from 'src/components/compose/HeaderActions.vue';
import ItemCard from 'src/components/atomic/ItemCard.vue';
import GeneralTable from 'src/components/compose/GeneralTable.vue';
import InputComponent from 'src/components/atomic/Form/InputComponent.vue';
import SelectComponent from 'src/components/atomic/Form/SelectComponent.vue';
import { rules, showSuccess, showWarning } from 'app/utils/utils';
import AutocompleteComponent from 'src/components/atomic/Form/AutocompleteComponent.vue';
import DateComponent from 'src/components/atomic/Form/DateComponent.vue';
import EditorComponent from 'src/components/atomic/Form/EditorComponent.vue';

export default defineComponent({
  name: 'EquipmentsPage',
  components: {
    GeneralTable,
    HeaderActions,
    ItemCard,
    InputComponent,
    SelectComponent,
    AutocompleteComponent,
    DateComponent,
    EditorComponent
  },
  data() {
    return {
      delaySearch: 300,
      searchModel: null,
      showCards: true,
      switchContent: 1,
      timeoutSearch: null,
      loading: true,
      paramsFromCreated: false,
      modalUpdates: false,
      modalConfirm: false,
      selectedRows: [],

      form: {},

      rowSelected: {},

      selectedFilterText: 'category',

      localPagination: {
        totalPages: 1,
        descending: false,
        rowsPerPage: 20,
        page: 1,
      },

      params: {
        category: '',
      },

      btnActions: [
        {
          show: false,
          btnTitle: 'Agregar equipo',
          iconName: 'o_data_saver_on',
          tooltip: 'Agregar nuevo equipo',
          to: 'add-equipment',
        },
        {
          show: false,
          btnTitle: 'Actualizar equipos',
          iconName: 'o_edit',
          tooltip: 'Actualizar un conjunto de equipos',
          btnAction: this.openModalUpdatesAction
        },
        {
          show: false,
          btnTitle: 'Eliminar equipos',
          iconName: 'o_delete',
          tooltip: 'Eliminar un conjunto de equipos',
          btnAction: this.openDeleteEquipments
        }
      ],

      inputSearch: {
        show: true,
        inputLabel: 'Categoría del equipo',
        setSelectedFilter: this.setSelectedFilter,
        setSelectedOptionFilter: this.setSelectedOptionFilter,
        heightModal: 350,
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
            title: 'Departamento',
            filter: 'department',
            icon: 'o_webhook',
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
          name: 'categoryName',
          label: 'Categoría',
          align: 'left',
          style: 'white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 200px',
          field: 'categoryName',
          sortable: true,
        },
        {
          name: 'equipmentName',
          label: 'Equipo',
          align: 'left',
          style: 'white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 200px',
          field: 'equipmentName',
          sortable: true,
        },
        {
          name: 'model',
          label: 'Modelo',
          style: 'white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 200px',
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
          shouldHideAction: this.shouldHideAction
        }
      ],
    };
  },

  created() {
    this.checkParamsFromCreated()
    this.checkPermissions()
    this.getEquipments();
    this.initForm()
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
      if (!this.paramsFromCreated) {
        this.params = { ...this.params, [this.selectedFilterText]: val }
        clearTimeout(this.timeoutSearch);
        this.timeoutSearch = setTimeout(() => {

          this.params.page = 1

          this.getEquipments();
        }, this.delaySearch);
      }
    },
  },

  computed: {
    equipments() {
      return this.$store.getters['equipments/getEquipmentsGetter'];
    },

    locations() {
      return this.$store.getters['equipments/getLocationsGetter'];
    },

    departments() {
      return this.$store.getters['equipments/getDepartmentsGetter'];
    },

    rows() {
      // Mapea la información de equipos a las filas requeridas por la tabla
      return this.equipments.map((e) => {
        return {
          id: e.id,
          equipmentName: e.equipmentName,
          categoryName: e.categoryName,
          model: e.equipmentModel,

          no_serie: e.cardLabels[1].info,

          nextMaintenanceDate: e.cardDate,
          status: e.status
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
    },
  },

  methods: {
    async getEquipments() {
      this.loading = true

      await this.$store.dispatch('equipments/getEquipmentsAction', this.params)

      this.paramsFromCreated = false

      this.localPagination = JSON.parse(JSON.stringify(this.pagination))

      this.$store.dispatch('global/addGlobalsToLocalStorage', {
        search: {
          inputLabel: this.inputSearch.inputLabel,
          selectedFilterText: this.selectedFilterText,
          searchModel: this.searchModel
        },
        paramsEquipmentsPage: { ...this.params }
      });

      this.loading = false
    },

    async getEquipment(id) {
      await this.$store.dispatch('equipments/getEquipmentAction', { id })
    },

    openDeleteEquipments() {
      this.modalConfirm = true
    },

    async deleteEquipments() {
      const equipmentIds = await this.selectedIdsToUpdate()
      try {
        const res = await this.$store.dispatch(
          'equipments/deleteEquipmentsAction',
          equipmentIds
        );
        if (res === true) {
          showSuccess(this.$q, { title: 'Éxito al eliminar equipo(s)', msg: 'Se ha(n) eliminado correctamente' });
          this.getEquipments()
          // Close modal
          this.modalConfirm = false
          // Hide the actions
          this.btnActions[1].show = false
          this.btnActions[2].show = false
          this.btnActions[0].show = true
        } else {
          showWarning(this.$q, { msg: 'Inténtalo de nuevo más tarde y si el error persiste, repórtalo' });
        }
      } catch (error) {
        console.log(error)
      }
    },

    async changeSelection(selected) {
      if (selected.length > 0) {
        this.selectedRows = selected
        this.btnActions[1].show = true
        this.btnActions[2].show = true
        this.btnActions[0].show = false
      }
      else {
        this.selectedRows = selected
        this.btnActions[1].show = false
        this.btnActions[2].show = false
        this.btnActions[0].show = true
      }
    },

    async getLocations() {
      try {
        await this.$store.dispatch('equipments/getAllLocationsAction')
        this.form.LocationId.options = JSON.parse(JSON.stringify(this.locations))
      } catch (error) {
        console.log(error)
      }
    },

    async getDepartments() {
      try {
        await this.$store.dispatch('equipments/getAllDepartmentsAction')
        this.form.DepartmentId.options = JSON.parse(JSON.stringify(this.departments))
      } catch (error) {
        console.log(error)
      }
    },

    async editEquipments() {
      this.btnActions[1].loader = true;
      try {
        const res = await this.$store.dispatch(
          'equipments/updateEquipmentsAction',
          {
            form: this.form,
            equipments: this.selectedIdsToUpdate()
          }
        );

        if (res === true) {
          showSuccess(this.$q, { title: 'Éxito al modificar los equipos', msg: 'Los equipos se han actualizado' });
          this.getEquipments()
          this.modalUpdates = false
          this.$refs.generalTable.localSelected = []

          this.btnActions[1].show = false
          this.btnActions[2].show = false
          this.btnActions[0].show = true

          this.initForm()
        } else {
          showWarning(this.$q, { msg: 'Inténtalo de nuevo más tarde y si el error persiste, repórtalo' });
        }

        this.btnActions[1].loader = false;
      } catch (error) {
        this.btnActions[1].loader = false;
        console.log('error', error)
      }
    },

    initForm() {
      this.form = {
        equipmentStatus: {
          innerLabel: 'Estatus*',
          model: null,
          options: [
            { label: 'Activo', index: 1, value: 1 },
            { label: 'Inactivo', index: 2, value: 0 },
          ],
        },

        LocationId: {
          innerLabel: 'Ubicación*',
          model: null,
          itemFilter: this.filterLocations,
          setModel: this.setModelLocation,
          options: [],
        },

        DepartmentId: {
          innerLabel: 'Departamento',
          model: null,
          itemFilter: this.filterDepartments,
          setModel: this.setModelDepartment,
          options: [],
        },

        provider: {
          innerLabel: 'Proveedor',
          model: '',
          rules: [rules.maxLength(50), rules.alphanumeric],
        },

        price: {
          innerLabel: 'Costo',
          model: '',
          prefix: '$',
          type: 'number',
          rules: [
            rules.numeric,
            rules.nonNegative,
            rules.maxDecimalPlaces
          ],
        },

        warrantyDate: {
          key: 'warrantyDate',
          innerLabel: 'Fecha de garantía',
          model: '',
        },

        acquisitionDate: {
          key: 'acquisitionDate',
          innerLabel: 'Fecha de adquisición',
          model: '',
        },

        observations: {
          required: false,
          type: 'textarea',
          label: 'Observaciones del equipo',
          model: '',
        },
      }
    },

    selectedIdsToUpdate() {
      return this.selectedRows.map(e => e.id);
    },

    filterLocations(val, update) {
      if (val === '') {
        update(() => {
          this.form.LocationId.options = this.locations
        })
        return
      }

      update(() => {
        const needle = val.toLowerCase()

        this.form.LocationId.options = this.locations.filter(v => this.removeAccents(v.label.toLowerCase()).includes(this.removeAccents(needle)))
      })
    },

    filterDepartments(val, update) {
      if (val === '') {
        update(() => {
          this.form.DepartmentId.options = this.departments
        })
        return
      }

      update(() => {
        const needle = val.toLowerCase()
        this.form.DepartmentId.options = this.departments.filter(v => this.removeAccents(v.label.toLowerCase()).includes(this.removeAccents(needle)))
      })
    },

    setModelLocation(val) {
      const location = this.locations.find((loc) => loc.locationName === val)
      this.form.LocationId.model = location ? location : val
    },

    setModelDepartment(val) {
      const department = this.departments.find((dep) => dep.departmentName === val)
      this.form.DepartmentId.model = department ? department : val
    },


    removeAccents(str) {
      return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    },

    openModalUpdatesAction() {
      this.modalUpdates = true
    },

    shouldHideAction() {
      if (this.userRole != 1) {
        return false
      } else return true
    },

    findItemByFilterAndValue(value) {
      for (const item of this.inputSearch.items) {
        if (item.options) {
          const foundOption = item.options.find(option => option.value === value);
          if (foundOption) {
            return foundOption;
          }
        }
      }
      return null;
    },

    checkPermissions() {
      switch (this.userRole) {
        case 1:
          this.btnActions[0].show = true
          this.getLocations()
          this.getDepartments()
          break;
        case 2:
        case 3:
          this.btnActions[0].show = false
          this.changeSelection = null
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

      this.getEquipments();
    },

    checkParamsFromCreated() {
      if (this.localStorage?.paramsEquipmentsPage) {
        this.params = { ...this.localStorage.paramsEquipmentsPage };

        if (Object.prototype.hasOwnProperty.call(this.params, 'status')) {
          this.inputSearch.activeOptions = [this.findItemByFilterAndValue(this.params.status)]
        }
      }

      if (this.localStorage?.search) {
        this.paramsFromCreated = true

        this.inputSearch.inputLabel = this.localStorage.search?.inputLabel
        this.searchModel = this.localStorage.search?.searchModel
        this.selectedFilterText = this.localStorage.search?.selectedFilterText
      }
    },

    setSelectedFilter(opt) {
      if (this.selectedFilterText) {
        delete this.params[this.selectedFilterText]
        if (this.searchModel) {
          this.params[opt.filter] = this.searchModel
          this.getEquipments();
        }
      }

      this.selectedFilterText = opt.filter
      this.inputSearch.inputLabel = opt.title;

      if (opt.value && opt.filter) {
        this.params[opt.filter] = this.searchModel

        this.getEquipments();
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

      this.getEquipments();
    }
  },
});
</script>
