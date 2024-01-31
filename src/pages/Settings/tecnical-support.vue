<template>
  <q-page class="flex flex-center cursor-pointer non-selectable">
    <div
      class="card-page"
      :style="$q.platform.is.desktop ? 'padding-top: 0 !important' : ''"
    >
      <div class="column items-end q-mt-md q-mb-sm gt-sm">
        <btn-action v-bind="btnCloseWindow" />
      </div>
      <header-actions :titlePage="'Soporte técnico'" />
      <div class="main-container-page main-container-page-medium-dark container-form">
        <q-scroll-area
          class="h-90 q-pa-xs-none q-pa-lg-sm"
          :thumb-style="$store.getters['global/getThumbStyle']"
        >
          <div class="q-pa-md row justify-center">
            <div
              style="width: 100%"
              class="q-px-md"
            >
              <q-chat-message
                name="BMS"
                :text="['Hola, aquí el equipo de BMS, ¿Cómo podemos ayudarte?']"
                stamp="1 minutes ago"
                text-color="white"
                bg-color="primary"
              >
                <template v-slot:avatar>
                  <q-img
                    class="q-message-avatar q-message-avatar--received bg-white"
                    src="../../assets/png/bms.png"
                    fit="contain"
                    style="width: 20px"
                  >
                  </q-img>
                </template>
              </q-chat-message>
              <q-chat-message
                name="me"
                class="message-style"
                avatar="https://cdn.quasar.dev/img/avatar3.jpg"
                :text="['Hola, mi nombre es Franciso Pérez y tengo una duda']"
                stamp="7 minutes ago"
                sent
                text-color="white"
                bg-color="secondary"
              />
            </div>
          </div>
        </q-scroll-area>
        <div class="row flex flex-center align-center q-px-lg">
          <div class="col">
            <q-input
              class="q-pl-md q-pr-md input-message"
              style="heigh: 120px !important"
              borderless
              v-model="newMessage"
            />
          </div>
          <div class="col-auto q-pl-md">
            <btn-action v-bind="btnAction" />
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue';
import HeaderActions from 'src/components/compose/HeaderActions.vue';
import BtnAction from 'src/components/atomic/BtnAction.vue';

export default defineComponent({
  name: 'SettingsPage',
  components: {
    HeaderActions,
    BtnAction,
  },
  data() {
    return {
      Equipos: 40,
      btnAction: {
        show: true,
        btnWidth: 'auto',
        iconName: 'send',
      },
      newMessage: '',
      btnCloseWindow: {
        iconName: 'close',
        btnBackground: '#FF9900',
        btnColor: '#FFFFFF',
        btnSize: 'xs',
        btnAction: this.goBack,
      },
      fields: {
        top: [
          {
            label: 'Nombre',
            model: '',
          },
          {
            label: 'Correo electrónico',
            model: '',
          },
        ],
        right: [],
        textarea: {
          label:
            'Por favor, explícanos la situación o el problema específico en el que necesitas la ayuda del equipo de BMS para que podamos brindarte el apoyo adecuado.',
          model: '',
        },
      },
    };
  },
  methods: {
    navigateTo(link) {
      this.$router.push({ path: link });
    },
    goBack() {
      this.$router.go(-1);
    },
  },
});
</script>

<style scoped lang="scss">
.main-container-page {
  background-color: white;
}



.input-message {
  background-color: rgba($primary, 0.2);
  border-radius: 0.8rem;
}
</style>