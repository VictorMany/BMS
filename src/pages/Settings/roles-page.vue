<template>
  <q-page class="flex flex-center cursor-pointer non-selectable">
    <div class="card-page">

      <header-actions
        :titlePage="'Roles y permisos'"
        :btn-close-window="btnCloseWindow"
      />

      <div class="main-container-page container-form">
        <q-scroll-area
          class="fit h-100"
          :thumb-style="$store.getters['global/getThumbStyle']"
        >
          <div>
            <div class="setting__title text-weight-medium q-pb-sm">
              Administrador
            </div>
            <div class="setting__subtitle">
              Los Administradores tienen acceso privilegiado para gestionar el sistema. Sus permisos incluyen:
              <div class="text-weight-bold">
                Permisos
              </div>
              <ul>
                <li>
                  Gestionar Equipos: Poseen la capacidad de administrar los equipos del sistema, incluyendo su
                  creación y modificación según sea necesario.
                </li>
                <li>
                  Realizar Mantenimientos: Tienen la facultad de programar y ejecutar mantenimientos en los
                  equipos registrados en el sistema, así como acceder a los detalles pertinentes.
                </li>
                <li>
                  Administrar Planes de Mantenimientos: Disponen del poder para crear y gestionar planes de
                  mantenimientos preventivos.
                </li>
                <li>
                  Acceder al Calendario: Tienen autorización para visualizar y gestionar el calendario de
                  actividades del sistema.
                </li>
                <li>
                  Administrar Contratos de Servicio: Disponen del poder para crear y gestionar contratos para los
                  equipos biomédicos.
                </li>
                <li>
                  Generar Reportes: Poseen la facultad de generar informes sobre diferentes aspectos del
                  sistema.
                </li>
                <li>
                  Configurar el sistema: Tienen acceso a la configuración del sistema para ajustar parámetros
                  según las necesidades del negocio.
                </li>
              </ul>
              <div class="text-weight-bold">
                Restricciones
              </div>
              <ul>
                <li>
                  No pueden cancelar reportes generados por otros usuarios.
                </li>
                <li>
                  No pueden eliminar registros de equipos, mantenimientos y reportes.
                </li>
              </ul>
            </div>
          </div>

          <div>
            <div class="setting__title text-weight-medium q-pb-sm q-pt-sm">
              Auxiliar
            </div>
            <div class="setting__subtitle">
              Los Auxiliares tienen un conjunto específico de permisos para asistir en tareas operativas. Sus
              permisos incluyen:

              <div class="text-weight-bold">
                Permisos
              </div>
              <ul>
                <li>
                  Acceder al Dashboard: Tienen acceso al tablero de control principal del sistema.
                </li>
                <li>
                  Crear y visualizar Mantenimientos: Pueden crear mantenimientos y visualizar ciertos detalles
                  de los mismos.
                </li>
                <li>
                  Generar, visualizar y atender Reportes: Disponen de la capacidad de generar, visualizar y
                  atender reportes, incluyendo la creación de mantenimientos asociados.
                </li>
                <li>
                  Visualizar Equipos: Pueden visualizar los equipos registrados en el sistema y acceder a
                  ciertos detalles.
                </li>
                <li>
                  Visualizar Planes de Mantenimientos: Tienen autorización para visualizar los planes de
                  mantenimientos existentes y acceder a sus detalles.
                </li>

                <li>
                  Consultar el Calendario: Disponen de acceso al calendario de actividades del sistema.
                </li>
              </ul>
              <div class="text-weight-bold">
                Restricciones
              </div>
              <ul>
                <li>
                  No pueden crear Planes de Mantenimientos.
                </li>
                <li>
                  No pueden crear o editar Equipos.
                </li>
                <li>
                  No tienen acceso a la gestión de Usuarios.
                </li>
                <li>
                  No tienen acceso a los Contratos de Servicio.
                </li>
              </ul>
            </div>
          </div>
          <div>
            <div class="setting__title text-weight-medium q-pb-sm q-pt-sm">
              Lector
            </div>
            <div class="setting__subtitle">
              Los Lectores tienen acceso limitado y están enfocados principalmente a la generación de reportes de los
              equipos biomédicos

              <div class="text-weight-bold">
                Permisos
              </div>
              <ul>
                <li>
                  Crear Reportes a través del escaneo de un código QR e inicio de sesión
                </li>
              </ul>

              <div class="text-weight-bold">
                Restricciones
              </div>
              <ul>
                <li>
                  No pueden acceder al sistema sin escanear un código QR previamente.
                </li>
                <li>
                  No pueden acceder a otras secciones del sistema aparte de crear reportes.
                </li>
              </ul>
            </div>
          </div>
        </q-scroll-area>
      </div>
    </div>
  </q-page>
</template>

<script>
import { ref, defineComponent } from 'vue';
import HeaderActions from 'src/components/compose/HeaderActions.vue';

