<template>
  <q-page class="flex flex-center cursor-pointer non-selectable">
    <div class="card-page q-px-none">
      <header-actions :titlePage="'Configuración'" />
      <div class="row q-px-md">
        <img class="q-mb-md container-img"
          src="https://www.thinkchamplin.com/uploads/case-studies/main_MercyHealth_WestHospital_04.jpg" />
        <div class="info q-ml-md">
          <div class="info__title">Hospital Mercy West</div>
          <div class="info__email">admingp@mercywest.com</div>
        </div>
      </div>
      <div class="main-container-page" style="height: 68%">
        <q-scroll-area class="fit" :thumb-style="{
          right: '1px',
          borderRadius: '5px',
          background: 'rgba(135, 192, 232, 0.44)',
          width: '5px',
          opacity: 1,
        }">
          <q-list class="q-px-md">
            <div v-for="(item, i) in listSettings"
            @click="navigateTo(item.link)"
            :key="i">
              <q-item class="q-mb-sm setting-item flex items-center clickable ">
                <q-item-section avatar>
                  <q-avatar class="avatar-item">
                    <img :src="getImageUrl(item.img)" />
                  </q-avatar>
                </q-item-section>
                <q-item-section>
                  <q-item-label class="setting-item__title">{{
                    item.title
                  }}</q-item-label>
                  <q-item-label class="setting-item__subtitle" caption>{{
                    item.subtitle
                  }}</q-item-label>
                </q-item-section>
              </q-item>
            </div>
          </q-list>
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
        return new URL(`../../assets/svg/${url}`,
          import.meta.url).href
      } catch (error) { }
    }
    return {
      getImageUrl,
      basicToolBar: [['unordered', 'ordered']]
    }
  },
  methods: {
    navigateTo (link) {
      console.log('Juan')
      this.$router.push({ path: link })
    }
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

.avatar-item {
  border-radius: 3px !important;
}
</style>
