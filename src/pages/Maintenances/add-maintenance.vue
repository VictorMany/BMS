<template>
  <q-page class="flex flex-center cursor-pointer non-selectable">
    <div class="card-page">
      <div class="column items-end q-mt-md q-mb-xs">
        <btn-action v-bind="btnCloseWindow" />
      </div>
      <header-actions
        titlePage="Agregar mantenimiento"
        :btn-action="btnAction"
      />
      <div
        class="main-container-page main-container-page-medium-dark"
        style="height: 82%"
      >
        <q-scroll-area
          class="full-height q-pb-sm"
          style="height: 92% !important"
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
import { defineComponent } from 'vue';
import BtnAction from 'src/components/atomic/BtnAction.vue';
import HeaderActions from 'src/components/compose/HeaderActions.vue';
import FormTextField from 'src/components/compose/FormTextField.vue';

export default defineComponent({
  name: 'EquipmentsPage',
  components: {
    HeaderActions,
    FormTextField,
    BtnAction,
  },
  data() {
    return {
      btnAction: {
        show: true,
        btnTitle: 'Guardar',
        btnWidth: 'auto',
        btnAction: this.createMaintenance,
        loader: false,
      },
      btnCloseWindow: {
        iconName: 'close',
        btnBackground: '#FF9900',
        btnColor: '#FFFFFF',
        btnSize: 'xs',
        btnAction: this.goBack,
      },
      fields: {
        createdAt: this.getCreatedAt(),
        id: null,
        reportRelated: null,

        top: [
          {
            key: 'userId',
            label: 'Encargado',
            type: 'select',
            itemFilter: this.filterUsers,
            options: [],
            model: null,
            rules: [
              (val) => (val) || 'El campo es obligatorio',
            ],
          },
          {
            key: 'idEquipment',
            label: 'Equipo',
            type: 'select',
            itemFilter: this.filterEquipments,
            options: [],
            model: null,
            rules: [
              (val) => (val) || 'El campo es obligatorio',
            ],
          },
        ],
        left: [
          {
            key: 'maintenanceType',
            label: 'Tipo',
            model: '',
            type: 'select',
            options: [
              { label: 'Preventivo', index: 1, value: 'preventivo' },
              { label: 'Correctivo', index: 2, value: 'correctivo' },
            ],
            rules: [
              (val) => (val) || 'El campo es obligatorio',
            ],
          },
          {
            key: 'reason',
            label: 'Motivo',
            model: '',
          },
          {
            key: 'cost',
            label: 'Costo',
            type: 'number',
            prefix: '$',
            model: '',
            rules: [
              (val) => (val && val.trim().length > 0) || 'El campo es obligatorio',
            ],
          },
        ],
        textareas: [
          {
            key: 'tools',
            type: 'textarea',
            label: 'Herramientas',
            model: '',
          },
          {
            key: 'materials',
            type: 'textarea',
            label: 'Materiales',
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
            label: 'Actividades y observaciones del mantenimiento',
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
            this.showAlert({ title: 'Éxito al crear', msg: 'El mantenimiento se ha agregado', color: 'green-14' });
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

    async getMaintenance() {
      this.loading = true
      const params = {
        id: this.$route.params.id,
        fields: this.fields
      }
      await this.$store.dispatch('maintenances/getMaintenanceAction', params)
      this.loading = false
    },

    async getUsers(params) {
      this.loading = true
      await this.$store.dispatch('users/getUsersAction', params);
      this.loading = false
    },

    async getEquipments(params) {
      this.loading = true
      await this.$store.dispatch('equipments/getEquipmentsAction', params);
      this.loading = false
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

    showAlert({ msg, color, title, classes }) {
      this.$q.notify({
        message: title ? title : 'Ocurrió un error al crear el usuario',
        caption: msg ? msg : 'Inténtalo de nuevo más tarde',
        color: color ? color : 'secondary',
        classes: classes ? classes : 'border-rounded',
      });
    },

    filterUsers(val, update) {
      if (val === '') {
        update(() => {
          this.fields.top[0].options = this.users
        })
        return
      } else {
        this.getUsers({
          name: val
        })
      }

      update(() => {
        const needle = val.toLowerCase()
        this.fields.top[0].options = this.users.filter(v => v.cardTitle.toLowerCase().indexOf(needle) > -1)
      })
    },

    filterEquipments(val, update) {
      if (val === '') {
        update(() => {
          this.fields.top[1].options = this.equipments
        })
        return
      } else {
        this.getEquipments({
          name: val
        })
      }

      update(() => {
        const needle = val.toLowerCase()
        this.fields.top[1].options = this.equipments.filter(v => v.cardTitle.toLowerCase().indexOf(needle) > -1)
      })
    },

    getEquipmentDefault() {
      this.setModelValueByKey('idEquipment', {
        value: this.equipment.IdEquipment,
        label: this.equipment.equipmentName
      })
      this.setModelValueByKey('photo', this.equipment.photo)
      this.setModelValueByKey('serialNumber', this.equipment.serialNumber)
    },

    getEquipmentFromReport() {
      this.setModelValueByKey('idEquipment', {
        value: this.report.idEquipment,
        label: this.report.Equipment.equipmentName
      })
      this.setModelValueByKey('maintenanceType', {
        value: 'correctivo',
        label: 'Correctivo'
      })
      this.setModelValueByKey('photo', this.report.Equipment.photo)
      this.setModelValueByKey('serialNumber', this.report.Equipment.serialNumber)
      this.setModelValueByKey('observations', 'Mantenimiento a causa de un report por: ' + this.report.reason)
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
    }
  },

  created() {
    this.getUsers({})
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
    users: {
      get() {
        return this.$store.getters['users/getUsersGetter'];
      },
    },

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
        if (val.top[1].model && val.right[1].model != val.top[1].model.cardImg && val.top[1].model.cardImg) {
          val.right[1].model = val.top[1].model.cardImg
          val.right[0].model = val.top[1].model.serialNumber
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

.card-page {
  padding-top: 0 !important;
}
</style>
