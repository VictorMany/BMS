<template>
  <q-page class="flex flex-center cursor-pointer non-selectable">
    <div class="card-page">

      <header-actions
        :titlePage="getTitle()"
        :btn-action="btnAction"
        :btn-close-window="btnCloseWindow"
      />

      <div class="main-container-page main-container-page-medium-dark container-form">
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

      localCategories: [],

      btnAction: {
        show: true,
        btnTitle: 'Guardar',
        iconName: 'save',
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
            key: 'LocationId',
            label: 'Ubicación*',
            type: 'autocomplete',
            model: null,
            itemFilter: this.filterLocations,
            setModel: this.setModelLocation,
            options: [],
            rules: [rules.requiredAutocomplete],
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
          },
          {
            key: 'equipmentStatus*',
            label: 'Estatus',
            type: 'select',
            model: null,
            shouldShow: this.isEditing(),
            options: [
              { label: 'Activo', index: 1, value: 1 },
              { label: 'Inactivo', index: 2, value: 0 },
            ],
          },
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
          this.editEquipment()
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
        await this.$store.dispatch('equipments/getEquipmentAction', params)
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
          options: this.categories.filter(v => v.label.toLowerCase().indexOf(needle) > -1)
        })
      })
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
          options: this.locations.filter(v => v.label.toLowerCase().indexOf(needle) > -1)
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
