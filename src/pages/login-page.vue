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
                class="form__item-input-login q-pl-md q-pr-md input q-mt-lg q-mb-lg"
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
                class="form__item-input-login q-pl-md q-pr-md input"
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
    login() {
      console.log('Login');
      this.$router.replace('/');
    },
  },
  components: { BtnAction },
});
</script>

<style lang="scss" scoped>
.login {
  &__main-container {
    position: relative;
    border-radius: 40px;
    width: 100%;
    max-width: 474px;
    height: 527px;
  }

  &__top-container {
    border-radius: 40px;
    width: 100%;
    max-width: 474px;
    height: 251.83px;
  }

  &__title {
    font-style: normal;
    font-weight: 200;
    font-size: 55px;
    color: #ffffff;
    margin-bottom: 8rem;
  }

  &__bottom-container {
    position: absolute;
    top: 19.06%;
    bottom: 1.52%;
    width: 85%;
    height: 390.94px;
    // box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    box-shadow: none;
    border-radius: 40px;
  }

  &__legend {
    font-size: 12px;
  }

  &__submit {
    margin-top: 5rem;
  }
}

.form {
  &__item-input-login {
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
