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
            :detail-actions="detailActions"
          />
        </q-scroll-area>
      </div>
    </div>

    <q-dialog
      v-model="modalConfirm"
      persistent
      class="border-rounded"
    >
      <q-card
        class="border-shadow q-pa-sm border-rounded modal-ios"
        style="width: 400px; height: auto;"
      >
        <q-card-section>
          <div class="title-page text-primary">Eliminar equipo</div>
        </q-card-section>

        <q-card-section
          class="q-pt-none row"
          style="gap: 10px"
        >
          <div class="setting__title text-weight-medium">
          </div>
          <div class="setting__title">
            ¿Estás seguro de que quieres eliminar este equipo?
            <ul>
              <li class="setting__paragraph">
                La acción no se puede completar si el equipo tiene reportes o mantenimientos
              </li>
            </ul>
          </div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn
            unelevated
            v-close-popup
            no-caps
            class="border-rounded q-my-sm"
            size="sm"
            outline
            align="left"
            color="blue-7"
          >
            Regresar
          </q-btn>
          <q-btn
            unelevated
            no-caps
            class="border-rounded q-my-sm"
            size="sm"
            align="left"
            color="blue-7"
            @click="deleteEquipments"
          >
            Confirmar
          </q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import HeaderActions from 'src/components/compose/HeaderActions.vue'
import DetailsComponent from 'src/components/compose/DetailsComponent.vue'
import { showSuccess, showWarning } from 'app/utils/utils'

export default defineComponent({
  name: 'EquipmentsPage',
  components: {
    HeaderActions,
    DetailsComponent,
  },
  data() {
    return {
      loading: false,
      modalConfirm: false,

      fields: {
        createdAt: '',
        left: [
          {
            key: 'categoryName',
            label: 'Categoría del equipo',
            model: '',
          },
          {
            key: 'equipmentName',
            label: 'Nombre del equipo',
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
            key: 'department',
            label: 'Departamento',
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
            label: '',
            model: '',
            startDate: '',
            endDate: '',
            comodato: false,
            name: '',
            color: ''
          },
          {
            key: 'observations',
            type: 'textarea',
            label: 'Observaciones del equipo biomédico',
            model: ''
          }
        ],
      },

      detailActions: [],

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
        {
          show: true,
          btnTitle: 'Eliminar',
          iconName: 'o_delete',
          tooltip: 'Eliminar equipo',
          btnAction: this.openDeleteEquipments
        }
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

      if (equipment.ContractId)
        this.updateFieldByKeyInAllArrays('contract', {
          label: 'Contrato de servicio',
          model: equipment.contractStatus ? 'Activo' : 'Inactivo',
          startDate: equipment.startDate,
          comodato: equipment.comodato,
          endDate: equipment.endDate,
          name: equipment.contractName,
          link: `detail-${equipment.ContractId}-contract`,
          color: equipment.contractStatus ? '#10D13A' : '#dc4e5f'
        })
      // else {
      //   this.detailActions.push(
      //     {
      //       name: 'Añadir contrato de servicio',
      //       link: 'add-contract'
      //     }
      //   )
      // }

      // if (!equipment.PlanId) {
      //   this.detailActions.push(
      //     {
      //       name: 'Añadir plan de mantenimientos',
      //       link: 'add-maintenance-plan'
      //     }
      //   )
      // }

      this.loading = false
    },

    async deleteEquipments() {
      const equipmentIds = [this.$route.params.id]
      try {
        const res = await this.$store.dispatch(
          'equipments/deleteEquipmentsAction',
          equipmentIds
        );
        if (res === true) {
          showSuccess(this.$q, { title: 'Éxito al eliminar el equipo', msg: 'Se ha eliminado correctamente' });
          this.goBack(-1)
        } else {
          showWarning(this.$q, { msg: 'Inténtalo de nuevo más tarde y si el error persiste, repórtalo' });
        }
      } catch (error) {
        console.log(error)
      }
    },

    openDeleteEquipments() {
      this.modalConfirm = true
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
          this.btnActions[3].show = false;
          break;
        case 3:
          this.btnActions[1].show = false;
          this.btnActions[2].show = false;
          this.btnActions[3].show = false;
          break;
      }
    },

    updateFieldByKeyInAllArrays(key, updates) {
      for (const arrayKey in this.fields) {
        if (Array.isArray(this.fields[arrayKey])) {
          const fieldEntry = this.fields[arrayKey].find(entry => entry.key === key);
          if (fieldEntry) {
            Object.assign(fieldEntry, updates);
            return; // Termina la iteración después de encontrar la primera coincidencia
          }
        }
      }
      console.error(`No se encontró la entrada para la clave '${key}' en ningún arreglo o no tiene opciones.`);
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
