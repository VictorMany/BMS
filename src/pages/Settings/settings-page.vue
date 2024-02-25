<template>
  <q-page class="flex flex-center cursor-pointer non-selectable">
    <div class="card-page">
      <header-actions :titlePage="'Configuración'" />
      <div class="main-container-page container-form">
        <q-scroll-area
          class="fit h-100"
          :thumb-style="{
            right: '1px',
            borderRadius: '5px',
            background: 'rgba(29, 100, 231, 0.2)',
            width: '5px',
            opacity: 1,
          }"
        >
          <div class="row">
            <div class="col-12">
              <q-list>
                <div
                  v-for="(item, i) in listSettings"
                  @click="item.action ? item.action() : navigateTo(item.link)"
                  :key="i"
                >
                  <q-item
                    v-if="!item.hide"
                    class="q-mb-sm setting-item border-rounded flex items-center"
                  >
                    <q-item-section avatar>
                      <q-avatar class="avatar-item border-rounded">
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

    <q-dialog
      v-model="modalLoadEquipments"
      persistent
    >
      <q-card class="border-shadow q-px-sm border-rounded modal-ios">
        <q-card-section>
          <div class="title-page text-primary">Agregar equipos desde archivo excel</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-form ref="formPassword">
            <div class="q-pr-md q-pt-sm form__item-label text-weight-medium">
              Ingresa tu contraseña actual
            </div>

            <input
              ref="fileUpload"
              class="q-mt-sm border-rounded border-line q-pr-sm file-upload"
              type="file"
              accept="application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
              @change="uploadFile($event)"
            />

          </q-form>
        </q-card-section>

        <q-card-actions
          align="right"
          class="q-pa-md q-pb-lg"
        >
          <btn-action v-bind="btnCancel" />
          <btn-action v-bind="btnLoadEquipments" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import HeaderActions from 'src/components/compose/HeaderActions.vue'
import BtnAction from 'src/components/atomic/BtnAction.vue'
import { showSuccess, showWarning } from 'app/utils/utils'

export default defineComponent({
  name: 'SettingsPage',

  components: {
    HeaderActions,
    BtnAction
  },

  data() {
    return {
      modalLoadEquipments: false,
      excelFile: null,

      btnCancel: {
        show: true,
        btnTitle: 'Cancelar',
        iconName: 'close',
        btnWidth: 'auto',
        tooltip: 'Cancelar y cerrar',
        btnAction: this.closeLoadEquipments,
      },

      btnLoadEquipments: {
        show: true,
        loader: false,
        btnTitle: 'Cargar equipos',
        iconName: 'o_upload',
        btnWidth: 'auto',
        tooltip: 'Cargar equipos desde fuente de datos excel',
        btnAction: this.loadEquipmentsToDB,
      },

      listSettings: [
        {
          title: 'Mi cuenta',
          subtitle: 'Detalles de mi cuenta',
          img: 'account.png',
          link: {
            route: 'edit-user',
            params: 0
          }
        },
        {
          title: 'Usuarios',
          subtitle: 'Lista de usuarios en el sistema',
          img: 'users.png',
          link: 'users'
        },
        {
          title: 'Cargar equipos desde un archivo excel',
          subtitle: 'Te permite agregar varios regsitros desde una fuente de datos local (.xlsx)',
          img: 'excel.png',
          action: this.openLoadEquipments
        },
        {
          title: 'Roles y permisos',
          subtitle: 'Accesos y permisos dinámicos dentro del sistema',
          img: 'role.png',
          link: 'roles'
        },
        {
          title: 'Tema principal',
          subtitle: 'Color de énfasis, color de tema',
          img: 'color.png',
          link: 'colors'
        },
        {
          title: 'Acerca de nosotros',
          subtitle: 'Información y contacto',
          img: 'about.png',
          link: 'about-us'
        }
      ]
    }
  },

  setup() {
    const getImageUrl = (url) => {
      try {
        return new URL(`../../assets/png/${url}`,
          import.meta.url).href
        // eslint-disable-next-line no-empty
      } catch (error) { }
    }
    return {
      getImageUrl,
      basicToolBar: [['unordered', 'ordered']],
    }
  },

  methods: {
    openLoadEquipments() {
      this.modalLoadEquipments = true
    },

    uploadFile(e) {
      const file = e.target.files[0];

      try {
        // Realizar otras operaciones si es necesario
        if (file !== undefined) {
          this.excelFile = {
            name: file.name,
            file: file
          };

          console.log('Este es el file que quiero subir', this.excelFile)
        }
      } catch (error) {
        /* Manejar el error si es necesario */
      }
    },

    closeLoadEquipments() {
      this.excelFile = null
      this.modalLoadEquipments = false
    },

    async loadEquipmentsToDB() {
      this.btnLoadEquipments.loader = true;
      try {
        const res = await this.$store.dispatch(
          'equipments/postEquipmentsFromExcelAction',
          this.excelFile
        );

        if (res === true) {
          showSuccess(this.$q, { title: 'Éxito al cargar los equipos', msg: 'Los equipos se agregaron a la base de datos' });
          this.$router.go(-1);
        } else {
          showWarning(this.$q, { msg: 'Inténtalo de nuevo más tarde y si el error persiste, repórtalo' });
        }
        this.btnLoadEquipments.loader = false;
      } catch (error) {
        this.btnLoadEquipments.loader = false;
      }
    },

    navigateTo(link) {
      if (link.params || link.params === 0) {
        this.$router.push({
          name: link.route,
          params: {
            id: link.params
          }
        })
      } else { this.$router.push({ path: link }) }
    },

    checkPermissions() {
      switch (this.userRole) {
        case 3:
          this.listSettings[1].hide = true;
          this.listSettings[2].hide = true;
          this.listSettings[3].hide = true;
          break;
        case 2:
          this.listSettings[1].hide = true;
          break;
      }
    },
  },

  created() {
    this.checkPermissions()
  },

  computed: {
    userRole: {
      get() {
        return this.$store.getters['users/getRoleGetter'];
      },
    },
  }
})
</script>

<style>
.custom-input *** {
  border: none !important;
}
</style>