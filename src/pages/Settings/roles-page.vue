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
          <div class="row">
            <div class="col-12">
              <q-list class="row h-100">
                <div
                  v-for="(item, i) in listRoles"
                  class="col-4 q-px-xs h-100"
                  :key="i"
                >
                  <div class="q-mb-sm q-pa-md setting-item border-rounded clickable h-100">
                    <div class="row">
                      <q-item-section avatar>
                        <q-avatar class="avatar-item">
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
                    </div>

                    <q-item-section class="q-pt-lg q-px-sm">
                      <div
                        v-for="(permission, j) in item.permissions"
                        :key="j"
                        class="setting-item__title"
                      >
                        {{ permission.title }}
                        <ul>
                          <li
                            v-for="(obj, k) in permission.list"
                            :key="k"
                            class="setting-item__subtitle"
                          >
                            {{ obj }}
                          </li>
                        </ul>
                      </div>
                    </q-item-section>
                  </div>

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
              title: 'Ver calendario',
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
          title: 'Lector',
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
        iconName: 'save',
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