export default defineComponent({
  name: 'EquipmentsPage',
  components: {
    HeaderActions,
  },
  data() {
    return {
      fixed: ref(false),

      btnCloseWindow: {
        iconName: 'exit_to_app',
        btnBackground: '#FF990020',
        btnColor: '#FF9900',
        btnAction: this.goBack
      },

      model: ref(null),
      listRoles: [
        {
          title: 'Administrador',
          subtitle: 'Admin del sistema',
          permissions: [
            {
              title: 'Estadísticas',
              list: [
                'Ver dashboard',
                'Personalizar gráficos'
              ]
            },
            {
              title: 'Equipos',
              list: [
                'Ver listado',
                'Agregar',
                'Ver detalles',
                'Actualizar',
              ]
            },
            {
              title: 'Mantenimientos',
              list: [
                'Ver listado',
                'Agregar',
                'Ver detalles',
              ]
            },
            {
              title: 'Planes de mantenimientos',
              list: [
                'Ver listado',
                'Agregar',
                'Ver detalles',
                'Actualizar',
                'Eliminar',
              ]
            },
            {
              title: 'Calendario',
              list: [
                'Ver calendario'
              ]
            },
            {
              title: 'Reportes',
              list: [
                'Ver listado',
                'Agregar',
                'Atender (Crear mantenimiento)',
                'Ver detalles',
                'Actualizar',
                'Cancelar',
              ]
            },
            {
              title: 'Configuración',
              list: [
                'Actualizar mi cuenta',
                'Ver listado de usuarios',
                'Agregar usuarios',
                'Actualizar usuarios',
              ]
            },
          ],
          img: 'admin.png',
        },
        {
          title: 'Auxiliar',
          subtitle: 'Perfil ayudante o biomédico auxiliar',
          permissions: [
            {
              title: 'Estadísticas',
              list: [
                'Ver dashboard',
              ]
            },
            {
              title: 'Equipos',
              list: [
                'Ver listado',
                'Ver detalles',
              ]
            },
            {
              title: 'Mantenimientos',
              list: [
                'Ver listado',
                'Agregar',
                'Ver detalles',
              ]
            },
            {
              title: 'Planes de mantenimientos',
              list: [
                'Ver listado',
                'Ver detalles'
              ]
            },
            {
              title: 'Calendario',
              list: [
                'Ver calendario'
              ]
            },
            {
              title: 'Reportes',
              list: [
                'Ver listado',
                'Agregar',
                'Atender (Crear mantenimiento)',
                'Ver detalles',
                'Actualizar',
                'Cancelar',
              ]
            },
            {
              title: 'Configuración',
              list: [
                'Actualizar mi cuenta'
              ]
            },
          ],
          img: 'role.png',
        },
        {
          title: 'Expectador',
          subtitle: 'Personal del hospital',
          permissions: [
            {
              title: 'Equipos',
              list: [
                'Ver listado',
                'Ver detalles',
              ]
            },
            {
              title: 'Reportes',
              list: [
                'Ver listado',
                'Agregar',
                'Ver detalles',
                'Cancelar'
              ]
            },
            {
              title: 'Configuración',
              list: [
                'Actualizar mi cuenta'
              ]
            },
          ],
          img: 'user.png',
        },
      ],
      ticked: ref(['Equipo de choque']),
      tickStrategy: ref('strict'),
      simple: [
        {
          label: 'Equipo de choque',
          children: [
            { label: 'Good food' },
            { label: 'Good service (disabled node)' },
            { label: 'Pleasant surroundings' },
          ],
        },
        {
          label: 'Equipo de choque2',
          children: [
            { label: 'Good food' },
            { label: 'Good service (disabled node)' },
            { label: 'Pleasant surroundings' },
          ],
        },
        {
          label: 'Equipo de choque3',
          children: [
            { label: 'Good food' },
            { label: 'Good service (disabled node)' },
            { label: 'Pleasant surroundings' },
          ],
        },
        {
          label: 'Equipo de choque4',
          children: [
            { label: 'Good food' },
            { label: 'Good service (disabled node)' },
            { label: 'Pleasant surroundings' },
          ],
        },
        {
          label: 'Equipo de choque5',
          children: [
            { label: 'Good food' },
            { label: 'Good service (disabled node)' },
            { label: 'Pleasant surroundings' },
          ],
        },
      ],
      role: {
        title: '',
      },
      btnAction: {
        show: true,
        btnTitle: 'Guardar nuevo rol',
        iconName: 'o_save',
        to: 'settings',
        btnWidth: 'auto',
      },
    };
  },
  setup() {
    const getImageUrl = (url) => {
      try {
        return new URL(`../../assets/png/${url}`, import.meta.url).href;
      } catch (error) {
        /* empty */
      }
    };
    return {
      getImageUrl,
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
  },
});
</script>
