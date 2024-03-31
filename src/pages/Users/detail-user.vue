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
          class="h-97"
          :thumb-style="$store.getters['global/getThumbStyle']"
        >
          <details-component
            :fields="fields"
            :loading="loading"
            type="user"
          />
        </q-scroll-area>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue';
import HeaderActions from 'src/components/compose/HeaderActions.vue';
import DetailsComponent from 'src/components/compose/DetailsComponent.vue';

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
            key: 'userName',
            class: 'q-pb-sm',
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
            type: 'formatedDateOnly',
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
        iconName: 'o_edit',
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
      try {
        const params = {
          id: this.$route.params.id ? this.$route.params.id : 0,
          fields: this.fields
        }

        await this.$store.dispatch('users/getUserAction', params)
        this.loading = false
      } catch (error) {
        this.loading = false
      }
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
