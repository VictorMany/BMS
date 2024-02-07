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
          class="h-90 q-pa-xs-none q-pa-lg-sm"
          :thumb-style="$store.getters['global/getThumbStyle']"
        >
          <form-text-field
            ref="fieldsComponent"
            :fields="fields"
          />
        </q-scroll-area>
        <div
          class="col-12 form__date_container form__date column justify-center q-px-lg"
          style="height: 6%"
        >
          <div>Fecha de creación: <strong>{{ fields.createdAt }}</strong></div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue';
import HeaderActions from 'src/components/compose/HeaderActions.vue';
import FormTextField from 'src/components/compose/FormTextField.vue';

export default defineComponent({
  key: 'EquipmentsPage',
  components: {
    HeaderActions,
    FormTextField,
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
            label: 'Categoría del equipo',
            type: 'autocomplete',
            itemFilter: this.filterCategories,
            setModel: this.setModelCategory,
            options: [],
            model: null,
            shouldShow: this.isEditing() ? false : true,
            rules: [
              (val) => {
                if (typeof val === 'string') {
                  return val.trim().length > 0 || 'El campo es obligatorio';
                } else if (typeof val === 'object' && val !== null) {
                  return val;
                } else {
                  return 'El campo es obligatorio';
                }
              },
            ],
          },
          {
            key: 'categoryName',
            label: 'Categoría del equipo',
            model: '',
            shouldShow: this.isEditing(),
            readonly: true
          },
        ],
        left: [
          {
            key: 'equipmentModel',
            label: 'Modelo del equipo',
            model: '',
            rules: [
              (val) => (val && val.trim().length > 0) || 'El campo es obligatorio',
              (val) => (val.length <= 60) || 'El campo no debe exceder 60 caracteres',
              (val) => /^[a-zA-ZáéíóúÁÉÍÓÚ0-9\s-]+$/.test(val) || 'El campo solo debe contener letras y números'
            ],
          },
          {
            key: 'serialNumber',
            label: 'Número de serie',
            model: '',
            rules: [
              (val) => (val && val.trim().length > 0) || 'El campo es obligatorio',
              (val) => (val.length <= 30) || 'El campo no debe exceder 30 caracteres',
              (val) => /^[a-zA-ZáéíóúÁÉÍÓÚ0-9\s-]+$/.test(val) || 'El campo solo debe contener letras y números'
            ],
          },
          {
            key: 'trackingNumber',  //este valor lo llena back
            label: 'Número de control',
            model: '',
          },
          {
            key: 'equipmentBrand',
            label: 'Marca',
            model: '',
            rules: [
              (val) => (val && val.trim().length > 0) || 'El campo es obligatorio',
              (val) => (val.length <= 60) || 'El campo no debe exceder 60 caracteres',
              (val) => /^[a-zA-ZáéíóúÁÉÍÓÚ0-9\s-]+$/.test(val) || 'El campo solo debe contener letras y números'
            ],
          },
          {
            key: 'LocationId',
            label: 'Ubicación',
            type: 'autocomplete',
            model: null,
            itemFilter: this.filterLocations,
            setModel: this.setModelLocation,
            options: [],
            rules: [
              (val) => {
                if (typeof val === 'string') {
                  return val.trim().length > 0 || 'El campo es obligatorio';
                } else if (typeof val === 'object' && val !== null) {
                  return val;
                } else {
                  return 'El campo es obligatorio';
                }
              },
            ],
          },
          {
            key: 'manufacturingYear',
            label: 'Año del equipo',
            type: 'number',
            rules: [
              (val) =>
                /^\d{4}$/.test(val) || 'Debe ser un año válido (formato: YYYY)',
              (val) => {
                const enteredYear = parseInt(val, 10);
                const currentYear = new Date().getFullYear();
                return (
                  enteredYear <= currentYear ||
                  'Debe ser un año anterior al año actual'
                );
              },
            ],
            model: '',
          },
          {
            key: 'provider',
            label: 'Provedor',
            model: '',
            rules: [
              (val) => (val && val.trim().length > 0) || 'El campo es obligatorio',
              (val) => (val.length <= 60) || 'El campo no debe exceder 50 caracteres',
              (val) => /^[a-zA-ZáéíóúÁÉÍÓÚ0-9\s-]+$/.test(val) || 'El campo solo debe contener letras y números'
            ],
          },
          {
            key: 'equipmentStatus',   //este valor lo llena back
            label: 'Estatus',
            type: 'select',
            model: null,
            options: [
              { label: 'Activo', index: 1, value: 1 },
              { label: 'Inactivo', index: 2, value: 0 },
            ],
          },
          {
            key: 'price',
            label: 'Costo',
            model: '',
            rules: [
              (val) => (val !== undefined && val !== null) || 'El campo es obligatorio',
              (val) => !isNaN(val) || 'Ingresa un valor numérico',
              (val) => parseFloat(val) >= 0 || 'El costo debe ser mayor o igual a 0',
              (val) => (val.toString().indexOf('.') === -1 || val.toString().split('.')[1].length <= 2) || 'El campo no debe tener más de dos decimales'
            ],
          },
          {
            key: 'warrantyDate',
            label: 'Fecha de garantía',
            type: 'date',
            model: '',
            rules: [
              (val) => {
                const selectedDate = new Date(val);
                const currentDate = new Date();
                return selectedDate >= currentDate || 'La fecha de garantía no puede ser anterior a la fecha actual';
              }
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
            label: 'Observaciones del equipo',
            model: '',
          }
        ]
      },
    };
  },
  methods: {
    // ######### CRUD ########## //
    async createEquipment() {
      this.btnAction.loader = true;
      try {
        const res = await this.$store.dispatch(
          'equipments/postEquipmentAction',
          this.fields
        );

        if (res === true) {
          this.showAlert({ title: 'Éxito al crear', msg: 'El equipo se ha agregado', color: 'green-14' });
          this.$router.go(-1);
        } else {
          console.log(res)
          this.showAlert({ msg: 'Inténtalo de nuevo más tarde y si el error persiste, repórtalo' });
        }
        this.btnAction.loader = false;
      } catch (error) {
        this.btnAction.loader = false;
        console.log(error)
        this.showAlert({ msg: error.response ? error.response.data.details : error });
      }
    },

    async getEquipment() {
      this.loading = true

      const params = {
        id: this.$route.params.id,
        fields: this.fields
      }

      await this.$store.dispatch('equipments/getEquipmentAction', params)
      this.loading = false
    },

    async editEquipment() {
      this.btnAction.loader = true;
      this.fields.id = this.$route.params.id

      try {
        const res = await this.$store.dispatch(
          'equipments/updateEquipmentAction',
          this.fields
        );
        if (res === true) {
          this.showAlert({ title: 'Éxito al editar', msg: 'El equipo se ha actualizado', color: 'green-14' });
          this.$router.go(-1);
        } else {
          this.showAlert({});
        }
        this.btnAction.loader = false;
      } catch (error) {
        this.btnAction.loader = false;
        this.showAlert({});
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

    async getEquipments(params) {
      this.loading = true
      await this.$store.dispatch('equipments/getEquipmentsAction', params);
      this.loading = false
    },

    async getCategories() {
      await this.$store.dispatch('equipments/getAllCategoriesAction')
      this.updateFieldByKeyInAllArrays('CategoryId', {
        options: JSON.parse(JSON.stringify(this.categories))
      })
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

    async initInfo() {
      await this.getLocations()
      await this.getCategories()

      if (this.isEditing()) {
        await this.getEquipment()
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

    showAlert({ msg, color, title, classes }) {
      this.$q.notify({
        message: title ? title : 'Ocurrió un error al crear el equipo',
        caption: msg ? msg : 'Inténtalo de nuevo más tarde',
        color: color ? color : 'secondary',
        classes: classes ? classes : 'border-rounded',
      });
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

    getDate() {
      return this.$store.$store.getters['global/getDate']
    },

    isEditing() {
      return this.$route.params.id ? true : false
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
