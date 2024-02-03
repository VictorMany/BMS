<template>
  <q-page class="flex flex-center cursor-pointer non-selectable">
    <div class="card-page">

      <header-actions
        :titlePage="'Detalle del usuario'"
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
            type="user"
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
import FormLabel from 'src/components/compose/FormLabel.vue';

export default defineComponent({
  name: 'EquipmentsPage',
  components: {
    HeaderActions,
    FormLabel,
  },
  data() {
    return {
      fields: {
        createdAt: '',
        left: [
          {
            key: 'userName',
            class: 'q-pb-md',
            label: 'Nombre',
            model: '',
          },
          {
            key: 'email',
            label: 'Correo',
            class: 'q-pb-sm',
            model: '',
          },
          {
            key: 'phone',
            label: 'Teléfono',
            class: 'q-pb-sm',
            model: '',
          },
          {
            key: 'userRole',
            label: 'Rol de usuario',
            class: 'q-pb-sm',
            model: '',
          },
          {
            key: 'birthday',
            label: 'Fecha de nacimiento',
            type: 'formatedDate',
            class: 'q-pb-sm',
            model: '',
          },
          {
            key: 'userStatus',
            label: 'Estatus',
            class: 'q-pb-sm',
            color: '',
            type: 'status',
            model: '',
          },
        ],
        right: [
          {
            key: 'photo',
            model: ''
          }
        ],
        bottom: [],
      },
      btnAction: {
        show: true,
        btnTitle: 'Editar',
        iconName: 'edit',
        tooltip: 'Ir a editar usuario',
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
      return `edit-${this.$route.params.id}-user`
    },

    goBack() {
      this.$router.go(-1);
    },

    async getUser() {
      this.loading = true

      const params = {
        id: this.$route.params.id,
        fields: this.fields
      }

      await this.$store.dispatch('users/getUserAction', params)
      this.loading = false
    },
  },
  mounted() {
    this.getUser();
  },
});
</script>

<style scoped>
.main-container-page {
  background-color: white;
}
</style>
