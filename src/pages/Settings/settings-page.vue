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
                    class="q-mb-sm setting border-rounded flex items-center"
                  >
                    <q-item-section avatar>
                      <q-avatar class="avatar-item border-rounded">
                        <img :src="getImageUrl(item.img)" />
                      </q-avatar>
                    </q-item-section>
                    <q-item-section>
                      <q-item-label class="setting__title">{{
                        item.title
                      }}</q-item-label>
                      <q-item-label
                        class="setting__subtitle"
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
          <q-form>
            <q-item-section>
              <div class="setting__title">
                Para que la operación sea éxitosa toma en cuenta que:
                <ol>
                  <li class="setting__paragraph">
                    <a
                      class="text-blue-6"
                      download="plantilla.xlsx"
                      :href="getExcel()"
                    >
                      Descargar plantilla
                    </a>
                  </li>
                  <li class="setting__paragraph">
                    No modificar las columnas
                  </li>
                  <li class="setting__paragraph"> La fecha debe estar en formato dia/mes/año ejp. 12/01/2024 </li>
                  <li class="setting__paragraph"> No subir registros con número de serie duplicados </li>
                  <li class="setting__paragraph">
                    Los datos no deben ser calculados o referenciados a casillas externas
                  </li>
                </ol>
              </div>
            </q-item-section>

            <input
              style="display: none;"
              ref="fileUpload"
              type="file"
              accept="application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
              @change="uploadFile($event)"
            />

            <q-btn
              unelevated
              no-caps
              class="border-rounded q-my-sm"
              size="sm"
              align="left"
              :icon-right="excelFile?.name ? 'close' : ''"
              color="blue-7"
              @click="
                excelFile?.name
                  ? clearFileInput($refs.fileUpload)
                  : $refs.fileUpload.click()
                "
            >
              {{ excelFile?.name ? excelFile.name : 'Cargar archivo de excel' }}
            </q-btn>

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
      disabledUplaodFile: true,
      excelFile: null,
      // template,

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
        disabled: true,
        btnTitle: 'Cargar equipos',
        iconName: 'o_upload',
        btnWidth: 'auto',
        tooltip: 'Cargar equipos desde fuente de datos excel',
        btnAction: this.loadEquipmentsToDB,
      },

      columns: [
        { name: 'Columna1', label: 'Columna 1' },
        { name: 'Columna2', label: 'Columna 2' },
        { name: 'Columna3', label: 'Columna 3' }
      ],
      tableData: [
        { Columna1: 'Valor1', Columna2: 'Valor2', Columna3: 'Valor3' },
        { Columna1: 'Valor4', Columna2: 'Valor5', Columna3: 'Valor6' }
      ],

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
          subtitle: 'Conoce los permisos que tiene cada rol dentro del sistema',
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

    const getExcel = () => {
      try {
        return new URL('./template.xlsx',
          import.meta.url).href
      } catch (error) {
        console.log(error)
      }
    };

    return {
      getImageUrl,
      getExcel,
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
        }
      } catch (error) {
        /* Manejar el error si es necesario */
      }
    },

    clearFileInput(ctrl) {
      try {
        ctrl.value = null;
        this.excelFile.name = '';
        this.excelFile.file = {};
        this.ImageBase64 = null;
      } catch (ex) { /* empty */ }
      if (ctrl.value) {
        ctrl.parentNode.replaceChild(ctrl.cloneNode(true), ctrl);
      }
    },

    closeLoadEquipments() {
      this.excelFile = null
      this.modalLoadEquipments = false
    },

    async loadEquipmentsToDB() {
      this.btnLoadEquipments.loader = true;
      this.btnCancel.disabled = true;

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
        this.btnCancel.disabled = false;
      } catch (error) {
        this.btnLoadEquipments.loader = false;
        this.btnCancel.disabled = false;
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
          this.listSettings[2].hide = true;
          break;
      }
    },
  },

  created() {
    this.checkPermissions()
  },

  watch: {
    excelFile: {
      handler(val) {
        if (val?.name) {
          this.btnLoadEquipments.disabled = false
        } else {
          this.btnLoadEquipments.disabled = true
        }
      },
      deep: true
    }
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