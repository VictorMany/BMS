<template>
  <q-page class="flex flex-center cursor-pointer non-selectable">
    <div class="card-page">

      <header-actions
        :titlePage="'Aspecto del sistema'"
        :btn-close-window="btnCloseWindow"
      />

      <div class="main-container-page container-form main-container-page-dark q-pa-md">
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
            <div class="info__detail w-100 q-mb-sm">Elige el tema principal para las interfaces del sistema</div>
            <div class="col-12 col-md-5 col-lg-4 q-pt-sm">
              <div class="info__detail w-100 q-pb-md text-center">Modo obscuro</div>
              <div
                class="container-theme border-rounded"
                @click="changeTheme('dark')"
              >
                <div class="flex justify-center items-center">
                  <q-img
                    no-spinner
                    class="image-style-parent"
                    :width="widthParent"
                    :height="heightParent"
                    :src="getImageUrl(laptop)"
                  />
                  <q-img
                    spinner-size="10px"
                    class="image-style-child"
                    :class="desktopClass"
                    :width="widthChild"
                    :height="heightChild"
                    :src="getImageUrl(darkPic)"
                  />
                </div>
              </div>
            </div>
            <div class="col-12 col-md-5 col-lg-4 q-pt-sm">
              <div class="info__detail w-100 q-pb-md text-center">Modo claro</div>
              <div
                class="container-theme border-rounded"
                @click="changeTheme('light')"
              >

                <div class="flex justify-center items-center">
                  <q-img
                    no-spinner
                    class="image-style-parent"
                    :width="widthParent"
                    :height="heightParent"
                    :src="getImageUrl(laptop)"
                  />
                  <q-img
                    spinner-size="10px"
                    class="image-style-child"
                    :class="desktopClass"
                    :width="widthChild"
                    :height="heightChild"
                    :src="getImageUrl(lightPic)"
                  />
                </div>
              </div>
            </div>
          </div>
        </q-scroll-area>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import HeaderActions from 'src/components/compose/HeaderActions.vue'
import { Platform } from 'quasar'

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
      heightParent: '180px',
      widthParent: '300px',
      heightChild: '143px',
      widthChild: '220px',
      desktopClass: 'q-mb-sm no-border-rounded'
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
          color: '#6d8598'
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

  created() {
    if (Platform.is?.android) {
      this.laptop = 'phone.png'
      this.lightPic = 'phone-light.png'
      this.darkPic = 'phone-dark.png'
      this.heightParent = '239px'
      this.widthParent = '119px'
      this.heightChild = '229px'
      this.widthChild = '107px'
      this.desktopClass = ''
    }
  },

  methods: {
    navigateTo(link) {
      this.$router.push({ path: link })
    },
    async changeTheme(theme) {
      if (theme === 'dark') {
        this.$q.dark.set(true)

        await this.$store.dispatch('global/changeIsDark', true);
      } else {
        this.$q.dark.set(false)

        await this.$store.dispatch('global/changeIsDark', false);
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
  position: absolute;
}

.image-style-child {
  border-radius: 12px;
}

.container-theme {
  height: 240px;
}

.container-theme:hover {
  transform: scale(1.03);
}
</style>
