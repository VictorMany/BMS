<template>
  <q-page class="flex flex-center cursor-pointer non-selectable">
    <div class="card-page">
      <div class="column items-end q-mt-md q-mb-xs">
        <btn-action v-bind="btnCloseWindow" />
      </div>
      <header-actions
        :titlePage="getTitle()"
        :btn-action="btnAction"
      />
      <div
        class="main-container-page main-container-page-medium-dark"
        style="height: 82%"
      >
        <q-scroll-area
          class="full-height q-pb-sm"
          style="height: 92% !important"
          :thumb-style="$store.getters['global/getThumbStyle']"
        >
          <form-text-field :fields="fields" />
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
import FormTextField from 'src/components/compose/FormTextField.vue';

export default defineComponent({
  name: 'EquipmentsPage',
  components: {
    HeaderActions,
    FormTextField,
    BtnAction,
  },
  data() {
    return {
      Equipos: 40,
      btnAction: {
        show: true,
        btnTitle: 'Guardar',
        btnWidth: 'auto',
        btnAction: this.createOrEdit,
        loader: false,
      },
      btnCloseWindow: {
        iconName: 'close',
        btnBackground: '#FF9900',
        btnColor: '#FFFFFF',
        btnSize: 'xs',
        btnAction: this.goBack,
      },

      fields: {
        createdAt: this.getCreatedAt(),
        id: null,

        top: [
          {
            key: 'userId',
            label: 'Encargado',
            model: '',
            type: 'select',
            itemFilter: this.filterUsers,
            options: [],
          },
          {
            key: 'idEquipment',
            label: 'Equipo',
            model: '',
            type: 'select',
            itemFilter: this.filterEquipments,
            options: [],
          },
        ],
        left: [
          {
            key: 'maintenanceType',
            label: 'Tipo',
            model: '',
            type: 'select',
            options: [
              { label: 'Preventivo', index: 1, value: 'Preventivo' },
              { label: 'Correctivo', index: 2, value: 'Correctivo' },
            ],
          },
          {
            key: 'reason',
            label: 'Motivo',
            model: '',
          },
          {
            key: 'cost',
            label: 'Costo',
            model: '',
          },
        ],
        textareas: [
          {
            key: 'tools',
            type: 'textarea',
            label: 'Herramientas',
            model: '',
          },
          {
            key: 'materials',
            type: 'textarea',
            label: 'Materiales',
            model: '',
          },
        ],
        right: [
          {
            key: 'maintenanceType',
            label: 'No. serie',
            readonly: true,
            model: '',
          },
          {
            key: 'photo',
            readImage: true,
            model: null,
          }
        ],
        bottom: [
          {
            key: 'observations',
            label: 'Actividades y observaciones del mantenimiento',
            model: '',
          }
        ],
      },
    };
  },
  methods: {
    async createMaintenance() {
      this.btnAction.loader = true;
      try {
        const res = await this.$store.dispatch(
          'maintenances/postMaintenanceAction',
          this.fields
        );
        if (res === true) {
          this.$router.go(-1);
        } else {
          this.showAlert({ msg: 'Inténtalo de nuevo más tarde y si el error persiste, repórtalo' });
        }
        this.btnAction.loader = false;
      } catch (error) {
        this.btnAction.loader = false;
        this.showAlert({ msg: error.response.data.details });
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

    async editMaintenance() {
      this.btnAction.loader = true;
      this.fields.id = this.$route.params.id

      try {
        const res = await this.$store.dispatch(
          'maintenances/updateMaintenanceAction',
          this.fields
        );
        if (res === true) {
          this.showAlert({ title: 'Éxito al editar', msg: 'El usuario se ha actualizado', color: 'green-14' });
          this.$router.go(-1);
        } else {
          this.showAlert({});
        }
        this.btnAction.loader = false;
      } catch (error) {
        this.btnAction.loader = false;
        this.showAlert({});
      }
    },

    createOrEdit() {
      if (this.isEditing()) {
        this.editMaintenance()
      } else {
        this.createMaintenance()
      }
    },

    getDate() {
      return this.$store.$store.getters['global/getDate']
    },

    goBack() {
      this.$router.go(-1);
    },

    getTitle() {
      if (this.isEditing()) {
        return 'Editar mantenimiento'
      }
      else return 'Agregar mantenimiento'
    },

    getCreatedAt() {
      if (this.isEditing()) {
        return ''
      }
      else return this.$store.getters['global/getDate']
    },

    showAlert({ msg, color, title, classes }) {
      this.$q.notify({
        message: title ? title : 'Ocurrió un error al crear el usuario',
        caption: msg ? msg : 'Inténtalo de nuevo más tarde',
        color: color ? color : 'secondary',
        classes: classes ? classes : 'border-rounded',
      });
    },

    isEditing() {
      return this.$route.params.id ? true : false
    },

    async getUsers(params) {
      this.loading = true
      await this.$store.dispatch('users/getUsersAction', params);
      this.loading = false
    },

    async getEquipments(params) {
      this.loading = true
      await this.$store.dispatch('equipments/getEquipmentsAction', params);
      this.loading = false
    },

    filterUsers(val, update) {
      if (val === '') {
        update(() => {
          this.fields.top[0].options = this.users
        })
        return
      } else {
        this.getUsers({
          name: val
        })
      }

      update(() => {
        const needle = val.toLowerCase()
        this.fields.top[0].options = this.users.filter(v => v.cardTitle.toLowerCase().indexOf(needle) > -1)
      })
    },

    filterEquipments(val, update) {
      if (val === '') {
        update(() => {
          this.fields.top[1].options = this.equipments
        })
        return
      } else {
        this.getEquipments({
          name: val
        })
      }

      update(() => {
        const needle = val.toLowerCase()
        this.fields.top[1].options = this.equipments.filter(v => v.cardTitle.toLowerCase().indexOf(needle) > -1)
      })
    }
  },

  created() {
    this.getUsers({})
    this.getEquipments({})


    if (this.isEditing()) {
      this.getMaintenance()
    }
  },

  computed: {
    users: {
      get() {
        return this.$store.getters['users/getUsersGetter'];
      },
    },
    equipments: {
      get() {
        return this.$store.getters['equipments/getEquipmentsGetter'];
      },
    },
  },

  watch: {
    fields: {
      // Get the image, and no-serie every change of the equipment selected
      handler(val) {
        if (val.top[1].model && val.right[1].model != val.top[1].model.cardImg) {
          val.right[1].model = val.top[1].model.cardImg
          val.right[0].model = val.top[1].model.serialNumber
        }
      },
      deep: true,
      immediate: true
    }
  }
});
</script>

<style scoped>
.main-container-page {
  background-color: white;
}

.card-page {
  padding-top: 0 !important;
}
</style>
