<template>
  <q-page class="flex flex-center cursor-pointer non-selectable">
    <div class="card-page">

      <header-actions
        :titlePage="getTitle()"
        :btn-action="btnAction"
        :btn-close-window="btnCloseWindow"
      />

      <div class="main-container-page main-container-page-dark container-form">
        <q-scroll-area
          class="h-97 q-pa-xs-none q-pa-lg-sm"
          :thumb-style="$store.getters['global/getThumbStyle']"
        >
          <form-component
            ref="fieldsComponent"
            :loading="loading"
            :fields="fields"
          />
        </q-scroll-area>
      </div>
    </div>

    <q-dialog
      v-model="openConfirmInactivateEquipment"
      class="border-rounded"
    >
      <q-card
        class="border-shadow q-pa-sm border-rounded modal-ios"
        style="width: 300px; height: auto;"
      >
        <q-card-section>
          <div class="title-page text-primary">Confirma para inactivar el equipo</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-item-section>
            <div class="setting__title">
              ¿ Estás seguro de inactivar este equipo ?
              <ul>
                <li class="setting__paragraph"> Si el equipo pertenece a un plan de mantenimientos, ya no podrás
                  verlo en el plan </li>
                <li class="setting__paragraph"> El equipo seguirá en el el listado de equipos, pero solo lo podrás
                  ver filtrando por inactivos
                </li>
              </ul>
            </div>
          </q-item-section>
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
            @click="editEquipment"
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
import FormComponent from 'src/components/compose/FormComponent.vue';
import { rules, showSuccess, showWarning } from '../../../utils/utils';

