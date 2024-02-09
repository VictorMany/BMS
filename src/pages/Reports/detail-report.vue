<template>
  <q-page class="flex flex-center cursor-pointer non-selectable">
    <div class="card-page">
      <header-actions
        :titlePage="'Detalles de reporte'"
        :btn-action="btnAction"
        :btn-close-window="btnCloseWindow"
      />

      <div class="main-container-page main-container-page-dark container-form">
        <q-scroll-area
          class="h-90"
          :thumb-style="$store.getters['global/getThumbStyle']"
        >
          <form-label
            :fields="fields"
            :loading="loading"
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
import HeaderActions from 'src/components/compose/HeaderActions.vue';
import FormLabel from 'src/components/compose/DetailsComponent.vue';

export default defineComponent({
  name: 'EquipmentsPage',
  components: {
    HeaderActions,
    FormLabel,
  },
  data() {
    return {
      loading: true,
      
      fields: {
        createdAt: '',

        top: [],
        left: [
          {
            key: 'categoryName',
            label: 'Categoría del equipo',
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

      btnAction: {
        show: true,
        btnTitle: 'Editar',
        iconName: 'edit',
        tooltip: 'Ir a editar reporte',
        to: this.getIdToEdit(),
        btnWidth: 'auto',
      },

      btnCloseWindow: {
        iconName: 'exit_to_app',
        btnBackground: '#FF990020',
        btnColor: '#FF9900',
        btnAction: this.goBack
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
