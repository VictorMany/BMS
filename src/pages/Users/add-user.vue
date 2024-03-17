<template>
  <q-page class="flex flex-center cursor-pointer non-selectable">
    <div class="card-page">

      <header-actions
        :titlePage="getTitle()"
        :btn-action="btnAction"
        :btn-close-window="btnCloseWindow"
      />
      <div class="main-container-page main-container-page-dark container-form">
        <q-scroll-area
          class="h-97 q-pa-xs-none q-pa-lg-sm"
          :thumb-style="$store.getters['global/getThumbStyle']"
        >
          <form-component
            ref="fieldsComponent"
            :fields="fields"
            :loading="loading"
            type="user"
          />
        </q-scroll-area>
      </div>
    </div>

    <q-dialog
      v-model="modalPassword"
      persistent
    >
      <q-card class="border-shadow q-px-sm border-rounded modal-ios">
        <q-card-section>
          <div class="title-page text-primary">Actualiza tu contraseña</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-form ref="formPassword">
            <div class="q-pr-md q-pt-sm form__item-label text-weight-medium">
              Ingresa tu contraseña actual
            </div>
            <input-component
              :item="formPassword.currentPassword"
              class="form__input bg-accent col-12 col-sm"
              v-model:model="formPassword.currentPassword.model"
            />
            <div class="q-pr-md q-pt-sm form__item-label text-weight-medium">
              Ingresa tu contraseña nueva
            </div>
            <input-component
              :item="formPassword.newPassword"
              class="form__input bg-accent col-12 col-sm"
              v-model:model="formPassword.newPassword.model"
            />
            <div class="q-pr-md q-pt-sm form__item-label text-weight-medium">
              Confirma tu contraseña nueva
            </div>
            <input-component
              :item="formPassword.verifyNewPassword"
              class="form__input bg-accent col-12 col-sm"
              v-model:model="formPassword.verifyNewPassword.model"
            />
          </q-form>
        </q-card-section>

        <q-card-actions
          align="right"
          class="q-pa-md q-pb-lg"
        >
          <btn-action v-bind="btnCancel" />
          <btn-action v-bind="btnUpdatePassword" />
        </q-card-actions>
      </q-card>
    </q-dialog>

  </q-page>
</template>

<script>
import { defineComponent } from 'vue';
import HeaderActions from 'src/components/compose/HeaderActions.vue';
import FormComponent from 'src/components/compose/FormComponent.vue';
import { rules, showSuccess, showWarning } from 'app/utils/utils';
import InputComponent from 'src/components/atomic/Form/InputComponent.vue';
import BtnAction from 'src/components/atomic/BtnAction.vue';

