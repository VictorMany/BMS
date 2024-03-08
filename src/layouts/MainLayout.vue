<template>
  <q-layout view="lHh lpR lFf">
    <q-drawer
      show-if-above
      :breakpoint="1000"
      v-model="leftDrawerOpen"
      class="cursor-pointer non-selectable main-menu row items-center"
    >
      <!-- drawer content -->
      <div
        style="height: 97vh;"
        class="q-pl-md w-100 drawer"
      >
        <div class="side-menu border-rounded">
          <div class="row">
            <div class="title text-center q-pt-lg w-100">BMS</div>
            <!-- HERE WERE NOTIFICATIONS-->
          </div>
          <q-scroll-area
            class="q-px-md q-py-sm"
            style="height: 85%"
            :thumb-style="{
              right: '4px',
              borderRadius: '5px',
              background: 'rgba(29, 100, 231, 0.2)',
              width: '5px',
              opacity: 1,
            }"
          >
            <div
              class="q-pa-md border-rounded q-mt-lg"
              style="background-color: rgba(125, 125, 125, 0.085);"
              v-if="showEquipmentDetails()"
            >
              <div class="col-12 text-weight-medium text-primary q-pb-sm text-center">
                Información del equipo
              </div>
              <div
                v-if="equipment.photo"
                class="q-mx-auto row q-my-sm"
                :style="'width: 100%;'"
              >
                <q-img
                  class="form__image64-equipment q-mx-auto q-my-auto border-rounded"
                  no-spinner
                  :src="equipment?.photo"
                />
              </div>
              <div class="row">
                <div class="col-12 q-my-sm">
                  <div class="row">
                    <div class="col form__item-label text-weight-medium">
                      Estatus del equipo
                    </div>
                    <q-chip
                      class="q-ma-none col-auto q-mr-xs border-rounded"
                      dark
                      :style="`color: ${getStatus.color(equipment.equipmentStatus)}; background-color: ${getStatus.color(equipment.equipmentStatus)}26; font-size: 12px`"
                    >
                      {{ getStatus.model(equipment.equipmentStatus) }}
                    </q-chip>
                  </div>
                </div>
                <div class="col-8">
                  <div class="col-12 form__item-label text-weight-medium">
                    Detalles del equipo
                  </div>
                  <div class="col-12  form__item-model q-mb-md">
                    {{ equipment?.categoryName }}
                  </div>
                </div>
              </div>
            </div>

            <div
              class="q-pa-md bg-accent border-rounded q-mt-lg"
              v-if="showUserDetails()"
            >
              <div class="col-12 text-weight-medium text-primary q-pb-sm text-center">
                Información del usuario
              </div>

              <div
                v-if="user.photo"
                class="q-mx-auto row q-my-sm"
                :style="'width: 100%;'"
              >
                <q-img
                  class="form__image64 q-mx-auto q-my-auto"
                  no-spinner
                  :src="user?.photo"
                />
              </div>

              <div class="row">
                <div class="col-12 q-my-sm">
                  <div class="row">
                    <div class="col form__item-label text-weight-medium">
                      Estatus del usuario
                    </div>
                    <q-chip
                      class="q-ma-none col-auto q-mr-xs border-rounded"
                      dark
                      :style="`color: ${getStatus.color(user?.userStatus)}; background-color: ${getStatus.color(user?.userStatus)}26; font-size: 12px`"
                    >
                      {{ getStatus.model(user?.userStatus) }}
                    </q-chip>
                  </div>
                </div>
                <div class="col-8">
                  <div
                    v-if="user?.email"
                    class="col-12 form__item-label text-weight-medium"
                  >
                    {{ 'Correo electrónico' }}
                  </div>
                  <div class="col-12  form__item-model q-mb-md">
                    {{ user?.email }}
                  </div>
                  <div class="col-12 form__item-label text-weight-medium">
                    {{ 'Nombre del usuario' }}
                  </div>
                  <div class="col-12  form__item-model q-mb-md">
                    {{ user?.userName }}
                  </div>
                  <div class="col-12 form__item-label text-weight-medium">
                    {{ 'Rol' }}
                  </div>
                  <div class="col-12  form__item-model q-mb-md">
                    {{ getRole.model(user?.userRole) }}
                  </div>
                </div>
                <!-- 
                <div class="row justify-end">
                  <qrcode-vue
                    :value="value"
                    :size="100"
                    foreground="#062841"
                    background="#F3F3F3"
                    :margin="3"
                    level="L"
                  />
                </div> -->
              </div>
            </div>

            <q-list v-else-if="!showEquipmentDetails()">
              <div class="q-pt-none">
                <div
                  v-for="(btn, index) in currentMenu"
                  :key="index"
                >
                  <div v-if="btn.title">
                    <btn-menu
                      v-bind="btn"
                      :index="index"
                      :selected="selected"
                    />
                  </div>
                  <q-separator
                    v-if="btn == 'divider'"
                    class="q-my-md"
                  />
                  <div
                    class="container container-qr-code border-rounded column content-center q-pt-md"
                    v-if="btn == 'qrcode'"
                  >
                    <qrcode-vue
                      :value="value"
                      :size="size"
                      class="qr-code-style border-rounded"
                      background="#F3F3F3"
                      foreground="#062841"
                      :margin="2"
                      level="L"
                    />
                    <div class="row justify-center items-center q-pb-md">
                      <div
                        class="text-center text-weight-medium q-pr-md"
                        style="color: #062841;"
                      >
                        No. serie → {{ equipment?.serialNumber }}
                      </div>
                      <btn-action
                        v-show="isDownloading === false"
                        v-bind="btnExport"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div v-if="btnCloseSesion.show">
                <btn-action
                  class="q-mt-xl"
                  v-bind="btnCloseSesion"
                />
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
import { defineComponent } from 'vue';
import BtnMenu from 'src/components/atomic/BtnMenu.vue';
import BtnAction from 'src/components/atomic/BtnAction.vue';
import QrcodeVue from 'qrcode.vue';
import { setAuthHeader } from 'src/api/auth';
import { deleteTokenCookie } from 'app/utils/utils';
import { deleteLocalStorage } from 'app/utils/utils';
import { toPng } from 'html-to-image';
// import * as htmlToImage from 'html-to-image';
// import { toPng } from 'html-to-image';


