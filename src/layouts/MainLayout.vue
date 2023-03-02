<template>
  <q-layout view="lHh lpR lFf">
    <q-drawer show-if-above
        :width="350"
        :breakpoint="1000"
        v-model="leftDrawerOpen"
        class="cursor-pointer non-selectable main-menu row items-center">
      <!-- drawer content -->
      <div style="height: 97vh;" class="q-pl-md w-100">
        <div class="side-menu">
          <div class="row">
            <div class="title text-center text-weight-light q-pt-lg w-100">
              BMS
            </div>
            <q-page-sticky position="top-right" :offset="[18, 40]">
              <q-btn fab padding="xs" outline color="orange">
                <q-avatar size="25px">
                  <img src="../assets/svg/notifications_.svg">
                </q-avatar>
                <q-popup-proxy class="border-shadow">
                  <q-banner class="border-shadow" style="width: 400px; height: auto">
                    <div class="q-pa-sm">
                      Notificaciones
                    </div>
                    <q-scroll-area style="height: 490px !important" class="fit"
                      :thumb-style="{
                        right: '1px',
                        borderRadius: '5px',
                        background: 'rgba(135, 192, 232, 0.44)',
                        width: '5px',
                        opacity: 1,
                      }">
                      <q-list>
                        <div v-for="(item, i) in listSettings"
                        @click="navigateTo(item.route)"
                        :key="i">
                          <q-item class="q-mb-sm setting-item flex items-center clickable ">
                            <q-item-section>
                              <q-item-label class="setting-item__title">{{
                                item.title
                              }}</q-item-label>
                              <q-item-label class="setting-item__subtitle" caption>{{
                                item.subtitle
                              }}</q-item-label>
                            </q-item-section>
                          </q-item>
                        </div>
                      </q-list>
                    </q-scroll-area>
                  </q-banner>
                </q-popup-proxy>
              </q-btn>
            </q-page-sticky>
          </div>
          <q-scroll-area class="q-px-md q-py-sm" style="height: 85%" :thumb-style="{ right: '4px', borderRadius: '5px', background: 'rgba(135, 192, 232, 0.44)', width: '5px', opacity: 1 }">
            <q-list>
              <div class="q-pt-none">
                <btn-menu v-for="(btn, index) in btnLinks" :key="index" v-bind="btn" :index="index" v-model:selected-btn="btnSelected" />
              </div>
              <div>
                <btn-action class="q-mt-xl" v-bind="btnCloseSesion" />
              </div>
            </q-list>
          </q-scroll-area>
        </div>
      </div>
    </q-drawer>
    <q-page-container>
      <q-btn class="hamburguer-menu" flat @click="leftDrawerOpen = !leftDrawerOpen" round dense icon="menu" />
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
      fixed: ref(false),
      btnLinks: [
        {
          title: 'Dashboard',
          link: '/',
          selected: false,
          color: 'rgba(122, 122, 122, 1)',
          background: '#F8F8F8'
        },
        {
          title: 'Equipos',
          link: 'equipments',
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
          title: 'Planes de mantenimientos',
          link: 'maintenances-plan',
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
          title: 'Configuración',
          link: 'settings',
          selected: false,
          color: 'rgba(122, 122, 122, 1)',
          background: '#F8F8F8'
        }
      ],
      listSettings: [
        {
          title: 'PLAN-0001 Equipos de choque',
          subtitle: 'Viernes 12, Enero 2023',
          route: { link: 'detail-maintenance-plan', id: 1 }
        },
        {
          title: 'PLAN-0002 Equipos de urgencias',
          subtitle: 'Viernes 19, Enero 2023',
          route: { link: 'detail-maintenance-plan', id: 1 }
        },
        {
          title: 'PLAN-0003 Equipos de primeros auxilios',
          subtitle: 'Viernes 26, Enero 2023',
          route: { link: 'detail-maintenance-plan', id: 1 }
        }
      ],
      btnCloseSesion: {
        btnTitle: 'Cerrar sesión',
        btnColor: '#FFFFFF',
        btnAction: this.logout,
        btnWidth: '100%',
        iconName: '',
        btnBackgroundGradient: 'linear-gradient(269.25deg, #2280D2 -4.79%, #68BEFD 94.27%)'
      }
    }
  },

  created () {
    this.btnLinks.forEach((e, index) => {
      console.log(this.$route.name)
      if (e.link === '/') {
        this.selectButton(0)
        this.btnSelected = 0
      }
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
    },
    logout () {
      console.log('Login')
      this.$router.replace('/login')
    },
    navigateTo ({ link, id }) {
      console.log('Juan')
      this.$router.push({ name: link, params: { id } })
    }
  }
})
</script>

<style lang="scss">
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

@media only screen
and (min-device-width : 1000px) {
  .hamburguer-menu {
    display: none;
  }
}

.hamburguer-menu {
  position: absolute;
  color: white;
  z-index: 100;
  margin-top: 2.9rem;
  background: linear-gradient(269.25deg, #2280D2 -4.79%, #68BEFD 94.27%);
  margin-left: 1.7rem;
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
.setting-item {
  background-color: $bg-clear;
  height: 80px;
  border-radius: 10px;

  &__title {
    color: #062841;
    font-size: 12px;
  }

  &__subtitle {
    color: #798d9cda;
    font-size: 10px;
  }
}

.setting-item:hover {
  background-color: #007bd218;
  transform: scale(1.005);
}

</style>
