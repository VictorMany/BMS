<template>
  <q-page class="flex flex-center cursor-pointer non-selectable">
    <div class="card-page printable-content">
      <header-actions
        :title-page="'Detalles del mantenimiento'"
        :btn-close-window="btnCloseWindow"
        :show-download-btn="!loading"
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

          <div class="row q-px-md print-signs">
            <div class="col text-center form__item-label text-weight-medium">
              Firma del ing. biomédico
              <div class="border-line q-pa-lg border-rounded ">

              </div>
            </div>
            <div class="col text-center form__item-label text-weight-medium">
              Firma de aceptación
              <div class="border-line q-pa-lg border-rounded">
              </div>
            </div>
          </div>
        </q-scroll-area>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import HeaderActions from 'src/components/compose/HeaderActions.vue'
import DetailsComponent from 'src/components/compose/DetailsComponent.vue'
import { showSuccess, showWarning, updateFieldByKeyInAllArrays } from 'app/utils/utils'


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
            key: 'equipmentBrand',
            label: 'Marca del equipo',
            model: ''
          },
          {
            key: 'locationName',
            label: 'Ubicación del equipo',
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
            label: 'Adjunta un archivo a tu mantenimiento (opcional)',
            model: null,
            accept: 'image/*,.jpg,.jpeg,.png,application/pdf',
            btnAction: this.uploadFileForMaintenance,
            loadingLoadAction: false
          }
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

    async uploadFileForMaintenance(file) {
      updateFieldByKeyInAllArrays(
        'documentUrl',
        { loadingLoadAction: true },
        this.fields
      )
      const params = {
        id: this.$route?.params?.id,
        file: file
      }

      await this.$store.dispatch('maintenances/uploadFileAction', params)

      showSuccess(this.$q, { title: 'Se cargó el archivo exitosamente', msg: 'El archivo adjunto se ha agregado al mantenimiento' })

      updateFieldByKeyInAllArrays(
        'documentUrl',
        { loadingLoadAction: true },
        this.fields
      )
      this.getMaintenance()
    },

    async download() {
      try {
        // Realizar scroll hasta el final de la página
        window.scrollTo(0, document.body.scrollHeight);
        // Esperar un breve tiempo para asegurarse de que el scroll se haya completado
        await new Promise(resolve => setTimeout(resolve, 1000));
        // Luego de realizar el scroll, abrir el cua hdro de diálogo de impresión
        const printOptions = {
          orientation: 'portrait', // Establece la orientación en modo retrato
        };
        window.print(printOptions);
      } catch (error) {
        showWarning(this.$q, { msg: 'No se pudo completar la descarga', title: 'Ocurrió un error' });
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
.print-signs {
  gap: 20px;
  display: none;
}

/* Estilo para ocultar todo excepto el contenido imprimible */
@media print {

  body * {
    visibility: hidden;
  }

  .no-printable-content {
    display: none;
  }

  .print-signs {
    display: flex;
  }

  .printable-content,
  .printable-content * {
    visibility: visible;
  }

  .printable-content {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    min-width: 70vw !important;
  }

  .custom-col-xs,
  .custom-col-sm,
  .custom-col-md,
  .custom-col-lg {
    width: 50% !important;
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
    display: none !important;
  }
}
</style>
