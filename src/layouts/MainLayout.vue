<template>
  <q-layout view="lHh lpR lFf">
    <q-drawer show-if-above v-model="leftDrawerOpen" class="cursor-pointer non-selectable main-menu">
      <!-- drawer content -->
      <div style="height: 100%" class="q-py-md q-pl-md">
        <div class="side-menu">
          <div class="title text-center text-weight-light q-pt-lg"> BMS </div>
          <q-scroll-area class="q-px-md q-py-sm" style="height: 85%" :thumb-style="{ right: '4px', borderRadius: '5px', background: 'rgba(135, 192, 232, 0.44)', width: '5px', opacity: 1 }">
            <q-list>
              <div class="q-pt-none">
                <btn-menu v-for="(btn, index) in btnLinks" :key="index" v-bind="btn" :index="index" v-model:selected-btn="btnSelected" />
              </div>
              <div>
                <btn-action class="q-mt-xl" v-bind="btnCloseSesion"/>
              </div>
            </q-list>
          </q-scroll-area>
        </div>
      </div>

    </q-drawer>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'
import BtnMenu from 'src/components/atomic/BtnMenu.vue'
import BtnAction from 'src/components/atomic/BtnAction.vue'

export default defineComponent({
  name: 'newLayout',

  components: {
    BtnMenu,
    BtnAction
  },

  setup () {
    const leftDrawerOpen = ref(false)
    return {
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  },
  data () {
    return {
      btnSelected: 0,
      btnLinks: [
        {
          title: 'Equipos',
          link: '/',
          selected: true,
          color: 'rgba(122, 122, 122, 1)',
          background: '#F8F8F8'
        },
        {
          title: 'Usuarios',
          link: 'users',
          selected: false,
          color: 'rgba(122, 122, 122, 1)',
          background: '#F8F8F8'
        },
        {
          title: 'Mantenimientos',
          link: 'maintenances',
          selected: false,
          color: 'rgba(122, 122, 122, 1)',
          background: '#F8F8F8'
        },
        {
          title: 'Calendario',
          link: 'calendar',
          selected: false,
          color: 'rgba(122, 122, 122, 1)',
          background: '#F8F8F8'
        },
        {
          title: 'Reportes',
          link: 'reports',
          selected: false,
          color: 'rgba(122, 122, 122, 1)',
          background: '#F8F8F8'
        },
        {
          title: 'Estadisticas',
          link: 'statistical',
          selected: false,
          color: 'rgba(122, 122, 122, 1)',
          background: '#F8F8F8'
        },
        {
          title: 'Configuración',
          link: 'settings',
          selected: false,
          color: 'rgba(122, 122, 122, 1)',
          background: '#F8F8F8'
        }
      ],
      btnCloseSesion: {
        btnTitle: 'Cerrar sesión',
        btnColor: '#FFFFFF',
        btnWidth: '100%',
        iconName: '',
        btnBackgroundGradient: 'linear-gradient(269.25deg, #2280D2 -4.79%, #68BEFD 94.27%)'
      }
    }
  },

  created () {
    this.btnLinks.forEach((e, index) => {
      if (e.link === this.$route.name) {
        this.selectButton(index)
        this.btnSelected = index
      }
    })
  },

  watch: {
    btnSelected (val, oldVal) {
      this.selectButton(val)
      this.btnLinks[oldVal].color = 'rgba(122, 122, 122, 1)'
      this.btnLinks[oldVal].background = '#F8F8F8'
      this.btnLinks[oldVal].selected = false
    }
  },

  methods: {
    selectButton (val) {
      this.btnLinks[val].selected = true
      this.btnLinks[val].color = '#4C607D'
      this.btnLinks[val].background = '#CAE3F4'
    }
  }
})
</script>

<style>
.side-menu {
  width: 100%;
  height: 100%;
  background: #FEFEFE;
  box-shadow: 1px 1px 15px 1px rgb(0 0 0 / 10%) !important;
  border-radius: 8px !important;
  overflow: hidden;
}

.main-menu {
  overflow: hidden;
  background-color: rgba(236, 236, 236, 1) !important;
}

.title {
  font-family: 'Inter';
  font-size: 30px;
  color: #1A86D4;
}

/**scrollbar in different browsers */
::-webkit-scrollbar {
  margin-bottom: 0rem; /* remove default margin */
  scrollbar-width: none; /* Also needed to disable scrollbar Firefox */
  -ms-overflow-style: none; /* Disable scrollbar IE 10+ */
  overflow-y: scroll;
  width: 0px;
  background: transparent; /* Disable scrollbar Chrome/Safari/Webkit */
}
</style>
