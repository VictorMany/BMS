<template>
  <q-page class="flex flex-center cursor-pointer non-selectable">
    <div class="card-page">

      <header-actions
        :titlePage="'Acerca de nosotros'"
        :btn-close-window="btnCloseWindow"
      />

      <div class="main-container-page h-90">
        <q-scroll-area
          class="full-height h-100"
          :thumb-style="{
            right: '1px',
            borderRadius: '5px',
            background: 'rgba(29, 100, 231, 0.2)',
            width: '5px',
            opacity: 1,
          }"
        >
          <div class="q-px-lg-none h-100">
            <q-parallax>
              <template v-slot:media>
                <img
                  src="https://burst.shopifycdn.com/photos/red-and-purple-abstract-ink-clouds.jpg?width=1850&format=pjpg&exif=1&iptc=1"
                />
              </template>

              <template v-slot:content="scope">
                <div class="h-100 w-100 content-layout">
                  <div
                    class="absolute column items-center"
                    :style="{
                      opacity: 1 + (1 - scope.percentScrolled) * 0.55,
                      top: scope.percentScrolled * 60 + '%',
                      left: 0,
                      right: 0,
                    }"
                  >
                    <div class="text-h1 text-white text-center q-pt-lg">
                      BMS
                    </div>
                    <div class="text-h6 text-grey-3 text-center">
                      The biomedical management system v1.0
                    </div>
                  </div>
                </div>
              </template>
            </q-parallax>
            <div class="q-mb-lg">
              <h4>Sistema de gestión de equipos biomédicos</h4>
              <p>
                Nuestro sistema de gestión de equipos biomédicos es una solución
                integral para el monitoreo y mantenimiento de equipos médicos.
                Nuestra plataforma es fácil de usar y está diseñada para ayudar
                a las instituciones de atención médica a gestionar sus equipos
                de manera más eficiente y efectiva.
              </p>
              <p>
                Con nuestro sistema, los usuarios pueden realizar un seguimiento
                de sus equipos en tiempo real y recibir notificaciones
                instantáneas en caso de cualquier problema o falla. Además,
                nuestro sistema también permite la programación de mantenimiento
                preventivo, lo que ayuda a garantizar que los equipos estén en
                óptimas condiciones y listos para su uso cuando se necesiten.
              </p>
              <p>
                Además, nuestro sistema también ofrece informes detallados sobre
                el estado de los equipos, lo que permite a los usuarios tomar
                decisiones informadas sobre la reparación o el reemplazo de
                equipos. También ofrecemos herramientas de gestión de inventario
                que ayudan a los usuarios a realizar un seguimiento de los
                equipos y sus ubicaciones en tiempo real.
              </p>
              <strong>
                <p>Beneficios de usar nuestro sistema</p>
              </strong>
              <p>
                <span> Mejora de la eficiencia: </span>
                Un sistema de gestión de equipos biomédicos permite a las
                instituciones de atención médica gestionar sus equipos de manera
                más eficiente al proporcionar herramientas para realizar un
                seguimiento en tiempo real del estado y ubicación de los
                equipos.
              </p>
              <p>
                <span> Reducción de costos: </span>
                Al programar el mantenimiento preventivo de los equipos médicos,
                se puede reducir la frecuencia de las reparaciones y prolongar
                la vida útil de los equipos. Esto puede ayudar a las
                instituciones de atención médica a reducir los costos a largo
                plazo.
              </p>
              <p>
                <span> Mayor seguridad: </span>
                Al monitorear los equipos en tiempo real, se pueden detectar
                rápidamente problemas o fallas en los equipos, lo que puede
                ayudar a prevenir accidentes y aumentar la seguridad para el
                personal médico y los pacientes.
              </p>
              <p>
                <span> Mejora de la calidad del servicio </span>
                Al garantizar que los equipos médicos estén en óptimas
                condiciones, se puede proporcionar una atención de mayor calidad
                a los pacientes.
              </p>
              <p>
                <span> Información detallada: </span>
                Los sistemas de gestión de equipos biomédicos pueden
                proporcionar informes detallados sobre el estado de los equipos
                y su uso. Esto puede ayudar a las instituciones de atención
                médica a tomar decisiones informadas sobre la reparación o
                reemplazo de equipos.
              </p>
              <p>
                <span> Gestión de inventario: </span>
                Los sistemas de gestión de equipos biomédicos también pueden
                proporcionar herramientas para la gestión de inventario, lo que
                ayuda a las instituciones de atención médica a realizar un
                seguimiento de los equipos y su ubicación en tiempo real.
              </p>
              <p>
                <span> Cumplimiento regulatorio: </span>
                Los sistemas de gestión de equipos biomédicos pueden ayudar a
                las instituciones de atención médica a cumplir con los
                requisitos regulatorios y de cumplimiento, como las normas de
                seguridad y privacidad de los datos.
              </p>
              <p>
                En resumen, nuestro sistema de gestión de equipos biomédicos
                puede ayudar a las instituciones de atención médica a mejorar la
                eficiencia, reducir costos, aumentar la seguridad, mejorar la
                calidad del servicio, proporcionar información detallada,
                gestionar el inventario y cumplir con los requisitos
                regulatorios y de cumplimiento.
              </p>
              <a
                @click="navigateTo('terms-and-conditions')"
                target="_blank"
                class="text-primary"
              >Términos y condiciones</a>
            </div>
          </div>
        </q-scroll-area>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue';
import HeaderActions from 'src/components/compose/HeaderActions.vue';

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
    };
  },
  setup() {
    const getImageUrl = (url) => {
      try {
        return new URL(`../../assets/svg/${url}`, import.meta.url).href;
      } catch (error) {
        /* empty */
      }
    };
    return {
      getImageUrl,
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
.body--light {
  .card-page {
    background: white;
  }
}

h1,
h2,
h4 {
  color: #848484;
}

p {
  margin-bottom: 1em;
}

span {
  color: orange;
}

.content-layout {
  background-color: rgba(0, 0, 0, 0.548) !important;
}
</style>
