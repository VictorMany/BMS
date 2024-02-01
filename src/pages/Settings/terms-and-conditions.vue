<template>
  <q-page class="flex flex-center cursor-pointer non-selectable">
    <div
      class="card-page"
      :style="$q.platform.is.desktop ? 'padding-top: 0 !important' : ''"
    >
      <div class="column items-end q-mt-md q-mb-sm gt-sm">
        <btn-action v-bind="btnCloseWindow" />
      </div>
      <header-actions :titlePage="'Términos y condiciones'" />
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
          <div class="q-px-lg-none  h-100">
            <div class="container">
              <h2>1. Introducción</h2>
              <p>Bienvenido a [nombre del sitio web], propiedad de [nombre de la empresa propietaria del sitio web]. Al
                acceder y utilizar nuestro sitio web, usted acepta cumplir con estos Términos y Condiciones, nuestra
                Política de Privacidad y cualquier otro acuerdo legal que tengamos con usted.</p>
              <p>Lea detenidamente estos Términos y Condiciones antes de usar nuestro sitio web. Si no está de acuerdo con
                los términos y condiciones, no utilice nuestro sitio web.</p>

              <h2>2. Uso del sitio web</h2>
              <ol>
                <li>Usted acepta utilizar nuestro sitio web solo con fines legales y de acuerdo con estos Términos y
                  Condiciones.</li>
                <li>Usted acepta no utilizar nuestro sitio web de ninguna manera que pueda dañar, deshabilitar,
                  sobrecargar o perjudicar nuestro sitio web o interferir en su uso por parte de terceros.</li>
                <li>Usted acepta no intentar obtener acceso no autorizado a nuestro sitio web, a otras cuentas de usuario,
                  sistemas informáticos o redes conectadas a nuestro sitio web.</li>
                <li>Nos reservamos el derecho de modificar, suspender o interrumpir el acceso a nuestro sitio web en
                  cualquier momento sin previo aviso.</li>
              </ol>

              <h2>3. Propiedad intelectual</h2>
              <p>Todos los derechos de propiedad intelectual sobre el contenido del sitio web, incluyendo, entre otros,
                los derechos de autor, las marcas registradas, los diseños, las patentes y cualquier otro derecho de
                propiedad intelectual, son propiedad exclusiva de [nombre de la empresa propietaria del sitio web] o sus
                licenciantes.</p>
              <p>Usted acepta no reproducir, distribuir, modificar, crear obras derivadas, mostrar públicamente,
                transmitir, vender o alquilar ningún contenido del sitio web, excepto con nuestro permiso previo y por
                escrito.</p>

              <h2>4. Enlaces a otros sitios web</h2>
              <p>Nuestro sitio web puede contener enlaces a otros sitios web de terceros que no están bajo nuestro
                control. No somos responsables del contenido o disponibilidad de estos sitios web y no aceptamos ninguna
                responsabilidad por cualquier pérdida o daño que pueda surgir de su uso. El uso de cualquier sitio web
                vinculado es bajo su propio riesgo.</p>

              <h2>5. Modificaciones a los Términos y Condiciones</h2>
              <p>Podemos modificar estos Términos y Condiciones en cualquier momento sin previo aviso. Al continuar
                utilizando nuestro sitio web después de que hayamos publicado los cambios, usted acepta los términos y
                condiciones modificados.</p>

              <h2>6. Renuncia de garantía</h2>
              <p>Nuestro sitio web se proporciona "tal cual", sin garantía de ningún tipo, ya sea expresa o implícita. No
                garantizamos que nuestro sitio web sea seguro, esté libre de errores, virus u otros componentes dañinos.
              </p>

              <h2>7. Limitación de responsabilidad</h2>
              <p>No seremos responsables por ningún daño directo, indirecto, incidental, especial, consecuencial o
                punitivo que surja del uso o la imposibilidad de usar nuestro sitio web. Además, no seremos responsables
                de ninguna pérdida o daño que pueda surgir debido a la suspensión o terminación de su acceso a nuestro
                sitio web.</p>

              <h2>8. Ley aplicable y jurisdicción</h2>
              <p>Estos Términos y Condiciones se regirán e interpretarán de acuerdo con las leyes del país de [nombre del
                país donde se encuentra la empresa propietaria del sitio web]. Cualquier disputa relacionada con estos
                Términos y Condiciones se resolverá exclusivamente en los tribunales del país de [nombre del país donde se
                encuentra la empresa propietaria del sitio web].</p>

              <div id="footer">
                <p>Última actualización: [fecha de la última actualización de los términos y condiciones]</p>
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
        return new URL(`../../assets/svg/${url}`,
          import.meta.url).href
      } catch (error) { /* empty */ }
    }
    return {
      getImageUrl,
      basicToolBar: [['unordered', 'ordered']],
    }
  },
  methods: {
    navigateTo(link) {
      this.$router.push({ path: link })
    },
    goBack() {
      this.$router.go(-1)
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

h1,
h2,
h3 {
  color: #555555;
}

p {
  margin-bottom: 1em;
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

span {
  color: orange;
}

h1 {
  color: $primary;
  font-size: larger;
  line-height: 20px;
}

h2 {
  color: $primary;
  font-size: medium;
}

p {
  margin-bottom: 20px;
}

ol {
  margin-left: 20px;
  margin-bottom: 20px;
}

li {
  margin-bottom: 10px;
}

#footer {
  margin-top: 50px;
  color: #666;
  font-size: 14px;
  text-align: center;
}
</style>