export default defineComponent({
  name: 'newLayout',

  components: {
    BtnMenu,
    BtnAction,
    QrcodeVue,
  },

  setup() {
    const getImageUrl = (url) => {
      try {
        return new URL(`../assets/${url}`, import.meta.url).href;
        // eslint-disable-next-line no-empty
      } catch (error) { }
    };
    const routerWatch = (route) => {
      return route;
    };

    return {
      getImageUrl,
      routerWatchTest() {
        return routerWatch;
      },
    };
  },
  data() {
    return {
      value: '',
      leftDrawerOpen: false,
      size: 500,
      btnSelected: 0,
      imageNotification: 'svg/notifications_.svg',
      btnLinks: [],
      selected: null,
      getStatus: {
        color(item) {
          return item ? '#10D13A' : '#d1b410'
        },
        model(item) {
          return item ? 'Activo' : 'Inactivo'
        }
      },

      getRole: {
        model(item) {
          switch (item) {
            case 1: return 'Administrador'
            case 2: return 'Auxiliar'
            case 3: return 'Expectador'
          }
        }
      },

      btnGeneral: [
        {
          title: 'Dashboard',
          link: '/', color: 'rgba(122, 122, 122, 1)',
          background: '#F8F8F8',
        },
        {
          title: 'Equipos',
          link: 'equipments', color: 'rgba(122, 122, 122, 1)',
          background: '#F8F8F8',
        },
        {
          title: 'Mantenimientos',
          link: 'maintenances', color: 'rgba(122, 122, 122, 1)',
          background: '#F8F8F8',
        },
        {
          title: 'Planes de mantenimientos',
          link: 'maintenances-plan', color: 'rgba(122, 122, 122, 1)',
          background: '#F8F8F8',
        },
        {
          title: 'Calendarización',
          link: 'calendar', color: 'rgba(122, 122, 122, 1)',
          background: '#F8F8F8',
        },
        {
          title: 'Reportes',
          link: 'reports', color: 'rgba(122, 122, 122, 1)',
          background: '#F8F8F8',
        },
        // {
        //   title: 'Tienda',
        //   link: 'store', color: 'rgba(122, 122, 122, 1)',
        //   newItem: true,
        //   background: '#F8F8F8',
        // },
        {
          title: 'Configuración',
          link: 'settings', color: 'rgba(122, 122, 122, 1)',
          background: '#F8F8F8',
        },
      ],

      btnDetailEquipment: [
        {
          title: 'Mantenimientos',
          link: {
            link: 'maintenances',
            searchByIdEquipment: true
          },
          color: 'rgba(122, 122, 122, 1)',
          background: '#F8F8F8',
        },
        {
          title: 'Reportes',
          link: {
            link: 'reports',
            searchByIdEquipment: true
          },
          color: 'rgba(122, 122, 122, 1)',
          background: '#F8F8F8',
        },
        'divider',
        'qrcode',
      ],

      btnDetailUser: [
        {
          title: 'Mantenimientos',
          link: {
            link: 'maintenances',
            searchByIdUser: true
          },
          color: 'rgba(122, 122, 122, 1)',
          background: '#F8F8F8',
        },
        {
          title: 'Reportes',
          link: {
            link: 'maintenances',
            searchByIdUser: true
          },
          color: 'rgba(122, 122, 122, 1)',
          background: '#F8F8F8',
        }
      ],

      menuRole3: [
        {
          title: 'Equipos',
          link: 'equipments',
          background: '#F8F8F8',
          color: 'rgba(122, 122, 122, 1)',
        },
        {
          title: 'Reportes',
          link: 'reports',
          background: '#F8F8F8',
          color: 'rgba(122, 122, 122, 1)',
        },
        {
          title: 'Configuración',
          link: 'settings',
          color: 'rgba(122, 122, 122, 1)',
          background: '#F8F8F8',
        }
      ],

      btnCloseSesion: {
        show: true,
        btnTitle: 'Cerrar sesión',
        btnColor: '#FFFFFF',
        btnAction: this.logout,
        btnWidth: '100%',
        iconName: '',
        btnBackgroundGradient:
          'linear-gradient(269.25deg, #1e65e8 -4.79%, #1e65e8 94.27%)',
      },
      btnExport: {
        btnAction: this.downloadQR,
        iconName: 'o_download',
      },

      isDownloading: false
    };
  },

  created() {
    if (this.userRole === 3) {
      this.btnLinks = this.menuRole3
      this.setMenu(this.$route);
    } else {
      this.btnLinks = this.btnGeneral;
      this.setMenu(this.$route);
    }

    this.$bus.on('open-menu-from-child', () => {
      // do some work
      this.toggleLeftDrawer()
    });
  },

  beforeUnmount() {
    this.$bus.off('open-menu-from-child');
  },

  computed: {
    equipment: {
      get() {
        return this.$store.getters['equipments/getEquipmentGetter'];
      },
    },

    user: {
      get() {
        return this.$store.getters['users/getUserGetter'];
      },
    },

    userRole: {
      get() {
        return this.$store.getters['users/getRoleGetter'];
      },
    },

    currentMenu() {
      if (this.userRole === 3) {
        return this.menuRole3
      } else return this.btnLinks
    }
  },

  async beforeRouteUpdate(to, from, next) {
    try {
      this.setMenu(to);
    } catch (error) {
      console.log(error);
    }
    next();
  },

  methods: {
    async changeMenu(items) {
      this.btnLinks = [...items];
    },

    async setMenu(route) {
      try {
        this.btnCloseSesion.show = false;
        this.value = 'www.bmsystemll.com/login' + route.fullPath;

        switch (route.name) {
          case 'reports':
            if (!this.showEquipmentDetails() || !this.showUserDetails()) {
              this.btnCloseSesion.show = true;
              this.selected = this.btnLinks.findIndex((e) => e.link === route.name);
            }
            break;
          case 'maintenances':
            if (!this.showEquipmentDetails() || !this.showUserDetails()) {
              this.btnCloseSesion.show = true;
              this.selected = this.btnLinks.findIndex((e) => e.link === route.name);
            }
            break;
          case 'detail-equipment':
            this.btnLinks = [...this.btnDetailEquipment];
            this.selected = null;
            break;

          case 'detail-report':
          case 'edit-equipment':
          case 'edit-user':
          case 'add-maintenance':
          case 'edit-maintenance':
          case 'detail-maintenance':
          case 'add-report':
          case 'edit-report':
            await this.changeMenu(this.btnGeneral)
            this.selected = null;
            this.btnCloseSesion.show = true
            break;
          case 'detail-user':
            await this.changeMenu(this.btnDetailUser)
            this.selected = null;
            break;
          default:
            if (this.userRole === 3) {
              this.btnLinks = [...this.menuRole3];
            } else {
              this.btnLinks = [...this.btnGeneral];
            }
            if (route.name === 'dashboard') {
              this.selected = 0;
            } else
              this.selected = this.btnLinks.findIndex(
                (e) => e.link === route.name
              );
            this.btnCloseSesion.show = true;
            break;
        }
      } catch (error) {
        console.log(error);
        if (this.userRole === 3) {
          this.btnLinks = [...this.menuRole3];
        } else {
          this.btnLinks = [...this.btnGeneral];
        }
      }
    },

    logout() {
      setAuthHeader(null)
      deleteTokenCookie(null)
      deleteLocalStorage()

      this.$router.replace('/login');
    },

    showEquipmentDetails() {
      if (this.$route.query.equipment) {
        this.btnCloseSesion.show = false
      }
      return this.$route.query.equipment && this.equipment
    },

    showUserDetails() {
      if (this.$route.query.user) {
        this.btnCloseSesion.show = false
      }
      return this.$route.query.user
    },

    toggleLeftDrawer() {
      this.leftDrawerOpen = !this.leftDrawerOpen;
    },

    downloadQR() {
      this.btnExport.iconName = 'qr_code_scanner'
      const element = document.querySelector('.container-qr-code');

      toPng(element)
        .then(function (dataUrl) {
          const downloadLink = document.createElement('a');
          downloadLink.href = dataUrl;
          downloadLink.download = 'container-qr-code.png';
          downloadLink.click();
          this.btnExport.iconName = 'o_download'
        })
        .catch(function (error) {
          this.btnExport.iconName = 'o_download'
          console.error('Error al convertir el contenido a imagen:', error);
        }).finally(() => {
          this.btnExport.iconName = 'o_download'

        });
    }
  },
});
</script>

