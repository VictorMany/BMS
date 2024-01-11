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
            :fields="fields"
            type="user"
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
        createdAt: this.getCreatedAt(),
        id: null,

        top: [
          {
            key: 'userName',
            label: 'Nombre del usuario',
            readonly: this.isEditing(),
            model: '',
          },
          {
            key: 'email',
            label: 'Correo',
            type: 'email',
            readonly: this.isEditing(),
            model: '',
            rules: [
              (val) => /@/.test(val) || 'Debe contener "@"',
              (val) =>
                /\S+@\S+\.\S+/.test(val) ||
                'Formato de correo electrónico inválido',
              // Agrega más reglas según tus necesidades
            ],
          },
        ],
        left: [
          {
            key: 'userPassword',
            label: 'Contraseña',
            type: 'password',
            model: '',
          },
          {
            key: 'phone',
            label: 'Teléfono',
            type: 'number',
            model: '',
            rules: [
              (val) =>
                /^\d{10}$/.test(val) ||
                'Debe ser un número de teléfono válido (10 dígitos)',
            ],
          },
          {
            key: 'userRole',
            label: 'Rol de usuario',
            type: 'select',
            model: '',
            options: [
              { label: 'Administrador', index: 1, value: 1 },
              { label: 'Auxiliar', index: 2, value: 2 },
              { label: 'Funciones básicas', index: 3, value: 3 },
            ],
          },
          {
            key: 'userStatus',
            label: 'Estatus',
            type: 'select',
            model: '',
            options: [
              { label: 'Activo', status: true, value: true },
              { label: 'Inactivo', status: false, value: false },
            ],
          },
          {
            key: 'birthday',
            readonly: this.isEditing(),
            label: 'Fecha de nacimiento',
            type: 'date',
            model: ref(new Date().toLocaleDateString().split('T')[0]),
          },
        ],
        right: [
          {
            key: 'photo',
            imageInput: true,
            model: null,
          }
        ],
        bottom: [],
      },
    };
  },

  created() {
    if (this.isEditing === true) {
      console.log('Obteniedo el usuario')
      this.getUser()
    }
  },


  methods: {
    async createUser() {
      this.btnAction.loader = true;
      try {
        const res = await this.$store.dispatch(
          'users/postUserAction',
          this.fields
        );
        if (res === true) {
          this.$router.go(-1);
        } else {
          this.showAlert({ msg: 'Inténtalo de nuevo más tarde y si el error persiste, repórtalo' });
        }
        this.btnAction.loader = false;
      } catch (error) {
        this.btnAction.loader = false;
        this.showAlert({ msg: error.response.data.details });
      }
    },

    async getUser() {
      this.loading = true
      const params = {
        id: this.$route.params.id,
        fields: this.fields
      }
      await this.$store.dispatch('users/getUserAction', params)
      this.loading = false
    },

    async editUser() {
      this.btnAction.loader = true;
      this.fields.id = this.$route.params.id

      try {
        const res = await this.$store.dispatch(
          'users/updateUserAction',
          this.fields
        );
        if (res === true) {
          this.showAlert({ title: 'Éxito al editar', msg: 'El usuario se ha actualizado', color: 'green-14' });
          this.$router.go(-1);
        } else {
          this.showAlert();
        }
        this.btnAction.loader = false;
      } catch (error) {
        this.btnAction.loader = false;
        this.showAlert();
      }
    },

    createOrEdit() {
      if (this.isEditing()) {
        this.editUser()
      } else {
        this.createUser()
      }
    },

    getDate() {
      return this.$store.$store.getters['global/getDate']
    },

    goBack() {
      this.$router.go(-1);
    },

    getTitle() {
      if (this.isEditing()) {
        return 'Editar usuario'
      }
      else return 'Agregar usuario'
    },

    getCreatedAt() {
      if (this.isEditing()) {
        return ''
      }
      else return this.$store.getters['global/getDate']
    },

    showAlert({ msg, color, title, classes }) {
      this.$q.notify({
        message: title ? title : 'Ocurrió un error al crear el usuario',
        caption: msg ? msg : 'Inténtalo de nuevo más tarde',
        color: color ? color : 'secondary',
        classes: classes ? classes : 'border-rounded',
      });
    },

    isEditing() {
      return this.$route.params.id ? true : false
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
