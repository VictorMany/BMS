<template>
  <q-page class="flex flex-center cursor-pointer non-selectable">
    <div class="card-page">
      <div class="column items-end q-mt-md q-mb-xs">
        <btn-action v-bind="btnCloseWindow" />
      </div>
      <header-actions :titlePage="'Agregar usuario'" :btn-action="btnAction" />
      <div
        class="main-container-page main-container-page-medium-dark"
        style="height: 82%"
      >
        <q-scroll-area
          class="full-height"
          style="height: 95% !important"
          :thumb-style="{
            right: '6px',
            borderRadius: '5px',
            background: 'rgba(29, 100, 231, 0.2)',
            width: '5px',
            opacity: 1,
          }"
        >
          <form-text-field :textfields="textfields" type="user" />
        </q-scroll-area>
        <div class="col-12 form__date_container" style="height: 5.25%">
          <div class="form__date column items-end q-pa-sm q-mt-auto">
            <div>Fecha de creación: <strong> 12/02/2022</strong></div>
          </div>
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
  name: 'UsersPage',
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
        btnWidth: 'auto',
        btnAction: this.createUser,
        loader: false,
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
        image: null,
        top: [
          {
            label: 'Nombre del usuario',
            name: 'userName',
            model: '',
          },
          {
            label: 'Correo',
            name: 'email',
            type: 'email',
            rules: [
              (val) => /@/.test(val) || 'Debe contener "@"',
              (val) =>
                /\S+@\S+\.\S+/.test(val) ||
                'Formato de correo electrónico inválido',
              // Agrega más reglas según tus necesidades
            ],
            model: '',
          },
        ],
        left: [
          {
            label: 'Teléfono',
            name: 'phone',
            rules: [
              (val) =>
                /^\d{10}$/.test(val) ||
                'Debe ser un número de teléfono válido (10 dígitos)',
              // Agrega más reglas según tus necesidades
            ],
            type: 'number',
            model: '',
          },
          {
            label: 'Contraseña',
            name: 'userPassword',
            type: 'password',
            model: '',
          },
          {
            label: 'Rol de usuario',
            name: 'userRole',
            model: '',
            type: 'select',
            options: [
              { label: 'Administrador', index: 1, value: 1 },
              { label: 'Auxiliar', index: 2, value: 2 },
              { label: 'Funciones básicas', index: 3, value: 3 },
            ],
          },
          {
            label: 'Estatus de la cuenta',
            model: '',
            name: 'userStatus',
            type: 'select',
            options: [
              { label: 'Activo', status: true, value: true },
              { label: 'Inactivo', status: false, value: false },
            ],
          },
          {
            label: 'Fecha de nacimiento',
            name: 'birthday',
            type: 'date',
            model: ref(new Date().toLocaleDateString()),
          },
        ],
        right: [],
        textArea: {},
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

    async createUser() {
      this.btnAction.loader = true;

      try {
        const res = await this.$store.dispatch(
          'users/postUserAction',
          this.textfields
        );
        if (res.success) {
          this.$router.go(-1);
        } else {
          console.log('PONER ALERTA');
        }
        this.btnAction.loader = false;
      } catch (error) {
        this.btnAction.loader = false;
        // eslint-disable-next-line no-undef
        this.showNotif();
      }
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
