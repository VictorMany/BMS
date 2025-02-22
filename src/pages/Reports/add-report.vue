<template>
  <q-page class="flex flex-center cursor-pointer non-selectable">
    <div class="card-page">

      <header-actions
        :titlePage="getTitle()"
        :btn-action="btnAction"
        :btn-close-window="showCloseBtn() ? btnCloseWindow : null"
      />

      <div class="main-container-page main-container-page-dark container-form">
        <q-scroll-area
          class="h-97 q-pa-xs-none q-pa-lg-sm"
          :thumb-style="$store.getters['global/getThumbStyle']"
        >
          <form-component
            ref="fieldsComponent"
            :loading="loading"
            :fields="fields"
          />
        </q-scroll-area>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import HeaderActions from 'src/components/compose/HeaderActions.vue'
import FormComponent from 'src/components/compose/FormComponent.vue'
import { deleteLocalStorage, deleteTokenCookie, rules, showSuccess, showWarning } from 'app/utils/utils';
import { setAuthHeader } from 'src/api/auth';

export default defineComponent({
  name: 'Add-Report',
  components: {
    HeaderActions,
    FormComponent,
  },

  data() {
    return {
      loading: false,

      btnAction: {
        show: true,
        btnTitle: 'Reportar',
        iconName: 'o_send',
        btnWidth: 'auto',
        tooltip: 'Guardar reporte',
        btnAction: this.createOrEdit,
        loader: false,
      },

      btnCloseWindow: {
        iconName: 'exit_to_app',
        btnBackground: '#FF990020',
        btnColor: '#FF9900',
        btnAction: this.goBack
      },

      fields: {
        createdAt: this.getCreatedAt(),
        id: null,

        top: [
          {
            key: 'userName',
            type: 'text',
            label: 'Encargado*',
            model: null,
            readonly: this.isEditing(),
            shouldShow: this.isEditing()
          },
          {
            key: 'idEquipment',
            label: 'Equipo*',
            type: 'select',
            options: [],
            model: null,
            itemFilter: this.filterEquipments,
            shouldShow: !this.isEditing(),
            readonly: this.isEditing(),
            rules: this.isEditing() ? [] : [
              rules.requiredObject,
            ],
          },
          {
            key: 'categoryName',
            label: 'Categoría del equipo*',
            model: '',
            shouldShow: this.isEditing(),
            readonly: true
          },
          {
            key: 'equipmentModel',
            label: 'Modelo del equipo*',
            model: '',
            shouldShow: this.isEditing(),
            readonly: true
          },
          {
            key: 'reason',
            label: 'Motivo*',
            model: '',
            readonly: this.isEditing(),
            rules: [rules.requiredString],
          },
        ],
        left: [
          {
            key: 'reportUrgency',
            label: 'Prioridad*',
            type: 'select',
            readonly: this.isEditing(),
            model: null,
            options: [
              { label: 'Alta', index: 1, value: 'Alta' },
              { label: 'Media', index: 2, value: 'Media' },
              { label: 'Baja', index: 3, value: 'Baja' },
            ],
            rules: [rules.requiredObject],
          },
          {
            key: 'reportedBy',
            label: 'Nombre de quien reporta',
            model: ''
          },
        ],
        right: [
          {
            key: 'serialNumber',
            label: 'Número de serie*',
            readonly: true,
            model: '',
          },
          {
            key: 'photo',
            readImage: true,
            model: null,
            readonly: this.isEditing(),
          }
        ],

        textareas: [
          {
            key: 'report',
            type: 'textarea',
            label: 'Detalles del reporte*',
            required: true,
            readonly: this.isEditing(),
            model: '',
            toolbar: [[{
              label: this.$q.lang.editor.fontSize,
              icon: this.$q.iconSet.editor.fontSize,
              fixedLabel: true,
              fixedIcon: true,
              list: 'no-icons',
              options: [
                'size-1',
                'size-2',
                'size-3',
                'size-4',
              ]
            },
              'bold', 'italic', 'strike', 'underline'],
            ['unordered', 'ordered']],
          },
        ],

        bottom: [
          {
            key: 'file',
            label: 'Elige una imagen desde tus archivos (opcional)',
            model: null,
            icon: 'png/add-img.png'
          }
        ]
      }
    };
  },

  methods: {
    async createReport() {
      if (await this.$refs.fieldsComponent.validate()) {
        this.btnAction.loader = true;
        try {
          const res = await this.$store.dispatch(
            'reports/postReportAction',
            this.fields
          );
          if (res === true) {
            if (this.userRole == 3) {
              showSuccess(this.$q, { title: 'El reporte se creó con éxito', msg: 'Redireccionando al incio de sesión' });

              setAuthHeader(null)
              deleteTokenCookie(null)
              deleteLocalStorage()

              this.$store.commit('global/RESET_LOCAL_STORAGE')

              this.$router.replace('/login');
            }
            else {
              showSuccess(this.$q, { title: 'Éxito al crear el reporte', msg: 'El reporte se ha agregado' });
              this.goBack()
            }

          } else {
            showWarning(this.$q, { msg: 'Inténtalo de nuevo más tarde y si el error persiste, repórtalo' });
          }
          this.btnAction.loader = false;
        } catch (error) {
          this.btnAction.loader = false;

        }
      }
    },

    async getReport() {
      try {
        const params = {
          id: this.$route.params.id,
          fields: this.fields
        }
        await this.$store.dispatch('reports/getReportAction', params)
        this.loading = false
      } catch (error) {
        this.loading = false
        console.log(error)
      }
    },

    async editReport() {
      this.btnAction.loader = true;

      try {
        const res = await this.$store.dispatch(
          'reports/updateReportAction',
          { idReport: this.$route.params.id }
        );
        if (res === true) {
          showSuccess(this.$q, { title: 'Éxito al editar el reporte', msg: 'El reporte se ha actualizado' });
          this.$router.go(-1);
        } else {
          showWarning(this.$q, { msg: 'Inténtalo de nuevo más tarde y si el error persiste, repórtalo' });
        }
        this.btnAction.loader = false;
      } catch (error) {
        this.btnAction.loader = false;
        console.log(error)
      }
    },

    async getEquipments(params) {
      try {
        await this.$store.dispatch('equipments/getEquipmentsAction', params);
      } catch (error) {
        console.log(error)
      }
    },

    async filterEquipments(val, update) {
      if (val === '') {
        await update(async () => {

          await this.getEquipments()

          this.equipments.map(e => {
            e.label = `${e.cardTitle} - ${e.equipmentModel} - No. serie: ${e.serialNumber}`
          })

          this.updateFieldByKeyInAllArrays('idEquipment', {
            options: this.equipments
          })
        })
        return
      } else {
        const params = {
          category: val
        }
        if (this.equipments.length >= 20) {
          params.rowsPerPage = this.paginationEquipments.totalItems
        }

        await this.getEquipments(params)
      }

      await update(() => {
        this.equipments.map(e => {
          e.label = `${e.cardTitle} - ${e.equipmentModel} - No. serie: ${e.serialNumber}`
        })

        this.updateFieldByKeyInAllArrays('idEquipment', {
          options: this.equipments
        })
      })
    },

    createOrEdit() {
      if (this.isEditing()) {
        this.editReport()
      } else {
        this.createReport()
      }
    },

    showCloseBtn() {
      return this.userRole == 3 ? false : true
    },

    getEquipmentDefault() {
      if (this.equipment.categoryName && !this.fields.top[1].model) {
        this.updateFieldByKeyInAllArrays('idEquipment', {
          model: {
            value: this.equipment.IdEquipment,
            label: this.equipment.categoryName
          },
          readonly: true
        })
      }
      if (this.equipment.photo && this.fields.right[1].model === null) {
        this.updateFieldByKeyInAllArrays('photo', {
          model: this.equipment.photo
        })
      }
      if (this.equipment.serialNumber && !this.fields.right[0].model) {
        this.updateFieldByKeyInAllArrays('serialNumber', {
          model: this.equipment.serialNumber
        })
      }
    },

    updateFieldByKeyInAllArrays(key, updates) {
      for (const arrayKey in this.fields) {
        if (Array.isArray(this.fields[arrayKey])) {
          const fieldEntry = this.fields[arrayKey].find(entry => entry.key === key);
          if (fieldEntry) {
            Object.assign(fieldEntry, updates);
            return; // Termina la iteración después de encontrar la primera coincidencia
          }
        }
      }
      console.log(`No se encontró la entrada para la clave '${key}' en ningún arreglo o no tiene opciones.`);
    },

    getDate() {
      return this.$store.$store.getters['global/getDate']
    },


    goBack() {
      if (this.$router?.options?.history?.state?.back)
        this.$router.go(-1);
      else
        this.$router.push({ name: 'equipments' });
    },

    getTitle() {
      if (this.isEditing()) {
        return 'Editar reporte'
      }
      else return 'Agregar reporte'
    },

    getCreatedAt() {
      if (this.isEditing()) {
        return ''
      }
      else return this.$store.getters['global/getDate']
    },

    isEditing() {
      return this.$route.params.id ? true : false
    },

  },

  created() {
    this.loading = true

    if (!this.equipment) {
      this.getEquipments()
    }

    if (this.isEditing()) {
      this.getReport()
    } else {
      this.loading = false
    }
  },

  mounted() {
    if (this.equipment) {
      this.getEquipmentDefault()
    }
  },

  computed: {
    userRole: {
      get() {
        return this.$store.getters['users/getRoleGetter'];
      },
    },
    equipments: {
      get() {
        return this.$store.getters['equipments/getEquipmentsGetter'];
      },
    },

    equipment: {
      get() {
        return this.$store.getters['equipments/getEquipmentGetter'];
      },
    },

    paginationEquipments: {
      get() {
        return this.$store.getters['equipments/getPaginationGetter'];
      },
    },
  },

  watch: {
    fields: {
      // Get the image, and no-serie every change of the equipment selected
      handler(val) {
        if ((val.top[1].model
          && val.right[1].model != val.top[1].model.serialNumber && val.top[1].model.serialNumber)
          && !this.isEditing()) {
          this.updateFieldByKeyInAllArrays('photo', {
            model: val.top[1].model.cardImg
          })
          this.updateFieldByKeyInAllArrays('serialNumber', {
            model: val.top[1].model.serialNumber
          })
        }
      },
      deep: true,
      immediate: true
    },
  }
})
</script>

<style scoped>
.main-container-page {
  background-color: white;
}
</style>
