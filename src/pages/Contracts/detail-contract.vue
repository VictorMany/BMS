<template>
  <q-page class="flex flex-center cursor-pointer non-selectable">
    <q-form
      ref="myForm"
      class="card-page"
    >
      <header-actions
        titlePage="Detalles del contrato"
        :btn-actions="btnActions"
        :btn-close-window="btnCloseWindow"
      />

      <div class="main-container-page main-container-page-dark container-form">
        <div
          class="w-100 absolute-full flex flex-center"
          v-if="loading"
        >
          <div class="q-ma-md q-ma-sm-xl q-pa-xl text-center no-info border-rounded">
            <q-spinner-pie
              color="primary"
              class="q-mt-lg"
              size="4em"
            />
            <div class="text-primary q-ma-lg">Cargando ...</div>
          </div>
        </div>

        <q-scroll-area
          v-else
          class="h-97 q-pa-md"
          :thumb-style="$store.getters['global/getThumbStyle']"
        >
          <div class="w-100 q-mb-sm">
            <div class="q-pa-sm border-rounded form__label-area bg-accent">
              <strong class="q-mr-sm">Fecha de creación: </strong>
              {{ form.createdAt }}
            </div>
          </div>

          <div class="q-pa-xs">
            <div
              v-if="form.contractName"
              class="row items-center q-my-md"
            >
              <div class="form__item-label text-weight-medium">
                Nombre del contrato
              </div>
              <div class="col-12 form__item-model text-weight-medium">
                {{ form.contractName }}
              </div>
            </div>

            <div class="col-12 q-my-lg">
              <div class="form__item-label text-weight-medium q-mb-xs">
                Listado de equipos
              </div>
              <div
                class="row"
                style="gap: 20px;"
              >
                <div class="col-12 col-sm container-table-plans q-mt-sm">
                  <general-table
                    style="overflow: scroll;"
                    class="w-100"
                    :height="'auto'"
                    :rows="rows"
                    :columns="columns"
                    v-model:row-selected="rowSelected"
                    :pagination-prop="rowsPerPage"
                    :show-pagination="false"
                    :actions-table="actionsTable"
                  />
                </div>
              </div>
            </div>

            <div class="row form__item-model">
              <div class="form__item-label text-weight-medium q-mb-xs">
                Características del contrato
              </div>
              <div class="col-12">
                <div
                  class="row bg-accent border-rounded q-pa-md"
                  style="gap:20px"
                >
                  <div
                    v-if="form.startDate"
                    class="col-12 col-sm-3"
                  >
                    <div class="q-pb-xs form__item-label text-weight-medium">
                      Fecha de inicio de contrato
                    </div>

                    <div class="form__item-model text-weight-thin">
                      {{ form.startDate }}
                    </div>
                  </div>

                  <div
                    v-if="form.endDate"
                    class="col-12 col-sm-3"
                  >
                    <div class="q-pb-xs form__item-label text-weight-medium">
                      Fecha de fin de contrato
                    </div>

                    <div class="form__item-model text-weight-thin">
                      {{ form.endDate }}
                    </div>
                  </div>

                  <div
                    v-if="form.comodato"
                    class="col-12 col-sm-3"
                  >
                    <div class="form__item-model">
                      <div class="q-pb-xs form__item-label text-weight-medium">
                        Tipo de contrato
                      </div>
                      <q-chip
                        class="q-ma-none border-rounded"
                        dark
                        :style="`color: #1e65e8; background-color: #1e65e826; font-size: 12px`"
                      >
                        Comodato
                      </q-chip>
                    </div>
                  </div>

                  <div class="col-12 col-sm-3">
                    <div class="form__item-model">
                      <div class="q-pb-xs form__item-label text-weight-medium">
                        Estatus del contrato
                      </div>
                      <q-chip
                        class="q-ma-none border-rounded"
                        dark
                        :style="getStyleContract"
                      >
                        {{ getStatusContract }}
                      </q-chip>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              class="col-12"
              v-if="form.observations"
            >
              <div class="form__item-label text-weight-medium q-mt-lg q-mb-sm">
                Observaciones
              </div>
              <div
                style="height: 80%;"
                class="q-pa-sm border-line border-rounded"
              >
                <div
                  class="col-12 q-pr-md form__label-area"
                  v-html="form.observations"
                />
              </div>
            </div>

            <div
              class="no-printable-content"
              v-if="form.file"
            >
              <div class="q-mb-sm form__item-label text-weight-medium">
                Archivo adjunto al contrato
              </div>

              <div class="row q-pa-md border-line border-rounded">
                <div class="col-auto">
                  <div style="width: 214px; height: 214px">
                    <iframe
                      :src="form?.file"
                      type="application/pdf"
                      style="border: none; overflow-y: scroll;"
                      class="form__image64-equipment"
                    />
                  </div>
                </div>
                <div class="col-12 col-sm q-px-sm-lg q-pa-xs-sm">
                  <div
                    v-if="getFileName(form.file?.name)"
                    class="form__item-label text-primary ellipsis"
                    style="max-width: 70vw;"
                  >
                    &#x24D8; {{ getFileName(form.file) }}
                  </div>

                  <div class="row">
                    <q-btn
                      unelevated
                      no-caps
                      class="border-rounded q-my-sm"
                      size="sm"
                      align="left"
                      color="blue-7"
                      @click="openFullFile(form.file)"
                    >
                      Ver archivo en tamaño completo
                    </q-btn>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </q-scroll-area>
      </div>
    </q-form>
  </q-page>

  <q-dialog
    v-model="dialog"
    persistent
    maximized
    transition-show="slide-up"
    transition-hide="slide-down"
  >
    <q-card
      class="text-white alert-container"
      style="height: 100vh; padding: 0 !important;"
    >
      <q-bar style="height: 8%;">
        <q-space />
        <btn-action
          v-bind="btnCloseDialog"
          :tooltip="'Regresar'"
        />
      </q-bar>

      <q-card-section
        class="q-pt-none flex justify-center"
        style="height: 92%; width: 100%;"
      >
        <iframe
          :src="fullFile"
          width="100%"
          style="height: 100%  !important; border: none !important; overflow-y: scroll;"
          type="application/pdf"
        />
      </q-card-section>
    </q-card>
  </q-dialog>

