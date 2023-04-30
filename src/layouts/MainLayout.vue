<template>
  <q-layout view="lHh lpR lFf">
    <q-drawer show-if-above :width="350" :breakpoint="1000" v-model="leftDrawerOpen"
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
                  <img @mouseover="changeImage(0)" @mouseleave="changeImage(1)" :src="getImageUrl(imageNotification)">
                </q-avatar>
                <q-popup-proxy class="border-shadow border-radius">
                  <q-banner class="border-shadow" style="width: 400px; height: auto">
                    <div class="q-pa-sm">
                      Notificaciones
                    </div>
                    <q-scroll-area style="height: 490px !important" class="fit" :thumb-style="{
                        right: '1px',
                        borderRadius: '5px',
                        background: 'rgba(135, 192, 232, 0.44)',
                        width: '5px',
                        opacity: 1,
                      }">
                      <q-list>
                        <div v-for="(item, i) in listSettings" @click="navigateTo(item.route)" :key="i">
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
          <q-scroll-area class="q-px-md q-py-sm" style="height: 85%"
            :thumb-style="{ right: '4px', borderRadius: '5px', background: 'rgba(135, 192, 232, 0.44)', width: '5px', opacity: 1 }">
            <q-list>
              <div class="q-pt-none">
                <div v-for="(btn, index) in btnLinks" :key="index" >
                  <btn-menu v-if="btn != 'divider' && btn != 'qrcode'" v-bind="btn" :index="index"
                    v-model:selected-btn="btnSelected" />
                  <q-separator
                    v-if="btn == 'divider'"
                    class="q-my-md" />
                  <div class="container q-pa-none" v-if="btn == 'qrcode'">
                    <qrcode-vue
                      class="border-radius"
                      :value="value"
                      :size="size"
                      foreground="#062841"
                      background="#F3F3F3"
                      margin="3"
                      level="H" />
                    <div class="text column wrap justify-center items-center content-center q-pa-none">
                      <btn-action v-bind="btnExport" />
                    </div>
                  </div>
                </div>
              </div>
              <div v-if="btnCloseSesion.show">
                <btn-action class="q-mt-xl" v-bind="btnCloseSesion" />
              </div>
            </q-list>
          </q-scroll-area>
        </div>
      </div>
    </q-drawer>
    <q-page-container class="container-style">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'
import BtnMenu from 'src/components/atomic/BtnMenu.vue'
import BtnAction from 'src/components/atomic/BtnAction.vue'
import QrcodeVue from 'qrcode.vue'

