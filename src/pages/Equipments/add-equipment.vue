<template>
  <q-page class="flex flex-center cursor-pointer non-selectable">
    <div class="card-page">
      <div class="column items-end q-mt-md q-mb-xs gt-sm">
        <btn-action v-bind="btnCloseWindow" />
      </div>
      <header-actions :titlePage="'Agregar equipo'" :btn-action="btnAction" />
      <div
        class="main-container-page main-container-page-medium-dark"
        style="height: 82%"
      >
        <q-scroll-area
          class="full-height q-pb-sm"
          style="height: 95% !important"
          :thumb-style="{
            right: '6px',
            borderRadius: '5px',
            background: 'rgba(135, 192, 232, 0.44)',
            width: '5px',
            opacity: 1,
          }"
        >
          <form-text-field :textfields="textfields" />
        </q-scroll-area>
        <div class="col-12 form__date_container" style="height: 5.25%">
          <div class="form__date column items-end q-pa-sm q-mt-auto">
            <div>Fecha de creación  <strong> 12/02/2022</strong></div>
          </div>
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
  name: 'EquipmentsPage',
  components: {
    HeaderActions,
    FormTextField,
    BtnAction,
  },
  data() {
    return {
      Equipos: 40,
      btnAction: {
        show: true,
        btnTitle: 'Guardar',
        to: 'equipments',
        btnWidth: 'auto',
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
        top: [
          {
            label: 'Nombre del equipo',
            model: '',
          },
        ],
        left: [
          {
            label: 'Número de control',
            model: '',
          },
          {
            label: 'Marca',
            model: '',
          },
          {
            label: 'Ubicación',
            model: '',
            type: 'select',
            options: [
              'Área de choque',
              'Consultas externas',
              'Unidades de hospitalización',
              'Quirófanos',
              'Laboratorios',
              'Radiología',
              'Farmacia',
              'Terapia física y rehabilitación',
              'Cuidados intensivos',
              'Unidades de cuidados paliativos',
              'Servicios de apoyo',
            ],
          },
          {
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
            label: 'Provedor',
            model: '',
          },
          {
            label: 'Estatus',
            model: '',
            type: 'select',
            options: ['Activo', 'Inactivo'],
          },
          {
            label: 'Costo',
            model: '',
          },
          {
            label: 'No. serie',
            model: '',
          },
        ],
        textArea: {
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
