<template>
  <q-page class="flex flex-center cursor-pointer non-selectable">
    <div class="card-page">
      <header-actions
        :titlePage="'Detalles del equipo'"
        :btn-actions="btnActions"
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
            label: 'Proveedor',
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
            key: 'acquisitionDate',
            label: 'Fecha de adquisición',
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
          // PREGUNTAR SI LOS CONTRATOS DE SERVICIO INCLUYEN MUCHOS EQUIPOS O SERIA MEJOR MANEJARLO ESPECIFICAMENTE POR EQUIPO
          {
            key: 'contract',
            label: 'Contrato de servicio',
            model: 'Activo',
            startDate: '29 de Febrero de 2024',
            endDate: '29 de Marzo de 2025',
            contact: '4741034817',
            color: '#10D13A'
          },
          {
            key: 'observations',
            type: 'textarea',
            label: 'Observaciones del equipo biomédico',
            model: ''
          }
        ],
      },
      btnActions: [
        {
          show: true,
          btnTitle: 'Reportar',
          iconName: 'o_report',
          tooltip: 'Ir a reportar equipo',
          to: 'add-report',
          btnWidth: 'auto'
        },
        {
          show: true,
          btnTitle: 'Agregar mantenimiento',
          iconName: 'o_engineering',
          tooltip: 'Relizarle un mantenimiento al equipo',
          to: 'add-maintenance',
          btnWidth: 'auto'
        },
        {
          show: true,
          btnTitle: 'Editar',
          iconName: 'o_edit',
          tooltip: 'Ir a editar equipo',
          to: this.getIdToEdit(),
          btnWidth: 'auto'
        },
      ],
      btnCloseWindow: {
        iconName: 'exit_to_app',
        btnBackground: '#FF990020',
        btnColor: '#FF9900',
        btnAction: this.goBack
      },
    }
  },
  methods: {
    async getEquipment() {
      this.loading = true

      const params = {
        id: this.$route.params.id,
        fields: this.fields
      }

      const equipment = await this.$store.dispatch('equipments/getEquipmentAction', params)
      if (equipment.equipmentStatus === false) {
        this.btnActions[0].show = false;
        this.btnActions[1].show = false;
      }

      this.loading = false
    },

    getIdToEdit() {
      return `edit-${this.$route.params.id}-equipment`
    },

    goBack() {
      if (this.$router?.options?.history?.state?.back)
        this.$router.go(-1);
      else
        this.$router.push({ name: 'equipments' });

      // console.log('this.$route.meta', this.$router?.options?.history?.state?.back)
    },

    checkPermissions() {
      switch (this.userRole) {
        case 2:
          this.btnActions[2].show = false;
          break;
        case 3:
          this.btnActions[1].show = false;
          this.btnActions[2].show = false;
          break;
      }
    },
  },

  mounted() {
    this.checkPermissions()
    this.getEquipment();

    // We delete report from localstorage if exists
    this.$store.commit('reports/MUTATE_REPORT', null)
  },

  computed: {
    userRole: {
      get() {
        return this.$store.getters['users/getRoleGetter'];
      },
    },
  }
})
</script>

<style scoped>
.main-container-page {
  background-color: white;
}
</style>