export default defineComponent({
  name: 'newLayout',

  components: {
    BtnMenu,
    BtnAction,
    QrcodeVue
  },

  setup() {
    const leftDrawerOpen = ref(false)
    const getImageUrl = (url) => {
      try {
        return new URL(`../assets/${url}`,
          import.meta.url).href
        // eslint-disable-next-line no-empty
      } catch (error) { }
    }
    return {
      leftDrawerOpen,
      getImageUrl,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  },
  data() {
    return {
      value: 'https://example.com',
      size: 302,
      btnSelected: 0,
      fixed: ref(false),
      imageNotification: 'svg/notifications_.svg',
      btnLinks: [],
      btnGeneral: [
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
      btnDetailEquipment: [
        {
          title: 'Mantenimientos',
          link: 'maintenances',
          selected: false,
          color: 'rgba(122, 122, 122, 1)',
          background: '#F8F8F8'
        },
        {
          title: 'Reportes',
          link: 'reports',
          selected: true,
          color: 'rgba(122, 122, 122, 1)',
          background: '#F8F8F8'
        },
        'divider',
        {
          title: 'Editar',
          link: { link: 'edit-equipment', id: 1 },
          selected: false,
          color: 'rgba(122, 122, 122, 1)',
          background: '#F8F8F8'
        },
        {
          title: 'Registrar mantenimiento',
          link: { link: 'add-maintenance', id: 1 },
          selected: false,
          color: 'rgba(122, 122, 122, 1)',
          background: '#F8F8F8'
        },
        {
          title: 'Reportar',
          link: { link: 'add-report', id: 1 },
          selected: false,
          color: 'rgba(122, 122, 122, 1)',
          background: '#F8F8F8'
        },
        'divider',
        'qrcode'
      ],
      btnDetailUser: [
        {
          title: 'Mantenimientos',
          link: 'maintenances',
          selected: false,
          color: 'rgba(122, 122, 122, 1)',
          background: '#F8F8F8'
        },
        {
          title: 'Reportes',
          link: 'reports',
          selected: true,
          color: 'rgba(122, 122, 122, 1)',
          background: '#F8F8F8'
        },
        'divider',
        {
          title: 'Editar',
          link: { link: 'edit-user', id: 1 },
          selected: false,
          color: 'rgba(122, 122, 122, 1)',
          background: '#F8F8F8'
        }
      ],
      btnEditGeneral: [
        {
          title: 'Mantenimientos',
          link: 'maintenances',
          selected: false,
          color: 'rgba(122, 122, 122, 1)',
          background: '#F8F8F8'
        },
        {
          title: 'Reportes',
          link: 'reports',
          selected: true,
          color: 'rgba(122, 122, 122, 1)',
          background: '#F8F8F8'
        }
      ],
      btnGeneralEquipment: [
      {
          title: 'Mantenimientos',
          link: 'maintenances',
          selected: false,
          color: 'rgba(122, 122, 122, 1)',
          background: '#F8F8F8'
        },
        {
          title: 'Reportes',
          link: 'reports',
          selected: true,
          color: 'rgba(122, 122, 122, 1)',
          background: '#F8F8F8'
        },
        'divider',
        'qrcode'
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
        show: true,
        btnTitle: 'Cerrar sesión',
        btnColor: '#FFFFFF',
        btnAction: this.logout,
        btnWidth: '100%',
        iconName: '',
        btnBackgroundGradient: 'linear-gradient(269.25deg, #2280D2 -4.79%, #68BEFD 94.27%)'
      },
      btnExport: {
        btnTitle: 'Descargar QR',
        btnColor: '#FFFFFF',
        btnAction: this.logout,
        btnWidth: 'auto',
        iconName: 'download',
        btnBackground: 'black'
      }
    }
  },

  created() {
    this.btnLinks = this.btnGeneral
    this.setMenu(this.$route)

    this.btnLinks.forEach((e, index) => {
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
    btnSelected(val, oldVal) {
      this.selectButton(val)
      this.btnLinks[oldVal].color = 'rgba(122, 122, 122, 1)'
      this.btnLinks[oldVal].background = '#F8F8F8'
      this.btnLinks[oldVal].selected = false
    },
    $route: {
      handler(val) {
        this.setMenu(val)
      },
      deep: true
    }
  },

  methods: {
    setMenu(route) {
      this.btnCloseSesion.show = false
      this.value = 'https://bms-omega.vercel.app' + route.fullPath
      switch (route.name) {
          case 'detail-equipment':
            this.btnLinks = this.btnDetailEquipment
          break;
          case 'edit-equipment':
            this.btnLinks = this.btnEditGeneral
          break;
          case 'add-maintenance':
            this.btnLinks = this.btnGeneralEquipment
          break;
          case 'edit-maintenance':
            this.btnLinks = this.btnGeneralEquipment
          break;
          case 'detail-maintenance':
            this.btnLinks = this.btnGeneralEquipment
          break;
          case 'add-report':
            this.btnLinks = this.btnGeneralEquipment
          break;
          case 'detail-report':
            this.btnLinks = this.btnGeneralEquipment
          break;
          case 'edit-report':
            this.btnLinks = this.btnGeneralEquipment
          break;
          case 'detail-user':
            this.btnLinks = this.btnDetailUser
          break;
          case 'edit-user':
            this.btnLinks = this.btnEditGeneral
          break;
          default:
            this.btnLinks = this.btnGeneral
            this.btnCloseSesion.show = true
        }
    },
    selectButton(val) {
      this.btnLinks[val].selected = true
      this.btnLinks[val].color = '#4C607D'
      this.btnLinks[val].background = '#CAE3F4'
    },
    logout() {
      console.log('Login')
      this.$router.replace('/login')
    },
    navigateTo({ link, id }) {
      this.$router.push({ name: link, params: { id } })
    },
    changeImage(flag) {
      if (flag === 0) { this.imageNotification = 'gif/notification.gif' } else { this.imageNotification = 'svg/notifications_.svg' }
    }
  }
})
</script>

<style lang="scss">
.side-menu {
  width: 100%;
  height: 100%;
  box-shadow: 1px 1px 15px 1px rgb(0 0 0 / 10%) !important;
  border-radius: 8px !important;
  overflow: hidden;
}

.body--light {
  .main-menu {
    background-color: rgba(236, 236, 236, 1) !important;
  }

  .side-menu {
    background: #FEFEFE;
  }
}

.body--dark {
  .main-menu {
    background: #11202e;
  }

  .side-menu {
    background: #2b3137;
  }

  .container-style {
    background: #11202e;
  }
}

.main-menu {
  overflow: hidden;
}

.title {
  font-family: 'Inter';
  font-size: 30px;
  color: #1A86D4;
}

@media only screen and (min-device-width : 1000px) {
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
  margin-bottom: 0rem;
  /* remove default margin */
  scrollbar-width: none;
  /* Also needed to disable scrollbar Firefox */
  -ms-overflow-style: none;
  /* Disable scrollbar IE 10+ */
  overflow-y: scroll;
  width: 0px;
  background: transparent;
  /* Disable scrollbar Chrome/Safari/Webkit */
}

.container {
  position: relative;
  width: 100%;
  height: auto;
}

.text {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 98%;
  border-radius: 8px;
  opacity: 0;
  background-color: rgba(0,0,0,0.3);
  color: #fff;
  text-align: center;
  padding: 20px;
  transition: opacity 0.3s ease;
}

.container:hover .text {
  opacity: 1;
}

</style>
