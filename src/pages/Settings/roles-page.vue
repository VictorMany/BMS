<template>
  <q-page class="flex flex-center cursor-pointer non-selectable">
    <div class="card-page">

      <header-actions
        :titlePage="'Permisos'"
        :btn-close-window="btnCloseWindow"
      />

      <div class="main-container-page container-form">
        <q-scroll-area
          class="fit h-100"
          :thumb-style="$store.getters['global/getThumbStyle']"
        >
          <div class="row">
            <div class="col-12 col-md-10">
              <q-list>
                <div
                  v-for="(item, i) in listRoles"
                  :key="i"
                >
                  <q-item class="q-mb-sm setting-item border-rounded flex items-center clickable">
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
          subtitle: 'Rol con todos los permisos dentro del sistema',
          img: 'admin.png',
        },
        {
          title: 'Auxiliar',
          subtitle: 'Rol con permisos customizables por el administrador',
          img: 'admin.png',
        },
        {
          title: 'Funciones básicas',
          subtitle: 'Role con permisos customizables por el administrador',
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
      btnAction: [{
        show: true,
        btnTitle: 'Guardar nuevo rol',
        iconName: 'save',
        to: 'settings',
        btnWidth: 'auto',
      }],
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