</template>

<script>

import { defineComponent } from 'vue';
import HeaderActions from 'src/components/compose/HeaderActions.vue';
import GeneralTable from 'src/components/compose/GeneralTable.vue';
import { showSuccess, showWarning } from 'app/utils/utils';
import BtnAction from 'src/components/atomic/BtnAction.vue';

export default defineComponent({
  name: 'EquipmentsPage',
  components: {
    HeaderActions,
    GeneralTable,
    BtnAction
  },
  data() {
    return {
      loading: false,

      dialog: false,
      fullFile: '',
      btnCloseDialog: {
        iconName: 'exit_to_app',
        btnBackground: '#FF990020',
        btnColor: '#FF9900',
        btnAction: this.closeDialog
      },

      rowsPerPage: {
        rowsPerPage: null
      },

      btnActions: [
        {
          show: true,
          btnTitle: 'Editar contrato',
          iconName: 'o_edit',
          btnWidth: 'auto',
          loader: false,
          tooltip: 'Ir a editar contrato de servicio',
          to: this.getIdToEdit(),
        },
        {
          show: true,
          btnTitle: 'Eliminar contrato',
          iconName: 'o_delete',
          btnWidth: 'auto',
          loader: false,
          tooltip: 'Eliminar el contrato de servicio',
          btnAction: this.removeContract,
        }
      ],

      btnCloseWindow: {
        iconName: 'exit_to_app',
        btnBackground: '#FF990020',
        btnColor: '#FF9900',
        btnAction: this.goBack
      },

      rows: [],

      rowSelected: {},

      form: {
        id: null,
        contractName: '',
        observations: '',
        createdAt: '',
        comodato: false,
        startDate: '',
        contractStatus: '',
        endDate: ''
      },

      columns: [
        {
          name: 'categoryName',
          required: true,
          label: 'Equipo',
          align: 'left',
          field: 'categoryName',
          style: 'white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 200px',
          sortable: true,
        },
        {
          name: 'equipmentModel',
          label: 'Modelo',
          field: 'equipmentModel',
          style: 'white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 200px',
          align: 'left',
          sortable: true,
        },
        {
          name: 'location',
          label: 'Ubicación',
          field: 'location',
          align: 'left',
          style: 'white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 200px',
          sortable: true,
        },
        {
          name: 'serialNumber',
          label: 'No. serie',
          field: 'serialNumber',
          align: 'center',
          sortable: true,
        },
        { name: 'actions', label: 'Acciones', field: 'actions', align: 'center' }
      ],

      actionsTable: [
        {
          icnName: 'read_more',
          icnSize: 'sm',
          icnAction: 'Detail',
          tooltip: 'Detalle de equipo',
        },
      ],
    };
  },

  created() {
    this.loading = true

    this.checkPermissions()
    this.getContract()
  },

  computed: {
    userRole: {
      get() {
        return this.$store.getters['users/getRoleGetter'];
      },
    },
    getStyleContract() {
      if ((this.form?.contractStatus))
        return 'color: #10D13A; background-color: #10D13A26; font-size: 12px'
      else
        return 'color: #dc4e5f; background-color: #dc4e5f26; font-size: 12px'
    },
    getStatusContract() {
      if ((this.form?.contractStatus))
        return 'Activo'
      else
        return 'Inactivo'
    }
  },

  watch: {
    rowSelected: {
      handler(val) {
        if (val.action === 'Detail') {
          this.goToDetails(val.id);
        }
      },
      deep: true,
    },
  },

  methods: {
    async getContract() {
      try {
        const params = {
          id: this.$route.params.id
        }

        this.form = { ...this.form, ...await this.$store.dispatch('contracts/getContractAction', params) }

        this.rows = []

        this.form.equipments.forEach((e => {
          this.rows = [...this.rows, ...e.children]
        }))

        this.loading = false

      } catch (error) {
        console.log(error)
        this.loading = false
      }
    },

    async removeContract() {
      try {
        this.btnActions[1].loader = true
        const res = await this.$store.dispatch(
          'contracts/deleteContractAction',
          this.$route.params.id
        );
        if (res === true) {
          showSuccess(this.$q, { title: 'Éxito al eliminar el contrato', msg: 'El contrato de mantenimientos se ha eliminado' });
          this.goBack()
        } else {
          showWarning(this.$q, { msg: 'Inténtalo de nuevo más tarde y si el error persiste, repórtalo' });
        }
        this.btnActions[1].loader = false
      } catch (error) {
        console.log(error)
        this.btnActions[1].loader = false
      }
    },

    closeDialog() {
      this.dialog = false
    },

    getFileName(url) {
      try {
        return url.split('/').pop().split('?')[0]; // Obtener el nombre del archivo de la URL
      } catch (error) {
        return ''
      }
    },

    openFullFile(file) {
      this.fullFile = file
      this.dialog = true
    },

    checkPermissions() {
      switch (this.userRole) {
        case 2:
        case 3:
          this.btnActions[0].show = false;
          this.btnActions[1].show = false;
          break;
      }
    },

    goToDetails(payload) {
      this.$router.push({ name: 'detail-equipment', params: { id: payload } });
    },

    getIdToEdit() {
      return `edit-${this.$route.params.id}-contract`
    },

    goBack() {
      this.$router.go(-1);
    }
  },
});
</script>

<style lang="scss" scoped>
.main-container-page {
  background-color: white;
}



.chip-date {
  background-color: rgba($primary, 0.1);
  max-width: 300px;
  color: rgb(147, 150, 156);
}
</style>
