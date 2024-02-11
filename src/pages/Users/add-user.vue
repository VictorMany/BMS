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
          <form-component
            ref="fieldsComponent"
            :fields="fields"
            :loading="loading"
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
import { defineComponent } from 'vue';
import HeaderActions from 'src/components/compose/HeaderActions.vue';
import FormComponent from 'src/components/compose/FormComponent.vue';
import { rules, showSuccess, showWarning } from 'app/utils/utils';

export default defineComponent({
  key: 'UsersPage',
  components: {
    HeaderActions,
    FormComponent,
  },
  data() {
    return {
      loading: false,

      btnAction: {
        show: true,
        btnTitle: 'Guardar',
        iconName: 'save',
        btnWidth: 'auto',
        tooltip: 'Guardar usuario',
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
        createdAt: this.getCreatedAt(),
        id: null,

        top: [
          {
            key: 'userName',
            label: 'Nombre del usuario',
            readonly: this.isEditing(),
            rules: [
              rules.requiredString,
              rules.maxLength(50),
              rules.alpha
            ],
            model: '',
          },
          {
            key: 'email',
            label: 'Correo',
            type: 'email',
            readonly: this.isEditing(),
            model: '',
            rules: [
              rules.requiredString,
              rules.maxLength(50),
              rules.validEmail
            ],
          },
        ],
        left: [
          {
            key: 'userPassword',
            label: 'Contraseña',
            type: 'password',
            model: '',
            rules: [rules.requiredString],
          },
          {
            key: 'phone',
            label: 'Teléfono',
            type: 'number',
            model: '',
            rules: [rules.validPhoneNumber, rules.requiredString],
          },
          {
            key: 'userRole',
            label: 'Rol de usuario',
            type: 'select',
            model: null,
            options: [
              { label: 'Administrador', index: 1, value: 1 },
              { label: 'Auxiliar', index: 2, value: 2 },
              { label: 'Funciones básicas', index: 3, value: 3 },
            ],
            rules: [rules.requiredObject],
          },
          {
            key: 'userStatus',
            label: 'Estatus',
            type: 'select',
            model: null,
            shouldShow: this.isEditing(),
            options: [
              { label: 'Activo', status: true, value: true },
              { label: 'Inactivo', status: false, value: false },
            ],
            rules: [rules.requiredObject],
          },
          {
            key: 'birthday',
            label: 'Fecha de nacimiento',
            type: 'date',
            model: null,
            readonly: this.isEditing(),
            restrictedMaxDate: this.restrictedMaxDate(),
            rules: [rules.requiredString, rules.adultAge],
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
    if (this.isEditing()) {
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
          showSuccess(this.$q, { title: 'Éxito al crear el usuario', msg: 'El usuario se ha agregado' });
          this.$router.go(-1);
        } else {
          showWarning(this.$q, { msg: 'Inténtalo de nuevo más tarde y si el error persiste, repórtalo' });
        }
        this.btnAction.loader = false;
      } catch (error) {
        this.btnAction.loader = false;
      }
    },

    async getUser() {
      try {
        this.loading = true
        const params = {
          id: this.$route.params.id,
          fields: this.fields
        }
        await this.$store.dispatch('users/getUserAction', params)
        this.loading = false
      } catch (error) {
        this.loading = false
        console.log(error)
      }
    },

    async editUser() {
      this.btnAction.loader = true;

      try {
        this.fields.id = this.$route.params.id
        const res = await this.$store.dispatch(
          'users/updateUserAction',
          this.fields
        );
        if (res === true) {
          showSuccess(this.$q, { title: 'Éxito al editar el usuario', msg: 'El usuario se ha actualizado' });
          this.$router.go(-1);
        } else {
          showWarning(this.$q, { msg: 'Inténtalo de nuevo más tarde y si el error persiste, repórtalo' });
        }
        this.btnAction.loader = false;
      } catch (error) {
        this.btnAction.loader = false;
      }
    },

    async createOrEdit() {
      if (await this.$refs.fieldsComponent.validate()) {
        if (this.isEditing()) {
          this.editUser()
        } else {
          this.createUser()
        }
      }
    },

    restrictedMaxDate() {
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear();
      const month = currentDate.getMonth();
      const eighteenYearsAgo = currentYear - 18;
      return `${eighteenYearsAgo}/${month}`;
    },


    getDate() {
      return this.$store.$store.getters['global/getDate']
    },

    goBack() {
      this.$router.go(-1);
    },

    getTitle() {
      if (this.isEditing()) {
        return 'Información del usuario'
      }
      else return 'Agregar usuario'
    },

    getCreatedAt() {
      if (this.isEditing()) {
        return ''
      }
      else return this.$store.getters['global/getDate']
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
</style>