export default defineComponent({
  key: 'AddEquipment',
  components: {
    HeaderActions,
    FormComponent,
  },
  data() {
    return {
      loading: false,
      openConfirmInactivateEquipment: false,

      localCategories: [],

      originalEquipment: null,

      btnAction: {
        show: true,
        btnTitle: 'Guardar',
        iconName: 'o_save',
        btnWidth: 'auto',
        tooltip: 'Guardar equipo',
        btnAction: this.createOrEdit,
        loader: false,
      },

      btnCloseWindow: {
        iconName: 'exit_to_app',
        btnBackground: '#FF990020',
        btnColor: '#FF9900',
        btnAction: this.goBack
      },

      fields: {
        id: null,
        createdAt: this.getCreatedAt(),

        top: [
          {
            key: 'CategoryId',
            label: 'Categoría del equipo*',
            type: 'autocomplete',
            itemFilter: this.filterCategories,
            setModel: this.setModelCategory,
            options: [],
            model: null,
            shouldShow: !this.isEditing(),
            rules: [rules.requiredAutocomplete],
          },
          {
            key: 'categoryName',
            label: 'Categoría del equipo*',
            model: '',
            shouldShow: this.isEditing(),
            readonly: true
          },
          {
            key: 'equipmentName',
            label: 'Nombre del equipo*',
            model: '',
            readonly: this.isEditing(),
          },
          {
            key: 'LocationId',
            label: 'Ubicación*',
            type: 'autocomplete',
            model: null,
            itemFilter: this.filterLocations,
            setModel: this.setModelLocation,
            options: [],
            rules: [rules.requiredAutocomplete],
          },
          {
            key: 'DepartmentId',
            label: 'Departamento',
            type: 'autocomplete',
            model: null,
            itemFilter: this.filterDepartments,
            setModel: this.setModelDepartment,
            options: [],
          },
        ],
        left: [
          {
            key: 'equipmentModel',
            label: 'Modelo del equipo*',
            model: '',
            readonly: this.isEditing(),
            rules: [rules.requiredString, rules.maxLength(60), rules.alphanumeric],
          },
          {
            key: 'serialNumber',
            label: 'Número de serie*',
            model: '',
            readonly: this.isEditing(),
            rules: [rules.requiredString, rules.maxLength(30), rules.alphanumeric],
          },
          {
            key: 'equipmentBrand',
            label: 'Marca*',
            model: '',
            readonly: this.isEditing(),
            rules: [rules.requiredString, rules.maxLength(60), rules.alphanumeric],
          },
          {
            key: 'manufacturingYear',
            label: 'Año del equipo*',
            type: 'number',
            readonly: this.isEditing(),
            rules: [
              rules.validYear,
              rules.validateYearNotGreaterThanCurrent,
              rules.validateYearNotLessThan100YearsAgo
            ],
            model: '',
          },
          {
            key: 'nextMaintenanceDate',
            label: 'Próximo mantenimiento',
            type: 'date',
            model: '',
            readonly: true,
            shouldShow: this.isEditing(),
          },
          {
            key: 'equipmentStatus',
            label: 'Estatus*',
            type: 'select',
            model: null,
            shouldShow: this.isEditing(),
            options: [
              { label: 'Activo', index: 1, value: 1 },
              { label: 'Inactivo', index: 2, value: 0 },
            ],
          },
          {
            key: 'provider',
            label: 'Proveedor',
            model: '',
            rules: [rules.maxLength(50), rules.alphanumeric],
          },
          {
            key: 'price',
            label: 'Costo',
            model: '',
            prefix: '$',
            type: 'number',
            rules: [
              rules.numeric,
              rules.nonNegative,
              rules.maxDecimalPlaces
            ],
          },
          {
            key: 'warrantyDate',
            label: 'Fecha de garantía',
            type: 'date',
            model: '',
          },
          {
            key: 'acquisitionDate',
            label: 'Fecha de adquisición',
            type: 'date',
            model: '',
          }
        ],
        right: [
          {
            key: 'photo',
            imageInput: true,
            model: null,
          }
        ],
        bottom: [
          {
            key: 'observations',
            type: 'textarea',
            label: 'Observaciones del equipo',
            required: false,
            model: '',
          }
        ]
      },
    };
  },
  methods: {
    async initInfo() {
      this.loading = true
      await this.getLocations()
      await this.getDepartments()

      if (this.isEditing()) {
        await this.getEquipment()
      } else {
        await this.getCategories()
        this.loading = false
      }
    },

    async createOrEdit() {
      if (await this.$refs.fieldsComponent.validate()) {
        if (this.isEditing()) {
          this.openConfirmAction()
        } else {
          this.createEquipment()
        }
      }
    },

    async createEquipment() {
      this.btnAction.loader = true;
      try {
        const res = await this.$store.dispatch(
          'equipments/postEquipmentAction',
          this.fields
        );

        if (res === true) {
          showSuccess(this.$q, { title: 'Éxito al crear el equipo', msg: 'El equipo se ha agregado' });
          this.$router.go(-1);
        } else {
          showWarning(this.$q, { msg: 'Inténtalo de nuevo más tarde y si el error persiste, repórtalo' });
        }
        this.btnAction.loader = false;
      } catch (error) {
        this.btnAction.loader = false;
      }
    },

    async getEquipment() {
      try {
        const params = {
          id: this.$route.params.id,
          fields: this.fields
        }
        this.originalEquipment = await this.$store.dispatch('equipments/getEquipmentAction', params)

        this.loading = false
      } catch (error) {
        console.log(error)
        this.loading = false
      }
    },

    async editEquipment() {
      this.btnAction.loader = true;

      try {
        this.fields.id = this.$route.params.id
        // Adding original OBJ
        this.fields.originalObj = this.originalEquipment

        const res = await this.$store.dispatch(
          'equipments/updateEquipmentAction',
          this.fields
        );

        if (res === true) {
          showSuccess(this.$q, { title: 'Éxito al editar el equipo', msg: 'El equipo se ha actualizado' });
          this.$router.go(-1);
        } else {
          showWarning(this.$q, { msg: 'Inténtalo de nuevo más tarde y si el error persiste, repórtalo' });
        }

        this.btnAction.loader = false;
      } catch (error) {
        this.btnAction.loader = false;
      }
    },

    async getCategories() {
      try {
        await this.$store.dispatch('equipments/getAllCategoriesAction')
        this.updateFieldByKeyInAllArrays('CategoryId', {
          options: JSON.parse(JSON.stringify(this.categories))
        })
      } catch (error) {
        console.log(error)
      }
    },

    async getLocations() {
      try {
        await this.$store.dispatch('equipments/getAllLocationsAction')
        this.updateFieldByKeyInAllArrays('LocationId', {
          options: JSON.parse(JSON.stringify(this.locations))
        })
      } catch (error) {
        console.log(error)
      }
    },

    async getDepartments() {
      try {
        await this.$store.dispatch('equipments/getAllDepartmentsAction')
        this.updateFieldByKeyInAllArrays('DepartmentId', {
          options: JSON.parse(JSON.stringify(this.departments))
        })
      } catch (error) {
        console.log(error)
      }
    },

    openConfirmAction() {
      const editedValue = this.getModelValueByKey('equipmentStatus').value ? true : false
      if (this.originalEquipment.equipmentStatus !== editedValue && !editedValue) {
        this.openConfirmInactivateEquipment = true
      } else {
        this.editEquipment()
      }
    },

    getModelValueByKey(key) {
      for (const sectionKey in this.fields) {
        if (Object.prototype.hasOwnProperty.call(this.fields, sectionKey)) {
          const elements = this.fields[sectionKey];
          if (elements && typeof elements[Symbol.iterator] === 'function') {
            for (const element of elements) {
              if (element.key === key) {
                return element.model
              }
            }
          }
        }
      }
    },

    updateFieldByKeyInAllArrays(key, updates) {
      for (const arrayKey in this.fields) {
        if (Array.isArray(this.fields[arrayKey])) {
          const fieldEntry = this.fields[arrayKey].find(entry => entry.key === key);
          if (fieldEntry) {
            Object.assign(fieldEntry, updates);
            return; // Termina la iteración después de encontrar la primera coincidencia
          }
        }
      }
      console.error(`No se encontró la entrada para la clave '${key}' en ningún arreglo o no tiene opciones.`);
    },

    getTitle() {
      if (this.isEditing()) {
        return 'Editar equipo'
      }
      else return 'Agregar equipo'
    },

    getCreatedAt() {
      if (this.isEditing()) {
        return ''
      }
      else return this.$store.getters['global/getDate']
    },

    goBack() {
      this.$router.go(-1);
    },

    getDate() {
      return this.$store.$store.getters['global/getDate']
    },

    isEditing() {
      return this.$route.params.id ? true : false
    },

    filterCategories(val, update) {
      if (val === '') {
        update(() => {
          this.updateFieldByKeyInAllArrays('CategoryId', {
            options: this.categories
          })
        })
        return
      }
      update(() => {
        const needle = val.toLowerCase()
        this.updateFieldByKeyInAllArrays('CategoryId', {
          options: this.categories.filter(v => this.removeAccents(v.label.toLowerCase()).includes(this.removeAccents(needle)))
        })
      })
    },

    removeAccents(str) {
      return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    },

    filterLocations(val, update) {
      if (val === '') {
        update(() => {
          this.updateFieldByKeyInAllArrays('LocationId', {
            options: this.locations
          })
        })
        return
      }

      update(() => {
        const needle = val.toLowerCase()
        this.updateFieldByKeyInAllArrays('LocationId', {
          options: this.locations.filter(v => this.removeAccents(v.label.toLowerCase()).includes(this.removeAccents(needle)))
        })
      })
    },

    filterDepartments(val, update) {
      if (val === '') {
        update(() => {
          this.updateFieldByKeyInAllArrays('DepartmentId', {
            options: this.departments
          })
        })
        return
      }

      update(() => {
        const needle = val.toLowerCase()
        this.updateFieldByKeyInAllArrays('DepartmentId', {
          options: this.departments.filter(v => this.removeAccents(v.label.toLowerCase()).includes(this.removeAccents(needle)))
        })
      })
    },

    setModelCategory(val) {
      const category = this.categories.find((cat) => cat.categoryName === val)
      this.updateFieldByKeyInAllArrays('CategoryId', {
        model: category ? category : val
      })
    },

    setModelLocation(val) {
      const location = this.locations.find((loc) => loc.locationName === val)
      this.updateFieldByKeyInAllArrays('LocationId', {
        model: location ? location : val
      })
    },

    setModelDepartment(val) {
      const department = this.departments.find((dep) => dep.departmentName === val)
      this.updateFieldByKeyInAllArrays('DepartmentId', {
        model: department ? department : val
      })
    }
  },

  computed: {
    equipments() {
      return this.$store.getters['equipments/getEquipmentsGetter'];
    },

    categories() {
      return this.$store.getters['equipments/getCategoriesGetter'];
    },

    locations() {
      return this.$store.getters['equipments/getLocationsGetter'];
    },

    departments() {
      return this.$store.getters['equipments/getDepartmentsGetter'];
    },
  },

  created() {
    this.initInfo()
  },
});
</script>

<style scoped>
.main-container-page {
  background-color: white;
}
</style>
