<template>
  <q-page class="flex flex-center cursor-pointer non-selectable">
    <div
      class="card-page"
      :style="$q.platform.is.desktop ? 'padding-top: 0 !important' : ''"
    >
      <div class="column items-end q-mt-md q-mb-sm gt-sm">
        <btn-action v-bind="btnCloseWindow" />
      </div>

      <header-actions :titlePage="'Aspecto del sistema'" />
      <div class="main-container-page container-form">
        <q-scroll-area
          class="h-90"
          :thumb-style="{
            right: '1px',
            borderRadius: '5px',
            background: 'rgba(29, 100, 231, 0.2)',
            width: '5px',
            opacity: 1,
          }"
        >
          <div class="row">
            <div class="info__detail w-100">Elige el tema principal para las interfaces del sistema</div>
            <div class="col-12 col-md-5 col-lg-4 q-pa-md">
              <div
                class="container-theme"
                @click="changeTheme('dark')"
              >
                <div class="flex justify-center">
                  <q-img
                    no-spinner
                    class="image-style-parent"
                    :src="getImageUrl(laptop)"
                  />
                  <q-img
                    spinner-size="10px"
                    class="image-style-child"
                    :src="getImageUrl(darkPic)"
                  />
                </div>
              </div>
            </div>
            <div class="col-12 col-md-5 col-lg-4 q-pa-md">
              <div
                class="container-theme"
                @click="changeTheme('light')"
              >
                <div class="flex justify-center">
                  <q-img
                    no-spinner
                    class="image-style-parent"
                    :src="getImageUrl(laptop)"
                  />
                  <q-img
                    spinner-size="10px"
                    class="image-style-child"
                    :src="getImageUrl(lightPic)"
                  />
                </div>
              </div>
            </div>
          </div>
          <q-item class="q-mb-sm setting-item flex items-center clickable">
            <q-item-section avatar>
              <q-avatar class="avatar-item">
                <img :src="getImageUrl('color.png')" />
              </q-avatar>
            </q-item-section>
            <q-item-section class="q-px-none">
              <div class="row justify-between">
                <div class="col-auto">
                  <q-item-label class="setting-item__title">Color de realce</q-item-label>
                  <q-item-label
                    class="setting-item__subtitle"
                    caption
                  >
                    Colores de títulos de secciones, textos más importantes
                  </q-item-label>
                </div>
                <div class="col-auto q-pa-none q-pt-xs">
                  <div class="row">
                    <q-btn
                      v-for="(button, index) in buttonColors"
                      class="q-mx-sm"
                      unelevated
                      :style="`background-color: ${button.color}`"
                      :key="index"
                      round
                      size="7px"
                    />
                  </div>
                </div>
              </div>
            </q-item-section>
          </q-item>
        </q-scroll-area>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import HeaderActions from 'src/components/compose/HeaderActions.vue'
import BtnAction from 'src/components/atomic/BtnAction.vue'

export default defineComponent({
  name: 'SettingsPage',
  components: {
    HeaderActions,
    BtnAction
  },
  data() {
    return {
      listSettings: [
        {
          title: 'Cuenta principal',
          subtitle: 'Información asociada a tu cuenta en el sistema',
          img: 'main_account.svg',
          link: 'main-account'
        },
        {
          title: 'Notificaciones',
          subtitle: 'Alertas del sistema',
          img: 'notifications.svg',
          link: 'notifications'
        },
        {
          title: 'Colores',
          subtitle: 'Color de énfasis, color de tema',
          img: 'colours.svg',
          link: 'colors'
        },
        {
          title: 'Roles y permisos',
          subtitle: 'Accesos y permisos dinámicos dentro del sistema',
          img: 'roles.svg',
          link: 'roles'
        },
        {
          title: 'Soporte técnico',
          subtitle: 'Ayuda, reportar error, contacto',
          img: 'tecnical_support.svg',
          link: 'tecnical-support'
        }
      ],
      btnCloseWindow: {
        iconName: 'close',
        btnBackground: '#FF9900',
        btnColor: '#FFFFFF',
        btnSize: 'xs',
        btnAction: this.goBack
      }
    }
  },
  setup() {
    const getImageUrl = (url) => {
      try {
        return new URL(`../../assets/png/${url}`,
          import.meta.url).href
      } catch (error) { /* empty */ }
    }
    return {
      getImageUrl,
      buttonColors: [
        {
          color: '#1e65e8'
        },
        {
          color: '#91c8ff84'
        },
        {
          color: '#EC7063'
        },
        {
          color: '#48C9B0'
        },
        {
          color: '#F5B041'
        }
      ],
      primaryColor: '#1e65e8',
      basicToolBar: [['unordered', 'ordered']],
      laptop: 'laptop.png',
      darkPic: 'dark.png',
      currentPic: 'dark.png',
      lightPic: 'light.png'
    }
  },
  methods: {
    navigateTo(link) {
      this.$router.push({ path: link })
    },
    async changeTheme(theme) {
      if (theme === 'dark') {
        this.$q.dark.set(true)

        await this.$store.dispatch('global/addSttingsToLocalStorage', {
          isDark: true
        });
      } else {
        this.$q.dark.set(false)

        await this.$store.dispatch('global/addSttingsToLocalStorage', {
          isDark: false
        });
      }
    },
    goBack() {
      this.$router.go(-1)
    }
  },
})
</script>

<style scoped lang="scss">
.body--light {
  .card-page {
    background: white;
  }
}

.container-img {
  object-fit: cover;
  border-radius: 10px;
  width: 178px;
  height: 98px;
}

.image-style-parent {
  width: 300px;
  position: absolute;
}

.image-style-child {
  width: 220px;
  margin-top: 0.97rem;
}

.container-theme {
  border-radius: 1rem;
  height: 200px;
  padding-top: 0.5rem;
}

.subtitle {
  font-size: 14px;

}

.container-theme:hover {
  transform: scale(1.03);
}

.avatar-item {
  border-radius: 3px !important;
}
</style>
