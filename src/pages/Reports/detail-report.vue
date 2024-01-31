<template>
  <q-page class="flex flex-center cursor-pointer non-selectable">
    <div class="card-page">
      <div class="column items-end q-mt-md q-mb-sm gt-sm">
        <btn-action v-bind="btnCloseWindow" />
      </div>

      <header-actions
        :titlePage="'Detalle de reporte'"
        :btn-action="btnAction"
      />

      <div
        class="main-container-page main-container-page-dark"
        style="height: 82%"
      >
        <q-scroll-area
          class="h-90"
          :thumb-style="$store.getters['global/getThumbStyle']"
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
import { defineComponent } from 'vue';
import BtnAction from 'src/components/atomic/BtnAction.vue';
import HeaderActions from 'src/components/compose/HeaderActions.vue';
import FormLabel from 'src/components/compose/FormLabel.vue';

export default defineComponent({
  name: 'EquipmentsPage',
  components: {
    HeaderActions,
    FormLabel,
    BtnAction,
  },
  data() {
    return {
      fields: {
        createdAt: '',
        top: [
          {
            key: 'equipmentName',
            label: 'Nombre del equipo',
            model: ''
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
            label: 'Número de serie',
            model: ''
          },
          {
            key: 'photo',
            model: ''
          }
        ],
      },

      btnAction: {
        show: true,
        btnTitle: 'Editar',
        iconName: 'edit',
        to: this.getIdToEdit(),
        btnWidth: 'auto',
      },

      btnCloseWindow: {
        iconName: 'close',
        btnBackground: '#FF9900',
        btnColor: '#FFFFFF',
        btnSize: 'xs',
        btnAction: this.goBack,
      },
    };
  },
  methods: {
    getIdToEdit() {
      return `edit-${this.$route.params.id}-report`
    },

    goBack() {
      this.$router.go(-1);
    },

    async getReport() {
      this.loading = true

      const params = {
        id: this.$route.params.id,
        fields: this.fields
      }

      await this.$store.dispatch('reports/getReportAction', params)
      this.loading = false
    },
  },
  mounted() {
    this.getReport();
  },
});
</script>

<style scoped>
.main-container-page {
  background-color: white;
}
</style>
