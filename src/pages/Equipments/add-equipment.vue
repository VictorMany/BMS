<template>
  <q-page class="flex flex-center cursor-pointer non-selectable">
    <div class="card-page">
      <div class="column items-end q-mt-md q-mb-xs gt-sm">
        <btn-action v-bind="btnCloseWindow" />
      </div>
      <header-actions
        :titlePage="getTitle()"
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
          <form-text-field :fields="fields" />
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
import BtnAction from 'src/components/atomic/BtnAction.vue';
import HeaderActions from 'src/components/compose/HeaderActions.vue';
import FormTextField from 'src/components/compose/FormTextField.vue';

export default defineComponent({
  key: 'EquipmentsPage',
  components: {
    HeaderActions,
    FormTextField,
    BtnAction,
  },
  data() {
    return {
      Equipos: 40,
      loading: false,
      btnAction: {
        show: true,
        btnTitle: 'Guardar',
        btnWidth: 'auto',
        btnAction: this.createOrEdit,
        loader: false,
      },
      btnCloseWindow: {
        iconName: 'close',
        btnBackground: '#FF9900',
        btnColor: '#FFFFFF',
        btnSize: 'xs',
        btnAction: this.goBack,
      },

      fields: {
        id: null,
        createdAt: this.getCreatedAt(),
        top: [
          {
            key: 'equipmentName',
            label: 'Nombre del equipo',
            model: '',
          },
        ],
        left: [
          {
            key: 'serialNumber',
            label: 'No. serie',
            model: '',
          },
          {
            key: 'trackingNumber',
            label: 'Número de control',
            model: '',
          },
          {
            key: 'equipmentBrand',
            label: 'Marca',
            model: '',
          },
          {
            key: 'equipmentModel',
            label: 'Modelo del equipo',
            model: '',
          },
          {
            key: 'location',
            label: 'Ubicación',
            type: 'select',
            model: '',
            options: [
              { label: 'Hospital C', index: 1, value: 'Hospital C' },
              { label: 'Área de choque', index: 2, value: 'Área de choque' },
              { label: 'Consultas externas', index: 3, value: 'Consultas externas' },
              { label: 'Unidades de hospitalización', index: 4, value: 'Unidades de hospitalización' },
              { label: 'Quirófanos', index: 5, value: 'Quirófanos' },
              { label: 'Laboratorios', index: 6, value: 'Laboratorios' },
              { label: 'Radiología', index: 7, value: 'Radiología' },
              { label: 'Farmacia', index: 8, value: 'Farmacia' },
              { label: 'Terapia física y rehabilitación', index: 9, value: 'Terapia física y rehabilitación' },
              { label: 'Cuidados intensivos', index: 10, value: 'Cuidados intensivos' },
              { label: 'Unidades de cuidados paliativos', index: 11, value: 'Unidades de cuidados paliativos' },
              { label: 'Servicios de apoyo', index: 12, value: 'Servicios de apoyo' },
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
          },
          {
            key: 'equipmentStatus',
            label: 'Estatus',
            model: '',
            type: 'select',
            options: [
              { label: 'Activo', index: 1, value: 1 },
              { label: 'Inactivo', index: 2, value: 0 },
            ],
          },
          {
            key: 'price',
            label: 'Costo',
            model: '',
          },
          {
            key: 'warrantyDate',
            label: 'Fecha de garantía',
            type: 'date',
            model: '',
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
          this.$router.go(-1);
        } else {
          console.log(res)

          this.showAlert({ msg: 'Inténtalo de nuevo más tarde y si el error persiste, repórtalo' });
        }
        this.btnAction.loader = false;
      } catch (error) {
        this.btnAction.loader = false;
        console.log(error)
        this.showAlert({ msg: error.response.data.details });
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

    createOrEdit() {
      if (this.isEditing()) {
        this.editEquipment()
      } else {
        this.createEquipment()
      }
    },

    getDate() {
      return this.$store.$store.getters['global/getDate']
    },

    isEditing() {
      return this.$route.params.id ? true : false
    }
  },

  created() {
    if (this.isEditing()) {
      this.getEquipment()
    }
  },
});
</script>

<style scoped>
.main-container-page {
  background-color: white;
}

.card-page {
  padding-top: 0 !important;
}
</style>
