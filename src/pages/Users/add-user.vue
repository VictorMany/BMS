<template>
  <q-page class="flex flex-center cursor-pointer non-selectable">
    <div class="card-page">
      <div class="column items-end q-mt-md q-mb-xs">
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
          class="full-height"
          style="height: 92% !important"
          :thumb-style="$store.getters['global/getThumbStyle']"
        >
          <form-text-field
            :textfields="textfields"
            type="user"
          />
        </q-scroll-area>

        <div
          class="col-12 form__date_container form__date column justify-center q-px-lg"
          style="height: 6%"
        >
          <div>Fecha de captura: <strong>{{ textfields.createdAt }}</strong></div>
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
  key: 'UsersPage',
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
        photo: null,
        top: [
          {
            label: 'Nombre del usuario',
            key: 'userName',
            model: '',
          },
          {
            label: 'Correo',
            key: 'email',
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
            key: 'phone',
            label: 'Teléfono',
            rules: [
              (val) =>
                /^\d{10}$/.test(val) ||
                'Debe ser un número de teléfono válido (10 dígitos)',
            ],
            type: 'number',
            model: '',
          },
          {
            key: 'userPassword',
            label: 'Contraseña',
            type: 'password',
            model: '',
          },
          {
            key: 'userRole',
            label: 'Rol de usuario',
            model: '',
            type: 'select',
            options: [
              { label: 'Administrador', index: 1, value: 1 },
              { label: 'Auxiliar', index: 2, value: 2 },
              { label: 'Funciones básicas', index: 3, value: 3 },
            ],
          },
          {
            key: 'userStatus',
            label: 'Estatus de la cuenta',
            model: '',
            type: 'select',
            options: [
              { label: 'Activo', status: true, value: true },
              { label: 'Inactivo', status: false, value: false },
            ],
          },
          {
            key: 'birthday',
            label: 'Fecha de nacimiento',
            type: 'date',
            model: ref(new Date().toLocaleDateString().split('T')[0]),
          },
        ],
        right: [],
        textarea: {},
      },
    };
  },

  created() {
    if (this.$route.params.id) {
      this.getUser()
    }
  },

  methods: {
    goBack() {
      this.$router.go(-1);
    },

    getTitle() {
      console.log(this.$route)
      if (this.$route.params.id) {
        return 'Editar usuario'
      }
      else return 'Agregar usuario'
    },

    showNotif(msg = null) {
      this.$q.notify({
        message: 'Ocurrió un error al crear el usuario',
        caption: msg ? msg : 'Intalo de nuevo más tarde',
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
          this.showNotif('Inténtalo de nuevo más tarde y si el error persiste, repórtalo');
        }
        this.btnAction.loader = false;
      } catch (error) {
        this.btnAction.loader = false;
        this.showNotif(error.response.data.details);
      }
    },

    async getUser() {
      this.loading = true
      const params = {
        id: this.$route.params.id,
        textfields: this.textfields
      }
      await this.$store.dispatch('users/getUserAction', params)
      this.loading = false
    },

    async editUser() {
      this.btnAction.loader = true;
      try {
        const res = await this.$store.dispatch(
          'users/updateUserAction',
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
