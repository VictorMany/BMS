<template>
  <q-page class="flex flex-center cursor-pointer non-selectable">
    <div class="card-page">
      <header-actions
        :titlePage="'Detalles del equipo'"
        :btn-action="btnAction"
        :btn-close-window="btnCloseWindow"
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
        createdAt: '',
        left: [
          {
            key: 'categoryName',
            label: 'Categoría del equipo',
            model: '',
          },
          {
            key: 'equipmentBrand',
            label: 'Marca',
            model: ''
          },
          {
            key: 'equipmentModel',
            label: 'Modelo',
            model: ''
          },
          {
            key: 'locationName',
            label: 'Ubicación',
            model: ''
          },
          {
            key: 'manufacturingYear',
            label: 'Año del equipo',
            model: ''
          },
          {
            key: 'provider',
            label: 'Provedor',
            model: ''
          },
          {
            key: 'price',
            label: 'Costo',
            affix: '$',
            model: ''
          },
          {
            key: 'nextMaintenanceDate',
            label: 'Próximo mantenimiento',
            type: 'formatedDate',
            model: ''
          },
          {
            key: 'warrantyDate',
            label: 'Fecha de garantía',
            type: 'formatedDate',
            model: ''
          },
          {
            key: 'updatedAt',
            label: 'Fecha de modificación',
            type: 'formatedDate',
            model: ''
          },
          {
            key: 'isReported',
            label: 'Reportado',
            model: ''
          },
          {
            key: 'equipmentStatus',
            label: 'Estatus',
            type: 'status',
            color: '',
            model: ''
          }
        ],
        right: [
          {
            key: 'serialNumber',
            label: 'No. de serie',
            model: ''
          },
          {
            key: 'photo',
            model: ''
          }
        ],
        bottom: [
          {
            key: 'observations',
            type: 'textarea',
            label: 'Observaciones del equipo biomédico',
            model: ''
          }
        ],
      },
      btnAction: {
        show: true,
        btnTitle: 'Editar',
        iconName: 'edit',
        tooltip: 'Ir a editar equipo',
        to: this.getIdToEdit(),
        btnWidth: 'auto'
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
      this.$router.go(-1)
    },

    async getEquipment() {
      this.loading = true

      const params = {
        id: this.$route.params.id,
        fields: this.fields
      }

      await this.$store.dispatch('equipments/getEquipmentAction', params)
      this.loading = false
    },

    getIdToEdit() {
      return `edit-${this.$route.params.id}-equipment`
    },
  },

  mounted() {
    this.getEquipment();
  },
})
</script>

<style scoped>
.main-container-page {
  background-color: white;
}
</style>
