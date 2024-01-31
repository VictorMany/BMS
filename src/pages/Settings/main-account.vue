<template>
  <q-page class="flex flex-center cursor-pointer non-selectable">
    <div
      class="card-page"
      :style="$q.platform.is.desktop ? 'padding-top: 0 !important' : ''"
    >
      <div class="column items-end q-mt-md q-mb-sm gt-sm">
        <btn-action v-bind="btnCloseWindow" />
      </div>

      <header-actions
        :titlePage="'Información de la cuenta'"
        :btn-action="btnAction"
      />
      <div class="main-container-page h-90">
        <q-scroll-area
          class="full-height h-100"
          :thumb-style="$store.getters['global/getThumbStyle']"
        >
          <form-text-field :fields="fields" />
        </q-scroll-area>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue';
import HeaderActions from 'src/components/compose/HeaderActions.vue';
import FormTextField from 'src/components/compose/FormTextField.vue';
import BtnAction from 'src/components/atomic/BtnAction.vue';

export default defineComponent({
  name: 'SettingsPage',
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
        to: 'settings',
        btnWidth: 'auto',
      },
      btnCloseWindow: {
        iconName: 'close',
        btnBackground: '#FF9900',
        btnColor: '#FFFFFF',
        btnSize: 'xs',
        btnAction: this.goBack,
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
        ],
        left: [
          {
            label: 'Tipo de cuenta',
            model: '',
            type: 'select',
            options: ['Premium', 'Prueba de una semana'],
          },
        ],
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

<style scoped lang="scss">
.container-img {
  object-fit: cover;
  border-radius: 10px;
  width: 178px;
  height: 98px;
}

.divider {
  background: #006aff;
  margin-bottom: 1rem;
  border-radius: 8px;
}
</style>
