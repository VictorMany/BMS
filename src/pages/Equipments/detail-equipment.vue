<template>
  <q-page class="flex flex-center cursor-pointer non-selectable">
    <div
      class="card-page"
      :style="$q.platform.is.desktop ? 'padding-top: 0 !important' : ''"
    >
      <div class="column items-end q-mt-md q-mb-sm gt-sm">
        <btn-action v-bind="btnCloseWindow" />
      </div>

      <header-actions
        :titlePage="'Detalles del equipo'"
        :btn-action="btnAction"
      />

      <div class="main-container-page main-container-page-dark container-form">
        <q-scroll-area
          class="h-90"
          :thumb-style="{ right: '6px', borderRadius: '5px', background: 'rgba(29, 100, 231, 0.2)', width: '5px', opacity: 1 }"
        >
          <form-label :fields="fields" />
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
import BtnAction from 'src/components/atomic/BtnAction.vue'
import HeaderActions from 'src/components/compose/HeaderActions.vue'
import FormLabel from 'src/components/compose/FormLabel.vue'

export default defineComponent({
  name: 'EquipmentsPage',
  components: {
    HeaderActions,
    FormLabel,
    BtnAction
  },
  data() {
    return {
      loading: false,
      fields: {
        createdAt: '',
        left: [
          {
            key: 'equipmentName',
            label: 'Nombre del equipo',
            model: '',
          },
          {
            key: 'trackingNumber',
            label: 'Número de control',
            model: ''
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
            key: 'location',
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
            model: ''
          },
          {
            key: 'warrantyDate',
            label: 'Fecha de garantía',
            type: 'date',
            model: ''
          },
          {
            key: 'updatedAt',
            label: 'Fecha de modificación',
            type: 'date',
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
            label: 'Observaciones del equipo biomédico',
            model: ''
          }
        ],
      },
      btnAction: {
        show: true,
        btnTitle: 'Editar',
        iconName: 'edit',
        to: this.getIdToEdit(),
        btnWidth: 'auto'
      },
      btnCloseWindow: {
        iconName: 'close',
        btnBackground: '#FF9900',
        btnColor: '#FFFFFF',
        btnSize: 'xs',
        btnAction: this.goBack
      }
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
