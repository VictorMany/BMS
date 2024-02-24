<template>
  <q-page class="flex flex-center cursor-pointer non-selectable">
    <div class="card-page">
      <header-actions
        :titlePage="'Detalles de reporte'"
        :btn-actions="btnActions"
        :btn-close-window="btnCloseWindow"
      />

      <div class="main-container-page main-container-page-dark container-form">
        <q-scroll-area
          class="h-97"
          :thumb-style="$store.getters['global/getThumbStyle']"
        >
          <details-component
            :fields="fields"
            :loading="loading"
          />
        </q-scroll-area>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue';
import HeaderActions from 'src/components/compose/HeaderActions.vue';
import DetailsComponent from 'src/components/compose/DetailsComponent.vue';
import { showSuccess } from 'app/utils/utils';

export default defineComponent({
  name: 'EquipmentsPage',
  components: {
    HeaderActions,
    DetailsComponent,
  },
  data() {
    return {
      loading: true,

      fields: {
        createdAt: '',
        extras: [
          {
            key: 'showBtn',
            model: ''
          }
        ],
        top: [],
        left: [
          {
            key: 'categoryName',
            label: 'Categoría del equipo',
            model: ''
          },
          {
            key: 'equipmentModel',
            label: 'Modelo del equipo',
            model: ''
          },
          {
            key: 'userName',
            label: 'Encargado',
            model: ''
          },
          {
            key: 'reason',
            label: 'Motivo',
            model: ''
          },
          {
            key: 'reportUrgency',
            label: 'Prioridad',
            model: ''
          },
          {
            key: 'reportStatus',
            label: 'Estatus',
            type: 'status',
            model: '',
            color: ''
          },
        ],

        textareas: [
          {
            type: 'textarea',
            key: 'report',
            label: 'Observaciones del reporte',
            model: ''
          }
        ],

        right: [
          {
            key: 'serialNumber',
            label: 'Número de serie del equipo',
            model: ''
          },
          {
            key: 'photo',
            model: ''
          }
        ],
      },

      btnActions: [
        {
          show: false,
          btnTitle: 'Cancelar reporte',
          iconName: 'cancel',
          tooltip: 'Cancelar reporte',
          btnWidth: 'auto',
          btnAction: this.cancelReport,
          loader: false,
        },
        {
          show: false,
          btnTitle: 'Atender reporte',
          iconName: 'engineering',
          tooltip: 'Atender reporte',
          btnWidth: 'auto',
          btnAction: this.goToMaintenance,
          loader: false,
        },
      ],

      btnCloseWindow: {
        iconName: 'exit_to_app',
        btnBackground: '#FF990020',
        btnColor: '#FF9900',
        btnAction: this.goBack
      },
    };
  },
  methods: {
    async cancelReport() {
      try {
        this.btnActions[0].loader = true
        const params = {
          id: this.$route.params.id,
        }
        await this.$store.dispatch('reports/cancelReportAction', params)
        this.btnActions[0].loader = false
        showSuccess(this.$q, { title: 'Éxito al cancelar el reporte', msg: 'El reporte se ha cancelado' });
        this.goBack()
      } catch (error) {
        this.btnActions[0].loader = false
        console.log(error)
      }
    },

    async goToMaintenance() {
      this.$store.commit('equipments/MUTATE_EQUIPMENT', null)

      this.$router.push({
        name: 'add-maintenance'
      });
    },

    getModelValueByKey(key) {
      // Busca la clave en todas las secciones del objeto fields
      for (const sectionKey in this.fields) {
        if (Object.prototype.hasOwnProperty.call(this.fields, sectionKey)) {
          const elements = this.fields[sectionKey];

          // Verifica si elements es iterable (un objeto iterable debería tener la propiedad Symbol.iterator)
          if (elements && typeof elements[Symbol.iterator] === 'function') {
            // Busca la clave en cada elemento de la sección
            for (const element of elements) {
              if (element.key === key) {
                return element.model
              }
            }
          }
        }
      }
    },

    goBack() {
      this.$router.go(-1);
    },

    async getReport() {
      try {
        const params = {
          id: this.$route.params.id,
          fields: this.fields
        }

        await this.$store.dispatch('reports/getReportAction', params)
        this.btnActions[0].show = this.getModelValueByKey('showBtn') ? true : false

        if (this.getModelValueByKey('reportStatus') === 'Pendiente' && this.userRole != 3) {
          this.btnActions[1].show = true
        }

        this.loading = false
      } catch (error) {
        console.log(error)
        this.loading = false
      }
    },
  },
  computed: {
    userRole: {
      get() {
        return this.$store.getters['users/getRoleGetter'];
      },
    },
  },
  created() {
    this.getReport();
  },
});
</script>

<style scoped>
.main-container-page {
  background-color: white;
}
</style>
