<template>
  <q-page class="flex flex-center cursor-pointer non-selectable">
    <div class="card-page">
      <div class="column items-end q-mt-md q-mb-xs gt-sm">
        <btn-action v-bind="btnCloseWindow" />
      </div>
      <header-actions
        :titlePage="'Agregar equipo'"
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
          <form-text-field :textfields="textfields" />
        </q-scroll-area>
        <div
          class="col-12 form__date_container form__date column justify-center q-px-lg"
          style="height: 6%"
        >
          <div>Fecha de creación: <strong> 12/02/2022</strong></div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue';
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
        to: 'equipments',
        btnWidth: 'auto',
        btnAction: this.createEquipment,
      },
      btnCloseWindow: {
        iconName: 'close',
        btnBackground: '#FF9900',
        btnColor: '#FFFFFF',
        btnSize: 'xs',
        btnAction: this.goBack,
      },

      textfields: {
        imageInput: true,
        photo: null,
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
            model: '',
            type: 'select',
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
            model: ref(new Date().toISOString().split('T')[0]),
          },
        ],
        textarea: {
          label: 'Observaciones del equipo',
          model: '',
        },
      },
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },


    showNotif() {
      this.$q.notify({
        message: 'Ocurrió un error al crear el usuario',
        caption: 'Intalo de nuevo más tarde',
        color: 'secondary',
        classes: 'border-rounded',
      });
    },

    // ######### CRUD ########## //
    async createEquipment() {
      this.btnAction.loader = true;
      try {
        const res = await this.$store.dispatch(
          'equipments/postEquipmentAction',
          this.textfields
        );
        if (res.success) {
          this.$router.go(-1);
        } else {
          this.showNotif('Inténtalo de nuevo más tarde y si el error persiste, repórtalo');
        }
        this.btnAction.loader = false;
      } catch (error) {
        this.btnAction.loader = false;
        this.showNotif(error.response.data.details);
      }
    },

    async getEquipment() {
      this.loading = true

      const params = {
        id: this.$route.params.id,
        textfields: this.textfields
      }

      await this.$store.dispatch('equipments/getEquipmentAction', params)
      this.loading = false
    },
  },

  created() {
    if (this.$route.params.id) {
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
