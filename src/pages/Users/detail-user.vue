<template>
  <q-page class="flex flex-center cursor-pointer non-selectable">
    <div class="card-page">
      <div class="column items-end q-mt-md q-mb-xs">
        <btn-action v-bind="btnCloseWindow" />
      </div>
      <header-actions
        :titlePage="'Detalle del usuario'"
        :btn-action="btnAction"
      />
      <div
        class="main-container-page main-container-page-dark"
        style="height: 82%"
      >
        <q-scroll-area
          class="full-height"
          style="height: 92% !important"
          :thumb-style="$store.getters['global/getThumbStyle']"
        >
          <form-label
            :textfields="textfields"
            type="user"
          />
        </q-scroll-area>
        <div
          class="col-12 form__date_container form__date column justify-center q-px-lg"
          style="height: 6%"
        >
          <div>Fecha de creación: <strong>{{ formattedDate }}</strong></div>
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
      formattedDate: '',
      textfields: {
        left: [
          {
            key: 'userName',
            model: '',
            class: 'q-pb-md',
            type: 'title',
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
            class: 'q-pb-sm',
            model: '',
          },
          {
            key: 'userStatus',
            label: 'Estatus',
            class: 'q-pb-sm',
            color: '#10D13A',
            type: 'status',
            model: 'Activo',
          },
        ],
        right: [],
        textarea: {},
        image: '',
      },
      btnAction: {
        show: true,
        btnTitle: 'Editar',
        iconName: 'edit',
        to: 'edit-1-user',
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
    goBack() {
      this.$router.go(-1);
    },

    async getUser() {
      this.loading = true

      const params = {
        id: this.$route.params.id,
        textfields: this.textfields
      }

      await this.$store.dispatch('users/getUserAction', params)
      this.loading = false
    },

    // async fetchUserData() {
    //   try {
    //     const userId = this.$route.params.id;
    //     const response = await service.getUsers(userId);
    //     const userData = response.data.contents[userId];

    //     const roleMap = {
    //       1: 'Administrador',
    //       2: 'Biomedico',
    //       3: 'Lector',
    //     };

    //     const statusMap = {
    //       true: { label: 'Activo', color: '#10D13A' },
    //       false: { label: 'Inactivo', color: '#d1b410' }
    //     };

    //     this.textfields.left = [
    //       { label: userData.userName, class: 'q-pb-md', type: 'title' },
    //       { label: 'Correo', class: 'q-pb-sm', model: userData.email },
    //       { label: 'Telefono', class: 'q-pb-sm', model: userData.phone },
    //       { label: 'Rol de usuario', class: 'q-pb-sm', model: roleMap[userData.userRole] },
    //       { label: 'Estatus', class: 'q-pb-sm', color: statusMap[userData.userStatus].color, type: 'status', model: statusMap[userData.userStatus].label }
    //     ];

    //     this.textfields.image = userData.photo;

    //     const date = new Date(userData.createdAt);
    //     this.formattedDate = date.toLocaleDateString('es-MX', {
    //       year: 'numeric',
    //       month: 'long',
    //       day: 'numeric',
    //     });

    //   } catch (error) {
    //     console.error('Error al obtener datos del usuario', error);
    //   }
    // },
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

.card-page {
  padding-top: 0 !important;
}
</style>
