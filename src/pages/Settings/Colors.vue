<template>
  <q-page class="flex flex-center cursor-pointer non-selectable">
    <div class="card-page q-px-none">
      <header-actions :titlePage="'Aspecto del sistema'" />
      <div class="main-container-page" style="height:85%">
        <q-scroll-area class="fit" :thumb-style="{
          right: '1px',
          borderRadius: '5px',
          background: 'rgba(135, 192, 232, 0.44)',
          width: '5px',
          opacity: 1,
        }">
        <div class="row">
          <div class="col-12 col-md-5 col-lg-4 q-pa-md">
            <div class="container-theme" @click="changeTheme('dark')">
              <div class="flex justify-center">
                <q-img class="image-style-parent" :src="getImageUrl(laptop)"/>
                <q-img class="image-style-child" :src="getImageUrl(darkPic)"/>
              </div>
              <div class="info__email q-px-md q-py-xl w-100 text-center">Modo obscuro</div>
            </div>
          </div>
          <div class="col-12 col-md-5 col-lg-4 q-pa-md">
            <div class="container-theme" @click="changeTheme('light')">
              <div class="flex justify-center">
                <q-img class="image-style-parent" :src="getImageUrl(laptop)"/>
                <q-img class="image-style-child" :src="getImageUrl(lightPic)"/>
              </div>
              <div class="info__email q-px-md q-py-xl w-100 text-center">Modo claro</div>
            </div>
          </div>
        </div>
        </q-scroll-area>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue'
import HeaderActions from 'src/components/compose/HeaderActions.vue'

export default defineComponent({
  name: 'SettingsPage',
  components: {
    HeaderActions
  },
  data () {
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
      ]
    }
  },
  setup () {
    const getImageUrl = (url) => {
      try {
        return new URL(`../../assets/png/${url}`,
          import.meta.url).href
      } catch (error) { }
    }
    return {
      getImageUrl,
      shape: ref(true),
      basicToolBar: [['unordered', 'ordered']],
      laptop: 'laptop.png',
      darkPic: 'dark.png',
      currentPic: 'dark.png',
      lightPic: 'light.png'
    }
  },
  methods: {
    navigateTo (link) {
      console.log('Juan')
      this.$router.push({ path: link })
    },
    changeTheme (theme) {
      if (theme === 'dark') { this.$q.dark.set(true) } else { this.$q.dark.set(false) }
    }
  },
  created () {
    this.shape = this.$q.dark.isActive
  }
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
  border: 3px solid #91c8ff84;
  border-radius: 1rem;
  height: 200px;
  padding-top: 0.5rem;
}

.subtitle {
  font-size: 14px;

}

.container-theme:hover {
  border: 5px solid #00000034;
}

.avatar-item {
  border-radius: 3px !important;
}
</style>