<style lang="scss">
.side-menu {
  width: 100%;
  height: 100%;
  box-shadow: none;
  overflow: hidden;
}

.body--light {
  .main-menu {
    background-color: rgba(236, 236, 236, 1) !important;
  }

  .side-menu {
    background: #fefefe;
  }

  .container-style {
    background: rgba(236, 236, 236, 1);
  }
}

.body--dark {
  .main-menu {
    background: $dark-primary;
    opacity: 1;
  }

  .side-menu {
    background: #0000002f;
  }

  .container-style {
    background: $dark-primary;
  }
}

.main-menu {
  overflow: hidden;
}

.title {
  font-size: 30px;
  font-weight: 600;
  color: $primary;
}

*::-webkit-scrollbar {
  height: 8px;
  background: transparent;
  margin-bottom: 0rem;
  scrollbar-width: none;
  -ms-overflow-style: none;
  overflow-y: scroll;
  width: 0px;
  background: transparent;
}

*::-webkit-scrollbar-thumb {
  background-color: rgba(29, 100, 231, 0.2);
  border-radius: 8px;
}

.container {
  position: relative;
  width: 100%;
  height: auto;
}

// .text {
//   position: absolute;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 100%;
//   opacity: 0;
//   background-color: rgba(0, 0, 0, 0.3);
//   color: #fff;
//   text-align: center;
//   transition: opacity 0.3s ease;
// }

// .container:hover .text {
//   opacity: 1;
// }

.container-qr-code {
  background: #F3F3F3;
}
</style>
