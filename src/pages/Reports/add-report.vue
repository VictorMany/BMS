<template>
  <q-page class="flex flex-center cursor-pointer non-selectable">
    <div class="card-page">

      <header-actions
        :titlePage="getTitle()"
        :btn-action="btnAction"
        :btn-close-window="btnCloseWindow"
      />
      <div class="main-container-page main-container-page-medium-dark container-form">
        <q-scroll-area
          class="h-90 q-pa-xs-none q-pa-lg-sm"
          :thumb-style="$store.getters['global/getThumbStyle']"
        >
          <form-text-field
            ref="fieldsComponent"
            :fields="fields"
          />
        </q-scroll-area>
        <div
          class="col-12 form__date_container form__date column justify-center q-px-lg"
          style="height: 6%"
        >
          <div>Fecha de creación: <strong>{{ fields.createdAt }}</strong></div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import HeaderActions from 'src/components/compose/HeaderActions.vue'
import FormTextField from 'src/components/compose/FormTextField.vue'

export default defineComponent({
  name: 'Add-Report',
  components: {
    HeaderActions,
    FormTextField,
  },

  data() {
    return {
      btnAction: {
        show: true,
        btnTitle: 'Guardar',
        iconName: 'save',
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
            key: this.isEditing() ? 'categoryName' : 'idEquipment',
            type: this.isEditing() ? 'text' : 'select',
            label: 'Equipo',
            options: [],
            model: null,
            itemFilter: this.filterEquipments,
            readonly: this.isEditing(),
            rules: this.isEditing() ? [] : [
              (val) => (val) || 'El campo es obligatorio',
            ],
          },
          {
            key: this.isEditing() ? 'userName' : 'userId',
            type: this.isEditing() ? 'text' : 'select',
            label: 'Encargado',
            options: [],
            model: null,
            itemFilter: this.filterUsers,
            readonly: this.isEditing(),
            rules: this.isEditing() ? [] : [
              (val) => (val) || 'El campo es obligatorio',
            ],
          },
        ],
        left: [
          {
            key: 'reason',
            label: 'Motivo',
            model: '',
            readonly: this.isEditing(),
            rules: [
              (val) => (val && val.trim().length > 0) || 'El campo es obligatorio',
            ],
          },
          {
            key: 'reportStatus',
            label: 'Estatus',
            type: 'select',
            model: null,
            options: [
              { label: 'Pendiente', status: true, value: true },
              { label: 'Atendido', status: false, value: false },
            ],
            rules: [
              (val) => (val) || 'El campo es obligatorio',
            ],
          },
          {
            key: 'reportUrgency',
            label: 'Prioridad',
            type: 'select',
            readonly: this.isEditing(),
            model: null,
            options: [
              { label: 'Alta', index: 1, value: 'alto' },
              { label: 'Media', index: 2, value: 'medio' },
              { label: 'Baja', index: 3, value: 'bajo' },
            ],
            rules: [
              (val) => (val) || 'El campo es obligatorio',
            ],
          },
        ],
        right: [
          {
            key: 'serialNumber',
            label: 'Número de serie',
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
            label: 'Observaciones del reporte',
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
            this.showAlert({ title: 'Éxito al crear', msg: 'El reporte se ha agregado', color: 'green-14' });
            this.$router.go(-1);
          } else {
            this.showAlert({ msg: 'Inténtalo de nuevo más tarde y si el error persiste, repórtalo' });
          }
          this.btnAction.loader = false;
        } catch (error) {
          this.btnAction.loader = false;
          this.showAlert({ msg: error.response ? error.response.data.details : error });
        }
      }
    },

    async getReport() {
      this.loading = true
      const params = {
        id: this.$route.params.id,
        fields: this.fields
      }
      await this.$store.dispatch('reports/getReportAction', params)
      this.loading = false
    },

    async editReport() {
      this.btnAction.loader = true;

      try {
        const res = await this.$store.dispatch(
          'reports/updateReportAction',
          {
            idReport: this.$route.params.id,
            idUser: 11
          }
        );
        if (res === true) {
          this.showAlert({ title: 'Éxito al editar', msg: 'El reporte se ha actualizado', color: 'green-14' });
          this.$router.go(-1);
        } else {
          console.log(res)
          this.showAlert({});
        }
        this.btnAction.loader = false;
      } catch (error) {
        console.log(error)
        this.btnAction.loader = false;
        this.showAlert({});
      }
    },

    createOrEdit() {
      if (this.isEditing()) {
        this.editReport()
      } else {
        this.createReport()
      }
    },

    getEquipmentDefault() {
      if (this.equipment.categoryName && !this.fields.top[0].model) {
        this.updateFieldByKeyInAllArrays('idEquipment', {
          model: {
            value: this.equipment.IdEquipment,
            label: this.equipment.categoryName
          }
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
      console.error(`No se encontró la entrada para la clave '${key}' en ningún arreglo o no tiene opciones.`);
    },

    getDate() {
      return this.$store.$store.getters['global/getDate']
    },

    goBack() {
      this.$router.go(-1);
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

    showAlert({ msg, color, title, classes }) {
      this.$q.notify({
        message: title ? title : 'Ocurrió un error al crear el reporte',
        caption: msg ? msg : 'Inténtalo de nuevo más tarde',
        color: color ? color : 'secondary',
        classes: classes ? classes : 'border-rounded',
      });
    },

    isEditing() {
      return this.$route.params.id ? true : false
    },

    async getUsers(params) {
      await this.$store.dispatch('users/getUsersAction', params);
    },

    async getEquipments(params) {
      await this.$store.dispatch('equipments/getEquipmentsAction', params);
    },

    async filterUsers(val, update) {
      if (val === '') {
        update(() => {
          this.updateFieldByKeyInAllArrays('userId', {
            options: this.users
          })
        })
        return
      } else {
        await this.getUsers({
          name: val
        })
      }

      update(() => {
        const needle = val.toLowerCase()

        this.updateFieldByKeyInAllArrays('userId', {
          options: this.users.filter(v => v.cardTitle.toLowerCase().indexOf(needle) > -1)
        })
      })
    },

    async filterEquipments(val, update) {
      if (val === '') {
        update(() => {
          this.equipments.map(e => {
            e.label = `${e.cardTitle} - ${e.equipmentModel} - No. serie: ${e.serialNumber}`
          })

          this.updateFieldByKeyInAllArrays('idEquipment', {
            options: this.equipments
          })
        })
        return
      } else {
        await this.getEquipments({
          name: val
        })
      }

      update(() => {
        const needle = val.toLowerCase()
        this.equipments.map(e => {
          e.label = `${e.cardTitle} - ${e.equipmentModel} - No. serie: ${e.serialNumber}`
        })

        this.updateFieldByKeyInAllArrays('idEquipment', {
          options: this.equipments.filter(v => v.cardTitle.toLowerCase().indexOf(needle) > -1)
        })
      })
    }
  },

  created() {
    this.getUsers({})
    this.getEquipments({})
    if (this.isEditing()) {
      this.getReport()
    }
  },

  mounted() {
    if (this.equipment) {
      this.getEquipmentDefault()
    }
  },

  computed: {
    users: {
      get() {
        return this.$store.getters['users/getUsersGetter'];
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
  },

  watch: {
    fields: {
      // Get the image, and no-serie every change of the equipment selected
      handler(val) {
        if ((val.top[0].model && val.right[1].model != val.top[0].model.cardImg && val.top[0].model.cardImg) &&
          !this.isEditing()) {
          val.right[1].model = val.top[0].model.cardImg
          val.right[0].model = val.top[0].model.serialNumber
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
