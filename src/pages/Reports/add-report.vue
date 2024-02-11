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
          <form-component
            ref="fieldsComponent"
            :loading="loading"
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
import FormComponent from 'src/components/compose/FormComponent.vue'
import { rules, showSuccess, showWarning } from 'app/utils/utils';

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
            key: 'idEquipment',
            label: 'Equipo',
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
            label: 'Categoría del equipo',
            model: '',
            shouldShow: this.isEditing(),
            readonly: true
          },
          {
            key: 'equipmentModel',
            label: 'Modelo del equipo',
            model: '',
            shouldShow: this.isEditing(),
            readonly: true
          },
          {
            key: 'userName',
            type: 'text',
            label: 'Encargado',
            model: null,
            readonly: this.isEditing(),
            shouldShow: this.isEditing()
          },
          {
            key: 'reason',
            label: 'Motivo',
            model: '',
            readonly: this.isEditing(),
            rules: [rules.requiredString],
          },
        ],
        left: [
          {
            key: 'reportStatus',
            label: 'Estatus',
            type: 'select',
            model: null,
            shouldShow: this.isEditing(),
            options: [
              { label: 'Pendiente', status: true, value: true },
              { label: 'Atendido', status: false, value: false },
            ],
            rules: [rules.requiredObject],
          },
          {
            key: 'reportUrgency',
            label: 'Prioridad',
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
            showSuccess(this.$q, { title: 'Éxito al crear el reporte', msg: 'El reporte se ha agregado' });
            this.$router.go(-1);
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

    isEditing() {
      return this.$route.params.id ? true : false
    },

  },

  created() {
    this.loading = true
    this.getEquipments()

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
