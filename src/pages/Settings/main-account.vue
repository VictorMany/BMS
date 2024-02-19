<template>
  <q-page class="flex flex-center cursor-pointer non-selectable">
    <div class="card-page">
      <header-actions
        :titlePage="'Información de la cuenta'"
        :btn-action="btnAction"
        :btn-close-window="btnCloseWindow"
      />
      <div class="main-container-page main-container-page-medium-dark container-form">
        <q-scroll-area
          class="h-90 q-pa-xs-none q-pa-lg-sm"
          :thumb-style="$store.getters['global/getThumbStyle']"
        >
          <form-component :fields="fields" />
        </q-scroll-area>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue';
import HeaderActions from 'src/components/compose/HeaderActions.vue';
import FormComponent from 'src/components/compose/FormComponent.vue';

export default defineComponent({
  name: 'SettingsPage',
  components: {
    HeaderActions,
    FormComponent,
  },
  data() {
    return {
      btnAction: {
        show: true,
        btnTitle: 'Guardar',
        to: 'settings',
        btnWidth: 'auto',
      },
      btnCloseWindow: {
        iconName: 'exit_to_app',
        btnBackground: '#FF990020',
        btnColor: '#FF9900',
        btnAction: this.goBack
      },
      fields: {
        imageInput: true,
        top: [
          {
            label: 'Nombre del hospital',
            model: '',
          },
          {
            label: 'Correo electrónico',
            model: '',
          },
          {
            label: 'Dirección',
            model: '',
          },
          {
            label: 'Tipo de cuenta',
            model: '',
            type: 'select',
            options: ['Premium', 'Prueba de una semana'],
          },
        ],
        left: [],
        right: [],
        textarea: {},
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
