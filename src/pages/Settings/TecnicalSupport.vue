<template>
  <q-page class="flex flex-center cursor-pointer non-selectable">
    <div class="card-page q-px-none">
      <header-actions :titlePage="'Acerca de nosotros y soporte técnico'" />
      <div class="main-container-page" style="height: 90%">
        <q-scroll-area class="full-height h-100" :thumb-style="{
          right: '1px',
          borderRadius: '5px',
          background: 'rgba(135, 192, 232, 0.44)',
          width: '5px',
          opacity: 1,
        }">
        <div class="q-px-lg h-100">
          <q-parallax>
            <template v-slot:media>
              <img src="https://cdn.quasar.dev/img/parallax2.jpg">
            </template>

            <template v-slot:content="scope">
              <div class="absolute column items-center" :style="{
                opacity: 0.55 + (1 - scope.percentScrolled) * 0.55,
                top: (scope.percentScrolled * 60) + '%',
                left: 0,
                right: 0
              }">
                <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg" style="width: 150px; height: 150px">
                <div class="text-h3 text-white text-center">BMS</div>
                <div class="text-h6 text-grey-3 text-center">
                  v1.0
                </div>
              </div>
            </template>
          </q-parallax>
          <div class="container">
            <h3>Sistema de gestión de equipos biomédicos</h3>
            <p>Nuestro sistema de gestión de equipos biomédicos es una solución integral para el monitoreo y mantenimiento de equipos médicos. Nuestra plataforma es fácil de usar y está diseñada para ayudar a las instituciones de atención médica a gestionar sus equipos de manera más eficiente y efectiva.</p>
            <p>Con nuestro sistema, los usuarios pueden realizar un seguimiento de sus equipos en tiempo real y recibir notificaciones instantáneas en caso de cualquier problema o falla. Además, nuestro sistema también permite la programación de mantenimiento preventivo, lo que ayuda a garantizar que los equipos estén en óptimas condiciones y listos para su uso cuando se necesiten.</p>
            <p>Además, nuestro sistema también ofrece informes detallados sobre el estado de los equipos, lo que permite a los usuarios tomar decisiones informadas sobre la reparación o el reemplazo de equipos. También ofrecemos herramientas de gestión de inventario que ayudan a los usuarios a realizar un seguimiento de los equipos y sus ubicaciones en tiempo real.</p>
            <p>En resumen, nuestro sistema de gestión de equipos biomédicos es una solución integral que ofrece monitoreo en tiempo real, programación de mantenimiento preventivo, informes detallados y gestión de inventario. Estamos comprometidos en proporcionar una plataforma fácil de usar y de alta calidad para ayudar a las instituciones de atención médica a mantener sus equipos médicos en excelentes condiciones y listos para su uso en cualquier momento.</p>
            <a href="#" class="button">Contáctanos</a>
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

  h1, h2, h3 {
    color: #555555;
  }
  p {
    margin-bottom: 1em;
  }
  .container {
    margin: 0 auto;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }
  .button {
    display: inline-block;
    padding: 1em 2em;
    background-color: #5d5d5d;
    color: #ffffff;
    text-decoration: none;
    border-radius: 5px;
    transition: background-color 0.2s ease;
  }
  .button:hover {
    background-color: #333333;
  }
</style>
