<template>
  <q-page class="flex flex-center cursor-pointer non-selectable">
    <div
      class="card-page"
      :style="$q.platform.is.desktop ? 'padding-top: 0 !important' : ''"
    >
      <div class="column items-end q-mt-md q-mb-sm gt-sm">
        <btn-action v-bind="btnCloseWindow" />
      </div>

      <header-actions :title-page="'Detalles del mantenimiento'" />
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
      fields: {
        top: [
          {
            key: 'IdEquipment',
            label: 'Nombre del equipo',
            model: '',
          },
          {
            key: 'userName',
            label: 'Encargado',
            model: ''
          },
        ],
        left: [
          {
            key: 'reason',
            label: 'Motivo',
            model: ''
          },
          {
            key: 'cost',
            label: 'Costo',
            pref: '$',
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
            label: 'Observaciones del mantenimiento',
            model: ''
          }
        ],
      },

      btnCloseWindow: {
        iconName: 'close',
        btnBackground: '#FF9900',
        btnColor: '#FFFFFF',
        btnSize: 'xs',
        btnAction: this.goBack,
      },
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1);
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
