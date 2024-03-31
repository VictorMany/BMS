<template>
  <q-form
    ref="myForm"
    class="fullscreen q-pa-md flex flex-center main-container-page-dark"
  >
    <div class="card-page login-page">
      <div class="flex flex-center align-center h-100 w-100">
        <div class="login__main-container">
          <div class="login__top-container flex flex-center">
            <div class="login__title">BMS</div>
          </div>
          <div class="h-100 w-100 flex flex-center">
            <div class="login__bottom-container q-pa-lg">
              <q-input
                class="form__input-login q-px-md q-my-lg"
                borderless
                dense
                type="email"
                hide-hint
                bottom-slots
                hide-bottom-space
                stack-label
                v-model="model.email"
                :rules="[rules.validEmail, rules.requiredString]"
                name="email"
                label="Usuario"
              >
                <template v-slot:prepend>
                  <q-icon name="account_circle" />
                </template>
              </q-input>

              <q-input
                ref="pass"
                v-model="model.userPassword"
                class="form__input-login q-px-md"
                dense
                borderless
                hide-hint
                bottom-slots
                hide-bottom-space
                stack-label
                label="Contraseña"
                autocomplete="new-password"
                :type="show ? 'password' : 'text'"
                :rules="[rules.requiredString]"
                @keydown.enter="login"
              >
                <template v-slot:prepend>
                  <q-icon name="lock" />
                </template>
                <template v-slot:append>
                  <q-icon
                    @click="show = !show"
                    :name="visibilityIcon"
                  />
                </template>
              </q-input>

              <!-- <label class="login__legend text-weight-thin q-ma-sm">Olvidaste la contraseña</label> -->

              <div class="col login__submit flex flex-center">
                <btn-action v-bind="btnAction" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </q-form>
</template>

<script>
import { deleteLocalStorage, deleteTokenCookie, rules, showWarning } from 'app/utils/utils';
import { setAuthHeader } from 'src/api/auth';
import BtnAction from 'src/components/atomic/BtnAction.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'EquipmentsPage',
  data() {
    return {
      model: {
        email: '',
        userPassword: '',
      },
      rules,
      show: true,

      btnAction: {
        btnTitle: 'Iniciar sesión',
        btnColor: '#FFFFFF',
        btnWidth: '100%',
        loader: false,
        iconName: '',
        btnAction: this.login,
        btnBackground: this.$q.dark.isActive ? '#1e65e8' : '#1e65e8',
      },
    };
  },
  methods: {
    async login() {
      if (await this.$refs.myForm.validate()) {
        this.btnAction.loader = true;
        try {
          const res = await this.$store.dispatch('users/loginAction', this.model);
          if (res === true) {
            if (this.$route?.params?.id) {
              await this.getEquipment();
              await this.$router.replace({ name: 'add-report' });
            } else {
              if (this.userRole === 3) {
                showWarning(this.$q, { title: 'No se ha escaneado un código QR', msg: 'Debes de escanear un código QR de un equipo para poder iniciar sesión con este usuario' });
                setAuthHeader(null);
                deleteTokenCookie(null);
                deleteLocalStorage();
                this.$store.commit('global/RESET_LOCAL_STORAGE');
                this.$router.replace('/login');
              } else if (this.userRole === 1 || this.userRole === 2) {
                this.$router.replace('/');
              }
            }
          } else {
            showWarning(this.$q, { msg: 'Inténtalo de nuevo más tarde y si el error persiste, repórtalo' });
          }
        } catch (error) {
          console.log('error', error)
        } finally {
          this.btnAction.loader = false;
        }
      }
    },

    async getEquipment() {
      try {
        const params = {
          id: this.$route.params.id
        }
        await this.$store.dispatch('equipments/getEquipmentAction', params)
      } catch (error) {
        console.log(error)
      }
    },
  },
  components: { BtnAction },
  computed: {
    visibilityIcon() {
      return this.model.userPassword.trim() ? (this.show ? 'o_visibility' : 'o_visibility_off') : '';
    },
    userRole: {
      get() {
        return this.$store.getters['users/getRoleGetter'];
      },
    },
  }
});


</script>


<style
  lang="scss"
  scoped
>
.form {
  &__input-login {
    border-radius: 40px !important;
    width: 100% !important;
    padding-inline: 28px !important;
    padding-block: 5px !important;
  }
}

.q-field__messages {
  padding-bottom: 1rem !important;
}

.input .q-field__native,
.q-field__input {
  color: #062841 !important;
  font-weight: 200;
  font-size: 15px !important;
}


.body--dark {
  .main-container-page-dark {
    background: #020a17 !important;
  }
}
</style>
