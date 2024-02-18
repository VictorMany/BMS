<template>
  <q-page class="flex flex-center cursor-pointer non-selectable">
    <div class="card-page">
      <header-actions :titlePage="'Configuración'" />
      <div class="main-container-page container-form">
        <q-scroll-area
          class="fit h-100"
          :thumb-style="{
            right: '1px',
            borderRadius: '5px',
            background: 'rgba(29, 100, 231, 0.2)',
            width: '5px',
            opacity: 1,
          }"
        >
          <div class="row">
            <div class="col-12">
              <q-list>
                <div
                  v-for="(item, i) in listSettings"
                  @click="navigateTo(item.link)"
                  :key="i"
                >
                  <q-item class="q-mb-sm setting-item border-rounded flex items-center">
                    <q-item-section avatar>
                      <q-avatar class="avatar-item border-rounded">
                        <img :src="getImageUrl(item.img)" />
                      </q-avatar>
                    </q-item-section>
                    <q-item-section>
                      <q-item-label class="setting-item__title">{{
                        item.title
                      }}</q-item-label>
                      <q-item-label
                        class="setting-item__subtitle"
                        caption
                      >{{
                        item.subtitle
                      }}</q-item-label>
                    </q-item-section>
                  </q-item>
                </div>
              </q-list>
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

export default defineComponent({
  name: 'SettingsPage',
  components: {
    HeaderActions
  },
  data() {
    return {
      listSettings: [
        {
          title: 'Mi cuenta',
          subtitle: 'Detalles de mi cuenta',
          img: 'account.png',
          link: {
            route: 'edit-user',
            params: 0
          }
        },
        {
          title: 'Notificaciones',
          subtitle: 'Alertas del sistema',
          img: 'notification.png',
          link: 'notifications'
        },
        {
          title: 'Usuarios',
          subtitle: 'Lista de usuarios en el sistema',
          img: 'users.png',
          link: 'users'
        },
        {
          title: 'Roles y permisos',
          subtitle: 'Accesos y permisos dinámicos dentro del sistema',
          img: 'role.png',
          link: 'roles'
        },
        {
          title: 'Colores',
          subtitle: 'Color de énfasis, color de tema',
          img: 'color.png',
          link: 'colors'
        },
        {
          title: 'Soporte técnico',
          subtitle: 'Ayuda, reportar error',
          img: 'tecnical.png',
          link: 'tecnical-support'
        },
        {
          title: 'Acerca de nosotros',
          subtitle: 'Información y contacto',
          img: 'about.png',
          link: 'about-us'
        }
      ]
    }
  },
  setup() {
    const getImageUrl = (url) => {
      try {
        return new URL(`../../assets/png/${url}`,
          import.meta.url).href
        // eslint-disable-next-line no-empty
      } catch (error) { }
    }
    return {
      getImageUrl,
      basicToolBar: [['unordered', 'ordered']]
    }
  },
  methods: {
    navigateTo(link) {
      if (link.params || link.params === 0) {
        this.$router.push({
          name: link.route,
          params: {
            id: link.params
          }
        })
      } else { this.$router.push({ path: link }) }
    }
  }
})
</script>
