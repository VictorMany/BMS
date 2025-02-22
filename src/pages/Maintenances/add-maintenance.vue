<template>
  <q-page class="flex flex-center cursor-pointer non-selectable">
    <div class="card-page">

      <header-actions
        titlePage="Agregar mantenimiento"
        :btn-action="btnAction"
        :btn-close-window="btnCloseWindow"
      />

      <div class="main-container-page main-container-page-dark container-form">
        <q-scroll-area
          class="h-97 q-pa-xs-none q-pa-lg-sm"
          :thumb-style="$store.getters['global/getThumbStyle']"
        >
          <form-component
            ref="fieldsComponent"
            :fields="fields"
          />
        </q-scroll-area>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue';
import HeaderActions from 'src/components/compose/HeaderActions.vue';
import FormComponent from 'src/components/compose/FormComponent.vue';
import { rules, showSuccess, showWarning, updateFieldByKeyInAllArrays } from 'app/utils/utils';

export default defineComponent({
  name: 'EquipmentsPage',
  components: {
    HeaderActions,
    FormComponent,
  },
  data() {
    return {

      defaultFile: null,

      btnAction: {
        show: true,
        btnTitle: 'Guardar',
        iconName: 'o_save',
        btnWidth: 'auto',
        tooltip: 'Agregar mantenimiento',
        btnAction: this.createMaintenance,
        loader: false,
      },

      btnCloseWindow: {
        iconName: 'exit_to_app',
        btnBackground: '#FF990020',
        btnColor: '#FF9900',
        btnAction: this.goBack
      },

      fields: {
        id: null,
        createdAt: this.getCreatedAt(),
        reportRelated: null,
        extras: [
          {
            key: 'planDateId',
            model: ''
          }
        ],
        top: [
          {
            key: 'idEquipment',
            label: 'Equipo*',
            type: 'select',
            itemFilter: this.filterEquipments,
            options: [],
            model: null,
            rules: [rules.requiredObject],
          },
          {
            key: 'reason',
            label: 'Motivo*',
            model: '',
            rules: [rules.requiredString],
          },
        ],
        left: [
          {
            key: 'maintenanceType',
            label: 'Tipo*',
            model: '',
            type: 'select',
            options: [
              { label: 'Preventivo', index: 1, value: 'Preventivo' },
              { label: 'Correctivo', index: 2, value: 'Correctivo' },
            ],
            rules: [rules.requiredObject],
          },

          {
            key: 'cost',
            label: 'Costo*',
            type: 'number',
            prefix: '$',
            model: '',
            rules: [rules.requiredString],
          },
        ],
        textareas: [
          {
            key: 'tools',
            type: 'textarea',
            label: 'Herramientas*',
            required: true,
            model: '',
          },
          {
            key: 'materials',
            type: 'textarea',
            label: 'Materiales*',
            required: true,
            model: '',
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
          }
        ],
        bottom: [
          {
            key: 'observations',
            type: 'textarea',
            label: 'Actividades y observaciones del mantenimiento',
            required: false,
            model: '',
          },
          {
            key: 'file',
            label: 'Elige un documento desde tus archivos (opcional)',
            model: null,
            accept: 'image/*,.jpg,.jpeg,.png,application/pdf'
          }
        ],
      },
    };
  },
  methods: {
    async createMaintenance() {
      if (this.report) {
        this.fields.reportRelated = this.report.ReportId
      }
      if (await this.$refs.fieldsComponent.validate()) {
        this.btnAction.loader = true;
        try {
          const res = await this.$store.dispatch(
            'maintenances/postMaintenanceAction',
            this.fields
          );
          if (res === true) {
            showSuccess(this.$q, { title: 'Éxito al crear el mantenimiento', msg: 'El mantenimiento se ha agregado' });
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

    async getMaintenance() {
      try {
        const params = {
          id: this.$route.params.id,
          fields: this.fields
        }
        await this.$store.dispatch('maintenances/getMaintenanceAction', params)
      } catch (error) {
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

          updateFieldByKeyInAllArrays(
            'idEquipment',
            { options: this.equipments },
            this.fields
          )
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

        updateFieldByKeyInAllArrays(
          'idEquipment',
          { options: this.equipments },
          this.fields
        )
      })
    },

    goBack() {
      this.$router.go(-1);
    },

    getCreatedAt() {
      return this.$store.getters['global/getDate']
    },

    getEquipmentDefault() {
      updateFieldByKeyInAllArrays(
        'idEquipment',
        {
          model: {
            value: this.equipment.IdEquipment,
            label: this.equipment.categoryName
          },
          readonly: true
        },
        this.fields
      )

      this.setModelValueByKey('maintenanceType', {
        value: 'Preventivo',
        label: 'Preventivo'
      })

      this.setModelValueByKey('photo', this.equipment.photo)
      this.setModelValueByKey('serialNumber', this.equipment.serialNumber)
    },

    getEquipmentFromReport() {
      const label = `${this.report?.Equipment?.equipmentName} - ${this.report?.Equipment?.equipmentModel} - No. serie: ${this.report?.Equipment?.serialNumber}`

      updateFieldByKeyInAllArrays(
        'idEquipment',
        {
          model: {
            value: this.report.Equipment.IdEquipment,
            label: label
          },
          readonly: true
        },
        this.fields
      )

      this.setModelValueByKey('maintenanceType', {
        value: 'Correctivo',
        label: 'Correctivo'
      })

      this.setModelValueByKey('photo', this.report.Equipment.photo)
      this.setModelValueByKey('serialNumber', this.report.Equipment.serialNumber)
      this.setModelValueByKey('observations', 'Mantenimiento a causa de un reporte por: ' + this.report.reason)
    },

    getEquipmentFromScheduled() {
      updateFieldByKeyInAllArrays(
        'idEquipment',
        {
          model: {
            value: this.equipment.IdEquipment,
            label: this.equipment.categoryName
          },
          readonly: true
        },
        this.fields
      )

      this.setModelValueByKey('maintenanceType', {
        value: 'Preventivo',
        label: 'Preventivo'
      })

      this.setModelValueByKey('photo', this.equipment.photo)
      this.setModelValueByKey('planDateId', this.equipment.PlanDateId)
      this.setModelValueByKey('serialNumber', this.equipment.serialNumber)
      this.setModelValueByKey('cost', '0.00')
      this.setModelValueByKey('reason', 'Mantenimiento Preventivo/Agendado')
      this.setModelValueByKey('observations', 'Este mantenimiento ha sido previamente agendado')
    },

    setModelValueByKey(key, value) {
      // Busca la clave en todas las secciones del objeto fields
      for (const sectionKey in this.fields) {
        if (Object.prototype.hasOwnProperty.call(this.fields, sectionKey)) {
          const elements = this.fields[sectionKey];

          // Verifica si elements es iterable (un objeto iterable debería tener la propiedad Symbol.iterator)
          if (elements && typeof elements[Symbol.iterator] === 'function') {
            // Busca la clave en cada elemento de la sección
            for (const element of elements) {
              if (element.key === key) {
                element.model = value;
                return;
              }
            }
          }
        }
      }
      // Si la clave no se encuentra, puedes manejarlo según tus necesidades
    },
  },

  mounted() {
    if (this.equipment && !this.equipment?.isFromScheduled) {
      this.getEquipmentDefault()
    } else if (this.report) {
      this.getEquipmentFromReport()
    } else if (this.equipment?.isFromScheduled) {
      this.getEquipmentFromScheduled()
    } else {
      this.getEquipments({})
    }
  },

  computed: {
    report: {
      get() {
        return this.$store.getters['reports/getReportGetter'];
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
        if (val.top[0].model && val.right[1].model != val.top[0].model.serialNumber && val.top[0].model.serialNumber) {
          this.setModelValueByKey('photo', val.top[0].model.cardImg)
          this.setModelValueByKey('serialNumber', val.top[0].model.serialNumber)
        }
      },
      deep: true,
      immediate: true
    }
  }
});
</script>

<style scoped>
.main-container-page {
  background-color: white;
}
</style>
