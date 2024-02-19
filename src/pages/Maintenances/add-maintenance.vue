<template>
  <q-page class="flex flex-center cursor-pointer non-selectable">
    <div class="card-page">

      <header-actions
        titlePage="Agregar mantenimiento"
        :btn-action="btnAction"
        :btn-close-window="btnCloseWindow"
      />
      <div class="main-container-page main-container-page-medium-dark container-form">
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
import { rules, showSuccess, showWarning } from 'app/utils/utils';

export default defineComponent({
  name: 'EquipmentsPage',
  components: {
    HeaderActions,
    FormComponent,
  },
  data() {
    return {
      btnAction: {
        show: true,
        btnTitle: 'Guardar',
        iconName: 'save',
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
        createdAt: this.getCreatedAt(),
        id: null,
        reportRelated: null,

        top: [
          {
            key: 'idEquipment',
            label: 'Equipo',
            type: 'select',
            itemFilter: this.filterEquipments,
            options: [],
            model: null,
            rules: [rules.requiredObject],
          },
          {
            key: 'reason',
            label: 'Motivo',
            model: '',
            rules: [rules.requiredString],
          },
        ],
        left: [
          {
            key: 'maintenanceType',
            label: 'Tipo',
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
            label: 'Costo',
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
            label: 'Herramientas',
            required: true,
            model: '',
          },
          {
            key: 'materials',
            type: 'textarea',
            label: 'Materiales',
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
            label: 'Actividades y observaciones del mantenimiento (opcional)',
            required: false,
            model: '',
          }
        ],
      },

      defaultEquipment: null
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

    getDate() {
      return this.$store.$store.getters['global/getDate']
    },

    goBack() {
      this.$router.go(-1);
    },

    getCreatedAt() {
      return this.$store.getters['global/getDate']
    },

    filterEquipments(val, update) {
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
        this.getEquipments({
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

    getEquipmentDefault() {
      this.setModelValueByKey('idEquipment', {
        value: this.equipment.IdEquipment,
        label: this.equipment.categoryName
      })
      this.setModelValueByKey('photo', this.equipment.photo)
      this.setModelValueByKey('serialNumber', this.equipment.serialNumber)
    },

    getEquipmentFromReport() {
      this.setModelValueByKey('idEquipment', {
        value: this.report.idEquipment,
        label: this.report.Equipment.categoryName
      })
      this.setModelValueByKey('maintenanceType', {
        value: 'Correctivo',
        label: 'Correctivo'
      })
      this.setModelValueByKey('photo', this.report.Equipment.photo)
      this.setModelValueByKey('serialNumber', this.report.Equipment.serialNumber)
      this.setModelValueByKey('observations', 'Mantenimiento a causa de un reporte por: ' + this.report.reason)
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
  },

  created() {
    this.getEquipments({})
  },

  mounted() {
    if (this.equipment) {
      this.getEquipmentDefault()
    }
    else if (this.report) {
      this.getEquipmentFromReport()
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
