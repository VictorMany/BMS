<template>
  <q-layout view="lHh lpR lFf">

    <q-drawer show-if-above v-model="leftDrawerOpen" side="left">
      <!-- drawer content -->
      <q-list>
        <div class="sideMenu">
          <q-card-section>
            <h1 class="title">BMS</h1>
            <LayoutBtns v-for="link in layoutBtns" :key="link.title" v-bind="link" />
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
import LayoutBtns from 'src/components/atomic/LayoutBtns.vue'

const naviBtns = [
  {
    title: 'Equipos',
    link: ''
  },
  {
    title: 'Usuarios',
    link: ''
  },
  {
    title: 'Mantenimientos',
    link: ''
  },
  {
    title: 'Calendarios',
    link: ''
  },
  {
    title: 'Reportes',
    link: ''
  },
  {
    title: 'Estadisticas',
    link: ''
  },
  {
    title: 'Configuración',
    link: ''
  }
]

export default defineComponent({
  name: 'newLayout',

  components: {
    LayoutBtns
  },

  setup () {
    const leftDrawerOpen = ref(false)

    return {
      layoutBtns: naviBtns,
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  }
})
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@200&display=swap');

.p1 {
  margin-left: 5rem;
}

.sideMenu {
  width: 110%;
  height: 95%;
  position: absolute;
  left: 10%;
  top: 2%;
  border-radius: 10px;
  background: #FEFEFE;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.25);
}

.title {
  position: inherit;
  left: 1%;
  top: 1.15%;
  bottom: 88.3%;
  margin-left: 37%;
  font-family: 'Inter', sans-serif;
  font-style: normal;
  font-weight: 200;
  font-size: 30px;
  line-height: 36px;
  display: flex;
  align-items: center;
  text-align: center;

  color: #1A86D4;
}
</style>
