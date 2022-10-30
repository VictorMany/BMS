<template>
  <q-layout view="lHh lpR lFf">
    <q-drawer style="overflow: hidden; background-color: rgba(236, 236, 236, 1);" show-if-above v-model="leftDrawerOpen" class="cursor-pointer non-selectable">
      <!-- drawer content -->
      <q-list style="height: 100%" class="flex flex-center">
        <div class="sideMenu">
          <h1 class="title flex flex-center q-my-none text-weight-light"> BMS </h1>
          <q-card-section class="q-pt-none">
            <btn-menu v-for="(btn, index) in btnLinks" :key="index" v-bind="btn" :index="index" v-model:selected-btn="btnSelected" />
          </q-card-section>
        </div>
      </q-list>
    </q-drawer>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'
import BtnMenu from 'src/components/atomic/BtnMenu.vue'

export default defineComponent({
  name: 'newLayout',

  components: {
    BtnMenu
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
      ]
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

<style scoped>
.sideMenu {
  width: 96%;
  margin-left: 4%;
  height: 95%;
  border-radius: 10px;
  background: #FEFEFE;
  box-shadow: 0px 4px 4px 2px rgba(0, 0, 0, 0.25);
  overflow: hidden;
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
