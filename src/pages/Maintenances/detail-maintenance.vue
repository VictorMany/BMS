<template>
  <q-page class="flex flex-center cursor-pointer non-selectable">
    <div class="card-page printable-content">
      <header-actions
        :title-page="'Detalles del mantenimiento'"
        :btn-close-window="btnCloseWindow"
        :download-pdf="download"
      />
      <div class="main-container-page main-container-page-dark container-form">
        <q-scroll-area
          class="h-97"
          :thumb-style="{ right: '6px', borderRadius: '5px', background: 'rgba(29, 100, 231, 0.2)', width: '5px', opacity: 1 }"
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
import { defineComponent } from 'vue'
import HeaderActions from 'src/components/compose/HeaderActions.vue'
import DetailsComponent from 'src/components/compose/DetailsComponent.vue'
import { showWarning } from 'app/utils/utils'


export default defineComponent({
  name: 'EquipmentsPage',
  components: {
    HeaderActions,
    DetailsComponent,
  },

  data() {
    return {
      loading: false,

      fields: {
        top: [],
        left: [
          {
            key: 'categoryName',
            label: 'Categoría del equipo',
            model: '',
          },
          {
            key: 'equipmentName',
            label: 'Nombre del equipo',
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
            key: 'cost',
            label: 'Costo',
            affix: '$',
            model: '',
            color: ''
          },
          {
            key: 'maintenanceType',
            label: 'Tipo',
            type: 'status',
            model: '',
            color: ''
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
            model: ''
          }
        ],

        textareas: [
          {
            key: 'tools',
            type: 'textarea',
            label: 'Herramientas',
            model: ''
          },
          {
            key: 'materials',
            type: 'textarea',
            label: 'Materiales',
            model: ''
          },
        ],

        bottom: [
          {
            key: 'observations',
            type: 'textarea',
            label: 'Observaciones del mantenimiento',
            model: ''
          },
          {
            key: 'documentUrl',
            label: 'Archivo adjunto al mantenimiento',
            model: ''
          },
        ],
      },

      btnCloseWindow: {
        iconName: 'exit_to_app',
        btnBackground: '#FF990020',
        btnColor: '#FF9900',
        btnAction: this.goBack
      },
    }
  },

  methods: {
    goBack() {
      this.$router.go(-1);
    },

    async download() {
      try {
        const printOptions = {
          orientation: 'portrait', // Establece la orientación en modo retrato
        };
        // Abre el cuadro de diálogo de impresión para imprimir solo el contenido dentro de .printable-content
        window.print(printOptions);
      } catch (error) {
        showWarning(this.$q, { msg: 'No se pudo completar la descarga', title: 'Ocurrió un error' })
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
  },

  mounted() {
    this.getMaintenance();
  },
})
</script>

<style scoped>
.main-container-page {
  background-color: white;
}
</style>

<style lang="scss">
/* Estilo para ocultar todo excepto el contenido imprimible */
@media print {
  body * {
    visibility: hidden;
  }

  .printable-content,
  .printable-content * {
    visibility: visible;
  }

  .printable-content {
    position: absolute;
    left: 0;
    top: 0;
    width: 100vw !important;
  }

  .container-style {
    padding: 0 !important;
  }

  body,
  .card-page,
  .body--dark .card-info,
  .body--dark .main-container-page-dark {
    background-color: #f8fafc !important;
  }

  #downloadPDF,
  .q-btn,
  .q-icon,
  .q-drawer-container {
    display: none;
  }
}
</style>
