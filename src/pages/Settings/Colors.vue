<template>
  <q-page class="flex flex-center cursor-pointer non-selectable">
    <div class="card-page q-px-none">
      <header-actions :titlePage="'Configuración'" />
      <div class="main-container-page" style="height:85%">
        <q-scroll-area class="fit" :thumb-style="{
          right: '1px',
          borderRadius: '5px',
          background: 'rgba(135, 192, 232, 0.44)',
          width: '5px',
          opacity: 1,
        }">
        <q-toggle size="150px" v-model="shape" v-on:click="changeTheme()" val="150px" label="Modo obscuro" />
        <div class="row">
          <q-img class="image-style-parent" :src="getImageUrl(laptop)">
          </q-img>
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
      laptop: 'laptop.png'
    }
  },
  methods: {
    navigateTo (link) {
      console.log('Juan')
      this.$router.push({ path: link })
    },
    changeTheme () {
      this.$q.dark.toggle()
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
  width: 70%;
}
.image-style-child {
  width: 70%;
}

.avatar-item {
  border-radius: 3px !important;
}
</style>
