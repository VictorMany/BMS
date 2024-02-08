<template>
  <div class="fullscreen q-pa-md flex flex-center bg-white main-container-page-dark">
    <div class="card-page login-page">
      <div class="flex flex-center align-center h-100 w-100">
        <div class="login__main-container">
          <div class="login__top-container flex flex-center">
            <div class="login__title">BMS</div>
          </div>
          <div class="h-100 w-100 flex flex-center">
            <div class="login__bottom-container q-pa-lg">

              <q-input
                class="form__input-login q-pl-md q-pr-md input q-mt-lg q-mb-lg"
                borderless
                dense
                v-model="model.user"
                label="Usuario"
              >
                <template v-slot:prepend>
                  <q-icon name="account_circle" />
                </template>
              </q-input>

              <q-input
                ref="pass"
                type="password"
                class="form__input-login q-pl-md q-pr-md input"
                borderless
                dense
                v-model="model.password"
                label="Contraseña"
              >
                <template v-slot:prepend>
                  <q-icon name="lock" />
                </template>
              </q-input>

              <label class="login__legend text-weight-thin q-ma-sm">Olvidaste la contraseña</label>

              <div class="col login__submit flex flex-center">
                <btn-action v-bind="btnAction" />
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { showSuccess, showWarning } from 'app/utils/utils';
import BtnAction from 'src/components/atomic/BtnAction.vue';
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'EquipmentsPage',
  data() {
    return {
      model: {
        user: '',
        password: '',
      },

      btnAction: {
        btnTitle: 'Iniciar sesión',
        btnColor: '#FFFFFF',
        btnWidth: '100%',
        btnAction: this.login,
        style: 'height: 40.98px',
        iconName: '',
        btnBackgroundGradient:
          'linear-gradient(269.25deg, #1e65e8 -4.79%, #1e65e8 94.27%)',
      },
    };
  },
  methods: {
    async login() {
      this.btnAction.loader = true;
      try {
        const res = await this.$store.dispatch(
          'users/loginAction',
          this.model
        );
        if (res === true) {
          showSuccess(this.$q, { title: 'Inicio de sesión exitoso' });
          this.$router.replace('/');
        } else {
          showWarning(this.$q, { msg: 'Inténtalo de nuevo más tarde y si el error persiste, repórtalo' });
        }
        this.btnAction.loader = false;
      } catch (error) {
        this.btnAction.loader = false;
        showWarning(this.$q, { msg: error.response ? error.response.data.details : error });
      }
    },

  },
  components: { BtnAction },
});
</script>

<style lang="scss" scoped>
.form {
  &__input-login {
    border-radius: 50px !important;
    max-width: 348.65px !important;
    width: 100% !important;
    height: 46.69px !important;
    padding-top: 0.2rem !important;
  }
}

.q-field__label {
  padding-bottom: 1rem !important;
}

.input .q-field__native,
.q-field__input {
  color: #062841 !important;
  font-weight: 200;
  font-size: 15px !important;
}
</style>