export default defineComponent({
  key: 'UsersPage',
  components: {
    HeaderActions,
    FormComponent,
    InputComponent,
    BtnAction
  },
  data() {
    return {
      loading: false,
      modalPassword: false,
      originalUser: null,
      errorMsg: '',

      btnAction: {
        show: true,
        btnTitle: 'Guardar',
        iconName: 'o_save',
        btnWidth: 'auto',
        tooltip: 'Guardar usuario',
        btnAction: this.createOrEdit,
        loader: false,
      },

      btnCancel: {
        show: true,
        btnTitle: 'Cancelar',
        iconName: 'close',
        btnWidth: 'auto',
        tooltip: 'Cancelar y cerrar',
        btnAction: this.closeModalPassword,
        loader: false,
      },

      btnUpdatePassword: {
        show: true,
        btnTitle: 'Actualizar',
        iconName: 'update',
        btnWidth: 'auto',
        tooltip: 'Actualizar nueva contraseña',
        btnAction: this.updatePassword,
        loader: false,
      },

      btnCloseWindow: {
        iconName: 'exit_to_app',
        btnBackground: '#FF990020',
        btnColor: '#FF9900',
        btnAction: this.goBack
      },

      formPassword: {
        newPassword: {
          key: 'newUserPassword',
          label: 'Contraseña*',
          type: 'password',
          shouldShow: !this.isEditing(),
          model: '',
          rules: [rules.requiredString],
        },
        verifyNewPassword: {
          key: 'verifyUserPassword',
          label: 'Contraseña*',
          type: 'password',
          shouldShow: !this.isEditing(),
          model: '',
          rules: [rules.requiredString],
        },
        currentPassword: {
          key: 'currentUserPassword',
          label: 'Contraseña*',
          type: 'password',
          shouldShow: !this.isEditing(),
          model: '',
          rules: [rules.requiredString],
        }
      },

      fields: {
        createdAt: this.getCreatedAt(),
        id: null,

        extras: [
          {
            key: 'UserId',
            model: ''
          }
        ],

        top: [
          {
            key: 'userName',
            label: 'Nombre del usuario*',
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
            label: 'Correo*',
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
            key: 'birthday',
            label: 'Fecha de nacimiento*',
            type: 'date',
            model: null,
            readonly: this.isEditing(),
            restrictedMaxDate: this.restrictedMaxDate(),
            rules: [rules.requiredString, this.errorMsg],
          },
          {
            key: 'phone',
            label: 'Teléfono*',
            mask: '(###) ### - ####',
            model: '',
            rules: [rules.validPhoneNumber, rules.requiredString],
          },
          {
            key: 'userRole',
            label: 'Rol de usuario*',
            type: 'select',
            model: null,
            options: [
              { label: 'Administrador', index: 1, value: 1 },
              { label: 'Auxiliar', index: 2, value: 2 },
              { label: 'Expectador', index: 3, value: 3 },
            ],
            rules: [rules.requiredObject],
          },
          {
            key: 'userStatus',
            label: 'Estatus*',
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
            key: 'userPassword',
            label: 'Contraseña*',
            type: 'password',
            shouldShow: !this.isEditing(),
            model: '',
            rules: [rules.requiredString],
          },
          {
            model: 'Actualizar contraseña',
            type: 'button',
            btnAction: this.openChangePassword,
            shouldShow: this.isEditing() && this.$route?.params?.id == 0
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

      userId: null
    };
  },

  created() {
    this.checkPermissions()
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

        this.originalUser = await this.$store.dispatch('users/getUserAction', params)
        this.userId = this.fields.extras[0].model

        this.loading = false
      } catch (error) {
        this.loading = false
        console.log(error)
      }
    },

    async editUser() {
      this.btnAction.loader = true;

      try {
        this.fields.id = this.userId
        this.fields.originalObj = this.originalUser

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

    async updatePassword() {
      const validForm = await this.$refs.formPassword.validate().then(success => { return success })
      if (validForm === true) {
        this.btnUpdatePassword.loader = true;
        try {
          const payload = {
            currentPassword: this.formPassword.currentPassword.model,
            userPassword: this.formPassword.newPassword.model,
          }

          const res = await this.$store.dispatch(
            'users/updatePasswordAction',
            payload
          );
          if (res === true) {
            showSuccess(this.$q, { title: 'Éxito al actualizar la contraseña', msg: 'La contraseña se ha actualizado' });
            this.closeModalPassword()
          } else {
            showWarning(this.$q, { msg: 'Inténtalo de nuevo más tarde y si el error persiste, repórtalo' });
          }
          this.btnUpdatePassword.loader = false;
        } catch (error) {
          this.btnUpdatePassword.loader = false;
        }
      }
    },

    checkPermissions() {
      switch (this.userRole) {
        case 2:
        case 3:
          this.updateFieldByKeyInAllArrays('userRole', {
            readonly: true
          })
          this.updateFieldByKeyInAllArrays('userStatus', {
            readonly: true
          })
          break;
      }
    },

    openChangePassword() {
      this.modalPassword = true
    },

    closeModalPassword() {
      this.modalPassword = false
      this.formPassword.currentPassword.model = ''
      this.formPassword.newPassword.model = ''
      this.formPassword.verifyNewPassword.model = ''
    },

    validatePasswordsMatch() {
      this.formPassword.verifyNewPassword.rules[1] = rules.sameThanOther(this.formPassword.newPassword.model)
    },

    showPassword() {
      return true
    },

    getModelValueByKey(key) {
      // Busca la clave en todas las secciones del objeto fields
      for (const sectionKey in this.fields) {
        if (Object.prototype.hasOwnProperty.call(this.fields, sectionKey)) {
          const elements = this.fields[sectionKey];

          // Verifica si elements es iterable (un objeto iterable debería tener la propiedad Symbol.iterator)
          if (elements && typeof elements[Symbol.iterator] === 'function') {
            // Busca la clave en cada elemento de la sección
            for (const element of elements) {
              if (element.key === key) {
                return element.model
              }
            }
          }
        }
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

    restrictedMaxDate() {
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear();
      const month = currentDate.getMonth().toString().padStart(2, '0');
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
    },
  },

  computed: {
    userRole: {
      get() {
        return this.$store.getters['users/getRoleGetter'];
      },
    },
  },

  watch: {
    'formPassword.newPassword.model': function () {
      this.formPassword.verifyNewPassword.model = ''
    },
    'formPassword.verifyNewPassword.model': function () {
      this.validatePasswordsMatch();
    }
  }
});
</script>

<style scoped>
.main-container-page {
  background-color: white;
}
</style>