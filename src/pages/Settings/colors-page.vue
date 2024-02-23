<template>
  <q-page class="flex flex-center cursor-pointer non-selectable">
    <div class="card-page">

      <header-actions
        :titlePage="'Aspecto del sistema'"
        :btn-close-window="btnCloseWindow"
      />

      <div class="main-container-page container-form">
        <q-scroll-area
          class="h-97"
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
                class="container-theme border-rounded"
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
                class="container-theme border-rounded"
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
          <!-- <q-item class="q-mb-sm setting-item  border-rounded flex items-center clickable">
            <q-item-section avatar>
              <q-avatar class="avatar-item border-rounded">
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
          </q-item> -->
        </q-scroll-area>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import HeaderActions from 'src/components/compose/HeaderActions.vue'

export default defineComponent({
  name: 'SettingsPage',
  components: {
    HeaderActions,
  },

  data() {
    return {
      btnCloseWindow: {
        iconName: 'exit_to_app',
        btnBackground: '#FF990020',
        btnColor: '#FF9900',
        btnAction: this.goBack
      },

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
          color: '#6A7985'
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


.image-style-parent {
  width: 300px;
  position: absolute;
}

.image-style-child {
  width: 220px;
  margin-top: 0.97rem;
}

.container-theme {
  height: 200px;
  padding-top: 0.5rem;
}


.container-theme:hover {
  transform: scale(1.03);
}
</style>
