<template>
  <q-layout view="lHh lpR lFf">
    <q-drawer style="overflow: hidden; background-color: rgba(236, 236, 236, 1);" show-if-above v-model="leftDrawerOpen" class="cursor-pointer non-selectable">
      <!-- drawer content -->
      <q-list style="height: 100%" class="flex flex-center">
        <div class="sideMenu">
          <h1 class="title flex flex-center q-my-none"> BMS </h1>
          <q-card-section class="q-pt-none" style="overflow: scroll;">
            <btn-menu v-for="btn in btnLinks" :key="btn.title" v-bind="btn" v-model:selected="btn.selected" @click="onChangeFunction"/>
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
      btnLinks: [
        {
          title: 'Equipos',
          link: '',
          selected: true
        },
        {
          title: 'Usuarios',
          link: '',
          selected: false
        },
        {
          title: 'Mantenimientos',
          link: '',
          selected: false
        },
        {
          title: 'Calendarios',
          link: '',
          selected: false
        },
        {
          title: 'Reportes',
          link: '',
          selected: false
        },
        {
          title: 'Estadisticas',
          link: '',
          selected: false
        },
        {
          title: 'Configuración',
          link: '',
          selected: false
        }
      ]
    }
  },
  methods: {
    onChangeFunction () {
      this.btnLinks.forEach(e => {
        e.selected = false
      })
    }
  }
})
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@200&display=swap');

.sideMenu {
  width: 96%;
  margin-left: 4%;
  height: 95%;
  border-radius: 10px;
  background: #FEFEFE;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  overflow: hidden;
}

.title {
  position: inherit;
  font-style: normal;
  font-weight: 200;
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
